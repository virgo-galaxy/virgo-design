import fs from 'node:fs';
import console from 'node:console';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import prettier from 'prettier';
import ts from 'typescript';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const outputFile = path.join(repoRoot, 'apps/website/src/generated/api-reference.generated.ts');
const checkOnly = process.argv.includes('--check');

const toPosix = (value) => value.split(path.sep).join('/');
const slugify = (value) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

function listFiles(directory, predicate) {
  const result = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      result.push(...listFiles(absolute, predicate));
    } else if (predicate(absolute)) {
      result.push(absolute);
    }
  }
  return result;
}

const configPath = path.join(repoRoot, 'tsconfig.base.json');
const config = ts.readConfigFile(configPath, ts.sys.readFile);
if (config.error) {
  throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, '\n'));
}
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, repoRoot);
const sourceRoots = [
  path.join(repoRoot, 'packages/ui/src'),
  path.join(repoRoot, 'packages/primitives/src'),
];
const rootNames = sourceRoots.flatMap((sourceRoot) =>
  listFiles(sourceRoot, (file) => /\.tsx?$/.test(file)),
);
const program = ts.createProgram({ rootNames, options: parsed.options });
const checker = program.getTypeChecker();

function isExported(node) {
  return node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) ?? false;
}

function normalizeText(value) {
  return value
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .trim();
}

function documentationFor(symbol) {
  return normalizeText(ts.displayPartsToString(symbol.getDocumentationComment(checker)));
}

function defaultFor(symbol) {
  const tag = symbol
    .getJsDocTags()
    .find((entry) => entry.name === 'default' || entry.name === 'defaultValue');
  if (!tag?.text) return '';
  return normalizeText(tag.text.map((part) => part.text).join(''));
}

function sourcePackage(fileName) {
  const normalized = toPosix(fileName);
  if (normalized.includes('/packages/ui/')) return '@virgo-design/ui';
  if (normalized.includes('/packages/primitives/')) return '@virgo-design/primitives';
  return '';
}

function sanitizeTypeText(value) {
  return normalizeText(value)
    .replace(/import\("[^"]*\/packages\/primitives\/src\/index"\)\./g, '')
    .replace(/import\("[^"]*\/packages\/ui\/src\/index"\)\./g, '');
}

function propertyTypeText(symbol, ownerType) {
  const declarations = symbol.getDeclarations() ?? [];
  const declaration = declarations.find((entry) => entry.type) ?? declarations[0];
  if (!declaration) return 'unknown';
  if (ownerType?.isUnion?.()) {
    const resolved = checker.getTypeOfPropertyOfType(ownerType, symbol.getName());
    if (resolved) {
      return sanitizeTypeText(
        checker
          .typeToString(
            resolved,
            declaration,
            ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope,
          )
          .replace(/ \| undefined$/, ''),
      );
    }
  }
  if (declaration.type) {
    return sanitizeTypeText(declaration.type.getText(declaration.getSourceFile()));
  }
  return sanitizeTypeText(
    checker.typeToString(
      checker.getTypeOfSymbolAtLocation(symbol, declaration),
      declaration,
      ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope,
    ),
  );
}

function collectProperties(type) {
  return checker
    .getPropertiesOfType(type)
    .map((symbol) => {
      const declarations = symbol.getDeclarations() ?? [];
      const declaration = declarations.find((entry) => {
        const source = sourcePackage(entry.getSourceFile().fileName);
        return source === '@virgo-design/ui' || source === '@virgo-design/primitives';
      });
      if (!declaration) return null;
      return {
        name: symbol.getName(),
        type: propertyTypeText(symbol, type),
        required: (symbol.flags & ts.SymbolFlags.Optional) === 0,
        defaultValue: defaultFor(symbol),
        description: documentationFor(symbol),
        source: sourcePackage(declaration.getSourceFile().fileName),
      };
    })
    .filter(Boolean);
}

function declarationSignature(node, sourceFile) {
  const clean = (value) =>
    sanitizeTypeText(value)
      .replace(/\/\*\*[\s\S]*?\*\//g, ' ')
      .replace(/\/\/.*$/gm, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  if (ts.isTypeAliasDeclaration(node)) {
    return clean(node.type.getText(sourceFile));
  }
  if (ts.isInterfaceDeclaration(node)) {
    return clean(
      (node.heritageClauses ?? []).map((clause) => clause.getText(sourceFile)).join(' '),
    );
  }
  return '';
}

function declarationFromSymbol(symbol, displayName, reExported = false) {
  const target = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
  const declaration = (target.getDeclarations() ?? []).find(
    (entry) => ts.isInterfaceDeclaration(entry) || ts.isTypeAliasDeclaration(entry),
  );
  if (
    !declaration ||
    (!ts.isInterfaceDeclaration(declaration) && !ts.isTypeAliasDeclaration(declaration))
  ) {
    return null;
  }
  const type = checker.getDeclaredTypeOfSymbol(target);
  return {
    name: displayName,
    kind: ts.isInterfaceDeclaration(declaration) ? 'interface' : 'type',
    signature: declarationSignature(declaration, declaration.getSourceFile()),
    description: documentationFor(target),
    source: sourcePackage(declaration.getSourceFile().fileName),
    reExported,
    properties: collectProperties(type),
  };
}

function collectDeclarations(sourceFiles) {
  const result = [];
  const seen = new Set();

  for (const sourcePath of sourceFiles) {
    const sourceFile = program.getSourceFile(sourcePath);
    if (!sourceFile) {
      throw new Error(
        `TypeScript source was not loaded: ${toPosix(path.relative(repoRoot, sourcePath))}`,
      );
    }

    for (const statement of sourceFile.statements) {
      if (
        (ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement)) &&
        isExported(statement)
      ) {
        const symbol = checker.getSymbolAtLocation(statement.name);
        if (!symbol || seen.has(statement.name.text)) continue;
        const declaration = declarationFromSymbol(symbol, statement.name.text, false);
        if (declaration) {
          seen.add(statement.name.text);
          result.push(declaration);
        }
        continue;
      }

      if (
        ts.isExportDeclaration(statement) &&
        statement.exportClause &&
        ts.isNamedExports(statement.exportClause)
      ) {
        for (const element of statement.exportClause.elements) {
          if (!statement.isTypeOnly && !element.isTypeOnly) continue;
          const displayName = element.name.text;
          if (seen.has(displayName)) continue;
          const symbol = checker.getSymbolAtLocation(element.name);
          if (!symbol) continue;
          const declaration = declarationFromSymbol(symbol, displayName, true);
          if (declaration) {
            seen.add(displayName);
            result.push(declaration);
          }
        }
      }
    }
  }

  return result;
}

function withDescriptionTranslationKeys(domain, slug, declarations) {
  return declarations.map((declaration) => {
    const declarationKey = `${domain}.${slug}.api.${slugify(declaration.name)}`;

    return {
      ...declaration,
      descriptionTranslationKey: `${declarationKey}.description`,
      properties: declaration.properties.map((property) => ({
        ...property,
        descriptionTranslationKey: `${declarationKey}.properties.${slugify(property.name)}.description`,
      })),
    };
  });
}

const uiComponentsRoot = path.join(repoRoot, 'packages/ui/src/components');
const componentApiReference = Object.fromEntries(
  fs
    .readdirSync(uiComponentsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((entry) => {
      const slug = slugify(entry.name);
      const sourceFiles = [path.join(uiComponentsRoot, entry.name, `${entry.name}.types.ts`)];
      if (entry.name === 'Input') {
        sourceFiles.push(path.join(uiComponentsRoot, entry.name, 'Textarea.types.ts'));
      }
      sourceFiles.forEach((sourceFile) => {
        if (!fs.existsSync(sourceFile)) {
          throw new Error(`Missing public type source for ${entry.name}: ${sourceFile}`);
        }
      });
      return [
        slug,
        {
          packageName: '@virgo-design/ui',
          declarations: withDescriptionTranslationKeys(
            'components',
            slug,
            collectDeclarations(sourceFiles),
          ),
        },
      ];
    }),
);

const primitivesRoot = path.join(repoRoot, 'packages/primitives/src/components');
const primitiveSourceMap = {
  accordion: ['Accordion/Accordion.types.ts'],
  breadcrumb: ['Breadcrumb/Breadcrumb.types.ts'],
  button: ['Button/Button.types.ts'],
  checkbox: ['Checkbox/Checkbox.types.ts', 'Checkbox/CheckboxGroup.types.ts'],
  collapsible: ['Collapsible/Collapsible.types.ts'],
  command: ['Command/Command.types.ts'],
  'context-menu': ['ContextMenu/ContextMenu.types.ts'],
  cursor: ['Cursor/Cursor.types.ts'],
  dialog: ['Dialog/Dialog.types.ts'],
  dock: ['Dock/Dock.types.ts'],
  dropdown: ['Dropdown/Dropdown.types.ts'],
  input: ['Input/Input.types.ts'],
  textarea: ['Input/Textarea.types.ts'],
  layout: ['Layout/Layout.types.ts'],
  menu: ['Menu/Menu.types.ts'],
  menubar: ['Menubar/Menubar.types.ts'],
  'navigation-menu': ['NavigationMenu/NavigationMenu.types.ts'],
  pagination: ['Pagination/Pagination.types.ts'],
  popover: ['Popover/Popover.types.ts'],
  radio: ['Radio/Radio.types.ts', 'Radio/RadioGroup.types.ts'],
  select: ['Select/Select.types.ts'],
  switch: ['Switch/Switch.types.ts'],
  tabs: ['Tabs/Tabs.types.ts'],
  toast: ['Toast/Toast.types.ts'],
  tooltip: ['Tooltip/Tooltip.types.ts'],
};

const primitiveApiReference = Object.fromEntries(
  Object.entries(primitiveSourceMap).map(([slug, files]) => [
    slug,
    {
      packageName: '@virgo-design/primitives',
      declarations: withDescriptionTranslationKeys(
        'primitives',
        slug,
        collectDeclarations(files.map((file) => path.join(primitivesRoot, file))),
      ),
    },
  ]),
);

async function renderGeneratedFile() {
  const source = `// This file is generated by scripts/generate-api-docs.mjs. Do not edit by hand.\n\nimport type { ApiReferenceRegistry } from '@/components/docs/ApiReference';\n\nexport const componentApiReference: ApiReferenceRegistry = ${JSON.stringify(componentApiReference, null, 2)};\n\nexport const primitiveApiReference: ApiReferenceRegistry = ${JSON.stringify(primitiveApiReference, null, 2)};\n`;
  const prettierConfig = (await prettier.resolveConfig(outputFile)) ?? {};
  return prettier.format(source, { ...prettierConfig, filepath: outputFile });
}

const next = await renderGeneratedFile();
const current = fs.existsSync(outputFile) ? fs.readFileSync(outputFile, 'utf8') : '';

if (checkOnly) {
  if (current !== next) {
    console.error('API reference data is stale. Run `pnpm gen:api-docs`.');
    process.exitCode = 1;
  } else {
    console.log('API reference data is up to date.');
  }
} else {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, next);
  console.log(`Generated ${toPosix(path.relative(repoRoot, outputFile))}`);
}

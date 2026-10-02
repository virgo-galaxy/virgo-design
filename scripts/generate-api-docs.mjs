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
  slider: ['Slider/Slider.types.ts'],
  'color-picker': ['ColorPicker/ColorPicker.types.ts'],
  'time-picker': ['TimePicker/TimePicker.types.ts'],
  'date-picker': ['DatePicker/DatePicker.types.ts'],
  calendar: ['Calendar/Calendar.types.ts'],
  timeline: ['Timeline/Timeline.types.ts'],

  form: ['Form/Form.types.ts'],
  field: ['Field/Field.types.ts'],
  table: ['Table/Table.types.ts'],
  tree: ['Tree/Tree.types.ts'],
  combobox: ['Combobox/Combobox.types.ts'],

  accordion: ['Accordion/Accordion.types.ts'],
  breadcrumb: ['Breadcrumb/Breadcrumb.types.ts'],
  button: ['Button/Button.types.ts'],
  checkbox: ['Checkbox/Checkbox.types.ts', 'Checkbox/CheckboxGroup.types.ts'],
  carousel: ['Carousel/Carousel.types.ts'],
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

function descriptionResources(registry) {
  return Object.fromEntries(
    Object.entries(registry).map(([slug, document]) => [
      slug,
      {
        api: Object.fromEntries(
          document.declarations
            .flatMap((declaration) => [declaration, ...declaration.properties])
            .filter((entry) => entry.description.trim())
            .map((entry) => [entry.descriptionTranslationKey.split('.api.')[1], entry.description]),
        ),
      },
    ]),
  );
}

const generatedHeader =
  '// This file is generated by scripts/generate-api-docs.mjs. Do not edit by hand.\n\n';
const generatedDirectory = path.dirname(outputFile);
const registrySource = (name, registry) =>
  `${generatedHeader}import type { ApiReferenceRegistry } from '@/components/docs/ApiReference';\n\nexport const ${name}: ApiReferenceRegistry = ${JSON.stringify(registry, null, 2)};\n`;
const outputs = [
  [
    outputFile,
    `${generatedHeader}export { componentApiReference } from './component-api-reference.generated';\nexport { primitiveApiReference } from './primitive-api-reference.generated';\n`,
  ],
  [
    path.join(generatedDirectory, 'component-api-reference.generated.ts'),
    registrySource('componentApiReference', componentApiReference),
  ],
  [
    path.join(generatedDirectory, 'primitive-api-reference.generated.ts'),
    registrySource('primitiveApiReference', primitiveApiReference),
  ],
  [
    path.join(generatedDirectory, 'api-description-resources.generated.ts'),
    `${generatedHeader}import type { ApiDescriptionResources } from '@/i18n/api-description-resources';\n\nexport const componentsApiEnUS: ApiDescriptionResources = ${JSON.stringify(descriptionResources(componentApiReference), null, 2)};\n\nexport const primitivesApiEnUS: ApiDescriptionResources = ${JSON.stringify(descriptionResources(primitiveApiReference), null, 2)};\n`,
  ],
];

for (const [file, source] of outputs) {
  const config = (await prettier.resolveConfig(file)) ?? {};
  const next = await prettier.format(source, { ...config, filepath: file });
  const current = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (checkOnly) {
    if (current !== next) {
      console.error(
        `Generated API data is stale: ${toPosix(path.relative(repoRoot, file))}. Run \`pnpm gen:api-docs\`.`,
      );
      process.exitCode = 1;
    }
  } else {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, next);
    console.log(`Generated ${toPosix(path.relative(repoRoot, file))}`);
  }
}
if (checkOnly && !process.exitCode)
  console.log('API reference and description data are up to date.');

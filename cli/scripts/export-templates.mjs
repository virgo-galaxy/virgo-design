import assert from 'node:assert/strict';
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ESLint } from 'eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { format } from 'prettier';
import ts from 'typescript';
import tseslint from 'typescript-eslint';

const root = fileURLToPath(new URL('../../', import.meta.url));
const cli = path.join(root, 'cli');
const importSorter = new ESLint({
  cwd: root,
  overrideConfigFile: true,
  fix: true,
  overrideConfig: {
    files: ['**/*.{ts,tsx,js,mjs}'],
    languageOptions: { parser: tseslint.parser, parserOptions: { tsconfigRootDir: root } },
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^node:'],
            ['^@?\\w'],
            ['^'],
            ['^\\.'],
            ['^(?!\\u0000).+\\.(?:css|scss|sass|less|styl)(?:\\?.*)?$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
});
const readJson = async (filename) => JSON.parse(await readFile(filename, 'utf8'));
const templates = [
  { id: 'vite-react-scss-modules', framework: 'vite', style: 'scss-modules', port: 6301 },
  { id: 'vite-react-tailwind', framework: 'vite', style: 'tailwind', port: 6302 },
  { id: 'vite-react-vanilla-extract', framework: 'vite', style: 'vanilla-extract', port: 6303 },
  { id: 'next-scss-modules', framework: 'next', style: 'scss-modules', port: 6304 },
  { id: 'next-tailwind', framework: 'next', style: 'tailwind', port: 6305 },
  { id: 'next-vanilla-extract', framework: 'next', style: 'vanilla-extract', port: 6306 },
];
const commonTools = [
  'typescript',
  '@types/node',
  '@types/react',
  '@types/react-dom',
  'eslint',
  '@eslint/js',
  'typescript-eslint',
  'eslint-plugin-react-hooks',
  'eslint-plugin-react-refresh',
  'eslint-plugin-simple-import-sort',
  'globals',
  'prettier',
  'vitest',
  'vite',
  '@testing-library/jest-dom',
  '@testing-library/react',
  '@testing-library/user-event',
  'jsdom',
];

async function installedVersion(name, application) {
  for (const directory of [application, root]) {
    try {
      return (await readJson(path.join(directory, 'node_modules', name, 'package.json'))).version;
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  throw new Error(`Install repository dependencies before exporting templates: ${name}`);
}

function transformConfig(source, filename) {
  const file = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true);
  const result = ts.transform(file, [
    (context) => {
      const visit = (node) => {
        if (ts.isPropertyAssignment(node) && ts.isObjectLiteralExpression(node.initializer)) {
          const key = node.name.getText(file).replaceAll(/['"]/g, '');
          if (key === 'alias' || key === 'resolveAlias') {
            const properties = node.initializer.properties.filter(
              (property) =>
                !property.name?.getText(file).replaceAll(/['"]/g, '').startsWith('@virgo-design/'),
            );
            if (!properties.length) return undefined;
            return ts.factory.updatePropertyAssignment(
              node,
              node.name,
              ts.factory.updateObjectLiteralExpression(node.initializer, properties),
            );
          }
        }
        if (ts.isStringLiteral(node) && node.text === '../../../')
          return ts.factory.createStringLiteral('./');
        if (ts.isStringLiteral(node) && node.text === '../../../config/theme-bootstrap-plugin.ts') {
          return ts.factory.createStringLiteral('./config/theme-bootstrap-plugin.ts');
        }
        return ts.visitEachChild(node, visit, context);
      };
      return (node) => ts.visitNode(node, visit);
    },
  ]);
  const printed = ts.createPrinter().printFile(result.transformed[0]);
  result.dispose();
  return printed;
}

async function writeFormatted(directory, filename, content) {
  if (/\.(?:ts|tsx|js|mjs)$/.test(filename)) {
    const [result] = await importSorter.lintText(content, {
      filePath: path.join(directory, filename),
    });
    assert.equal(
      result.errorCount,
      0,
      `Cannot format ${filename}: ${JSON.stringify(result.messages)}`,
    );
    content = result.output ?? content;
    const source = ts.createSourceFile(filename, content, ts.ScriptTarget.Latest, true);
    const lastImport = source.statements.filter(ts.isImportDeclaration).at(-1);
    if (lastImport && source.statements.at(-1) !== lastImport) {
      content =
        content.slice(0, lastImport.end) + '\n\n' + content.slice(lastImport.end).trimStart();
    }
  }
  await writeFile(
    path.join(directory, filename),
    await format(content, {
      filepath: filename,
      semi: true,
      singleQuote: true,
      trailingComma: 'all',
      printWidth: 100,
    }),
  );
}

async function assertStandalone(directory, project = directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) await assertStandalone(filename, project);
    else if (entry.name === 'package.json') {
      assert(
        !(await readFile(filename, 'utf8')).includes('workspace:'),
        `Workspace dependency remains: ${filename}`,
      );
    } else if (/\.(?:ts|tsx|js|mjs)$/.test(entry.name)) {
      const source = ts.createSourceFile(
        filename,
        await readFile(filename, 'utf8'),
        ts.ScriptTarget.Latest,
        true,
      );
      const check = (specifier) => {
        if (!specifier.startsWith('.')) return;
        const resolved = path.resolve(path.dirname(filename), specifier);
        assert(
          resolved === project || resolved.startsWith(project + path.sep),
          `Repository path remains: ${filename}: ${specifier}`,
        );
      };
      const visit = (node) => {
        if (
          (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
          node.moduleSpecifier &&
          ts.isStringLiteral(node.moduleSpecifier)
        )
          check(node.moduleSpecifier.text);
        if (
          ts.isNewExpression(node) &&
          node.expression.getText(source) === 'URL' &&
          node.arguments?.[0] &&
          ts.isStringLiteral(node.arguments[0])
        )
          check(node.arguments[0].text);
        ts.forEachChild(node, visit);
      };
      visit(source);
    }
  }
}

async function adaptNextPackageAssets(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await adaptNextPackageAssets(filename);
      continue;
    }
    if (!/\.(?:ts|tsx)$/.test(entry.name)) continue;
    let content = await readFile(filename, 'utf8');
    const source = ts.createSourceFile(filename, content, ts.ScriptTarget.Latest, true);
    const assets = new Set();
    for (const statement of source.statements) {
      if (
        ts.isImportDeclaration(statement) &&
        ts.isStringLiteral(statement.moduleSpecifier) &&
        statement.moduleSpecifier.text.startsWith('@virgo-design/') &&
        statement.moduleSpecifier.text.endsWith('.svg') &&
        statement.importClause?.name
      )
        assets.add(statement.importClause.name.text);
    }
    if (!assets.size) continue;
    const replacements = [];
    const visit = (node) => {
      if (
        ts.isPropertyAccessExpression(node) &&
        ts.isIdentifier(node.expression) &&
        assets.has(node.expression.text) &&
        node.name.text === 'src'
      ) {
        const name = node.expression.text;
        replacements.push({
          start: node.getStart(source),
          end: node.getEnd(),
          value: `(typeof ${name} === 'string' ? ${name} : ${name}.src)`,
        });
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
    for (const replacement of replacements.toReversed()) {
      content =
        content.slice(0, replacement.start) + replacement.value + content.slice(replacement.end);
    }
    if (replacements.length) await writeFormatted(path.dirname(filename), entry.name, content);
  }
}

export async function exportTemplates() {
  const output = path.join(cli, 'templates');
  const libraryVersions = await readJson(path.join(cli, 'config/library-versions.json'));
  const repository = await readJson(path.join(root, 'package.json'));
  const base = await readJson(path.join(root, 'tsconfig.base.json'));
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  for (const template of templates) {
    const application = path.join(root, 'apps/pro', template.id);
    const directory = path.join(output, template.id);
    await mkdir(directory, { recursive: true });
    for (const filename of ['src', 'public', '.env.example']) {
      await cp(path.join(application, filename), path.join(directory, filename), {
        recursive: true,
      });
    }
    if (template.framework === 'next') await adaptNextPackageAssets(path.join(directory, 'src'));
    const manifest = await readJson(path.join(application, 'package.json'));
    delete manifest.repository;
    manifest.name = 'virgo-pro';
    manifest.packageManager = repository.packageManager;
    manifest.engines = repository.engines;
    for (const [name, range] of Object.entries(manifest.dependencies)) {
      if (range.startsWith('workspace:')) {
        assert(libraryVersions[name], `Missing released dependency version: ${name}`);
        manifest.dependencies[name] = libraryVersions[name];
      } else manifest.dependencies[name] = await installedVersion(name, application);
    }
    const tools = new Set([
      ...commonTools,
      ...Object.keys(manifest.devDependencies ?? {}),
      ...(template.framework === 'vite' ? ['vite', '@vitejs/plugin-react'] : []),
      ...(template.style === 'scss-modules' ? ['sass'] : []),
    ]);
    manifest.devDependencies = {};
    for (const name of tools)
      manifest.devDependencies[name] = await installedVersion(name, application);
    delete manifest.scripts['prepare:workspace'];
    manifest.scripts.dev =
      template.framework === 'vite' ? 'vite' : `next dev --port ${template.port}`;
    manifest.scripts.build = template.framework === 'vite' ? 'vite build' : 'next build';
    manifest.scripts.test = 'vitest run --config vitest.config.ts';
    manifest.scripts.lint = 'eslint .';
    manifest.scripts.format = 'prettier --write .';
    manifest.scripts['format:check'] = 'prettier --check .';
    if (template.framework === 'vite')
      manifest.scripts.preview = `vite preview --port ${template.port} --strictPort`;
    await writeFormatted(directory, 'package.json', JSON.stringify(manifest));

    const tsconfig = await readJson(path.join(application, 'tsconfig.json'));
    delete tsconfig.extends;
    const options = { ...base.compilerOptions };
    delete options.paths;
    tsconfig.compilerOptions = {
      ...options,
      ...tsconfig.compilerOptions,
      paths: { '@/*': ['./src/*'] },
    };
    if (template.framework === 'next') tsconfig.compilerOptions.allowJs = true;
    await writeFormatted(directory, 'tsconfig.json', JSON.stringify(tsconfig));
    const configurations =
      template.framework === 'vite'
        ? ['vite.config.ts', 'vitest.config.ts']
        : [
            'next.config.ts',
            'vitest.config.ts',
            ...(template.style === 'tailwind' ? ['postcss.config.mjs'] : []),
          ];
    for (const filename of configurations) {
      const source = await readFile(path.join(application, filename), 'utf8');
      await writeFormatted(directory, filename, transformConfig(source, filename));
    }
    if (template.framework === 'vite') {
      const scss = template.style === 'scss-modules';
      const stylesheet = path.join(directory, `src/styles/global.${scss ? 'scss' : 'css'}`);
      const styles = (await readFile(stylesheet, 'utf8')).replace(
        scss ? "@use './base';" : "@import './base.css';",
        scss
          ? "@use '@virgo-design/ui/styles.css' as ui;\n@use '@virgo-design/charts/styles.css' as charts;\n@use './base';"
          : "@import '@virgo-design/ui/styles.css';\n@import '@virgo-design/charts/styles.css';\n@import './base.css';",
      );
      await writeFile(stylesheet, styles);
      await cp(path.join(application, 'index.html'), path.join(directory, 'index.html'));
      await mkdir(path.join(directory, 'config'));
      const plugin = (
        await readFile(path.join(root, 'config/theme-bootstrap-plugin.ts'), 'utf8')
      ).replace('../packages/themes/src/bootstrap.ts', '@virgo-design/themes');
      await writeFormatted(directory, 'config/theme-bootstrap-plugin.ts', plugin);
      const testPath = path.join(directory, 'src/app/tests/theme-bootstrap.test.ts');
      const test = (await readFile(testPath, 'utf8')).replace(
        '../../../../../../config/theme-bootstrap-plugin',
        '../../../config/theme-bootstrap-plugin',
      );
      await writeFile(testPath, test);
    }
    await cp(path.join(cli, 'config/eslint.config.js'), path.join(directory, 'eslint.config.js'));
    await cp(path.join(root, '.prettierrc.json'), path.join(directory, '.prettierrc.json'));
    await cp(path.join(root, '.nvmrc'), path.join(directory, '.nvmrc'));
    await cp(path.join(root, 'LICENSE'), path.join(directory, 'LICENSE'));
    await writeFile(
      path.join(directory, '_gitignore'),
      'node_modules/\ndist/\n.next/\ncoverage/\n.vite/\n*.tsbuildinfo\nnext-env.d.ts\n.env\n.env.local\n.DS_Store\n',
    );
    await writeFile(
      path.join(directory, '.prettierignore'),
      'node_modules\ndist\n.next\ncoverage\npnpm-lock.yaml\nnext-env.d.ts\npublic/mockServiceWorker.js\n',
    );
    await writeFormatted(
      directory,
      'pnpm-workspace.yaml',
      `packages: []\nallowBuilds:\n  esbuild: true\n  msw: false\n${template.style === 'scss-modules' ? "  '@parcel/watcher': true\n" : ''}${template.id === 'next-vanilla-extract' ? "  '@swc/core': true\n" : ''}`,
    );
    await writeFile(
      path.join(directory, 'README.md'),
      `# Virgo Design Pro\n\n${manifest.description}\n\n## Development\n\nUse Node.js ${await readFile(path.join(root, '.nvmrc'), 'utf8').then((value) => value.trim())} and ${repository.packageManager.replace('@', ' ')}.\n\n\`\`\`sh\npnpm install\npnpm dev\n\`\`\`\n\nThe application runs at http://localhost:${template.port}. Demo data is enabled by default in \`.env\`. ${template.framework === 'vite' ? 'API requests use MSW in the browser.' : 'Demo API routes run on the Next.js server without a database.'}\n\n## Checks\n\n\`\`\`sh\npnpm typecheck\npnpm lint\npnpm test\npnpm build\n\`\`\`\n\n## License\n\n[MIT](LICENSE).\n`,
    );
    await assertStandalone(directory);
    console.log(`Exported ${template.id}`);
  }
  await writeFile(
    path.join(output, 'manifest.json'),
    `${JSON.stringify({ templates }, null, 2)}\n`,
  );
}

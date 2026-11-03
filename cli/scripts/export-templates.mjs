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
  { id: 'vite-react-scss-modules', framework: 'vite', style: 'scss-modules' },
  { id: 'vite-react-tailwind', framework: 'vite', style: 'tailwind' },
  { id: 'vite-react-vanilla-extract', framework: 'vite', style: 'vanilla-extract' },
  { id: 'next-scss-modules', framework: 'next', style: 'scss-modules' },
  { id: 'next-tailwind', framework: 'next', style: 'tailwind' },
  { id: 'next-vanilla-extract', framework: 'next', style: 'vanilla-extract' },
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
          if (filename === 'vite.config.ts' && key === 'server') {
            const properties = node.initializer.properties.filter(
              (property) => property.name?.getText(file) !== 'port',
            );
            return ts.factory.updatePropertyAssignment(
              node,
              node.name,
              ts.factory.updateObjectLiteralExpression(node.initializer, properties),
            );
          }
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

async function copyProjectRules(directory) {
  await cp(path.join(root, '.prettierrc.json'), path.join(directory, '.prettierrc.json'));
  for (const filename of ['.editorconfig', '.gitattributes']) {
    const config = await readFile(path.join(root, filename), 'utf8');
    await writeFile(
      path.join(directory, filename),
      config.replace(/^\uFEFF/, '').replaceAll('\r\n', '\n'),
    );
  }
  await cp(path.join(root, '.nvmrc'), path.join(directory, '.nvmrc'));
  await cp(path.join(root, 'LICENSE'), path.join(directory, 'LICENSE'));
}

async function exportMinimal(output, variant, repository, base, libraryVersions) {
  const template = { ...variant, id: `minimal-${variant.id}`, tier: 'minimal' };
  const vite = variant.framework === 'vite';
  const tailwind = variant.style === 'tailwind';
  const scss = variant.style === 'scss-modules';
  const vanilla = variant.style === 'vanilla-extract';
  const application = path.join(root, 'apps/pro', variant.id);
  const source = path.join(cli, 'source/minimal');
  const styling = path.join(source, 'styling', variant.style);
  const directory = path.join(output, template.tier, variant.id);

  for (const layer of ['common', variant.framework]) {
    await cp(path.join(source, layer), directory, { recursive: true });
  }
  await cp(path.join(styling, 'src'), path.join(directory, 'src'), { recursive: true });
  const config = vite ? 'vite.config.ts' : 'next.config.ts';
  if (vanilla || (vite && tailwind)) {
    await cp(path.join(styling, config), path.join(directory, config));
  }
  if (!vite && tailwind) {
    await cp(path.join(styling, 'postcss.config.mjs'), path.join(directory, 'postcss.config.mjs'));
  }
  if (tailwind) {
    const filename = path.join(directory, 'src/styles.css');
    const styles = await readFile(filename, 'utf8');
    await writeFile(filename, styles.replace('\n\nbody {', "\n@import 'tailwindcss';\n\nbody {"));
  }

  await mkdir(path.join(directory, 'public'));
  await cp(
    path.join(application, 'public/favicon.ico'),
    path.join(directory, 'public/favicon.ico'),
  );
  await copyProjectRules(directory);
  const dependencies = {
    react: await installedVersion('react', application),
    'react-dom': await installedVersion('react-dom', application),
    ...(!vite ? { next: await installedVersion('next', application) } : {}),
  };
  for (const name of ['@virgo-design/tokens', '@virgo-design/themes', '@virgo-design/ui']) {
    assert(libraryVersions[name], `Missing released dependency version: ${name}`);
    dependencies[name] = libraryVersions[name];
  }
  const tools = [
    '@types/react',
    '@types/react-dom',
    'prettier',
    'typescript',
    ...(vite ? ['@vitejs/plugin-react', 'vite'] : ['@types/node']),
    ...(tailwind ? ['tailwindcss', vite ? '@tailwindcss/vite' : '@tailwindcss/postcss'] : []),
    ...(scss ? ['sass'] : []),
    ...(vanilla
      ? [
          '@vanilla-extract/css',
          vite ? '@vanilla-extract/vite-plugin' : '@vanilla-extract/next-plugin',
        ]
      : []),
  ];
  const devDependencies = Object.fromEntries(
    await Promise.all(tools.map(async (name) => [name, await installedVersion(name, application)])),
  );
  await writeFormatted(
    directory,
    'package.json',
    JSON.stringify({
      name: 'virgo-app',
      private: true,
      version: '0.0.0',
      type: 'module',
      packageManager: repository.packageManager,
      engines: repository.engines,
      scripts: {
        build: vite ? 'vite build' : 'next build',
        typecheck: vite ? 'tsc --noEmit' : 'next typegen && tsc --noEmit',
        format: 'prettier --write .',
        'format:check': 'prettier --check .',
      },
      dependencies,
      devDependencies,
    }),
  );
  const compilerOptions = { ...base.compilerOptions };
  delete compilerOptions.paths;
  if (vite) compilerOptions.types = ['vite/client'];
  else
    Object.assign(compilerOptions, {
      allowJs: true,
      esModuleInterop: true,
      incremental: true,
      tsBuildInfoFile: '.next/cache/tsconfig.tsbuildinfo',
      plugins: [{ name: 'next' }],
      types: ['node', 'react', 'react-dom'],
    });
  await writeFormatted(
    directory,
    'tsconfig.json',
    JSON.stringify({
      compilerOptions,
      include: vite
        ? ['src', config]
        : ['next-env.d.ts', 'src', config, '.next/types/**/*.ts', '.next/dev/types/**/*.ts'],
      ...(vite ? {} : { exclude: ['node_modules'] }),
    }),
  );
  await writeFormatted(
    directory,
    'pnpm-workspace.yaml',
    `packages: []\nallowBuilds:\n  esbuild: true\n${scss ? "  '@parcel/watcher': true\n" : ''}${!vite && vanilla ? "  '@swc/core': true\n" : ''}`,
  );
  await assertStandalone(directory);
  console.log(`Exported ${template.id}`);
  return template;
}

async function exportStarter(output, variant) {
  const baseline = path.join(output, 'pro', variant.id);
  const directory = path.join(output, 'starter', variant.id);
  const source = path.join(cli, 'source/starter');
  const vite = variant.framework === 'vite';
  const tailwind = variant.style === 'tailwind';
  const vanilla = variant.style === 'vanilla-extract';
  for (const layer of ['common', variant.framework, `styling/${variant.style}`]) {
    await cp(path.join(source, layer), directory, { recursive: true });
  }
  for (const filename of ['tsconfig.json', '_gitignore', ...(vite ? ['config'] : [])]) {
    await cp(path.join(baseline, filename), path.join(directory, filename), { recursive: true });
  }
  if (vite) {
    const filename = path.join(directory, 'vite.config.ts');
    if (!tailwind) {
      const config = (await readFile(filename, 'utf8'))
        .replace(/^import tailwindcss .*\n/m, '')
        .replace('    tailwindcss(),\n', '');
      await writeFormatted(
        directory,
        'vite.config.ts',
        vanilla
          ? `import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';\n${config.replace('    react(),', '    react(),\n    vanillaExtractPlugin(),')}`
          : config,
      );
    }
  } else {
    const nextConfig = vanilla ? 'styling/vanilla-extract/next.config.ts' : 'next/next.config.ts';
    await cp(path.join(cli, 'source/minimal', nextConfig), path.join(directory, 'next.config.ts'));
    if (tailwind) {
      await cp(
        path.join(baseline, 'postcss.config.mjs'),
        path.join(directory, 'postcss.config.mjs'),
      );
    }
  }
  if (tailwind) {
    const stylesheet = path.join(directory, 'src/styles/global.css');
    await writeFile(stylesheet, `${await readFile(stylesheet, 'utf8')}@import './tailwind.css';\n`);
  }
  if (vanilla) {
    const filename = path.join(directory, 'vitest.config.ts');
    const config = await readFile(filename, 'utf8');
    await writeFormatted(
      directory,
      'vitest.config.ts',
      `import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';\n${config.replace(
        'defineConfig({',
        'defineConfig({\n  plugins: [vanillaExtractPlugin()],',
      )}`,
    );
  }
  await mkdir(path.join(directory, 'public'));
  await cp(path.join(baseline, 'public/favicon.ico'), path.join(directory, 'public/favicon.ico'));
  await cp(
    path.join(root, 'packages/icons/brands/virgo-design.svg'),
    path.join(directory, 'public/virgo-design.svg'),
  );
  await copyProjectRules(directory);
  const eslint = await readFile(path.join(baseline, 'eslint.config.js'), 'utf8');
  await writeFormatted(
    directory,
    'eslint.config.js',
    eslint.replace(/^.*mockServiceWorker.*\n/m, ''),
  );
  await writeFile(
    path.join(directory, '.prettierignore'),
    'dist\n.next\nnext-env.d.ts\ncoverage\npnpm-lock.yaml\n',
  );
  const workspace = await readFile(path.join(baseline, 'pnpm-workspace.yaml'), 'utf8');
  await writeFile(
    path.join(directory, 'pnpm-workspace.yaml'),
    workspace.replace(/^.*msw: false\n/m, ''),
  );

  const { dependencies, devDependencies, scripts, engines, packageManager } = await readJson(
    path.join(baseline, 'package.json'),
  );
  const runtime = [
    '@virgo-design/fonts',
    '@virgo-design/icons',
    '@virgo-design/themes',
    '@virgo-design/tokens',
    '@virgo-design/ui',
    'axios',
    'i18next',
    'react',
    'react-dom',
    'react-i18next',
    vite ? 'react-router' : 'next',
    ...(vanilla ? ['@vanilla-extract/css'] : []),
  ];
  delete devDependencies['@testing-library/jest-dom'];
  delete devDependencies.msw;
  if (!vite) {
    delete devDependencies['react-router'];
    delete devDependencies['@testing-library/user-event'];
  }
  if (vanilla) delete devDependencies['@vanilla-extract/css'];
  await writeFormatted(
    directory,
    'package.json',
    JSON.stringify({
      name: 'virgo-starter',
      version: '0.0.0',
      private: true,
      type: 'module',
      license: 'MIT',
      packageManager,
      engines,
      scripts,
      dependencies: Object.fromEntries(
        runtime.map((name) => {
          const version = dependencies[name] ?? devDependencies[name];
          assert(version, `Missing Starter dependency: ${name}`);
          return [name, version];
        }),
      ),
      devDependencies,
    }),
  );
  await assertStandalone(directory);
  const template = { ...variant, id: `starter-${variant.id}`, tier: 'starter' };
  console.log(`Exported ${template.id}`);
  return template;
}

export async function exportTemplates() {
  const output = path.join(cli, 'templates');
  const libraryVersions = await readJson(path.join(cli, 'config/library-versions.json'));
  const repository = await readJson(path.join(root, 'package.json'));
  const base = await readJson(path.join(root, 'tsconfig.base.json'));
  await rm(output, { recursive: true, force: true });
  await mkdir(path.join(output, 'starter'), { recursive: true });
  for (const template of templates) {
    const application = path.join(root, 'apps/pro', template.id);
    const directory = path.join(output, 'pro', template.id);
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
    delete manifest.scripts.dev;
    delete manifest.scripts.start;
    manifest.scripts.build = template.framework === 'vite' ? 'vite build' : 'next build';
    manifest.scripts.test = 'vitest run --config vitest.config.ts';
    manifest.scripts.lint = 'eslint .';
    manifest.scripts.format = 'prettier --write .';
    manifest.scripts['format:check'] = 'prettier --check .';
    delete manifest.scripts.preview;
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
    await copyProjectRules(directory);
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
      `# Virgo Design Pro\n\n${manifest.description}\n\n## Development\n\nUse Node.js ${await readFile(path.join(root, '.nvmrc'), 'utf8').then((value) => value.trim())} and ${repository.packageManager.replace('@', ' ')}.\n\n\`\`\`sh\npnpm install\npnpm dev\n\`\`\`\n\nThe development server uses the port selected during generation. See \`package.json\` for the startup commands. Demo data is enabled by default in \`.env\`. ${template.framework === 'vite' ? 'API requests use MSW in the browser.' : 'Demo API routes run on the Next.js server without a database.'}\n\n## Checks\n\n\`\`\`sh\npnpm typecheck\npnpm lint\npnpm test\npnpm build\n\`\`\`\n\n## License\n\n[MIT](LICENSE).\n`,
    );
    await assertStandalone(directory);
    console.log(`Exported ${template.id}`);
  }
  const minimal = [];
  for (const template of templates) {
    minimal.push(await exportMinimal(output, template, repository, base, libraryVersions));
  }
  const starter = [];
  for (const template of templates) {
    starter.push(await exportStarter(output, template));
  }
  await writeFile(
    path.join(output, 'manifest.json'),
    `${JSON.stringify({ templates: [...templates, ...minimal, ...starter] }, null, 2)}\n`,
  );
}

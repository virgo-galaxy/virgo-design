import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import ts from 'typescript';
import { expect, it } from 'vitest';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
function sources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? entry.name === 'test'
        ? []
        : sources(join(dir, entry.name))
      : /\.tsx?$/.test(entry.name) && !/\.test(?:-helper)?\./.test(entry.name)
        ? [join(dir, entry.name)]
        : [],
  );
}
function imports(file: string) {
  const ast = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  const paths: string[] = [];
  function visit(node: ts.Node) {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    )
      paths.push(node.moduleSpecifier.text);
    else if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments[0] &&
      ts.isStringLiteral(node.arguments[0])
    )
      paths.push(node.arguments[0].text);
    else if (
      ts.isImportTypeNode(node) &&
      ts.isLiteralTypeNode(node.argument) &&
      ts.isStringLiteral(node.argument.literal)
    )
      paths.push(node.argument.literal.text);
    ts.forEachChild(node, visit);
  }
  visit(ast);
  return paths;
}
function resolveImport(file: string, path: string) {
  if (!path.startsWith('.') && !path.startsWith('@/')) return undefined;
  const clean = path.split('?')[0]!;
  const base = clean.startsWith('@/') ? join(root, clean.slice(2)) : resolve(dirname(file), clean);
  return [base, base + '.ts', base + '.tsx', join(base, 'index.ts'), join(base, 'index.tsx')].find(
    (candidate) => existsSync(candidate) && statSync(candidate).isFile(),
  );
}
const files = sources(root);
const graph = new Map(
  files.map((file) => [
    file,
    imports(file).flatMap((path) => {
      const dependency = resolveImport(file, path);
      return dependency ? [dependency] : [];
    }),
  ]),
);

// Distinct layers may depend only downward. Equal-ranked peers cannot know each other.
const layerRanks: Record<string, number> = {
  contracts: 0,
  assets: 0,
  styles: 0,
  lib: 1,
  api: 2,
  i18n: 2,
  shared: 3,
  routing: 3,
  mock: 3,
  components: 4,
  features: 5,
  pages: 6,
  layout: 6,
  app: 7,
  entry: 8,
};
function layer(file: string) {
  const path = relative(root, file);
  return path.includes('/') ? path.split('/')[0]! : 'entry';
}

it('keeps every production dependency directed by layer without reverse-dependency exceptions', () => {
  for (const [file, dependencies] of graph) {
    const from = relative(root, file);
    for (const dependency of dependencies) {
      const to = relative(root, dependency);
      const sourceLayer = layer(file),
        targetLayer = layer(dependency);
      expect(layerRanks[sourceLayer], from).toBeDefined();
      expect(layerRanks[targetLayer], to).toBeDefined();
      if (sourceLayer !== targetLayer)
        expect(layerRanks[sourceLayer], `${from} → ${to}`).toBeGreaterThan(
          layerRanks[targetLayer]!,
        );
      if (sourceLayer === 'pages' && targetLayer === 'pages')
        expect(from.split('/')[1], `${from} → ${to}`).toBe(to.split('/')[1]);
    }
    if (/^(pages|features|components|routing|layout)\//.test(from))
      expect(imports(file), from).not.toContain('axios');
  }
});

it('has no cycles after collapsing files into product layers and individual feature owners', () => {
  function owner(file: string) {
    const path = relative(root, file);
    return path.startsWith('features/') ? path.split('/').slice(0, 2).join('/') : layer(file);
  }
  const owners = new Map<string, Set<string>>();
  for (const [file, dependencies] of graph) {
    const from = owner(file);
    const targets = owners.get(from) ?? new Set<string>();
    for (const dependency of dependencies)
      if (owner(dependency) !== from) targets.add(owner(dependency));
    owners.set(from, targets);
  }
  const visited = new Set<string>();
  const active: string[] = [];
  function visit(owner: string) {
    expect(active.includes(owner), [...active, owner].join(' → ')).toBe(false);
    if (visited.has(owner)) return;
    active.push(owner);
    for (const dependency of owners.get(owner) ?? []) visit(dependency);
    active.pop();
    visited.add(owner);
  }
  for (const owner of owners.keys()) visit(owner);
});

it('has no production cycles, including type-only, dynamic and barrel dependencies', () => {
  const visited = new Set<string>();
  const active: string[] = [];
  function visit(file: string) {
    expect(
      active.includes(file),
      active
        .map((path) => relative(root, path))
        .concat(relative(root, file))
        .join(' → '),
    ).toBe(false);
    if (visited.has(file)) return;
    active.push(file);
    for (const dependency of graph.get(file) ?? []) visit(dependency);
    active.pop();
    visited.add(file);
  }
  for (const file of files) visit(file);
});

it('keeps feature consumers on explicit public boundaries and local code off its own barrel', () => {
  for (const [file, dependencies] of graph) {
    const from = relative(root, file);
    for (const dependency of dependencies) {
      const to = relative(root, dependency);
      if (!to.startsWith('features/')) continue;
      const owner = to.split('/').slice(0, 2).join('/') + '/';
      if (from.startsWith(owner)) {
        expect(to, `${from} → ${to}`).not.toBe(owner + 'index.ts');
        continue;
      }
      expect(
        ['index.ts', 'routes.ts', 'view.ts', 'locales.ts'].some((entry) => to === owner + entry),
        `${from} → private ${to}`,
      ).toBe(true);
    }
  }
});

it('keeps model, domain and base modules independent of presentation, including transitive imports', () => {
  for (const file of files) {
    const from = relative(root, file);
    if (!/(^|\/)(domain|model|base)(\/|\.)/.test(from)) continue;
    const visited = new Set<string>();
    function visit(dependency: string) {
      if (visited.has(dependency)) return;
      visited.add(dependency);
      const to = relative(root, dependency);
      expect(
        /(^|\/)(pages|layout|components)\/|(?:Page|Presentation)\.tsx$|\/presentation\.tsx?$/.test(
          to,
        ),
        `${from} → ${to}`,
      ).toBe(false);
      for (const next of graph.get(dependency) ?? []) visit(next);
    }
    for (const dependency of graph.get(file) ?? []) visit(dependency);
  }
});

it('uses index files only as export-only module boundaries', () => {
  for (const file of files.filter((file) => {
    const from = relative(root, file);
    return (
      /^(features|components|layout|lib|routing|i18n)\//.test(from) && file.endsWith('/index.ts')
    );
  })) {
    const from = relative(root, file);
    const ast = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
    expect(ast.statements.every(ts.isExportDeclaration), from).toBe(true);
    expect(/\/features\/[^/]+\/(components|hooks|utils)\/.*index\.ts$/.test(file), from).toBe(
      false,
    );
  }
});

it('centralizes browser storage access and application route literals', () => {
  for (const file of files) {
    const from = relative(root, file);
    const ast = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
    function visit(node: ts.Node) {
      if (from !== 'lib/storage/browser-storage.ts' && ts.isIdentifier(node))
        expect(['localStorage', 'sessionStorage'].includes(node.text), from).toBe(false);
      if (
        /^(features|pages|components|layout)\//.test(from) &&
        (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
      )
        expect(
          /^\/(dashboard|work|result|exception|login|profile)(\/|$|\?)/.test(node.text),
          from,
        ).toBe(false);
      ts.forEachChild(node, visit);
    }
    visit(ast);
  }
});

it('keeps translation ownership visible without namespaces or translator wrappers', () => {
  for (const file of files) {
    const from = relative(root, file);
    const ast = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
    function visit(node: ts.Node) {
      if (ts.isIdentifier(node))
        expect(
          ['keyPrefix', 'getFixedT', 'createScopedT', 'TFunction'].includes(node.text),
          from,
        ).toBe(false);
      if (ts.isCallExpression(node)) {
        const name = ts.isIdentifier(node.expression)
          ? node.expression.text
          : ts.isPropertyAccessExpression(node.expression)
            ? node.expression.name.text
            : '';
        if (name === 'useTranslation') expect(node.arguments, from).toHaveLength(0);
        if (name === 't') {
          const key = node.arguments[0];
          if (key && (ts.isStringLiteral(key) || ts.isNoSubstitutionTemplateLiteral(key)))
            expect(key.text, from).toMatch(/^[a-zA-Z]+\./);
          if (key && ts.isTemplateExpression(key))
            expect(key.head.text, from).toMatch(/^[a-zA-Z]+\./);
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(ast);
  }
});

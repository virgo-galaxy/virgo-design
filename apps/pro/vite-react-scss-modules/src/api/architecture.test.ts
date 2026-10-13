import { existsSync, readdirSync, readFileSync } from 'node:fs';
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
      : /\.tsx?$/.test(entry.name) && !/\.test(?:-helper)?\.|\.d\.ts$/.test(entry.name)
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
  const base = path.startsWith('@/') ? join(root, path.slice(2)) : resolve(dirname(file), path);
  return [base, base + '.ts', base + '.tsx', join(base, 'index.ts'), join(base, 'index.tsx')].find(
    (candidate) => existsSync(candidate) && /\.tsx?$/.test(candidate),
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

it('keeps production dependencies directed, including relative imports and re-exports', () => {
  for (const [file, dependencies] of graph) {
    const from = relative(root, file);
    for (const dependency of dependencies) {
      const to = relative(root, dependency);
      const prohibited = from.startsWith('api/')
        ? /^(mock|pages|app|features|components|shared)\//
        : from.startsWith('mock/')
          ? /^(pages|app|features|components|shared)\//
          : /^(lib|shared)\//.test(from)
            ? /^(pages|app|features|components)\//
            : /^(features|components|routing)\//.test(from)
              ? /^(pages|app)\//
              : null;
      expect(prohibited?.test(to) ?? false, `${from} → ${to}`).toBe(false);
      if (from.startsWith('pages/') && to.startsWith('pages/'))
        expect(from.split('/')[1], `${from} → ${to}`).toBe(to.split('/')[1]);
    }
    if (/^(pages|features|components|routing)\//.test(from))
      expect(imports(file), from).not.toContain('axios');
  }
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

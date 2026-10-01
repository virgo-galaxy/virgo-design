import ts from 'typescript';
import { describe, expect, it } from 'vitest';
const modules = import.meta.glob<string>('../**/*.{ts,tsx}', {
  eager: true,
  query: '?raw',
  import: 'default',
});
const fixtures = new Map<string, Record<string, number>>([
  [
    '../features/color-semantic-preview/components/SemanticThemePreview.tsx',
    { button: 7, input: 1 },
  ],
  ['../pages/tokens/components/TypographyCompositionPreview.tsx', { button: 1, input: 2 }],
]);
describe('Website production UI consumer boundary', () => {
  it('keeps headless imports in primitive demonstrations and raw controls in explicit token fixtures', () => {
    for (const [path, source] of Object.entries(modules)) {
      if (/\.test\.|\/examples\/|\/features\/primitives\//.test(path)) continue;
      const ast = ts.createSourceFile(
        path,
        source,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX,
      );
      const controls: Record<string, number> = {};
      const visit = (node: ts.Node) => {
        if (
          (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
          node.moduleSpecifier &&
          ts.isStringLiteral(node.moduleSpecifier)
        )
          expect(node.moduleSpecifier.text.startsWith('@virgo-design/primitives'), path).toBe(
            false,
          );
        if (
          (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
          ['button', 'input', 'select', 'textarea', 'details', 'summary'].includes(
            node.tagName.getText(ast),
          )
        ) {
          const tag = node.tagName.getText(ast);
          expect(fixtures.has(path), path + ':' + tag).toBe(true);
          controls[tag] = (controls[tag] ?? 0) + 1;
        }
        ts.forEachChild(node, visit);
      };
      visit(ast);
      if (fixtures.has(path)) expect(controls, path).toEqual(fixtures.get(path));
    }
  });
});

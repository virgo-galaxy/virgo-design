import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import ts from 'typescript';
import { describe, expect, it } from 'vitest';

import { enUS, zhCN } from '../locales/resources';

function leaves(resource: object, prefix = ''): Record<string, string> {
  return Object.fromEntries(
    Object.entries(resource).flatMap(([key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      return typeof value === 'string' ? [[path, value]] : Object.entries(leaves(value, path));
    }),
  );
}

describe('pro translation resources', () => {
  it('provides every English key and interpolation in Chinese', () => {
    const english = leaves(enUS);
    const chinese = leaves(zhCN);
    expect(Object.keys(chinese).sort()).toEqual(Object.keys(english).sort());
    for (const [key, text] of Object.entries(english)) {
      expect(chinese[key]?.trim(), key).toBeTruthy();
      const variables = (value: string) => value.match(/\{\{[^}]+\}\}/g)?.sort() ?? [];
      expect(variables(chinese[key]!), key).toEqual(variables(text));
    }
  });

  it('resolves every literal production translation key in both languages, including plurals', () => {
    const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
    const resources = [leaves(enUS), leaves(zhCN)];
    function sources(directory: string): string[] {
      return readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
        entry.isDirectory()
          ? entry.name === 'test'
            ? []
            : sources(join(directory, entry.name))
          : /\.tsx?$/.test(entry.name) && !/\.test(?:-helper)?\./.test(entry.name)
            ? [join(directory, entry.name)]
            : [],
      );
    }
    for (const file of sources(root)) {
      const ast = ts.createSourceFile(
        file,
        readFileSync(file, 'utf8'),
        ts.ScriptTarget.Latest,
        true,
      );
      function visit(node: ts.Node) {
        if (
          ts.isCallExpression(node) &&
          ((ts.isIdentifier(node.expression) && node.expression.text === 't') ||
            (ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === 't'))
        ) {
          const key = node.arguments[0];
          if (key && (ts.isStringLiteral(key) || ts.isNoSubstitutionTemplateLiteral(key))) {
            const options = node.arguments[1];
            const counted =
              options &&
              ts.isObjectLiteralExpression(options) &&
              options.properties.some((property) => property.name?.getText(ast) === 'count');
            for (const resource of resources)
              expect(
                resource[key.text] ||
                  (counted && resource[key.text + '_one'] && resource[key.text + '_other']),
                `${relative(root, file)} → ${key.text}`,
              ).toBeTruthy();
          }
        }
        ts.forEachChild(node, visit);
      }
      visit(ast);
    }
  });
});

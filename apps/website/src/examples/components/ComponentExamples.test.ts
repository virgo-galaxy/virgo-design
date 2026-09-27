import type { ComponentType } from 'react';
import { compileString } from 'sass';
import * as ts from 'typescript';
import { describe, expect, it } from 'vitest';

import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import { componentExampleRegistry } from './example-registry';
import { standaloneExampleIds } from './standalone-example-registry';

type ManifestModule = Record<string, Readonly<Record<string, ComponentExampleDefinition>>>;
const manifests = import.meta.glob<ManifestModule>('./*/examples.ts', { eager: true });
const modules = import.meta.glob<{ default: ComponentType }>('./*/*Example.tsx', { eager: true });
const sources = import.meta.glob<string>('./*/*Example.tsx', {
  eager: true,
  query: '?raw',
  import: 'default',
});
const styles = import.meta.glob<string>('./*/*Example.module.scss', {
  eager: true,
  query: '?virgo-raw',
  import: 'default',
});
const definitions = Object.values(manifests).flatMap((module) =>
  Object.values(module).flatMap((examples) => Object.values(examples)),
);
const publicImports = new Set(['react', '@virgo-design/ui', '@virgo-design/icons']);

describe('Executable component example sources', () => {
  it('covers every current component family without unregistered files or duplicate semantic IDs', () => {
    expect(Object.keys(manifests)).toHaveLength(35);
    expect(definitions).toHaveLength(Object.keys(modules).length);
    expect(definitions).toHaveLength(Object.keys(styles).length);
    expect(new Set(definitions.map((definition) => definition.id)).size).toBe(definitions.length);
    expect(componentExampleRegistry.size).toBe(definitions.length);
    expect(standaloneExampleIds.size).toBe(definitions.length);
    for (const definition of definitions) {
      expect(componentExampleRegistry.get(definition.id)).toBe(definition);
      expect(standaloneExampleIds.has(definition.id)).toBe(true);
    }
    expect(new Set(definitions.map((definition) => definition.Component)).size).toBe(
      definitions.length,
    );
    for (const module of Object.values(modules)) {
      expect(
        definitions.filter((definition) => definition.Component === module.default),
      ).toHaveLength(1);
    }
  });

  it.each(definitions)(
    '$id displays the exact file it executes and is independently copyable',
    (definition) => {
      const entry = Object.entries(modules).find(
        ([, module]) => module.default === definition.Component,
      );
      expect(entry).toBeDefined();
      if (!entry) throw new Error(`Missing executable source for ${definition.id}`);
      const [file] = entry;
      expect(definition.source).toBe(sources[file]);
      const styleFile = file.replace(/\.tsx$/, '.module.scss');
      expect(definition.styleSource).toBe(styles[styleFile]);
      expect(definition.source.trim()).not.toBe('');
      expect(definition.styleSource.trim()).not.toBe('');
      expect(() => compileString(definition.styleSource)).not.toThrow();
      expect(definition.title.trim()).not.toBe('');

      const sourceFile = ts.createSourceFile(
        file,
        definition.source,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX,
      );
      const diagnostics =
        ts.transpileModule(definition.source, {
          fileName: file,
          reportDiagnostics: true,
          compilerOptions: {
            target: ts.ScriptTarget.ES2022,
            module: ts.ModuleKind.ESNext,
            jsx: ts.JsxEmit.ReactJSX,
          },
        }).diagnostics ?? [];
      expect(
        diagnostics.filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error),
      ).toEqual([]);

      const app = sourceFile.statements.find(
        (statement) =>
          ts.isFunctionDeclaration(statement) &&
          statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword),
      );
      expect(app).toBeDefined();
      if (!app || !ts.isFunctionDeclaration(app)) throw new Error(`Missing App in ${file}`);
      expect(app.parameters).toHaveLength(0);

      const expectedStyleImport = `./${file
        .split('/')
        .at(-1)
        ?.replace(/\.tsx$/, '.module.scss')}`;
      for (const statement of sourceFile.statements) {
        if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier)) {
          const dependency = statement.moduleSpecifier.text;
          expect(
            publicImports.has(dependency) || dependency === expectedStyleImport,
            `${file}: private dependency ${dependency}`,
          ).toBe(true);
        }
      }
      expect(definition.source).toContain(`'${expectedStyleImport}'`);

      // Presentation belongs to the companion SCSS file. React source keeps only
      // structure, state, component props, and semantic class names.
      const inlineStyles: string[] = [];
      const inspect = (node: ts.Node) => {
        if (ts.isJsxAttribute(node) && node.name.getText(sourceFile) === 'style') {
          inlineStyles.push(node.getText(sourceFile));
        }
        ts.forEachChild(node, inspect);
      };
      inspect(sourceFile);
      expect(inlineStyles).toEqual([]);
      expect(definition.source).not.toMatch(
        /(?:ArticleSection|ReviewSection|ComponentExampleRuntime)/,
      );
    },
  );
});

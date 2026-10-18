import path from 'node:path';

import ts from 'typescript';

const directory = process.cwd();
const filename = path.join(directory, 'tsconfig.build.json');
const host = {
  getCanonicalFileName: (file) => file,
  getCurrentDirectory: () => directory,
  getNewLine: () => '\n',
};
const fail = (diagnostics) => {
  if (!diagnostics.length) return;
  process.stderr.write(ts.formatDiagnosticsWithColorAndContext(diagnostics, host));
  process.exit(1);
};
const config = ts.readConfigFile(filename, ts.sys.readFile);
if (config.error) fail([config.error]);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, directory);
fail(parsed.errors);
const program = ts.createProgram(parsed.fileNames, parsed.options);
fail(ts.getPreEmitDiagnostics(program));

const result = program.emit(undefined, undefined, undefined, true, {
  afterDeclarations: [
    (context) => (source) => {
      const moduleSpecifier = (node) => {
        if (!ts.isStringLiteral(node) || !node.text.startsWith('.')) return node;
        const resolved = ts.resolveModuleName(node.text, source.fileName, parsed.options, ts.sys)
          .resolvedModule?.resolvedFileName;
        if (!resolved || !/\.(?:d\.)?[cm]?tsx?$/.test(resolved)) return node;
        let relative = path
          .relative(path.dirname(source.fileName), resolved)
          .replace(/\.(?:d\.)?([cm]?)tsx?$/, (_, kind) => `.${kind}js`)
          .split(path.sep)
          .join('/');
        if (!relative.startsWith('.')) relative = `./${relative}`;
        return ts.setTextRange(
          ts.setOriginalNode(ts.factory.createStringLiteral(relative), node),
          node,
        );
      };
      const visit = (node) => {
        if (ts.isImportDeclaration(node)) {
          return ts.factory.updateImportDeclaration(
            node,
            node.modifiers,
            node.importClause,
            moduleSpecifier(node.moduleSpecifier),
            node.attributes,
          );
        }
        if (ts.isExportDeclaration(node) && node.moduleSpecifier) {
          return ts.factory.updateExportDeclaration(
            node,
            node.modifiers,
            node.isTypeOnly,
            node.exportClause,
            moduleSpecifier(node.moduleSpecifier),
            node.attributes,
          );
        }
        if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) {
          const visited = ts.visitEachChild(node, visit, context);
          return ts.factory.updateImportTypeNode(
            visited,
            ts.factory.updateLiteralTypeNode(
              visited.argument,
              moduleSpecifier(visited.argument.literal),
            ),
            visited.attributes,
            visited.qualifier,
            visited.typeArguments,
            visited.isTypeOf,
          );
        }
        return ts.visitEachChild(node, visit, context);
      };
      return ts.visitNode(source, visit);
    },
  ],
});
fail(result.diagnostics);
if (result.emitSkipped) process.exit(1);

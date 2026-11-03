#!/usr/bin/env node
import { realpath } from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';

import { outro } from '@clack/prompts';

import { generateProject, listTemplates } from './generate.js';
import { resolveOptions } from './options.js';
import { defaultPort } from './port.js';
import { startProject } from './start.js';

try {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      template: { type: 'string' },
      port: { type: 'string' },
      help: { type: 'boolean', short: 'h' },
      list: { type: 'boolean' },
    },
  });
  if (values.help || values.list) {
    console.log('Usage: create-virgo [directory] [--template <template>] [--port <port>]');
    console.log(`Omit options to choose interactively. Default port: ${defaultPort}.\n`);
    console.log((await listTemplates()).map((template) => `  ${template.id}`).join('\n'));
  } else {
    if (positionals.length > 1)
      throw new Error('Specify one project directory. Use --help for usage.');
    const interactive = Boolean(process.stdin.isTTY && process.stdout.isTTY);
    const options = await resolveOptions({
      target: positionals[0],
      template: values.template,
      port: values.port,
      templates: await listTemplates(),
      interactive,
    });
    if (options && 'kind' in options) {
      const name = options.tier === 'minimal' ? 'Minimal' : 'Starter';
      outro(`${name} is a preview. No project was created.`);
    } else if (options) {
      const result = await generateProject(options);
      const message = '🎉 Project created successfully!';
      if (interactive) outro(message);
      else console.log(message);
      let showCommands = !options.autoStart;
      if (options.autoStart) {
        try {
          await startProject(result.directory);
        } catch (error) {
          console.error(error instanceof Error ? error.message : String(error));
          process.exitCode = 1;
          showCommands = true;
        }
      }
      if (showCommands) {
        const [cwd, destination] = await Promise.all([
          realpath(process.cwd()),
          realpath(result.directory),
        ]);
        const relative = path.relative(cwd, destination) || '.';
        const directory = relative.startsWith('-') ? './' + relative : relative;
        const windows = process.platform === 'win32';
        const quoted =
          /^[a-zA-Z0-9_./\\-]+$/.test(directory) && (windows || !directory.includes('\\'))
            ? directory
            : windows
              ? `"${directory}"`
              : "'" + directory.replaceAll("'", "'\\''") + "'";
        const changeDirectory =
          windows && (path.isAbsolute(directory) || /[%!$`]|\[|\]/.test(directory))
            ? "Set-Location -LiteralPath '" + directory.replaceAll("'", "''") + "'"
            : `cd ${quoted}`;
        console.log(
          `\nTo get started, run:\n\n   ${changeDirectory}\n   pnpm install\n   pnpm dev\n`,
        );
      }
    }
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}

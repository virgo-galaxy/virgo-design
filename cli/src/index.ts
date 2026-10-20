#!/usr/bin/env node
import { parseArgs } from 'node:util';

import { outro } from '@clack/prompts';

import { generateProject, listTemplates } from './generate.js';
import { resolveOptions } from './options.js';

try {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      template: { type: 'string' },
      help: { type: 'boolean', short: 'h' },
      list: { type: 'boolean' },
    },
  });
  if (values.help || values.list) {
    console.log('Usage: create-virgo [directory] [--template <template>]');
    console.log('Omit the directory or template to choose interactively.\n');
    console.log(
      (await listTemplates())
        .map((template) => `  ${template.id} (port ${template.port})`)
        .join('\n'),
    );
  } else {
    if (positionals.length > 1)
      throw new Error('Specify one project directory. Use --help for usage.');
    const interactive = Boolean(process.stdin.isTTY && process.stdout.isTTY);
    const options = await resolveOptions({
      target: positionals[0],
      template: values.template,
      templates: await listTemplates(),
      interactive,
    });
    if (!options) process.exitCode = 130;
    else {
      const result = await generateProject(options);
      const message = `Created ${result.name} at ${result.directory}`;
      if (interactive && (!positionals[0] || !values.template)) outro(message);
      else console.log(message);
      console.log('Run pnpm install, then pnpm dev in that directory.');
    }
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}

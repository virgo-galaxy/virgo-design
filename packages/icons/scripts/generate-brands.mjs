import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';

import { format } from 'prettier';

const root = fileURLToPath(new URL('..', import.meta.url));
const source = await readFile(resolve(root, 'brands/virgo-design.svg'), 'utf8');
const output = await format(
  `/* Generated from brands/virgo-design.svg. Do not edit. */
export const brandIconSvgSources = ${JSON.stringify({ 'virgo-design-color': source })} as const;`,
  { parser: 'typescript', singleQuote: true, printWidth: 100, trailingComma: 'all' },
);
const target = resolve(root, 'src/brands/assets.ts');
if (process.argv.includes('--check')) {
  if ((await readFile(target, 'utf8')) !== output)
    throw new Error('Brand assets are stale; run pnpm gen:icons.');
} else {
  await writeFile(target, output);
}

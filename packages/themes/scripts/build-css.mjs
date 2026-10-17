import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath, URL } from 'node:url';

import { compile } from 'sass';

const output = new URL('../dist/', import.meta.url);

await mkdir(output, { recursive: true });

const options = { style: 'compressed' };
const all = compile(fileURLToPath(new URL('../src/styles.scss', import.meta.url)), options).css;

await writeFile(new URL('styles.css', output), all);

for (const theme of ['virgo', 'minimal', 'soft', 'glass', 'retro', 'contrast']) {
  const source = fileURLToPath(new URL(`../src/themes/${theme}.scss`, import.meta.url));
  const css = compile(source, options).css;

  await writeFile(new URL(`${theme}.css`, output), css);
}

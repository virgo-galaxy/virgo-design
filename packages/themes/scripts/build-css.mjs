import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath, URL } from 'node:url';

import { compile, compileString } from 'sass';

const output = new URL('../dist/', import.meta.url);
await mkdir(output, { recursive: true });
const options = { style: 'compressed' };
const source = fileURLToPath(new URL('../src/', import.meta.url));
const all = compile(fileURLToPath(new URL('../src/styles.scss', import.meta.url)), options).css;
await writeFile(new URL('styles.css', output), all);
for (const theme of ['virgo', 'minimal', 'soft', 'glass', 'retro', 'contrast']) {
  // Compile the selected sources together, preserving conditional rules and order.
  const css = compileString(
    `@use 'themes/${theme}';
     @use 'compatibility/recipes';
     @include recipes.theme('${theme}');`,
    { ...options, loadPaths: [source] },
  ).css;
  await writeFile(new URL(`${theme}.css`, output), css);
}

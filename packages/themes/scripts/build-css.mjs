import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath, URL } from 'node:url';

import { compile } from 'sass';

const output = new URL('../dist/', import.meta.url);
await mkdir(output, { recursive: true });
const options = { style: 'compressed' };
const all = compile(fileURLToPath(new URL('../src/styles.scss', import.meta.url)), options).css;
await writeFile(new URL('styles.css', output), all);
for (const theme of ['virgo', 'minimal', 'soft', 'glass', 'retro', 'contrast']) {
  const css = compile(
    fileURLToPath(new URL(`../src/themes/${theme}.scss`, import.meta.url)),
    options,
  ).css;
  // Version-1 compatibility declarations are scoped, filtered to the selected theme.
  const compatibility = compile(
    fileURLToPath(new URL('../src/compatibility/styles.scss', import.meta.url)),
    options,
  ).css;
  const blocks = compatibility.match(/\[data-virgo-theme=[^\]]+\]\{[^}]*\}/g) ?? [];
  await writeFile(
    new URL(`${theme}.css`, output),
    css + blocks.filter((block) => block.startsWith(`[data-virgo-theme=${theme}]`)).join(''),
  );
}

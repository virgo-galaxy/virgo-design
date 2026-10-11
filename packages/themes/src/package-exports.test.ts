import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { promisify } from 'node:util';

import { describe, expect, it } from 'vitest';

import { themePresets } from './registry';

const execFileAsync = promisify(execFile);
describe('built theme consumption', () => {
  it('imports the public JS entry in Node without DOM or CSS loaders', async () => {
    const url = new URL(`file://${resolve('packages/themes/dist/index.js')}`).href;
    const result = await execFileAsync(process.execPath, [
      '--input-type=module',
      '-e',
      `const themes=await import(${JSON.stringify(url)}); console.log(themes.getTheme()); console.log(themes.resolveTheme({theme:'glass',appearance:'dark'}).theme);`,
    ]);
    expect(result.stdout.trim()).toBe('virgo\nglass');
  });
  it.each(themePresets)(
    '$id exports only its own CSS while styles.css retains all six',
    async ({ id }) => {
      const manifest = JSON.parse(await readFile('packages/themes/package.json', 'utf8')) as {
        exports: Record<string, string>;
      };
      expect(manifest.exports[`./${id}.css`]).toBe(`./dist/${id}.css`);
      const single = await readFile(`packages/themes/dist/${id}.css`, 'utf8');
      expect(single).toContain(`[data-virgo-theme=${id}]`);
      for (const theme of themePresets)
        if (theme.id !== id) expect(single).not.toContain(`[data-virgo-theme=${theme.id}]`);
      const all = await readFile('packages/themes/dist/styles.css', 'utf8');
      for (const theme of themePresets) expect(all).toContain(`[data-virgo-theme=${theme.id}]`);
    },
  );
});

// @vitest-environment node
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import { build } from 'vite';
import { expect, it } from 'vitest';

it.each(['PlusIcon', 'CheckIcon'])(
  'bundles %s without other icons, assets, or the full registry',
  async (name) => {
    const root = await mkdtemp(join(tmpdir(), 'virgo-icon-bundle-'));
    try {
      const entry = join(root, 'entry.ts');
      await writeFile(
        entry,
        `export { ${name} } from ${JSON.stringify(resolve('packages/icons/src/index.ts'))};`,
      );
      const result = await build({
        configFile: false,
        logLevel: 'silent',
        build: {
          write: false,
          lib: { entry, formats: ['es'], fileName: 'icon' },
          rolldownOptions: { external: ['react', 'react/jsx-runtime', 'react/jsx-dev-runtime'] },
          minify: false,
        },
      });
      const bundle = Array.isArray(result) ? result[0] : result;
      if (!bundle || !('output' in bundle)) throw new Error('Expected an ESM bundle.');
      const code = bundle.output
        .filter((item) => item.type === 'chunk')
        .map((item) => item.code)
        .join('\n');
      expect(code).toContain(name);
      expect(code).not.toMatch(
        /SettingsIcon|DownloadIcon|iconManifest|iconComponents|iconSvgSources/,
      );
      if (name === 'PlusIcon') {
        expect(code).not.toContain('AnimatedPaths');
        expect(code.length).toBeLessThan(2500);
      } else {
        expect(code).toContain('AnimatedPaths');
        expect(code).not.toMatch(/gsap|framer-motion|motion\/react/);
        expect(code.length).toBeLessThan(12000);
      }
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  },
);

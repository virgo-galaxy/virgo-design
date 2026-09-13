import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { monoFonts, sansFonts } from './src/index.js';

const packageRoot = dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(readFileSync(resolve(packageRoot, 'package.json'), 'utf8')) as {
  exports: Record<string, string | Record<string, string>>;
};

const readSource = (path: string) => readFileSync(resolve(packageRoot, path), 'utf8');
const importsOf = (path: string) =>
  Array.from(readSource(path).matchAll(/@import ['"]([^'"]+)['"];/g), (match) => match[1]);

describe('@virgo-design/fonts', () => {
  it('exports the three aggregate CSS entry points', () => {
    expect(packageJson.exports['./default.css']).toBe('./src/default.css');
    expect(packageJson.exports['./sans.css']).toBe('./src/sans/index.css');
    expect(packageJson.exports['./mono.css']).toBe('./src/mono/index.css');
  });

  it('loads only the official font set from default.css', () => {
    expect(importsOf('src/default.css')).toEqual([
      './sans/latin/inter.css',
      './sans/cjk/noto-sans-sc.css',
      './sans/cjk/noto-sans-tc.css',
      './sans/cjk/noto-sans-hk.css',
      './sans/cjk/noto-sans-jp.css',
      './sans/cjk/noto-sans-kr.css',
      './mono/latin/jetbrains-mono.css',
    ]);
  });

  it('loads every Sans asset from sans.css', () => {
    expect(importsOf('src/sans/index.css')).toEqual([
      './latin/inter.css',
      './latin/instrument-sans.css',
      './latin/figtree.css',
      './latin/ibm-plex-sans.css',
      './cjk/noto-sans-sc.css',
      './cjk/noto-sans-tc.css',
      './cjk/noto-sans-hk.css',
      './cjk/noto-sans-jp.css',
      './cjk/noto-sans-kr.css',
    ]);
  });

  it('loads every Mono asset from mono.css', () => {
    expect(importsOf('src/mono/index.css')).toEqual([
      './latin/jetbrains-mono.css',
      './latin/google-sans-code.css',
      './latin/red-hat-mono.css',
      './latin/source-code-pro.css',
      './latin/geist-mono.css',
      './latin/kode-mono.css',
    ]);
  });

  it('exports every individual font entry', () => {
    const individualExports = {
      './sans/inter.css': './src/sans/latin/inter.css',
      './sans/instrument-sans.css': './src/sans/latin/instrument-sans.css',
      './sans/figtree.css': './src/sans/latin/figtree.css',
      './sans/ibm-plex-sans.css': './src/sans/latin/ibm-plex-sans.css',
      './sans/noto-sans-sc.css': './src/sans/cjk/noto-sans-sc.css',
      './sans/noto-sans-tc.css': './src/sans/cjk/noto-sans-tc.css',
      './sans/noto-sans-hk.css': './src/sans/cjk/noto-sans-hk.css',
      './sans/noto-sans-jp.css': './src/sans/cjk/noto-sans-jp.css',
      './sans/noto-sans-kr.css': './src/sans/cjk/noto-sans-kr.css',
      './mono/jetbrains-mono.css': './src/mono/latin/jetbrains-mono.css',
      './mono/google-sans-code.css': './src/mono/latin/google-sans-code.css',
      './mono/red-hat-mono.css': './src/mono/latin/red-hat-mono.css',
      './mono/source-code-pro.css': './src/mono/latin/source-code-pro.css',
      './mono/geist-mono.css': './src/mono/latin/geist-mono.css',
      './mono/kode-mono.css': './src/mono/latin/kode-mono.css',
    };

    for (const [exportPath, sourcePath] of Object.entries(individualExports)) {
      expect(packageJson.exports[exportPath]).toBe(sourcePath);
      expect(readSource(sourcePath)).toContain('@fontsource-variable/');
    }
  });

  it('publishes asset metadata without product-selection roles', () => {
    expect(sansFonts.inter.cssFamily).toBe('"Inter Variable"');
    expect(sansFonts.notoSansJP.cssFamily).toBe('"Noto Sans JP Variable"');
    expect(monoFonts.jetbrainsMono.cssFamily).toBe('"JetBrains Mono Variable"');
    expect(monoFonts.kodeMono.cssFamily).toBe('"Kode Mono Variable"');
  });
});

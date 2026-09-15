import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { promisify } from 'node:util';

import { describe, expect, it } from 'vitest';

import { sansLocaleMapping } from '../foundations/typography.js';
import { typography } from '../semantic/typography/index.js';
import { themes } from '../themes/index.js';
import type { SemanticTypographyToken } from '../types/semantic.js';
import {
  generateFoundationsCss,
  generateSemanticTypographyCss,
  generateStylesCss,
  generateThemesCss,
} from './generate-css.js';
import { cssOutputFiles, writeCssFiles } from './write-css.js';

const execFileAsync = promisify(execFile);

function isSemanticTypographyToken(value: unknown): value is SemanticTypographyToken {
  return (
    typeof value === 'object' &&
    value !== null &&
    'fontFamily' in value &&
    'fontSize' in value &&
    'fontWeight' in value &&
    'lineHeight' in value
  );
}

function typographyRoleNames(value: unknown, path: string[] = []): string[] {
  if (isSemanticTypographyToken(value)) {
    return [path.join('-')];
  }

  if (typeof value !== 'object' || value === null) {
    return [];
  }

  return Object.entries(value).flatMap(([name, child]) =>
    typographyRoleNames(child, [...path, name]),
  );
}

describe('CSS Style Bridge', () => {
  const foundationsCss = generateFoundationsCss();
  const semanticTypographyCss = generateSemanticTypographyCss();
  const themesCss = generateThemesCss();
  const stylesCss = generateStylesCss();

  it('generates representative Foundation custom properties without an Opacity Foundation', () => {
    expect(foundationsCss).toContain('--vd-red-1:');
    expect(foundationsCss).toContain('--vd-font-family-sans:');
    expect(foundationsCss).toContain('--vd-font-size-14: 14px;');
    expect(foundationsCss).toContain('--vd-spacing-8: 8px;');
    expect(foundationsCss).toContain('--vd-sizing-36: 36px;');
    expect(foundationsCss).toContain('--vd-border-width-1: 1px;');
    expect(foundationsCss).toContain('--vd-border-style-solid: solid;');
    expect(foundationsCss).toContain('--vd-radius-8: 8px;');
    expect(foundationsCss).toContain('--vd-duration-120: 120ms;');
    expect(foundationsCss).toContain('--vd-easing-standard: cubic-bezier(0.2, 0, 0, 1);');
    expect(foundationsCss).not.toContain('--vd-elevation-level-');
  });

  it('generates locale-aware Sans selectors from the canonical locale mapping', () => {
    for (const [locale, sans] of Object.entries(sansLocaleMapping)) {
      if (sans !== 'latin') {
        expect(foundationsCss).toContain(`:root:lang(${locale})`);
      }
    }

    expect(foundationsCss).not.toMatch(/(^|,\n)\s*:lang\(/m);
    expect(foundationsCss).toContain('--vd-font-family-sans:');
  });

  it('generates every official Semantic Typography role from the formal typography API', () => {
    const roles = typographyRoleNames(typography);

    expect(roles).toHaveLength(24);

    for (const role of roles) {
      expect(semanticTypographyCss).toContain(`--vd-typography-${role}-font-family:`);
      expect(semanticTypographyCss).toContain(`--vd-typography-${role}-font-size:`);
      expect(semanticTypographyCss).toContain(`--vd-typography-${role}-font-weight:`);
      expect(semanticTypographyCss).toContain(`--vd-typography-${role}-line-height:`);
    }

    expect(semanticTypographyCss).toContain(
      '--vd-typography-ui-label-medium-font-family: var(--vd-font-family-sans);',
    );
  });

  it('generates Light and Dark semantic colors plus all theme-aware elevation shadows', () => {
    expect(themesCss).toContain(":root,\n[data-theme='light'] {");
    expect(themesCss).toContain("[data-theme='dark'] {");

    for (const theme of Object.values(themes)) {
      expect(themesCss).toContain(`--vd-text-primary: ${theme.color.text.primary};`);
      expect(themesCss).toContain(`--vd-fill-hover: ${theme.color.fill.hover};`);

      for (const [level, shadow] of Object.entries(theme.elevation)) {
        expect(themesCss).toContain(`--vd-elevation-${level}: ${shadow};`);
      }
    }
  });

  it('uses the --vd- prefix for every generated custom property', () => {
    const declarations = [
      ...foundationsCss.matchAll(/^\s*(--[^:]+):/gm),
      ...semanticTypographyCss.matchAll(/^\s*(--[^:]+):/gm),
      ...themesCss.matchAll(/^\s*(--[^:]+):/gm),
    ].map((match) => match[1]);

    expect(declarations.length).toBeGreaterThan(0);
    expect(declarations.every((name) => name?.startsWith('--vd-'))).toBe(true);
    expect([foundationsCss, semanticTypographyCss, themesCss].join('\n')).not.toContain(
      '--vd-opacity-',
    );
  });

  it('combines every generated output through the styles.css entrypoint', () => {
    expect(stylesCss).toContain("@import './foundations.css';");
    expect(stylesCss).toContain("@import './semantic-typography.css';");
    expect(stylesCss).toContain("@import './themes.css';");
  });

  it('writes the CSS outputs and exposes the matching package export paths', async () => {
    const outputDirectory = await mkdtemp(join(tmpdir(), 'virgo-tokens-css-'));

    try {
      await writeFile(join(outputDirectory, 'legacy.css'), '/* stale */', 'utf8');
      await writeFile(join(outputDirectory, 'preserved.js'), 'export {};', 'utf8');
      await writeFile(join(outputDirectory, 'preserved.d.ts'), 'export {};', 'utf8');
      await writeFile(join(outputDirectory, 'preserved.css.map'), '{}', 'utf8');

      await writeCssFiles(outputDirectory);

      await expect(readFile(join(outputDirectory, 'legacy.css'), 'utf8')).rejects.toThrow();
      expect(await readFile(join(outputDirectory, 'preserved.js'), 'utf8')).toBe('export {};');
      expect(await readFile(join(outputDirectory, 'preserved.d.ts'), 'utf8')).toBe('export {};');
      expect(await readFile(join(outputDirectory, 'preserved.css.map'), 'utf8')).toBe('{}');

      for (const [fileName, generate] of Object.entries(cssOutputFiles)) {
        expect(await readFile(join(outputDirectory, fileName), 'utf8')).toBe(generate());
      }

      expect(await readFile(join(outputDirectory, 'styles.css'), 'utf8')).toBe(stylesCss);

      const packageJson = JSON.parse(
        await readFile(join(process.cwd(), 'packages/tokens/package.json'), 'utf8'),
      ) as { exports: Record<string, string> };

      for (const fileName of Object.keys(cssOutputFiles)) {
        expect(packageJson.exports[`./${fileName}`]).toBe(`./dist/css/${fileName}`);
      }
    } finally {
      await rm(outputDirectory, { force: true, recursive: true });
    }
  });

  it('cleans stale distribution artifacts before a build writes current output', async () => {
    const temporaryDirectory = await mkdtemp(join(tmpdir(), 'virgo-tokens-build-'));
    const outputDirectory = join(temporaryDirectory, 'dist');

    try {
      await mkdir(outputDirectory);
      await Promise.all([
        writeFile(join(outputDirectory, 'legacy.js'), 'export {};', 'utf8'),
        writeFile(join(outputDirectory, 'legacy.d.ts'), 'export {};', 'utf8'),
        writeFile(join(outputDirectory, 'legacy.js.map'), '{}', 'utf8'),
        writeFile(join(outputDirectory, 'legacy.d.ts.map'), '{}', 'utf8'),
      ]);

      await execFileAsync(process.execPath, [
        resolve(process.cwd(), 'packages/tokens/scripts/clean.mjs'),
        outputDirectory,
      ]);

      await expect(readFile(join(outputDirectory, 'legacy.js'), 'utf8')).rejects.toThrow();
      await expect(readFile(join(outputDirectory, 'legacy.d.ts'), 'utf8')).rejects.toThrow();
      await expect(readFile(join(outputDirectory, 'legacy.js.map'), 'utf8')).rejects.toThrow();
      await expect(readFile(join(outputDirectory, 'legacy.d.ts.map'), 'utf8')).rejects.toThrow();

      await writeCssFiles(outputDirectory);
      for (const fileName of Object.keys(cssOutputFiles)) {
        expect(await readFile(join(outputDirectory, fileName), 'utf8')).toBeTruthy();
      }
    } finally {
      await rm(temporaryDirectory, { force: true, recursive: true });
    }
  });
});

import { resolve } from 'node:path';

import { compileString, NodePackageImporter } from 'sass';
import { describe, expect, expectTypeOf, it } from 'vitest';

import { tokenCatalog, tokenValues, type TokenVariable, tokenVars } from './catalog.js';
import { generateCompatibilityScss, generateScss } from './css/generate-scss.js';
import { generateTailwindCss, tailwindTheme } from './tailwind.js';
import { deprecatedThemeRoles } from './theme-contract.js';
import { getDefaultThemeTokens, validateThemeContract } from './validation.js';
import { vanillaExtractContract } from './vanilla-extract.js';

it('has unique classified canonical names and separates compatibility roles', () => {
  expect(new Set(tokenCatalog.map(({ name }) => name)).size).toBe(tokenCatalog.length);
  expect(
    tokenCatalog.every(({ layer }) => ['foundation', 'semantic', 'component'].includes(layer)),
  ).toBe(true);
  expect(tokenCatalog.some(({ name }) => Object.hasOwn(deprecatedThemeRoles, name))).toBe(false);
  expectTypeOf<keyof typeof tokenVars>().toEqualTypeOf<TokenVariable>();
  expectTypeOf<(typeof tokenVars)['--vd-text-primary']>().toEqualTypeOf<'var(--vd-text-primary)'>();
});
it('generates SCSS, TypeScript, Tailwind and vanilla-extract references to the same CSS properties', () => {
  const scss = generateScss();
  const css = compileString(
    `${scss}\n.probe { color: token('--vd-text-primary'); border-radius: token('--vd-shape-radius-8'); }`,
  ).css;
  expect(css).toContain('color: var(--vd-text-primary)');
  expect(css).toContain('border-radius: var(--vd-shape-radius-8)');
  expect(() => compileString(`${scss}\n.probe { color: token('--vd-typo'); }`)).toThrow(
    'Unknown Virgo token',
  );
  expect(tailwindTheme.colors['text-primary']).toBe(tokenVars['--vd-text-primary']);
  expect(generateTailwindCss()).toContain('@theme inline');
  expect(vanillaExtractContract).toBe(tokenVars);
  expect(tokenValues.light['--vd-control-medium-height']).toBe('36px');
});
describe('theme declaration validation', () => {
  it('accepts explicit defaults and additive optional roles without increasing the major', () => {
    const tokens = getDefaultThemeTokens();
    expect(validateThemeContract({ contractVersion: 1, tokens }).valid).toBe(true);
    expect(validateThemeContract({ contractVersion: 2, tokens }).valid).toBe(false);
  });
  it('reports required omissions, typos, invalid values and compatibility usage independently', () => {
    const tokens = getDefaultThemeTokens();
    const { '--vd-data-sequential-10': omitted, ...light } = tokens.light;
    expect(omitted).toBeDefined();
    const result = validateThemeContract({
      contractVersion: 1,
      tokens: {
        light: {
          ...light,
          '--vd-unknown': '#fff',
          '--vd-text-primary': 'initial',
          '--vd-chrome-background': '#fff',
        },
        dark: tokens.dark,
      },
    });
    expect(result.valid).toBe(false);
    expect(result.missingRequiredRoles.light).toEqual(['--vd-data-sequential-10']);
    expect(result.unknownRoles.light).toEqual(['--vd-unknown']);
    expect(result.invalidValues.light).toEqual(['--vd-text-primary']);
    expect(result.deprecatedRoles.light).toEqual(['--vd-chrome-background']);
    expect(result.missingRequiredRoles.dark).toEqual([]);
  });
});

it('generates both writer names from one alias value and keeps old-writer fallback readable', () => {
  const css = compileString(
    `${generateCompatibilityScss()}\n.theme { @include role('--vd-motion-interaction-duration', 32ms); }`,
  ).css;
  expect(css).toContain('--vd-motion-interaction-duration: 32ms');
  expect(css).toContain('--vd-motion-duration-120: 32ms');
  expect(tokenValues.light['--vd-motion-interaction-duration']).toBe(
    'var(--vd-motion-duration-120, 120ms)',
  );
});

it('rejects cycles in declaration aliases instead of allowing a silent invalid color', () => {
  const tokens = getDefaultThemeTokens();
  const result = validateThemeContract({
    contractVersion: 1,
    tokens: {
      light: {
        ...tokens.light,
        '--vd-text-primary': 'var(--vd-text-secondary)',
        '--vd-text-secondary': 'var(--vd-text-primary)',
      },
      dark: tokens.dark,
    },
  });
  expect(result.valid).toBe(false);
  expect(result.invalidValues.light).toEqual(
    expect.arrayContaining(['--vd-text-primary', '--vd-text-secondary']),
  );
});

it('consumes the built SCSS export through the actual package importer', () => {
  const css = compileString(
    "@use 'pkg:@virgo-design/tokens/scss' as vd; .probe { color: vd.token('--vd-text-primary'); }",
    { importers: [new NodePackageImporter(resolve('apps/website'))] },
  ).css;
  expect(css).toContain('color: var(--vd-text-primary)');
});

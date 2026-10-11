import { COLOR_FAMILIES } from '@virgo-design/colors';

import {
  borderStyle,
  borderWidth,
  duration,
  easing,
  fontFamily,
  fontSize,
  fontWeight,
  internationalSans,
  lineHeight,
  radius,
  sansLocaleMapping,
  sizing,
  spacing,
  VIRGO_BRAND_SCALE,
  VIRGO_CHROMATIC_SCALES,
  VIRGO_NEUTRAL_SCALE,
} from '../foundations/index.js';
import { typography } from '../semantic/typography/index.js';
import { themeContract } from '../theme-contract.js';
import { themes } from '../themes/index.js';
import type { SemanticTypographyToken } from '../types/semantic.js';

type CssValue = number | string;

interface CssDeclaration {
  name: string;
  value: CssValue;
}

interface TypographyRole {
  name: string;
  token: SemanticTypographyToken;
}

function declarationsFromScale(prefix: string, scale: Readonly<Record<number, CssValue>>) {
  return Object.entries(scale).map(([step, value]) => ({
    name: `--vd-${prefix}-${step}`,
    value,
  }));
}

function declarationsFromTokens(prefix: string, tokens: Readonly<Record<string, CssValue>>) {
  return Object.entries(tokens).map(([name, value]) => ({
    name: `--vd-${prefix}-${name}`,
    value,
  }));
}

function renderDeclarations(declarations: readonly CssDeclaration[], indent = '  ') {
  return declarations.map(({ name, value }) => `${indent}${name}: ${value};`).join('\n');
}

function renderLocaleAwareSansCss() {
  const localesBySans = new Map<string, string[]>();

  for (const [locale, sans] of Object.entries(sansLocaleMapping)) {
    if (sans === 'latin') {
      continue;
    }

    const locales = localesBySans.get(sans) ?? [];
    locales.push(locale);
    localesBySans.set(sans, locales);
  }

  return [...localesBySans.entries()]
    .map(([sans, locales]) => {
      const family = internationalSans[sans as keyof typeof internationalSans].family;

      return [
        locales.map((locale) => `:root:lang(${locale})`).join(',\n'),
        '{',
        `  --vd-font-family-sans: ${family};`,
        '}',
      ].join('\n');
    })
    .join('\n\n');
}

export function generateFoundationsCss() {
  const declarations = [
    ...COLOR_FAMILIES.flatMap((family) =>
      declarationsFromScale(family, VIRGO_CHROMATIC_SCALES[family]),
    ),
    ...declarationsFromScale('brand', VIRGO_BRAND_SCALE),
    ...declarationsFromScale('neutral', VIRGO_NEUTRAL_SCALE),
    ...declarationsFromTokens('font-family', fontFamily),
    ...declarationsFromTokens('font-size', fontSize),
    ...declarationsFromTokens('font-weight', fontWeight),
    ...declarationsFromTokens('line-height', lineHeight),
    ...declarationsFromTokens('spacing', spacing),
    ...declarationsFromTokens('sizing', sizing),
    ...declarationsFromTokens('border-width', borderWidth),
    ...declarationsFromTokens('border-style', borderStyle),
    ...declarationsFromTokens('radius', radius),
    ...declarationsFromTokens('duration', duration),
    ...declarationsFromTokens('easing', easing),
  ];

  return [
    '/* Generated from @virgo-design/tokens Foundation data. Do not edit. */',
    ':root {',
    renderDeclarations(declarations),
    '}',
    '',
    renderLocaleAwareSansCss(),
    '',
  ].join('\n');
}

function isSemanticTypographyToken(value: unknown): value is SemanticTypographyToken {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  return (
    'fontFamily' in value && 'fontSize' in value && 'fontWeight' in value && 'lineHeight' in value
  );
}

function collectTypographyRoles(value: unknown, path: string[] = []): TypographyRole[] {
  if (isSemanticTypographyToken(value)) {
    return [{ name: path.join('-'), token: value }];
  }

  if (typeof value !== 'object' || value === null) {
    return [];
  }

  return Object.entries(value).flatMap(([name, child]) =>
    collectTypographyRoles(child, [...path, name]),
  );
}

export function generateSemanticTypographyCss() {
  const declarations = collectTypographyRoles(typography).flatMap(({ name, token }) => [
    {
      name: `--vd-typography-${name}-font-family`,
      value: `var(--vd-font-family-${token.fontFamily})`,
    },
    {
      name: `--vd-typography-${name}-font-size`,
      value: `var(--vd-font-size-${token.fontSize})`,
    },
    {
      name: `--vd-typography-${name}-font-weight`,
      value: `var(--vd-font-weight-${token.fontWeight})`,
    },
    {
      name: `--vd-typography-${name}-line-height`,
      value: `var(--vd-line-height-${token.lineHeight})`,
    },
  ]);

  return [
    '/* Generated from @virgo-design/tokens Semantic Typography data. Do not edit. */',
    ':root {',
    renderDeclarations(declarations),
    '}',
    '',
  ].join('\n');
}

function collectThemeColorDeclarations(value: unknown, path: string[] = []): CssDeclaration[] {
  if (typeof value === 'string') {
    return [
      {
        name: `--vd-${path.join('-').replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`,
        value,
      },
    ];
  }

  if (typeof value !== 'object' || value === null) {
    return [];
  }

  return Object.entries(value).flatMap(([name, child]) =>
    collectThemeColorDeclarations(child, [...path, name]),
  );
}

function themeDeclarations(theme: (typeof themes)[keyof typeof themes]) {
  return [
    ...collectThemeColorDeclarations(theme.color),
    ...Object.entries(theme.elevation).map(([level, value]) => ({
      name: `--vd-elevation-${level}`,
      value,
    })),
  ];
}

export function generateThemesCss() {
  const bridge = (appearance: keyof typeof themes) =>
    themeDeclarations(themes[appearance]).map(({ name, value }) => ({
      name,
      value: `var(--vd-theme-${appearance}-${name.slice(5)}, ${value})`,
    }));
  const reset = [
    ...Object.entries(themeContract).map(([name, value]) => ({ name, value })),
    ...(['light', 'dark'] as const).flatMap((appearance) =>
      themeDeclarations(themes[appearance]).map(({ name }) => ({
        name: `--vd-theme-${appearance}-${name.slice(5)}`,
        value: 'initial',
      })),
    ),
  ];
  return [
    '/* Generated from @virgo-design/tokens Light and Dark Theme data. Do not edit. */',
    ':root, [data-virgo-theme] {',
    renderDeclarations(reset),
    '}',
    '',
    ':root,',
    "[data-theme='light'] {",
    renderDeclarations(bridge('light')),
    '}',
    '',
    "[data-theme='dark'] {",
    renderDeclarations(bridge('dark')),
    '}',
    '',
  ].join('\n');
}

export function generateStylesCss() {
  return [
    '/* Generated @virgo-design/tokens CSS entrypoint. Do not edit. */',
    "@import './foundations.css';",
    "@import './semantic-typography.css';",
    "@import './themes.css';",
    '',
  ].join('\n');
}

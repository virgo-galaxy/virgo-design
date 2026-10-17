import { internationalSans, sansLocaleMapping } from '../foundations/index.js';
import {
  foundationDeclarations,
  semanticDeclarations,
  type TokenDeclaration as CssDeclaration,
  typographyDeclarations,
} from '../source.js';
import { themeContract } from '../theme-contract.js';
import { themes } from '../themes/index.js';

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
  const declarations = foundationDeclarations();

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

export function generateSemanticTypographyCss() {
  const declarations = typographyDeclarations();

  return [
    '/* Generated from @virgo-design/tokens Semantic Typography data. Do not edit. */',
    ':root, [data-virgo-theme] {',
    renderDeclarations(declarations),
    '}',
    '',
  ].join('\n');
}

export function generateThemesCss() {
  const bridge = (appearance: keyof typeof themes) =>
    semanticDeclarations(appearance).map(({ name, value }) => ({
      name,
      value: `var(--vd-theme-${appearance}-${name.slice(5)}, ${value})`,
    }));
  const reset = [
    ...Object.entries(themeContract).map(([name, value]) => ({ name, value })),
    ...(['light', 'dark'] as const).flatMap((appearance) =>
      semanticDeclarations(appearance).map(({ name }) => ({
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

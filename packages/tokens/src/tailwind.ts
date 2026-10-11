import { tokenCatalog, tokenVars } from './catalog.js';
import { radius, spacing } from './foundations/index.js';

const semanticColors = Object.fromEntries(
  tokenCatalog
    .filter(
      ({ name, required }) =>
        required &&
        /^--vd-(text|surface|border|icon|brand|status|fill|data)-/.test(name) &&
        !/^--vd-(brand|border)-(\d|width|style)/.test(name),
    )
    .map(({ name }) => [name.slice(5), tokenVars[name]]),
);
/** Tailwind 3 theme.extend mapping. Color opacity syntax remains consumer-owned. */
export const tailwindTheme = Object.freeze({
  colors: semanticColors,
  spacing: Object.fromEntries(
    Object.keys(spacing).map((step) => [step, `var(--vd-spacing-${step})`]),
  ),
  borderRadius: Object.fromEntries(
    Object.keys(radius).map((step) => [step, `var(--vd-shape-radius-${step})`]),
  ),
  fontFamily: { sans: 'var(--vd-font-family-sans)', mono: 'var(--vd-font-family-mono)' },
});
export function generateTailwindCss(): string {
  const declarations = [
    ...Object.entries(tailwindTheme.colors).map(([name, value]) => `  --color-${name}: ${value};`),
    ...Object.entries(tailwindTheme.spacing).map(
      ([name, value]) => `  --spacing-${name}: ${value};`,
    ),
    ...Object.entries(tailwindTheme.borderRadius).map(
      ([name, value]) => `  --radius-${name}: ${value};`,
    ),
    ...Object.entries(tailwindTheme.fontFamily).map(
      ([name, value]) => `  --font-${name}: ${value};`,
    ),
  ];
  return `/* Generated Tailwind 4 mapping; load after tailwindcss. */\n@theme inline {\n${declarations.join('\n')}\n}\n`;
}

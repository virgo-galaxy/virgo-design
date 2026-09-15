import { type ColorSemanticTheme, themes } from '@virgo-design/tokens';

type ColorValueTree = string | { readonly [key: string]: ColorValueTree };

function toKebabCase(value: string) {
  return value.replace(/[A-Z]/g, (character) => `-${character.toLowerCase()}`);
}

function flattenColorTheme(value: ColorValueTree, path: string[] = []): Array<[string, string]> {
  if (typeof value === 'string') {
    return [[path.map(toKebabCase).join('-'), value]];
  }

  return Object.entries(value).flatMap(([key, child]) => flattenColorTheme(child, [...path, key]));
}

function themeBlock(selector: string, color: ColorSemanticTheme) {
  const lines = flattenColorTheme(color as unknown as ColorValueTree).map(
    ([name, value]) => `  --vd-${name}: ${value};`,
  );

  return `${selector} {\n${lines.join('\n')}\n}`;
}

export function generateSemanticColorCss(
  light: ColorSemanticTheme = themes.light.color,
  dark: ColorSemanticTheme = themes.dark.color,
) {
  return [
    '/* Virgo Design Color Semantic Tokens */',
    themeBlock(":root,\n[data-theme='light']", light),
    themeBlock("[data-theme='dark']", dark),
  ].join('\n\n');
}

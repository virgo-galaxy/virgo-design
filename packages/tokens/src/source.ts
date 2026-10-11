import {
  borderStyle,
  borderWidth,
  duration,
  easing,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  radius,
  sizing,
  spacing,
  VIRGO_BRAND_SCALE,
  VIRGO_CHROMATIC_SCALES,
  VIRGO_NEUTRAL_SCALE,
} from './foundations/index.js';
import { typography } from './semantic/typography/index.js';
import { themes } from './themes/index.js';
import type { SemanticTypographyToken } from './types/semantic.js';

/** Source references, not copied values. All consumer adapters use this registry. */
export const foundationGroups = {
  ...VIRGO_CHROMATIC_SCALES,
  brand: VIRGO_BRAND_SCALE,
  neutral: VIRGO_NEUTRAL_SCALE,
  'font-family': fontFamily,
  'font-size': fontSize,
  'font-weight': fontWeight,
  'line-height': lineHeight,
  'letter-spacing': letterSpacing,
  spacing,
  sizing,
  'border-width': borderWidth,
  'border-style': borderStyle,
  radius,
  duration,
  easing,
} as const;

export interface TokenDeclaration {
  name: string;
  value: string | number;
}

export function foundationDeclarations(): TokenDeclaration[] {
  return Object.entries(foundationGroups).flatMap(([group, values]) =>
    Object.entries(values).map(([step, value]) => ({ name: `--vd-${group}-${step}`, value })),
  );
}

export function kebabCase(name: string): string {
  return name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

export function flattenTokenValues(value: unknown, path: string[] = []): TokenDeclaration[] {
  if (typeof value === 'string' || typeof value === 'number')
    return [{ name: `--vd-${path.map(kebabCase).join('-')}`, value }];
  if (!value || typeof value !== 'object') return [];
  return Object.entries(value).flatMap(([name, child]) =>
    flattenTokenValues(child, [...path, name]),
  );
}

export function semanticDeclarations(appearance: 'light' | 'dark'): TokenDeclaration[] {
  return [
    ...flattenTokenValues(themes[appearance].color),
    ...flattenTokenValues(themes[appearance].elevation, ['elevation']),
  ];
}

function typographyRoles(
  value: unknown,
  path: string[] = [],
): { name: string; token: SemanticTypographyToken }[] {
  if (!value || typeof value !== 'object') return [];
  if (
    'fontFamily' in value &&
    'fontSize' in value &&
    'fontWeight' in value &&
    'lineHeight' in value
  )
    return [{ name: path.join('-'), token: value as SemanticTypographyToken }];
  return Object.entries(value).flatMap(([name, child]) => typographyRoles(child, [...path, name]));
}

export function typographyDeclarations(): TokenDeclaration[] {
  return typographyRoles(typography).flatMap(({ name, token }) => [
    {
      name: `--vd-typography-${name}-font-family`,
      value: `var(--vd-font-family-${token.fontFamily})`,
    },
    { name: `--vd-typography-${name}-font-size`, value: `var(--vd-font-size-${token.fontSize})` },
    {
      name: `--vd-typography-${name}-font-weight`,
      value: `var(--vd-font-weight-${token.fontWeight})`,
    },
    {
      name: `--vd-typography-${name}-line-height`,
      value: `var(--vd-line-height-${token.lineHeight})`,
    },
    {
      name: `--vd-typography-${name}-letter-spacing`,
      // Leave the role unset so the consumer's `var(..., inherit)` preserves
      // ordinary tracking inheritance without inheriting another theme's override.
      value: token.letterSpacing ? `var(--vd-letter-spacing-${token.letterSpacing})` : 'initial',
    },
  ]);
}

type Kebab<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${First extends Lowercase<First> ? First : `-${Lowercase<First>}`}${Kebab<Rest>}`
  : S;
export type FlattenNames<T, Prefix extends string = ''> = {
  [Key in keyof T & (string | number)]: T[Key] extends string | number
    ? `${Prefix}${Kebab<`${Key}`>}`
    : FlattenNames<T[Key], `${Prefix}${Kebab<`${Key}`>}-`>;
}[keyof T & (string | number)];

export type FoundationVariable = `--vd-${FlattenNames<typeof foundationGroups>}`;
export type SemanticColorVariable =
  | `--vd-${FlattenNames<typeof themes.light.color>}`
  | `--vd-elevation-${keyof typeof themes.light.elevation}`;
type TypographyNames<T, Prefix extends string = ''> = {
  [Key in keyof T & (string | number)]: T[Key] extends SemanticTypographyToken
    ? `${Prefix}${Key}`
    : TypographyNames<T[Key], `${Prefix}${Key}-`>;
}[keyof T & (string | number)];
export type TypographyVariable =
  `--vd-typography-${TypographyNames<typeof typography>}-${'font-family' | 'font-size' | 'font-weight' | 'line-height' | 'letter-spacing'}`;

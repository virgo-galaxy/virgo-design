import { THEME_CONTRACT_VERSION } from '@virgo-design/tokens';

export interface ThemePreset {
  readonly id: string;
  readonly name: string;
  readonly descriptionKey: string;
  readonly contractVersion: typeof THEME_CONTRACT_VERSION;
  readonly appearances: readonly ['light', 'dark'];
}

const preset = <Id extends string, Description extends string>(
  id: Id,
  name: string,
  descriptionKey: Description,
) =>
  Object.freeze({
    id,
    name,
    descriptionKey,
    contractVersion: THEME_CONTRACT_VERSION,
    appearances: Object.freeze(['light', 'dark'] as const),
  });

export const themePresets = Object.freeze([
  preset('virgo', 'Virgo', 'virgo'),
  preset('minimal', 'Minimal', 'minimal'),
  preset('soft', 'Soft', 'soft'),
  preset('glass', 'Glass', 'glass'),
  preset('retro', 'Retro', 'retro'),
  preset('contrast', 'Contrast', 'contrast'),
] as const);

export type ThemeId = (typeof themePresets)[number]['id'];
export const defaultTheme: ThemeId = 'virgo';
export const themeRegistry = Object.freeze(
  Object.fromEntries(themePresets.map((theme) => [theme.id, theme])),
) as Readonly<Record<ThemeId, ThemePreset>>;

const extensions = new Map<string, ThemePreset>();
const legacyThemeIds = Object.freeze({
  utility: 'retro',
  'high-contrast': 'contrast',
  bold: 'contrast',
} satisfies Record<string, ThemeId>);

export function getThemePreset(id: string): ThemePreset | undefined {
  return Object.hasOwn(themeRegistry, id) ? themeRegistry[id as ThemeId] : extensions.get(id);
}

/** Upgrade saved IDs; new selections must use the current registry IDs. */
export function resolveThemeId(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const id = Object.hasOwn(legacyThemeIds, value)
    ? legacyThemeIds[value as keyof typeof legacyThemeIds]
    : value;
  return getThemePreset(id) ? id : undefined;
}

/** Register third-party CSS before initializing the runtime; official and legacy IDs are reserved. */
export function registerTheme(theme: ThemePreset): void {
  if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(theme.id)) {
    throw new TypeError('Theme IDs must be lowercase kebab-case.');
  }
  if (getThemePreset(theme.id)) throw new Error(`Theme already registered: ${theme.id}`);
  if (Object.hasOwn(legacyThemeIds, theme.id)) {
    throw new Error(`Legacy theme ID is reserved: ${theme.id}`);
  }
  if (
    theme.contractVersion !== THEME_CONTRACT_VERSION ||
    !theme.appearances.includes('light') ||
    !theme.appearances.includes('dark')
  ) {
    throw new TypeError('Themes must implement the current contract in light and dark.');
  }
  extensions.set(
    theme.id,
    Object.freeze({ ...theme, appearances: Object.freeze(['light', 'dark'] as const) }),
  );
}

import {
  THEME_CONTRACT_VERSION,
  type ThemeTokens,
  validateThemeContract,
} from '@virgo-design/tokens';

import { legacyThemeIds } from './migration';

export interface ThemePreset {
  readonly id: string;
  readonly name: string;
  readonly contractVersion: number;
  readonly appearances: readonly ['light', 'dark'];
}
const preset = <Id extends string>(id: Id, name: string) =>
  Object.freeze({
    id,
    name,
    contractVersion: THEME_CONTRACT_VERSION,
    appearances: Object.freeze(['light', 'dark'] as const),
  });
export const themePresets = Object.freeze([
  preset('virgo', 'Virgo'),
  preset('minimal', 'Minimal'),
  preset('soft', 'Soft'),
  preset('glass', 'Glass'),
  preset('retro', 'Retro'),
  preset('contrast', 'Contrast'),
] as const);
export type ThemeId = (typeof themePresets)[number]['id'];
export const defaultTheme: ThemeId = 'virgo';
export const themeRegistry = Object.freeze(
  Object.fromEntries(themePresets.map((theme) => [theme.id, theme])),
) as Readonly<Record<ThemeId, ThemePreset>>;

export interface ThemeRegistry {
  getThemePreset(id: string): ThemePreset | undefined;
  resolveThemeId(value: unknown): string | undefined;
  listThemes(): readonly ThemePreset[];
  registerTheme(theme: ThemePreset, tokens: ThemeTokens): void;
  getThemeTokens(id: string): ThemeTokens | undefined;
}
/** One registry per SSR request, or one explicitly shared registry per browser. */
export function createThemeRegistry(): ThemeRegistry {
  const extensions = new Map<string, { preset: ThemePreset; tokens: ThemeTokens }>();
  const getThemePreset = (id: string) =>
    Object.hasOwn(themeRegistry, id) ? themeRegistry[id as ThemeId] : extensions.get(id)?.preset;
  return Object.freeze({
    getThemePreset,
    resolveThemeId(value: unknown) {
      if (typeof value !== 'string') return undefined;
      const id = Object.hasOwn(legacyThemeIds, value)
        ? legacyThemeIds[value as keyof typeof legacyThemeIds]
        : value;
      return getThemePreset(id) ? id : undefined;
    },
    listThemes: () =>
      Object.freeze([...themePresets, ...[...extensions.values()].map(({ preset }) => preset)]),
    getThemeTokens: (id: string) => extensions.get(id)?.tokens,
    registerTheme(theme: ThemePreset, tokens: ThemeTokens) {
      if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(theme.id))
        throw new TypeError('Theme IDs must be lowercase kebab-case.');
      if (getThemePreset(theme.id)) throw new Error(`Theme already registered: ${theme.id}`);
      if (Object.hasOwn(legacyThemeIds, theme.id))
        throw new Error(`Legacy theme ID is reserved: ${theme.id}`);
      if (
        !theme.name.trim() ||
        !theme.appearances.includes('light') ||
        !theme.appearances.includes('dark')
      )
        throw new TypeError('Themes need a name and light/dark appearances.');
      const validation = validateThemeContract({
        contractVersion: theme.contractVersion,
        tokens,
      });
      if (!validation.valid)
        throw new TypeError(
          `Invalid theme contract for ${theme.id}: ${JSON.stringify(validation)}`,
        );
      const immutableTokens = Object.freeze({
        light: Object.freeze({ ...tokens.light }),
        dark: Object.freeze({ ...tokens.dark }),
      });
      extensions.set(theme.id, {
        preset: Object.freeze({
          id: theme.id,
          name: theme.name,
          contractVersion: theme.contractVersion,
          appearances: Object.freeze(['light', 'dark'] as const),
        }),
        tokens: immutableTokens,
      });
    },
  });
}
// Browser-only convenience. Server calls never create a shared mutable registry.
const browserRegistries = new WeakMap<Window, ThemeRegistry>();
export function getBrowserThemeRegistry(browser: Window): ThemeRegistry {
  let registry = browserRegistries.get(browser);
  if (!registry) {
    registry = createThemeRegistry();
    browserRegistries.set(browser, registry);
  }
  return registry;
}
const currentRegistry = () =>
  typeof window === 'undefined' ? createThemeRegistry() : getBrowserThemeRegistry(window);
export const getThemePreset = (id: string) => currentRegistry().getThemePreset(id);
export const resolveThemeId = (value: unknown) => currentRegistry().resolveThemeId(value);
/** Includes third-party metadata. Existing official selectors intentionally use themePresets. */
export const listThemes = () => currentRegistry().listThemes();
export function registerTheme(theme: ThemePreset, tokens: ThemeTokens): void {
  if (typeof window === 'undefined')
    throw new Error('SSR must register themes on a request-owned createThemeRegistry().');
  currentRegistry().registerTheme(theme, tokens);
}

import { createThemeRegistry, defaultTheme, type ThemeRegistry } from './registry';

export type Appearance = 'light' | 'dark';
export type AppearancePreference = Appearance | 'auto' | 'system';
export interface ResolvedTheme {
  readonly theme: string;
  readonly appearance: Appearance;
}
export interface ThemeResolutionInput {
  theme?: unknown;
  appearance?: unknown;
  defaultTheme?: string;
  defaultAppearance?: AppearancePreference;
  systemAppearance?: Appearance;
}
/** Pure server/client resolution. The caller owns cookies, storage and OS detection. */
export function resolveTheme(
  input: ThemeResolutionInput = {},
  registry: ThemeRegistry = createThemeRegistry(),
): ResolvedTheme {
  const fallback = input.defaultTheme ?? defaultTheme;
  if (!registry.getThemePreset(fallback)) throw new RangeError(`Unknown theme: ${fallback}`);
  const preference = ['light', 'dark', 'auto', 'system'].includes(String(input.appearance))
    ? input.appearance
    : (input.defaultAppearance ?? 'light');
  const appearance =
    preference === 'auto' || preference === 'system'
      ? (input.systemAppearance ?? 'light')
      : preference === 'dark'
        ? 'dark'
        : 'light';
  return Object.freeze({ theme: registry.resolveThemeId(input.theme) ?? fallback, appearance });
}
export function getThemeAttributes(
  state: ResolvedTheme,
  registry: ThemeRegistry = createThemeRegistry(),
) {
  const resolved = resolveTheme(state, registry);
  return { 'data-virgo-theme': resolved.theme, 'data-theme': resolved.appearance } as const;
}

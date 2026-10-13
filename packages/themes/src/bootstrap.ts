import { legacyThemeIds } from './migration.ts';
import { defaultTheme, themePresets, type ThemeRegistry } from './registry.ts';
import type { AppearancePreference } from './resolution.ts';
import { themeStorageKey } from './runtime.ts';

export interface InitialThemeScriptOptions {
  defaultTheme?: string;
  defaultAppearance?: AppearancePreference;
  /** Defaults to the standalone theme storage key; fields describe a versioned JSON record. */
  storage?: {
    key: string;
    themeField?: string;
    appearanceField?: string;
    version?: number;
    legacyThemeKey?: string;
  };
  appearanceStorageKey?: string;
  /** Preserve server-resolved attributes when cookies are authoritative. */
  respectServerAttributes?: boolean;
  appearanceQuery?: { pathPrefix: string; parameter: string };
  registry?: ThemeRegistry;
}
interface BootstrapConfiguration {
  defaultTheme: string;
  defaultAppearance: AppearancePreference;
  storage: NonNullable<InitialThemeScriptOptions['storage']>;
  appearanceStorageKey?: string;
  respectServerAttributes: boolean;
  appearanceQuery?: InitialThemeScriptOptions['appearanceQuery'];
  ids: string[];
  migrations: typeof legacyThemeIds;
}
// This function is serialized. Keep it synchronous and free of module bindings.
function bootstrap(config: BootstrapConfiguration) {
  const root = document.documentElement;
  let theme: unknown, appearance: unknown;
  const read = (key: string) => {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  };
  const raw = read(config.storage.key);
  if (config.storage.themeField || config.storage.appearanceField) {
    try {
      const record = raw ? JSON.parse(raw) : null;
      if (
        record &&
        typeof record === 'object' &&
        (config.storage.version === undefined || record.version === config.storage.version)
      ) {
        theme = config.storage.themeField ? record[config.storage.themeField] : undefined;
        appearance = config.storage.appearanceField
          ? record[config.storage.appearanceField]
          : undefined;
      }
    } catch {
      /* Use defaults for malformed JSON. */
    }
  } else theme = raw;
  const canonical = (value: unknown) =>
    typeof value === 'string'
      ? Object.hasOwn(config.migrations, value)
        ? config.migrations[value as keyof typeof config.migrations]
        : value
      : undefined;
  let id = canonical(theme);
  if ((!id || !config.ids.includes(id)) && config.storage.legacyThemeKey)
    id = canonical(read(config.storage.legacyThemeKey));
  if (config.appearanceStorageKey) appearance = read(config.appearanceStorageKey);
  if (
    config.appearanceQuery &&
    window.location.pathname.startsWith(config.appearanceQuery.pathPrefix)
  ) {
    const query = new URLSearchParams(window.location.search).get(config.appearanceQuery.parameter);
    if (query === 'light' || query === 'dark') appearance = query;
  }
  if (config.respectServerAttributes) {
    const server = canonical(root.getAttribute('data-virgo-theme'));
    if (server && config.ids.includes(server)) id = server;
    const serverAppearance = root.getAttribute('data-theme');
    if (serverAppearance === 'light' || serverAppearance === 'dark') appearance = serverAppearance;
  }
  id = id && config.ids.includes(id) ? id : config.defaultTheme;
  const preference = ['light', 'dark', 'auto', 'system'].includes(String(appearance))
    ? appearance
    : config.defaultAppearance;
  let dark = preference === 'dark';
  if (preference === 'auto' || preference === 'system') {
    try {
      dark = Boolean(window.matchMedia?.('(prefers-color-scheme: dark)').matches);
    } catch {
      dark = false;
    }
  }
  root.setAttribute('data-virgo-theme', id);
  root.setAttribute('data-theme', dark ? 'dark' : 'light');
  root.style.colorScheme = dark ? 'dark' : 'light';
}

/** Place synchronously in head before styles/app modules; attach the consumer's CSP nonce. */
export function getInitialThemeScript(options: InitialThemeScriptOptions = {}): string {
  const ids = (options.registry?.listThemes() ?? themePresets).map(({ id }) => id);
  const fallback = options.defaultTheme ?? defaultTheme;
  if (!ids.includes(fallback)) throw new RangeError(`Unknown theme: ${fallback}`);
  const configuration: BootstrapConfiguration = {
    defaultTheme: fallback,
    defaultAppearance: options.defaultAppearance ?? 'light',
    storage: options.storage ?? { key: themeStorageKey },
    respectServerAttributes: options.respectServerAttributes ?? false,
    ...(options.appearanceStorageKey ? { appearanceStorageKey: options.appearanceStorageKey } : {}),
    ...(options.appearanceQuery ? { appearanceQuery: options.appearanceQuery } : {}),
    ids,
    migrations: legacyThemeIds,
  };
  const json = JSON.stringify(configuration)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
  return `;(${bootstrap.toString()})(${json});`;
}

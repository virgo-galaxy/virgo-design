import {
  createThemeRegistry,
  defaultTheme,
  getBrowserThemeRegistry,
  type ThemeRegistry,
} from './registry.ts';
import { getThemeAttributes, type ResolvedTheme } from './resolution.ts';

export const themeStorageKey = 'virgo-design.theme-style.v1';

export interface ThemeStorage {
  readonly key: string;
  parse(raw: string | null): string | null;
  serialize(id: string, raw: string | null): string;
}

const defaultStorage: ThemeStorage = Object.freeze({
  key: themeStorageKey,
  parse: (raw: string | null) => raw,
  serialize: (id: string) => id,
});

export interface ThemeRuntimeOptions {
  defaultTheme?: string;
  initialTheme?: string;
  storage?: ThemeStorage;
  registry?: ThemeRegistry;
  /** Omit for SSR; pass the consumer's Window explicitly on the client. */
  window?: Window | null;
}
export type ThemeInitializationOptions = Pick<ThemeRuntimeOptions, 'defaultTheme' | 'storage'>;

/** Request-local state with no DOM/storage access unless a Window is supplied. */
export function createThemeRuntime(options: ThemeRuntimeOptions = {}) {
  const registry = options.registry ?? createThemeRegistry();
  const browser = options.window ?? null;
  const root = browser?.document.documentElement;
  let fallbackTheme = options.defaultTheme ?? defaultTheme;
  let currentTheme = options.initialTheme ?? fallbackTheme;
  let serverTheme = currentTheme;
  let storage = options.storage ?? defaultStorage;
  const listeners = new Set<() => void>();

  let observer: MutationObserver | undefined;
  const requireId = (id: string) => {
    if (!registry.getThemePreset(id)) throw new RangeError(`Unknown theme: ${id}`);
    return id;
  };

  requireId(fallbackTheme);
  requireId(currentTheme);

  const apply = (id: string) => {
    const changed = currentTheme !== id;
    currentTheme = id;
    if (root && root.dataset.virgoTheme !== id) root.dataset.virgoTheme = id;
    if (changed) listeners.forEach((listener) => listener());
    return id;
  };

  const persist = (id: string) => {
    if (!browser) return;
    try {
      const raw = browser.localStorage.getItem(storage.key);
      browser.localStorage.setItem(storage.key, storage.serialize(id, raw));
    } catch {
      /* Denied storage never prevents switching. */
    }
  };

  const onStorage = (event: StorageEvent) => {
    if (event.key !== storage.key && event.key !== null) return;
    try {
      if (event.storageArea && event.storageArea !== browser!.localStorage) return;
      const saved = storage.parse(event.newValue);
      const id = registry.resolveThemeId(saved);

      apply(id ?? fallbackTheme);
    } catch {
      apply(fallbackTheme);
    }
  };

  const stopObserving = () => {
    browser?.removeEventListener('storage', onStorage);
    observer?.disconnect();
    observer = undefined;
  };

  return Object.freeze({
    registry,
    initializeTheme(initialization: ThemeInitializationOptions = {}) {
      fallbackTheme = requireId(
        initialization.defaultTheme ?? options.defaultTheme ?? defaultTheme,
      );
      storage = initialization.storage ?? options.storage ?? defaultStorage;
      if (!browser) return apply(fallbackTheme);

      let saved: string | null = null;
      try {
        saved = storage.parse(browser.localStorage.getItem(storage.key));
      } catch {
        /* Storage may be unavailable. */
      }

      const id = registry.resolveThemeId(saved) ?? fallbackTheme;

      return apply(id);
    },

    /** Adopt server/bootstrap attributes without re-resolving a different local preference. */
    hydrateTheme(state?: ResolvedTheme) {
      const id = requireId(
        state?.theme ?? registry.resolveThemeId(root?.dataset.virgoTheme) ?? currentTheme,
      );
      serverTheme = id;
      if (state && root) {
        const attributes = getThemeAttributes(state, registry);
        root.dataset.theme = attributes['data-theme'];
        root.style.colorScheme = attributes['data-theme'];
      }

      return apply(id);
    },

    getTheme: () => currentTheme,
    getServerTheme: () => serverTheme,

    setTheme(id: string) {
      persist(requireId(id));
      apply(id);
    },

    subscribeTheme(listener: () => void) {
      if (!listeners.size && browser && root) {
        browser.addEventListener('storage', onStorage);
        observer = new (browser as Window & typeof globalThis).MutationObserver(() =>
          apply(registry.resolveThemeId(root.dataset.virgoTheme) ?? fallbackTheme),
        );
        observer.observe(root, { attributes: true, attributeFilter: ['data-virgo-theme'] });
      }
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
        if (!listeners.size) stopObserving();
      };
    },

    dispose() {
      listeners.clear();
      stopObserving();
    },
  });
}

export type ThemeRuntime = ReturnType<typeof createThemeRuntime>;
const browserRuntimes = new WeakMap<Window, ThemeRuntime>();

function getBrowserRuntime(): ThemeRuntime {
  let runtime = browserRuntimes.get(window);

  if (!runtime) {
    runtime = createThemeRuntime({ window, registry: getBrowserThemeRegistry(window) });
    browserRuntimes.set(window, runtime);
  }

  return runtime;
}

/** SPA convenience API; SSR must keep the instance returned by createThemeRuntime. */
export function initializeTheme(options: ThemeInitializationOptions = {}): string {
  if (typeof window !== 'undefined') return getBrowserRuntime().initializeTheme(options);
  return createThemeRuntime(options).initializeTheme(options);
}

export const getTheme = () =>
  typeof window === 'undefined' ? defaultTheme : getBrowserRuntime().getTheme();
export const getServerTheme = () =>
  typeof window === 'undefined' ? defaultTheme : getBrowserRuntime().getServerTheme();

export function hydrateTheme(state?: ResolvedTheme): string {
  if (typeof window === 'undefined')
    return createThemeRuntime({ ...(state ? { initialTheme: state.theme } : {}) }).hydrateTheme(
      state,
    );
  return getBrowserRuntime().hydrateTheme(state);
}

export function setTheme(id: string): void {
  if (typeof window === 'undefined')
    throw new Error('SSR must mutate only a request-owned createThemeRuntime().');
  getBrowserRuntime().setTheme(id);
}

export function subscribeTheme(listener: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  return getBrowserRuntime().subscribeTheme(listener);
}

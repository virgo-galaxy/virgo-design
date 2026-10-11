import { defaultTheme, getThemePreset, resolveThemeId } from './registry';

export const themeStorageKey = 'virgo-design.theme-style.v1';
let currentTheme: string = defaultTheme;
let fallbackTheme: string = defaultTheme;
export interface ThemeStorage {
  readonly key: string;
  parse(raw: string | null): string | null;
  serialize(id: string, raw: string | null): string;
}
const defaultStorage: ThemeStorage = {
  key: themeStorageKey,
  parse: (raw) => raw,
  serialize: (id) => id,
};
let storage: ThemeStorage = defaultStorage;
const listeners = new Set<() => void>();

function apply(id: string) {
  const changed = currentTheme !== id;
  currentTheme = id;
  if (typeof document !== 'undefined') document.documentElement.dataset.virgoTheme = id;
  if (changed) listeners.forEach((listener) => listener());
  return id;
}

/** Call before the first render. Never reads or writes the appearance preference. */
export function initializeTheme(
  options: { defaultTheme?: string; storage?: ThemeStorage } = {},
): string {
  fallbackTheme = options.defaultTheme ?? defaultTheme;
  if (!getThemePreset(fallbackTheme)) throw new RangeError(`Unknown theme: ${fallbackTheme}`);
  storage = options.storage ?? defaultStorage;
  if (typeof window === 'undefined') return currentTheme;
  let saved: string | null = null;
  try {
    saved = storage.parse(window.localStorage.getItem(storage.key));
  } catch {
    /* Storage can be denied. */
  }
  const id = resolveThemeId(saved) ?? fallbackTheme;
  if (saved && id !== saved && resolveThemeId(saved)) persist(id);
  return apply(id);
}

export function getTheme(): string {
  return currentTheme;
}
export function getServerTheme(): string {
  return fallbackTheme;
}

function persist(id: string) {
  if (typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(storage.key);
    window.localStorage.setItem(storage.key, storage.serialize(id, raw));
  } catch {
    /* Switching still works when storage is blocked. */
  }
}

export function setTheme(id: string): void {
  if (!getThemePreset(id)) throw new RangeError(`Unknown theme: ${id}`);
  persist(id);
  apply(id);
}

function onStorage(event: StorageEvent) {
  if (event.storageArea && event.storageArea !== window.localStorage) return;
  if (event.key !== storage.key && event.key !== null) return;
  try {
    const saved = storage.parse(event.newValue);
    const resolved = resolveThemeId(saved);
    if (resolved && resolved !== saved) persist(resolved);
    apply(resolved ?? fallbackTheme);
  } catch {
    apply(fallbackTheme);
  }
}

/** Compatible with useSyncExternalStore, without a React dependency or a second state. */
export function subscribeTheme(listener: () => void): () => void {
  if (!listeners.size && typeof window !== 'undefined')
    window.addEventListener('storage', onStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (!listeners.size && typeof window !== 'undefined')
      window.removeEventListener('storage', onStorage);
  };
}

import { initializeThemeOptics } from './optics';
import { defaultTheme, getThemePreset } from './registry';

export const themeStorageKey = 'virgo-design.theme-style.v1';
let currentTheme: string = defaultTheme;
const listeners = new Set<() => void>();

function apply(id: string) {
  const changed = currentTheme !== id;
  currentTheme = id;
  if (typeof document !== 'undefined') document.documentElement.dataset.virgoTheme = id;
  if (changed) listeners.forEach((listener) => listener());
  return id;
}

/** Call before the first render. Never reads or writes the appearance preference. */
export function initializeTheme(): string {
  if (typeof window === 'undefined') return currentTheme;
  initializeThemeOptics();
  let saved: string | null = null;
  try {
    saved = window.localStorage.getItem(themeStorageKey);
  } catch {
    /* Storage can be denied. */
  }
  return apply(saved && getThemePreset(saved) ? saved : defaultTheme);
}

export function getTheme(): string {
  return currentTheme;
}
export function getServerTheme(): string {
  return defaultTheme;
}

export function setTheme(id: string): void {
  if (!getThemePreset(id)) throw new RangeError(`Unknown theme: ${id}`);
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(themeStorageKey, id);
    } catch {
      /* Switching still works. */
    }
  }
  apply(id);
}

function onStorage(event: StorageEvent) {
  if (event.storageArea && event.storageArea !== window.localStorage) return;
  if (event.key !== themeStorageKey && event.key !== null) return;
  apply(event.newValue && getThemePreset(event.newValue) ? event.newValue : defaultTheme);
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

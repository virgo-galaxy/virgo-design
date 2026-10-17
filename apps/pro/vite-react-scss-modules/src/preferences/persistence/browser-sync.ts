import { hydrateTheme, resolveTheme } from '@virgo-design/themes';

import { demoResetCompleteEvent, demoResetEvent } from '@/lib/demo/reset';
import { localStorageAccess } from '@/lib/storage';

import {
  type AppPreferences,
  defaultPreferences,
  parsePreferences,
  preferencesStorageKey,
  serializePreferences,
} from '../model/preferences';
import type { PreferencesStore } from '../store';
import { readStoredPreferences } from './storage';

export function startPreferencesSync(store: PreferencesStore) {
  const stored = readStoredPreferences();
  const media = window.matchMedia?.('(prefers-color-scheme: dark)');

  store.setState({
    preferences: stored.preferences,
    systemDark: media?.matches ?? false,
    storageAvailable: stored.storageAvailable,
  });

  let restoring = false;
  let resetting = false;
  let timer: number | undefined;
  let pending: Partial<AppPreferences> = {};

  const cancelSave = () => {
    window.clearTimeout(timer);
    timer = undefined;
  };

  const applyTheme = () => {
    const { preferences, systemDark } = store.getState();

    hydrateTheme(
      resolveTheme({
        theme: preferences.theme,
        appearance: preferences.appearance,
        systemAppearance: systemDark ? 'dark' : 'light',
      }),
    );
  };

  const restore = (preferences: AppPreferences) => {
    const previous = store.getState().preferences;

    if (
      Object.entries(preferences).every(([key, value]) =>
        Object.is(previous[key as keyof AppPreferences], value),
      )
    )
      return;

    restoring = true;
    store.setState({ preferences });
    restoring = false;
  };

  const flush = () => {
    cancelSave();

    if (resetting || !Object.keys(pending).length) return;

    const latest = readStoredPreferences();
    const preferences = {
      ...(latest.storageAvailable ? latest.preferences : store.getState().preferences),
      ...pending,
    };

    const saved = localStorageAccess.set(preferencesStorageKey, serializePreferences(preferences));
    store.setState({ storageAvailable: saved });

    if (saved) {
      pending = {};
      restore(preferences);
    }
  };

  const scheduleSave = () => {
    cancelSave();
    timer = window.setTimeout(flush, 150);
  };

  const unsubscribe = store.subscribe((state, previous) => {
    if (
      state.preferences.theme !== previous.preferences.theme ||
      state.preferences.appearance !== previous.preferences.appearance ||
      state.systemDark !== previous.systemDark
    )
      applyTheme();

    if (restoring || resetting || state.preferences === previous.preferences) return;

    pending = {
      ...pending,
      ...Object.fromEntries(
        Object.entries(state.preferences).filter(
          ([key, value]) => !Object.is(previous.preferences[key as keyof AppPreferences], value),
        ),
      ),
    };
    scheduleSave();
  });

  const syncStorage = (event: StorageEvent) => {
    if (!localStorageAccess.matchesEvent(event)) return;
    if (event.key !== preferencesStorageKey && event.key !== null) return;
    if (resetting) return;

    if (event.newValue === null) {
      pending = {};
      cancelSave();
      restore({ ...defaultPreferences });

      return;
    }

    const preferences = parsePreferences(event.newValue);
    restore({ ...preferences, ...pending });
  };

  const syncSystemAppearance = () => store.setState({ systemDark: media?.matches ?? false });

  const beginReset = () => {
    resetting = true;
    pending = {};
    cancelSave();
  };

  const completeReset = () => {
    restore({ ...defaultPreferences });
    resetting = false;
  };

  applyTheme();
  media?.addEventListener('change', syncSystemAppearance);
  window.addEventListener('storage', syncStorage);
  window.addEventListener('pagehide', flush);
  window.addEventListener(demoResetEvent, beginReset);
  window.addEventListener(demoResetCompleteEvent, completeReset);

  return () => {
    cancelSave();
    unsubscribe();

    media?.removeEventListener('change', syncSystemAppearance);
    window.removeEventListener('storage', syncStorage);
    window.removeEventListener('pagehide', flush);
    window.removeEventListener(demoResetEvent, beginReset);
    window.removeEventListener(demoResetCompleteEvent, completeReset);
  };
}

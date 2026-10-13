import { getTheme, setTheme } from '@virgo-design/themes';
import { useCallback, useEffect, useRef, useState } from 'react';

import { clearAppearance, currentAppearance, rememberAppearance } from '@/lib/appearance';
import { demoResetEvent } from '@/lib/demo/reset';
import { localStorageAccess } from '@/lib/storage';
import { useThemeStyle } from '@/lib/use-theme-style';

import {
  defaultProSettings,
  parseProSettings,
  type ProSettings,
  serializeProSettings,
  settingsStorageKey,
} from './model';

export function useProSettings(canManageLayout = true) {
  const { theme: themeStyle } = useThemeStyle();
  const resetting = useRef(false);
  useEffect(() => {
    const stopSaving = () => {
      resetting.current = true;
      clearAppearance();
    };
    window.addEventListener(demoResetEvent, stopSaving);
    return () => window.removeEventListener(demoResetEvent, stopSaving);
  }, []);
  const [settings, setSettings] = useState(() => {
    let saved = { ...defaultProSettings };
    try {
      saved = parseProSettings(localStorageAccess.get(settingsStorageKey).value);
    } catch {
      /* Use the tab's preference when storage is denied. */
    }
    const appearance = currentAppearance();
    return { ...saved, ...(appearance ? { appearance } : {}) };
  });
  useEffect(() => rememberAppearance(settings.appearance), [settings.appearance]);
  const [storageAvailable, setStorageAvailable] = useState(true);
  useEffect(() => {
    const syncSettings = (event: StorageEvent) => {
      if (!localStorageAccess.matchesEvent(event)) return;
      if (event.key === settingsStorageKey || event.key === null)
        setSettings(parseProSettings(event.newValue));
    };
    window.addEventListener('storage', syncSettings);
    return () => window.removeEventListener('storage', syncSettings);
  }, []);
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches,
  );
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setSystemDark(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    const save = () => {
      if (resetting.current) return;
      try {
        // Every role can save theme and appearance; only Admin can persist global layout settings.
        const saved = canManageLayout
          ? { ...settings, theme: getTheme() }
          : {
              ...parseProSettings(localStorageAccess.get(settingsStorageKey).value),
              appearance: settings.appearance,
              theme: getTheme(),
            };
        setStorageAvailable(
          localStorageAccess.set(settingsStorageKey, serializeProSettings(saved)),
        );
      } catch {
        setStorageAvailable(false);
      }
    };
    // Keep dragging immediate without writing browser storage on every pointer move.
    const timer = window.setTimeout(save, 150);
    window.addEventListener('pagehide', save);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('pagehide', save);
    };
  }, [settings, canManageLayout, themeStyle]);
  const updateSettings = useCallback((patch: Partial<ProSettings>) => {
    if (patch.theme !== undefined) setTheme(patch.theme);
    setSettings((previous) => {
      const next = { ...previous, ...patch };
      if (next.sidebarState !== 'hidden') next.sidebarMode = next.sidebarState;
      return Object.entries(next).every(([key, value]) =>
        Object.is(previous[key as keyof ProSettings], value),
      )
        ? previous
        : next;
    });
  }, []);
  const resetSettings = () => {
    clearAppearance();
    setTheme(defaultProSettings.theme);
    setSettings({ ...defaultProSettings });
  };
  const theme =
    settings.appearance === 'system' ? (systemDark ? 'dark' : 'light') : settings.appearance;
  return {
    settings: {
      ...settings,
      theme: themeStyle,
      ...(!canManageLayout
        ? {
            showHeader: true,
            sidebarState:
              settings.sidebarState === 'hidden' ? ('expanded' as const) : settings.sidebarState,
          }
        : {}),
    },
    setSettings,
    updateSettings,
    resetSettings,
    theme,
    storageAvailable,
  };
}

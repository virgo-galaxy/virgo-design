import { useCallback, useEffect, useState } from 'react';

import {
  defaultProSettings,
  parseProSettings,
  type ProSettings,
  serializeProSettings,
  settingsStorageKey,
} from './settings';

export function useProSettings() {
  const [settings, setSettings] = useState(() => {
    try {
      return parseProSettings(window.localStorage.getItem(settingsStorageKey));
    } catch {
      return { ...defaultProSettings };
    }
  });
  const [storageAvailable, setStorageAvailable] = useState(true);
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
      try {
        window.localStorage.setItem(settingsStorageKey, serializeProSettings(settings));
        setStorageAvailable(true);
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
  }, [settings]);
  const updateSettings = useCallback((patch: Partial<ProSettings>) => {
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
  const resetSettings = () => setSettings({ ...defaultProSettings });
  const theme =
    settings.appearance === 'system' ? (systemDark ? 'dark' : 'light') : settings.appearance;
  return { settings, setSettings, updateSettings, resetSettings, theme, storageAvailable };
}

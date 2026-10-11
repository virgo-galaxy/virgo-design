import { useCallback, useEffect, useRef, useState } from 'react';

import { clearAppearance, currentAppearance } from '@/lib/appearance';
import { demoResetEvent } from '@/lib/demo/reset';

import {
  defaultProSettings,
  parseProSettings,
  type ProSettings,
  serializeProSettings,
  settingsStorageKey,
} from './settings';

export function useProSettings(canPersist = true) {
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
    try {
      const saved = parseProSettings(window.localStorage.getItem(settingsStorageKey));
      return { ...saved, ...(currentAppearance() ? { appearance: currentAppearance()! } : {}) };
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
      if (resetting.current) return;
      try {
        // Every role can save appearance; only Admin can persist global layout settings.
        const saved = canPersist
          ? settings
          : {
              ...parseProSettings(window.localStorage.getItem(settingsStorageKey)),
              appearance: settings.appearance,
            };
        window.localStorage.setItem(settingsStorageKey, serializeProSettings(saved));
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
  }, [settings, canPersist]);
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

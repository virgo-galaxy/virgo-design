import { type ReactNode, useEffect, useMemo, useState } from 'react';

import { AppearanceContext } from '@/shared/theme/appearance-context';
import type { Appearance, AppearancePreference } from '@/shared/theme/types';

const STORAGE_KEY = 'virgo-design-appearance';

function getStandaloneAppearance(): Appearance | null {
  if (typeof window === 'undefined' || !window.location.pathname.startsWith('/examples/')) {
    return null;
  }

  const theme = new URLSearchParams(window.location.search).get('theme');
  return theme === 'dark' || theme === 'light' ? theme : null;
}

function getInitialAppearance(): AppearancePreference {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const standalone = getStandaloneAppearance();
  if (standalone) return standalone;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === 'dark' || saved === 'auto' ? saved : 'light';
  } catch {
    return 'light';
  }
}

interface AppearanceProviderProps {
  children: ReactNode;
}

export function AppearanceProvider({ children }: AppearanceProviderProps) {
  const [preference, setPreference] = useState<AppearancePreference>(getInitialAppearance);
  const [systemDark, setSystemDark] = useState(
    () =>
      typeof window !== 'undefined' &&
      Boolean(window.matchMedia?.('(prefers-color-scheme: dark)').matches),
  );
  const appearance: Appearance =
    preference === 'auto' ? (systemDark ? 'dark' : 'light') : preference;

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    const update = () => setSystemDark(Boolean(media?.matches));
    media?.addEventListener('change', update);
    return () => media?.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = appearance;
    document.documentElement.style.colorScheme = appearance;
    if (getStandaloneAppearance() === null) {
      try {
        window.localStorage.setItem(STORAGE_KEY, preference);
      } catch {
        /* Keep in-memory switching. */
      }
    }
  }, [appearance, preference]);

  const value = useMemo(
    () => ({
      appearance,
      setAppearance: setPreference,
      preference,
      setPreference,
    }),
    [appearance, preference],
  );

  return <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>;
}

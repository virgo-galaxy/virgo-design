import { type ReactNode, useEffect, useMemo, useState } from 'react';

import { AppearanceContext } from '@/shared/theme/appearance-context';
import type { Appearance } from '@/shared/theme/types';

const STORAGE_KEY = 'virgo-design-appearance';

function getStandaloneAppearance(): Appearance | null {
  if (typeof window === 'undefined' || !window.location.pathname.startsWith('/examples/')) {
    return null;
  }

  const theme = new URLSearchParams(window.location.search).get('theme');
  return theme === 'dark' || theme === 'light' ? theme : null;
}

function getInitialAppearance(): Appearance {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return (
    getStandaloneAppearance() ??
    (window.localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light')
  );
}

interface AppearanceProviderProps {
  children: ReactNode;
}

export function AppearanceProvider({ children }: AppearanceProviderProps) {
  const [appearance, setAppearance] = useState<Appearance>(getInitialAppearance);

  useEffect(() => {
    document.documentElement.dataset.theme = appearance;
    if (getStandaloneAppearance() === null) {
      window.localStorage.setItem(STORAGE_KEY, appearance);
    }
  }, [appearance]);

  const value = useMemo(
    () => ({
      appearance,
      setAppearance,
    }),
    [appearance],
  );

  return <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>;
}

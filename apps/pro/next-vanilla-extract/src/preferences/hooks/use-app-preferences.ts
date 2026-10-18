import { useCallback } from 'react';

import { type AppPreferences, defaultPreferences } from '../model/preferences';
import { usePreferencesStore } from '../store';

export function useAppPreferences(canManageLayout = true) {
  const preferences = usePreferencesStore((state) => state.preferences);
  const systemDark = usePreferencesStore((state) => state.systemDark);
  const storageAvailable = usePreferencesStore((state) => state.storageAvailable);
  const update = usePreferencesStore((state) => state.updatePreferences);
  const reset = usePreferencesStore((state) => state.resetPreferences);

  const updatePreferences = useCallback(
    (patch: Partial<AppPreferences>) => {
      if (canManageLayout) update(patch);
      else
        update({
          ...(patch.theme !== undefined ? { theme: patch.theme } : {}),
          ...(patch.appearance !== undefined ? { appearance: patch.appearance } : {}),
        });
    },
    [canManageLayout, update],
  );

  const resetPreferences = useCallback(() => {
    if (canManageLayout) reset();
    else update({ theme: defaultPreferences.theme, appearance: defaultPreferences.appearance });
  }, [canManageLayout, reset, update]);

  const appearance =
    preferences.appearance === 'system' ? (systemDark ? 'dark' : 'light') : preferences.appearance;

  return {
    preferences: canManageLayout
      ? preferences
      : {
          ...preferences,
          showHeader: true,
          sidebarState:
            preferences.sidebarState === 'hidden'
              ? ('expanded' as const)
              : preferences.sidebarState,
        },
    updatePreferences,
    resetPreferences,
    appearance,
    storageAvailable,
  };
}

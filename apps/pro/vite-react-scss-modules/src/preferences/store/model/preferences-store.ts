import { resolveThemeId } from '@virgo-design/themes';
import { createStore } from 'zustand/vanilla';

import { type AppPreferences, defaultPreferences } from '../../model/preferences';

export interface PreferencesState {
  preferences: AppPreferences;
  systemDark: boolean;
  storageAvailable: boolean;
  updatePreferences: (patch: Partial<AppPreferences>) => void;
  resetPreferences: () => void;
}

export function createPreferencesStore(initial = defaultPreferences) {
  return createStore<PreferencesState>()((set) => ({
    preferences: { ...initial },
    systemDark: false,
    storageAvailable: true,
    updatePreferences: (patch) =>
      set((state) => {
        const previous = state.preferences;
        const next = { ...previous, ...patch };

        next.theme = resolveThemeId(next.theme) ?? previous.theme;
        if (next.sidebarState !== 'hidden') next.sidebarMode = next.sidebarState;

        return Object.entries(next).every(([key, value]) =>
          Object.is(previous[key as keyof AppPreferences], value),
        )
          ? state
          : { preferences: next };
      }),
    resetPreferences: () => set({ preferences: { ...defaultPreferences } }),
  }));
}

export type PreferencesStore = ReturnType<typeof createPreferencesStore>;

export const preferencesStore = createPreferencesStore();

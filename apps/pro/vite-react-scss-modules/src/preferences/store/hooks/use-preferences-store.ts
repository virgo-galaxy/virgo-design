import { useStore } from 'zustand';

import { type PreferencesState, preferencesStore } from '../model/preferences-store';

export function usePreferencesStore<T>(selector: (state: PreferencesState) => T): T {
  return useStore(preferencesStore, selector);
}

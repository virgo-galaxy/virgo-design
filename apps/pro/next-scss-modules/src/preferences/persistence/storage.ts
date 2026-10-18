import { localStorageAccess } from '@/lib/storage';

import { parsePreferences, preferencesStorageKey } from '../model/preferences';

export function readStoredPreferences() {
  const stored = localStorageAccess.get(preferencesStorageKey);

  return {
    preferences: parsePreferences(stored.value),
    storageAvailable: stored.ok,
  };
}

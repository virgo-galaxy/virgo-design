import { startPreferencesSync } from '../persistence/browser-sync';
import { preferencesStore } from '../store';

let stopSync: (() => void) | undefined;

export function initializePreferences() {
  if (!stopSync) stopSync = startPreferencesSync(preferencesStore);
}

export function disposePreferences() {
  stopSync?.();
  stopSync = undefined;

  preferencesStore.setState(preferencesStore.getInitialState(), true);
}

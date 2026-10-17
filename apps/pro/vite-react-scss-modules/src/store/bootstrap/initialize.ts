import { disposePreferences, initializePreferences } from '@/preferences';

export function initializeAppStores() {
  initializePreferences();
}

export function disposeAppStores() {
  disposePreferences();
}

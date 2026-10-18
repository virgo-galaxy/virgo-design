import { localStorageAccess } from '@/lib/storage';

import { demoChangeKey, type DemoChanges, readDemoChanges } from './storage-changes';

export function subscribeToDemoChanges(listener: (changes: DemoChanges) => void) {
  const sync = (event: StorageEvent) => {
    if (!localStorageAccess.matchesEvent(event)) return;
    if (event.key !== demoChangeKey && event.key !== null) return;
    const changes = readDemoChanges(event.newValue);
    if (changes) listener(changes);
  };
  window.addEventListener('storage', sync);
  return () => window.removeEventListener('storage', sync);
}

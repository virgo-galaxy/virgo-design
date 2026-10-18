import { localStorageAccess } from '@/lib/storage';

import { demoStorageKey } from '../data/storage-key';
import { demoStorageChanges } from './storage-changes';

export function subscribeToDemoChanges(
  listener: (changes: ReturnType<typeof demoStorageChanges>) => void,
) {
  const sync = (event: StorageEvent) => {
    if (!localStorageAccess.matchesEvent(event)) return;
    if (event.key !== demoStorageKey && event.key !== null) return;

    listener(demoStorageChanges(event.oldValue, event.newValue));
  };

  window.addEventListener('storage', sync);

  return () => window.removeEventListener('storage', sync);
}

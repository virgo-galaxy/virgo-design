import {
  localStorageAccess,
  sessionStorageAccess,
  storageResetCompleteEvent,
  storageResetEvent,
} from '@/lib/storage';

export function clearDemoStorage() {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(new Event(storageResetEvent));

  for (const storage of [localStorageAccess, sessionStorageAccess]) {
    for (const key of storage.keys())
      if (key?.startsWith('virgo-pro.') || key?.startsWith('virgo-pro:')) storage.remove(key);
  }

  window.dispatchEvent(new Event(storageResetCompleteEvent));
}

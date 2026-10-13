import { themeStorageKey } from '@virgo-design/themes';

import { localStorageAccess, sessionStorageAccess } from '@/lib/storage';

export const demoResetEvent = 'virgo-pro:demo-reset';
export const demoResetCompleteEvent = 'virgo-pro:demo-reset-complete';

export function clearDemoStorage() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(demoResetEvent));
  for (const storage of [localStorageAccess, sessionStorageAccess]) {
    for (const key of storage.keys())
      if (key?.startsWith('virgo-pro.') || key?.startsWith('virgo-pro:')) storage.remove(key);
  }
  localStorageAccess.remove(themeStorageKey);
  window.dispatchEvent(new Event(demoResetCompleteEvent));
}

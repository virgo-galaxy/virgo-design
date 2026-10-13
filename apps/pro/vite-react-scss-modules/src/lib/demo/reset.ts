import { themeStorageKey } from '@virgo-design/themes';

export const demoResetEvent = 'virgo-pro:demo-reset';
export const demoResetCompleteEvent = 'virgo-pro:demo-reset-complete';

export function clearDemoStorage() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(demoResetEvent));
  for (const storage of [window.localStorage, window.sessionStorage]) {
    const keys = Array.from({ length: storage.length }, (_, index) => storage.key(index));
    for (const key of keys)
      if (key?.startsWith('virgo-pro.') || key?.startsWith('virgo-pro:')) storage.removeItem(key);
  }
  window.localStorage.removeItem(themeStorageKey);
  window.dispatchEvent(new Event(demoResetCompleteEvent));
}

export const demoResetEvent = 'virgo-pro:demo-reset';

export function clearDemoStorage() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(demoResetEvent));
  for (const storage of [window.localStorage, window.sessionStorage]) {
    const keys = Array.from({ length: storage.length }, (_, index) => storage.key(index));
    for (const key of keys)
      if (key?.startsWith('virgo-pro.') || key?.startsWith('virgo-pro:')) storage.removeItem(key);
  }
}

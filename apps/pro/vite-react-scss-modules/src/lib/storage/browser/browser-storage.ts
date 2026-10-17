export type StorageRead = { ok: true; value: string | null } | { ok: false; value: null };

function browserStorage(area: 'localStorage' | 'sessionStorage') {
  const resolve = () => (typeof window === 'undefined' ? undefined : window[area]);

  return {
    get(key: string): StorageRead {
      try {
        const storage = resolve();

        return storage ? { ok: true, value: storage.getItem(key) } : { ok: false, value: null };
      } catch {
        return { ok: false, value: null };
      }
    },
    set(key: string, value: string): boolean {
      try {
        const storage = resolve();
        if (!storage) return false;

        storage.setItem(key, value);
        return true;
      } catch {
        return false;
      }
    },
    remove(key: string): boolean {
      try {
        const storage = resolve();
        if (!storage) return false;

        storage.removeItem(key);
        return true;
      } catch {
        return false;
      }
    },
    keys(): string[] {
      try {
        const storage = resolve();
        if (!storage) return [];

        return Array.from({ length: storage.length }, (_, index) => storage.key(index)).filter(
          (key): key is string => key !== null,
        );
      } catch {
        return [];
      }
    },
    matchesEvent(event: StorageEvent): boolean {
      if (!event.storageArea) return true;

      try {
        return event.storageArea === resolve();
      } catch {
        return false;
      }
    },
  };
}

export const localStorageAccess = browserStorage('localStorage');
export const sessionStorageAccess = browserStorage('sessionStorage');

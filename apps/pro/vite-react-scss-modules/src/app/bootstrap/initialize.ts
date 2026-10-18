import '@/styles/global.scss';

import { initializeAppLocale } from '@/i18n/bootstrap';
import { localStorageAccess } from '@/lib/storage';
import { createAppRouter } from '@/routes/router';
import { disposeAppStores, initializeAppStores } from '@/store/bootstrap';

export class StorageUnavailableError extends Error {}

export type AppInitialization = { router: ReturnType<typeof createAppRouter> } | { error: Error };

const localeReady = initializeAppLocale();
let router: ReturnType<typeof createAppRouter> | undefined;
let starting: Promise<AppInitialization> | undefined;

export function initializeApp(): Promise<AppInitialization> {
  starting ??= (async () => {
    await localeReady;
    initializeAppStores();

    if (import.meta.env.VITE_API_MOCKING === 'true') {
      if (!localStorageAccess.get('virgo-pro:storage-check').ok)
        throw new StorageUnavailableError('Browser storage is unavailable');

      const { startMocking } = await import('@/mock');
      await startMocking();
    }

    router = createAppRouter();
    return { router };
  })().catch((error: unknown) => {
    starting = undefined;
    disposeAppStores();
    return { error: error instanceof Error ? error : new Error(String(error)) };
  });
  return starting;
}

export const initialApp = initializeApp();

import.meta.hot?.dispose(() => {
  router?.dispose();
  disposeAppStores();
});

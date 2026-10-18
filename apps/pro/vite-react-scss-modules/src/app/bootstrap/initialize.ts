import '@/styles/global.scss';

import { initializeAppLocale } from '@/i18n/bootstrap';
import { createAppRouter } from '@/routes/router';
import { disposeAppStores, initializeAppStores } from '@/store/bootstrap';

void initializeAppLocale();
initializeAppStores();

if (import.meta.env.VITE_API_MOCKING === 'true') {
  const { startMocking } = await import('@/mock');

  await startMocking();
}

export const router = createAppRouter();

import.meta.hot?.dispose(() => {
  router.dispose();
  disposeAppStores();
});

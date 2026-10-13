import { setHttpPreparation } from '@/lib/http/preparation';

import { createMockActivation } from './activation';

let starting: Promise<void> | undefined;
export function enableMocking(): Promise<void> {
  if (import.meta.env.VITE_API_MOCKING !== 'true') return Promise.resolve();
  starting ??= import('./browser')
    .then(async ({ worker }) => {
      const registration = await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
      });
      if (registration?.active)
        setHttpPreparation(
          createMockActivation(navigator.serviceWorker, registration.active.scriptURL),
        );
    })
    .catch((error: unknown) => {
      starting = undefined;
      throw error;
    });
  return starting;
}

let starting: Promise<void> | undefined;
export function enableMocking(): Promise<void> {
  if (import.meta.env.VITE_API_MOCKING !== 'true') return Promise.resolve();
  starting ??= import('./browser')
    .then(async ({ worker }) => {
      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
      });
    })
    .catch((error: unknown) => {
      starting = undefined;
      throw error;
    });
  return starting;
}

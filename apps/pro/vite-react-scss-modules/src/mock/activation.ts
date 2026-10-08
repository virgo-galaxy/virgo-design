/** Reconfirm this client before requests: a restarted SW loses its active-client set. */
export function createMockActivation(
  container: ServiceWorkerContainer,
  scriptURL: string,
): () => Promise<void> {
  let pending: Promise<void> | undefined;
  return () => {
    if (pending) return pending;
    const worker = container.controller;
    if (!worker || worker.scriptURL !== scriptURL)
      return Promise.reject(new Error('Mock Service Worker is not controlling this page'));

    pending = new Promise<void>((resolve, reject) => {
      const cleanup = () => {
        clearTimeout(timeout);
        container.removeEventListener('message', onMessage);
      };
      const onMessage = (event: MessageEvent) => {
        if (event.source !== worker || event.data?.type !== 'MOCKING_ENABLED') return;
        cleanup();
        resolve();
      };
      const timeout = setTimeout(() => {
        cleanup();
        reject(new Error('Mock Service Worker activation timed out'));
      }, 2000);
      container.addEventListener('message', onMessage);
      try {
        worker.postMessage('MOCK_ACTIVATE');
      } catch (error) {
        cleanup();
        reject(error);
      }
    }).finally(() => {
      pending = undefined;
    });
    return pending;
  };
}

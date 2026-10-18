import {
  API_SUCCESS_CODE,
  API_SUCCESS_MSG,
  isApiResponse,
  resolveApiBaseUrl,
  subscribeToHttpResponses,
} from '@/lib/http';
import { localStorageAccess } from '@/lib/storage';

import { changesFromHeader, demoChangeKey } from './storage-changes';

export async function retireMockWorker() {
  try {
    if (!('serviceWorker' in navigator)) return;
    const scriptURL = new URL('/mockServiceWorker.js', location.href).href;
    const container = navigator.serviceWorker;
    if (container.controller?.scriptURL === scriptURL)
      container.controller.postMessage('MOCK_DEACTIVATE');
    const registrations = await container.getRegistrations();
    await Promise.all(
      registrations
        .filter((entry) =>
          [entry.active, entry.waiting, entry.installing].some(
            (worker) => worker?.scriptURL === scriptURL,
          ),
        )
        .map((entry) => entry.unregister()),
    );
  } catch {}
}

export async function initializeDemoClient() {
  const response = await fetch(`${resolveApiBaseUrl()}/auth/demo-accounts`, { cache: 'no-store' });
  if (!response.ok) {
    await response.body?.cancel();
    throw new Error('Demo API is unavailable');
  }
  const body: unknown = await response.json();
  if (!isApiResponse(body) || body.code !== API_SUCCESS_CODE || body.msg !== API_SUCCESS_MSG)
    throw new Error('Demo API is unavailable');
}

export function startDemoSync() {
  return subscribeToHttpResponses((response) => {
    const changed: unknown = response.headers['x-virgo-demo-changes'];
    if (typeof changed !== 'string') return;
    localStorageAccess.set(
      demoChangeKey,
      JSON.stringify({ id: crypto.randomUUID(), changes: changesFromHeader(changed) }),
    );
  });
}

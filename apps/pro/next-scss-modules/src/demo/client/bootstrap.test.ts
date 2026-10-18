// @vitest-environment jsdom
import { AxiosHeaders, type AxiosResponse } from 'axios';
import { afterEach, expect, it, vi } from 'vitest';

import { notifyHttpResponse } from '@/lib/http/client/responses';

import { initializeDemoClient, retireMockWorker, startDemoSync } from './bootstrap';
import { subscribeToDemoChanges } from './resource-sync';
import { demoChangeKey, readDemoChanges } from './storage-changes';

afterEach(() => vi.unstubAllGlobals());

function response(changes: string): AxiosResponse<unknown> {
  return {
    data: null,
    status: 200,
    statusText: 'OK',
    headers: new AxiosHeaders({ 'x-virgo-demo-changes': changes }),
    config: { headers: new AxiosHeaders() },
  };
}

it('deactivates and unregisters only the old application Mock worker', async () => {
  const oldWorker = {
    scriptURL: new URL('/mockServiceWorker.js', location.href).href,
    postMessage: vi.fn(),
  };
  const otherWorker = {
    scriptURL: new URL('/other-worker.js', location.href).href,
    postMessage: vi.fn(),
  };
  const oldRegistration = { active: oldWorker, unregister: vi.fn(async () => true) };
  const otherRegistration = { active: otherWorker, unregister: vi.fn(async () => true) };
  vi.stubGlobal('navigator', {
    serviceWorker: {
      controller: oldWorker,
      getRegistrations: async () => [oldRegistration, otherRegistration],
    },
  });
  await retireMockWorker();
  expect(oldWorker.postMessage).toHaveBeenCalledExactlyOnceWith('MOCK_DEACTIVATE');
  expect(oldRegistration.unregister).toHaveBeenCalledOnce();
  expect(otherRegistration.unregister).not.toHaveBeenCalled();
  expect(otherWorker.postMessage).not.toHaveBeenCalled();
});

it('checks the native API before rendering business requests and allows a failed bootstrap to retry', async () => {
  const fetch = vi
    .fn()
    .mockResolvedValueOnce(new Response(null, { status: 503 }))
    .mockResolvedValueOnce(new Response(JSON.stringify({ code: 0, msg: 'success', data: {} })));
  vi.stubGlobal('fetch', fetch);
  await expect(initializeDemoClient()).rejects.toThrow('Demo API is unavailable');
  await initializeDemoClient();
  expect(fetch).toHaveBeenLastCalledWith('/api/v1/auth/demo-accounts', { cache: 'no-store' });
});

it('broadcasts affected resources without storing business data and removes subscriptions cleanly', () => {
  const stopSync = startDemoSync();
  const listener = vi.fn();
  const stopListening = subscribeToDemoChanges(listener);
  try {
    notifyHttpResponse(response('profile'));
    const raw = localStorage.getItem(demoChangeKey);
    expect(readDemoChanges(raw)).toEqual({
      tasks: false,
      catalog: false,
      profile: true,
      workflows: false,
      notifications: false,
    });
    window.dispatchEvent(new StorageEvent('storage', { key: demoChangeKey, newValue: raw }));
    expect(listener).toHaveBeenCalledOnce();
    stopListening();
    window.dispatchEvent(new StorageEvent('storage', { key: demoChangeKey, newValue: raw }));
    expect(listener).toHaveBeenCalledOnce();
    stopSync();
    localStorage.removeItem(demoChangeKey);
    notifyHttpResponse(response('tasks'));
    expect(localStorage.getItem(demoChangeKey)).toBeNull();
  } finally {
    stopSync();
    stopListening();
  }
});

it('waits for the complete bootstrap response before allowing business requests', async () => {
  let stream!: ReadableStreamDefaultController<Uint8Array>;
  const response = new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        stream = controller;
      },
    }),
  );
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => response),
  );
  const ready = vi.fn();
  const pending = initializeDemoClient().then(ready);
  await Promise.resolve();
  await Promise.resolve();
  expect(ready).not.toHaveBeenCalled();
  stream.enqueue(new TextEncoder().encode(JSON.stringify({ code: 0, msg: 'success', data: {} })));
  stream.close();
  await pending;
  expect(response.bodyUsed).toBe(true);
  expect(ready).toHaveBeenCalledOnce();
});

it('keeps native API startup usable when browser policy blocks Service Worker access', async () => {
  vi.stubGlobal('navigator', {
    serviceWorker: {
      getRegistrations: vi.fn(async () => {
        throw new Error('Worker storage unavailable');
      }),
    },
  });
  await expect(retireMockWorker()).resolves.toBeUndefined();
});

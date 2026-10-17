import { afterEach, describe, expect, it, vi } from 'vitest';

import { createMockActivation } from './activation';

function setup() {
  const worker = { scriptURL: 'http://localhost/mockServiceWorker.js', postMessage: vi.fn() };
  const events = new EventTarget();
  const container = Object.assign(events, {
    controller: worker,
  }) as unknown as ServiceWorkerContainer;
  const activate = createMockActivation(container, worker.scriptURL);
  const acknowledge = (source: unknown = worker, type = 'MOCKING_ENABLED') => {
    const event = new MessageEvent('message', { data: { type } });
    Object.defineProperty(event, 'source', { value: source });
    events.dispatchEvent(event);
  };
  return { worker, container, activate, acknowledge };
}

afterEach(() => vi.useRealTimers());

describe('Mock client activation', () => {
  it('shares concurrent activation and reconfirms after the worker loses client state', async () => {
    const { worker, activate, acknowledge } = setup();
    const first = activate();
    expect(activate()).toBe(first);
    expect(worker.postMessage).toHaveBeenCalledExactlyOnceWith('MOCK_ACTIVATE');
    acknowledge();
    await first;
    const next = activate();
    expect(worker.postMessage).toHaveBeenCalledTimes(2);
    acknowledge();
    await next;
  });

  it('waits for confirmation from the matching worker and removes the listener', async () => {
    const { container, activate, acknowledge } = setup();
    const remove = vi.spyOn(container, 'removeEventListener');
    const finished = vi.fn();
    const result = activate().then(finished);
    acknowledge({}, 'MOCKING_ENABLED');
    acknowledge(container.controller, 'KEEPALIVE_RESPONSE');
    await Promise.resolve();
    expect(finished).not.toHaveBeenCalled();
    acknowledge();
    await result;
    expect(remove).toHaveBeenCalledTimes(1);
  });

  it('bounds an unresponsive activation and lets the next retry recover', async () => {
    vi.useFakeTimers();
    const { container, activate, acknowledge } = setup();
    const remove = vi.spyOn(container, 'removeEventListener');
    const failure = expect(activate()).rejects.toThrow('activation timed out');
    await vi.advanceTimersByTimeAsync(2000);
    await failure;
    expect(remove).toHaveBeenCalledTimes(1);
    const retry = activate();
    acknowledge();
    await retry;
  });

  it('does not send Mock messages to a different controller', async () => {
    const { worker, activate } = setup();
    worker.scriptURL = 'http://localhost/other-worker.js';
    await expect(activate()).rejects.toThrow('not controlling this page');
    expect(worker.postMessage).not.toHaveBeenCalled();
  });
});

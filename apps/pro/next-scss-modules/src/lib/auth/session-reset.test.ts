// @vitest-environment jsdom
import { afterEach, expect, it, vi } from 'vitest';

import {
  getSessionResetId,
  publishSessionReset,
  sessionResetKey,
  subscribeToSessionReset,
} from './session-reset';

class Channel {
  static instances = new Set<Channel>();
  onmessage: ((event: MessageEvent<unknown>) => void) | null = null;
  constructor(readonly name: string) {
    Channel.instances.add(this);
  }
  postMessage(data: unknown) {
    for (const channel of Channel.instances)
      if (channel !== this && channel.name === this.name)
        channel.onmessage?.(new MessageEvent('message', { data }));
  }
  close() {
    Channel.instances.delete(this);
  }
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  localStorage.clear();
  Channel.instances.clear();
});

it('publishes only a reset identifier and deduplicates storage and channel delivery', () => {
  vi.stubGlobal('BroadcastChannel', Channel);
  const listener = vi.fn();
  const stop = subscribeToSessionReset(listener);
  try {
    publishSessionReset();
    const id = getSessionResetId();
    expect(id).toBeTruthy();
    expect(localStorage.length).toBe(1);
    expect(listener).toHaveBeenCalledOnce();
    window.dispatchEvent(new StorageEvent('storage', { key: sessionResetKey, newValue: id }));
    expect(listener).toHaveBeenCalledOnce();
    stop();
    publishSessionReset();
    expect(listener).toHaveBeenCalledOnce();
    expect(Channel.instances.size).toBe(0);
  } finally {
    stop();
  }
});

it('keeps cross-tab reset delivery working when storage writes are denied', () => {
  vi.stubGlobal('BroadcastChannel', Channel);
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new DOMException('Denied', 'SecurityError');
  });
  const listener = vi.fn();
  const stop = subscribeToSessionReset(listener);
  try {
    expect(() => publishSessionReset()).not.toThrow();
    expect(listener).toHaveBeenCalledOnce();
  } finally {
    stop();
  }
});

it('uses storage events when BroadcastChannel is unavailable and ignores unrelated changes', () => {
  vi.stubGlobal('BroadcastChannel', undefined);
  const listener = vi.fn();
  const stop = subscribeToSessionReset(listener);
  try {
    window.dispatchEvent(new StorageEvent('storage', { key: 'unrelated', newValue: 'id' }));
    window.dispatchEvent(new StorageEvent('storage', { key: sessionResetKey, newValue: null }));
    expect(listener).not.toHaveBeenCalled();
    window.dispatchEvent(
      new StorageEvent('storage', { key: sessionResetKey, newValue: 'reset-id' }),
    );
    expect(listener).toHaveBeenCalledOnce();
  } finally {
    stop();
  }
});

it('detects a reset missed while a page was suspended', () => {
  const listener = vi.fn();
  const stop = subscribeToSessionReset(listener);
  try {
    localStorage.setItem(sessionResetKey, 'reset-while-suspended');
    window.dispatchEvent(new Event('pageshow'));
    expect(listener).toHaveBeenCalledOnce();
    window.dispatchEvent(new Event('pageshow'));
    expect(listener).toHaveBeenCalledOnce();
  } finally {
    stop();
  }
});

// @vitest-environment jsdom
import { afterEach, expect, it, vi } from 'vitest';

import { localStorageAccess, sessionStorageAccess } from './browser-storage';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  window.localStorage.clear();
  window.sessionStorage.clear();
});

it('persists independently to local and session storage and removes only the requested key', () => {
  expect(localStorageAccess.set('preference', 'saved')).toBe(true);
  expect(sessionStorageAccess.set('preference', 'session')).toBe(true);
  expect(localStorageAccess.get('preference')).toEqual({ ok: true, value: 'saved' });
  expect(sessionStorageAccess.get('preference')).toEqual({ ok: true, value: 'session' });
  expect(localStorageAccess.keys()).toEqual(['preference']);
  expect(localStorageAccess.remove('preference')).toBe(true);
  expect(localStorageAccess.get('preference')).toEqual({ ok: true, value: null });
  expect(sessionStorageAccess.get('preference').value).toBe('session');
  expect(sessionStorageAccess.remove('preference')).toBe(true);
});

it('protects reads, writes, removals and enumeration when a browser denies storage', () => {
  for (const [name, access] of [
    ['localStorage', localStorageAccess],
    ['sessionStorage', sessionStorageAccess],
  ] as const) {
    vi.spyOn(window, name, 'get').mockImplementation(() => {
      throw new DOMException('Storage denied', 'SecurityError');
    });
    expect(access.get('key')).toEqual({ ok: false, value: null });
    expect(access.set('key', 'value')).toBe(false);
    expect(access.remove('key')).toBe(false);
    expect(access.keys()).toEqual([]);
  }
});

it('reports unavailable storage during SSR without accessing browser globals', () => {
  vi.stubGlobal('window', undefined);
  for (const access of [localStorageAccess, sessionStorageAccess]) {
    expect(access.get('key')).toEqual({ ok: false, value: null });
    expect(access.set('key', 'value')).toBe(false);
    expect(access.remove('key')).toBe(false);
    expect(access.keys()).toEqual([]);
  }
});

it('filters storage events by area while allowing clear and synthetic events', () => {
  const local = new StorageEvent('storage', { key: null, storageArea: window.localStorage });
  const session = new StorageEvent('storage', { storageArea: window.sessionStorage });
  expect(localStorageAccess.matchesEvent(local)).toBe(true);
  expect(localStorageAccess.matchesEvent(session)).toBe(false);
  expect(sessionStorageAccess.matchesEvent(session)).toBe(true);
  expect(localStorageAccess.matchesEvent(new StorageEvent('storage'))).toBe(true);
  vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
    throw new DOMException('Storage denied', 'SecurityError');
  });
  expect(localStorageAccess.matchesEvent(local)).toBe(false);
});

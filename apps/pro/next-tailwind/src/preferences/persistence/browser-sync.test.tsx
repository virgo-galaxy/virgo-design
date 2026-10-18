// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { getTheme } from '@virgo-design/themes';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import { clearDemoStorage } from '@/demo/client/reset';

import { disposePreferences, initializePreferences } from '../bootstrap/initialize-preferences';
import { useAppPreferences } from '../hooks/use-app-preferences';
import {
  defaultPreferences,
  preferencesStorageKey,
  serializePreferences,
} from '../model/preferences';
import { usePreferencesStore } from '../store';
import { preferencesStore } from '../store';

const mediaListeners = new Set<() => void>();
beforeEach(() => {
  localStorage.clear();
  vi.useFakeTimers();
  mediaListeners.clear();
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener: (_: string, listener: () => void) => mediaListeners.add(listener),
    removeEventListener: (_: string, listener: () => void) => mediaListeners.delete(listener),
  }));
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it('shares one preference state across mounted readers and remounts with a single browser subscription', () => {
  initializePreferences();
  const first = renderHook(() => useAppPreferences());
  const second = renderHook(() => useAppPreferences());
  act(() => first.result.current.updatePreferences({ theme: 'soft', appearance: 'dark' }));
  expect(second.result.current.preferences.theme).toBe('soft');
  expect(second.result.current.appearance).toBe('dark');
  expect(document.documentElement.dataset.theme).toBe('dark');
  expect(getTheme()).toBe('soft');
  first.unmount();
  const third = renderHook(() => useAppPreferences());
  expect(third.result.current.preferences.theme).toBe('soft');
  expect(mediaListeners.size).toBe(1);
});

it('does not rerender a theme selector when an unrelated preference changes', () => {
  initializePreferences();
  const render = vi.fn(() => usePreferencesStore((state) => state.preferences.theme));
  const { result } = renderHook(render);
  const count = render.mock.calls.length;
  act(() => preferencesStore.getState().updatePreferences({ sidebarWidth: 280 }));
  expect(render).toHaveBeenCalledTimes(count);
  act(() => preferencesStore.getState().updatePreferences({ theme: 'soft' }));
  expect(result.current).toBe('soft');
});

it('merges pending local edits with different fields received from another tab before saving', () => {
  initializePreferences();
  preferencesStore.getState().updatePreferences({ sidebarWidth: 280 });
  const incoming = serializePreferences({
    ...defaultPreferences,
    appearance: 'dark',
    theme: 'soft',
  });
  localStorage.setItem(preferencesStorageKey, incoming);
  window.dispatchEvent(
    new StorageEvent('storage', { key: preferencesStorageKey, newValue: incoming }),
  );
  expect(preferencesStore.getState().preferences).toMatchObject({
    sidebarWidth: 280,
    appearance: 'dark',
    theme: 'soft',
  });
  expect(getTheme()).toBe('soft');
  expect(document.documentElement.dataset.theme).toBe('dark');
  vi.advanceTimersByTime(200);
  expect(JSON.parse(localStorage.getItem(preferencesStorageKey)!)).toMatchObject({
    sidebarWidth: 280,
    appearance: 'dark',
    theme: 'soft',
  });
});

it('retains unsaved changes when storage is denied and saves them after storage recovers', () => {
  initializePreferences();
  const write = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('Denied');
  });
  preferencesStore.getState().updatePreferences({ sidebarWidth: 280, appearance: 'dark' });
  vi.advanceTimersByTime(200);
  expect(preferencesStore.getState().storageAvailable).toBe(false);
  expect(preferencesStore.getState().preferences.appearance).toBe('dark');
  write.mockRestore();
  window.dispatchEvent(new Event('pagehide'));
  expect(preferencesStore.getState().storageAvailable).toBe(true);
  expect(JSON.parse(localStorage.getItem(preferencesStorageKey)!)).toMatchObject({
    sidebarWidth: 280,
    appearance: 'dark',
  });
});

it('restricts non-admin writes to appearance and theme while preserving saved layout', () => {
  localStorage.setItem(
    preferencesStorageKey,
    serializePreferences({ ...defaultPreferences, sidebarWidth: 280, showHeader: false }),
  );
  initializePreferences();
  const { result } = renderHook(() => useAppPreferences(false));
  act(() =>
    result.current.updatePreferences({ sidebarWidth: 300, showHeader: true, appearance: 'dark' }),
  );
  act(() => vi.advanceTimersByTime(200));
  expect(result.current.preferences.showHeader).toBe(true);
  expect(JSON.parse(localStorage.getItem(preferencesStorageKey)!)).toMatchObject({
    sidebarWidth: 280,
    showHeader: false,
    appearance: 'dark',
  });
});

it('cancels queued persistence on demo reset and on disposal', () => {
  initializePreferences();
  preferencesStore.getState().updatePreferences({ theme: 'soft', sidebarWidth: 280 });
  clearDemoStorage();
  vi.advanceTimersByTime(200);
  window.dispatchEvent(new Event('pagehide'));
  expect(localStorage.getItem(preferencesStorageKey)).toBeNull();
  expect(preferencesStore.getState().preferences).toEqual(defaultPreferences);
  preferencesStore.getState().updatePreferences({ appearance: 'dark' });
  disposePreferences();
  vi.advanceTimersByTime(200);
  window.dispatchEvent(new Event('pagehide'));
  expect(localStorage.getItem(preferencesStorageKey)).toBeNull();
  expect(mediaListeners.size).toBe(0);
});

it('keeps initialization idempotent without discarding pending user edits', () => {
  initializePreferences();
  preferencesStore.getState().updatePreferences({ theme: 'soft' });
  initializePreferences();
  expect(preferencesStore.getState().preferences.theme).toBe('soft');
  expect(mediaListeners.size).toBe(1);
  vi.advanceTimersByTime(200);
  expect(JSON.parse(localStorage.getItem(preferencesStorageKey)!)).toMatchObject({ theme: 'soft' });
});

it('discards queued writes when another tab clears the saved preferences', () => {
  initializePreferences();
  preferencesStore.getState().updatePreferences({ theme: 'soft', appearance: 'dark' });
  window.dispatchEvent(new StorageEvent('storage', { key: preferencesStorageKey, newValue: null }));
  vi.advanceTimersByTime(200);
  window.dispatchEvent(new Event('pagehide'));
  expect(localStorage.getItem(preferencesStorageKey)).toBeNull();
  expect(preferencesStore.getState().preferences).toEqual(defaultPreferences);
});

// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { getTheme, initializeTheme, themeStorageKey } from '@virgo-design/themes';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import { useAppPreferences } from '../hooks/use-app-preferences';
import {
  defaultPreferences,
  preferencesStorageKey,
  serializePreferences,
} from '../model/preferences';
import { preferencesStore } from '../store';
import { initializePreferences } from './initialize-preferences';

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  }));
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  localStorage.clear();
  initializeTheme();
});

it('restores theme, appearance and layout from the application record without rewriting storage', () => {
  const record = serializePreferences({
    ...defaultPreferences,
    theme: 'soft',
    appearance: 'dark',
    sidebarWidth: 280,
  });
  localStorage.setItem(preferencesStorageKey, record);
  localStorage.setItem(themeStorageKey, 'glass');
  const write = vi.spyOn(Storage.prototype, 'setItem');
  initializePreferences();
  expect(getTheme()).toBe('soft');
  expect(document.documentElement.dataset.theme).toBe('dark');
  expect(preferencesStore.getState().preferences.sidebarWidth).toBe(280);
  expect(localStorage.getItem(preferencesStorageKey)).toBe(record);
  expect(localStorage.getItem(themeStorageKey)).toBe('glass');
  expect(write).not.toHaveBeenCalled();
});

it.each([
  null,
  '{',
  JSON.stringify([]),
  JSON.stringify({
    theme: 'unknown-theme',
    appearance: 'invalid',
    sidebarWidth: 'wide',
  }),
])('uses configured defaults for missing or invalid saved preferences: %s', (raw) => {
  if (raw !== null) localStorage.setItem(preferencesStorageKey, raw);
  initializePreferences();
  expect(preferencesStore.getState().preferences).toEqual(defaultPreferences);
  expect(getTheme()).toBe(defaultPreferences.theme);
  expect(localStorage.getItem(preferencesStorageKey)).toBe(raw);
});

it('restores theme, appearance and layout together without a stale pending save', () => {
  vi.useFakeTimers();
  initializePreferences();
  const { result, unmount } = renderHook(() => useAppPreferences());
  act(() => {
    result.current.updatePreferences({ appearance: 'dark', sidebarWidth: 280 });
    preferencesStore.getState().updatePreferences({ theme: 'contrast' });
  });
  expect(result.current.preferences.theme).toBe('contrast');
  act(() => {
    result.current.resetPreferences();
  });
  act(() => {
    vi.advanceTimersByTime(500);
  });
  expect(getTheme()).toBe(defaultPreferences.theme);
  expect(document.documentElement.dataset.virgoTheme).toBe(defaultPreferences.theme);
  expect(result.current.preferences).toEqual(defaultPreferences);
  expect(JSON.parse(localStorage.getItem(preferencesStorageKey)!)).toEqual({
    ...defaultPreferences,
  });
  unmount();
});

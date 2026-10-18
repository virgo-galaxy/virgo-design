// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import { initializePreferences } from '../bootstrap/initialize-preferences';
import {
  defaultPreferences,
  preferencesStorageKey,
  serializePreferences,
} from '../model/preferences';
import { useAppPreferences } from './use-app-preferences';

let dark = false;
const listeners = new Set<() => void>();

beforeEach(() => {
  localStorage.removeItem(preferencesStorageKey);
  dark = false;
  listeners.clear();

  vi.stubGlobal('matchMedia', (query: string) => ({
    get matches() {
      return query === '(prefers-color-scheme: dark)' && dark;
    },
    media: query,
    addEventListener: (_: string, fn: () => void) => {
      if (query === '(prefers-color-scheme: dark)') listeners.add(fn);
    },
    removeEventListener: (_: string, fn: () => void) => listeners.delete(fn),
  }));
});

afterEach(() => vi.unstubAllGlobals());

it('preserves system mode across remounts and continues following system changes', () => {
  localStorage.setItem(
    preferencesStorageKey,
    serializePreferences({ ...defaultPreferences, appearance: 'system' }),
  );
  initializePreferences();
  const first = renderHook(() => useAppPreferences());
  expect(first.result.current.appearance).toBe('light');
  expect(first.result.current.preferences.appearance).toBe('system');
  first.unmount();
  act(() => {
    dark = true;
    listeners.forEach((fn) => fn());
  });
  const second = renderHook(() => useAppPreferences());
  expect(second.result.current.preferences.appearance).toBe('system');
  expect(second.result.current.appearance).toBe('dark');
  act(() => {
    dark = false;
    listeners.forEach((fn) => fn());
  });
  expect(second.result.current.appearance).toBe('light');
});

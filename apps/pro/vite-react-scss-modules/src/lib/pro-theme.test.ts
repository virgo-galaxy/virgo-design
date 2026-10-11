// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { getTheme, initializeTheme, setTheme, themeStorageKey } from '@virgo-design/themes';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import {
  defaultProSettings,
  serializeProSettings,
  settingsStorageKey,
} from '@/components/global-settings/settings';
import { useProSettings } from '@/components/global-settings/useProSettings';

import { initializeProTheme } from './pro-theme';

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

it.each([
  ['utility', 'retro'],
  ['high-contrast', 'bold'],
])('moves legacy theme %s into the settings JSON as %s', (oldId, newId) => {
  const record = JSON.parse(serializeProSettings({ ...defaultProSettings, sidebarWidth: 280 }));
  delete record.theme;
  localStorage.setItem(settingsStorageKey, JSON.stringify(record));
  localStorage.setItem(themeStorageKey, oldId!);
  expect(initializeProTheme()).toBe(newId);
  expect(JSON.parse(localStorage.getItem(settingsStorageKey)!)).toMatchObject({
    theme: newId,
    sidebarWidth: 280,
  });
  expect(localStorage.getItem(themeStorageKey)).toBeNull();
});

it('prefers the settings JSON, upgrades its IDs and never creates a separate theme key', () => {
  localStorage.setItem(
    settingsStorageKey,
    serializeProSettings({ ...defaultProSettings, theme: 'utility', headerHeight: 80 }),
  );
  localStorage.setItem(themeStorageKey, 'high-contrast');
  expect(initializeProTheme()).toBe('retro');
  setTheme('bold');
  expect(JSON.parse(localStorage.getItem(settingsStorageKey)!)).toMatchObject({
    theme: 'bold',
    headerHeight: 80,
  });
  expect(localStorage.getItem(themeStorageKey)).toBeNull();
});

it('restores theme, appearance and layout together without a stale pending save', () => {
  vi.useFakeTimers();
  initializeProTheme();
  const { result, unmount } = renderHook(() => useProSettings());
  act(() => {
    result.current.updateSettings({ appearance: 'dark', sidebarWidth: 280 });
    setTheme('bold');
  });
  expect(result.current.settings.theme).toBe('bold');
  act(() => {
    result.current.resetSettings();
  });
  act(() => {
    vi.advanceTimersByTime(500);
  });
  expect(getTheme()).toBe(defaultProSettings.theme);
  expect(document.documentElement.dataset.virgoTheme).toBe(defaultProSettings.theme);
  expect(result.current.settings).toEqual(defaultProSettings);
  expect(JSON.parse(localStorage.getItem(settingsStorageKey)!)).toEqual({
    version: 1,
    ...defaultProSettings,
  });
  expect(localStorage.getItem(themeStorageKey)).toBeNull();
  unmount();
});

it('synchronizes theme and layout together from another tab', () => {
  vi.useFakeTimers();
  initializeProTheme();
  const { result, unmount } = renderHook(() => useProSettings());
  const incoming = serializeProSettings({
    ...defaultProSettings,
    theme: 'retro',
    sidebarWidth: 280,
  });
  act(() => {
    localStorage.setItem(settingsStorageKey, incoming);
    window.dispatchEvent(
      new StorageEvent('storage', { key: settingsStorageKey, newValue: incoming }),
    );
  });
  act(() => {
    vi.advanceTimersByTime(500);
  });
  expect(result.current.settings).toMatchObject({ theme: 'retro', sidebarWidth: 280 });
  expect(getTheme()).toBe('retro');
  expect(JSON.parse(localStorage.getItem(settingsStorageKey)!)).toMatchObject({
    theme: 'retro',
    sidebarWidth: 280,
  });
  unmount();
});

it('falls back safely when the settings JSON is malformed or storage is denied', () => {
  localStorage.setItem(settingsStorageKey, '{');
  expect(initializeProTheme()).toBe(defaultProSettings.theme);
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw new Error('denied');
  });
  expect(initializeProTheme()).toBe(defaultProSettings.theme);
  expect(() => setTheme('glass')).not.toThrow();
});

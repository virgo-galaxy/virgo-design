// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { getTheme, initializeTheme, setTheme, themeStorageKey } from '@virgo-design/themes';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import { useProSettings } from '../hooks/useProSettings';
import {
  defaultProSettings,
  getFixedHeaderMaterial,
  serializeProSettings,
  settingsStorageKey,
} from '../model/settings';
import { initializeProTheme } from './initialize-theme';

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
  ['high-contrast', 'contrast'],
  ['bold', 'contrast'],
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
  expect(document.documentElement.dataset.virgoTheme).toBe(newId);
});

it.each(['bold', 'high-contrast'])(
  'canonicalizes saved settings theme %s directly to contrast',
  (theme) => {
    localStorage.setItem(
      settingsStorageKey,
      serializeProSettings({
        ...defaultProSettings,
        theme,
        appearance: 'dark',
        sidebarWidth: 280,
        headerHeight: 80,
      }),
    );
    localStorage.setItem(themeStorageKey, 'soft');
    expect(initializeProTheme()).toBe('contrast');
    expect(document.documentElement.dataset.virgoTheme).toBe('contrast');
    expect(JSON.parse(localStorage.getItem(settingsStorageKey)!)).toMatchObject({
      theme: 'contrast',
      appearance: 'dark',
      sidebarWidth: 280,
      headerHeight: 80,
    });
    expect(localStorage.getItem(themeStorageKey)).toBeNull();
  },
);

it('keeps the Contrast header opaque', () => {
  expect(getFixedHeaderMaterial('contrast')).toBe('solid');
});

it('prefers the settings JSON, upgrades its IDs and never creates a separate theme key', () => {
  localStorage.setItem(
    settingsStorageKey,
    serializeProSettings({ ...defaultProSettings, theme: 'utility', headerHeight: 80 }),
  );
  localStorage.setItem(themeStorageKey, 'high-contrast');
  expect(initializeProTheme()).toBe('retro');
  setTheme('contrast');
  expect(JSON.parse(localStorage.getItem(settingsStorageKey)!)).toMatchObject({
    theme: 'contrast',
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
    setTheme('contrast');
  });
  expect(result.current.settings.theme).toBe('contrast');
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
    theme: 'contrast',
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
  expect(result.current.settings).toMatchObject({ theme: 'contrast', sidebarWidth: 280 });
  expect(getTheme()).toBe('contrast');
  expect(JSON.parse(localStorage.getItem(settingsStorageKey)!)).toMatchObject({
    theme: 'contrast',
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

it.each(['bold', 'high-contrast'])('normalizes %s settings received from another tab', (theme) => {
  vi.useFakeTimers();
  initializeProTheme();
  const { result, unmount } = renderHook(() => useProSettings());
  const incoming = serializeProSettings({ ...defaultProSettings, theme, sidebarWidth: 280 });
  act(() => {
    localStorage.setItem(settingsStorageKey, incoming);
    window.dispatchEvent(
      new StorageEvent('storage', { key: settingsStorageKey, newValue: incoming }),
    );
  });
  act(() => {
    vi.advanceTimersByTime(500);
  });
  expect(result.current.settings).toMatchObject({ theme: 'contrast', sidebarWidth: 280 });
  expect(getTheme()).toBe('contrast');
  expect(document.documentElement.dataset.virgoTheme).toBe('contrast');
  expect(JSON.parse(localStorage.getItem(settingsStorageKey)!)).toMatchObject({
    theme: 'contrast',
    sidebarWidth: 280,
  });
  unmount();
});

// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { getTheme, initializeTheme, setTheme, themeStorageKey } from '@virgo-design/themes';
import { afterEach, expect, it, vi } from 'vitest';

import {
  defaultProSettings,
  initializeProTheme,
  settingsStorageKey,
  useProSettings,
} from '@/features/settings';
import {
  taskTableStorageKey,
  useTaskTableSettings,
} from '@/features/tasks/hooks/use-table-settings';
import { clearDemoStorage } from '@/lib/demo/reset';

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  initializeTheme();
});
it('does not let pending settings writes or pagehide recreate old preferences after reset', () => {
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  }));
  vi.useFakeTimers();
  initializeProTheme();
  const { result, unmount } = renderHook(() => ({
    global: useProSettings(),
    table: useTaskTableSettings(),
  }));
  act(() => {
    result.current.global.updateSettings({ appearance: 'dark' });
    setTheme('contrast');
    result.current.table.setSettings((settings) => ({ ...settings, striped: true }));
  });
  act(() => {
    clearDemoStorage();
    vi.advanceTimersByTime(500);
    window.dispatchEvent(new Event('pagehide'));
  });
  expect(localStorage.getItem(settingsStorageKey)).toBeNull();
  expect(localStorage.getItem(taskTableStorageKey)).toBeNull();
  expect(localStorage.getItem(themeStorageKey)).toBeNull();
  expect(getTheme()).toBe(defaultProSettings.theme);
  expect(document.documentElement.dataset.virgoTheme).toBe(defaultProSettings.theme);
  unmount();
});

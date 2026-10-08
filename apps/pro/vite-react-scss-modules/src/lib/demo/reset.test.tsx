// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';

import { settingsStorageKey } from '@/components/global-settings/settings';
import { useProSettings } from '@/components/global-settings/useProSettings';
import { taskTableStorageKey, useTaskTableSettings } from '@/pages/tasks/use-table-settings';

import { clearDemoStorage } from './reset';

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});
it('does not let pending settings writes or pagehide recreate old preferences after reset', () => {
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  }));
  vi.useFakeTimers();
  const { result, unmount } = renderHook(() => ({
    global: useProSettings(),
    table: useTaskTableSettings(),
  }));
  act(() => {
    result.current.global.updateSettings({ appearance: 'dark' });
    result.current.table.setSettings((settings) => ({ ...settings, striped: true }));
  });
  act(() => {
    clearDemoStorage();
    vi.advanceTimersByTime(500);
    window.dispatchEvent(new Event('pagehide'));
  });
  expect(localStorage.getItem(settingsStorageKey)).toBeNull();
  expect(localStorage.getItem(taskTableStorageKey)).toBeNull();
  unmount();
});

// @vitest-environment jsdom
import { act, renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, expect, it, vi } from 'vitest';

import { taskTableStorageKey } from '../../model/table-preferences';
import { defaultTableSettings } from '../../model/table-settings';
import { TaskTableStoreProvider } from '../context/TaskTableStoreProvider';
import { useTaskTableSettings } from './use-task-table-settings';

afterEach(() => {
  vi.restoreAllMocks();
  window.localStorage.removeItem(taskTableStorageKey);
});

it('saves a changed preference and restores it on the next mount', async () => {
  const first = renderHook(useTaskTableSettings, { wrapper });
  act(() => first.result.current.setSettings({ ...defaultTableSettings(), size: 'mini' }));
  await waitFor(() => expect(window.localStorage.getItem(taskTableStorageKey)).toContain('"mini"'));
  first.unmount();
  const second = renderHook(useTaskTableSettings, { wrapper });
  expect(second.result.current.settings.size).toBe('mini');
});

it('keeps settings usable when browser storage is unavailable', async () => {
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('Unavailable');
  });
  const { result } = renderHook(useTaskTableSettings, { wrapper });
  act(() => result.current.setSettings({ ...defaultTableSettings(), size: 'large' }));
  await waitFor(() => expect(result.current.storageAvailable).toBe(false));
  expect(result.current.settings.size).toBe('large');
});

function wrapper({ children }: { children: ReactNode }) {
  return <TaskTableStoreProvider canPersist>{children}</TaskTableStoreProvider>;
}

it('shares changes between readers and flushes a pending save when the session unmounts', () => {
  const view = renderHook(
    () => ({ first: useTaskTableSettings(), second: useTaskTableSettings() }),
    { wrapper },
  );
  act(() => view.result.current.first.setSettings((settings) => ({ ...settings, striped: true })));
  expect(view.result.current.second.settings.striped).toBe(true);
  view.unmount();
  expect(JSON.parse(localStorage.getItem(taskTableStorageKey)!).striped).toBe(true);
});

it('keeps non-admin table adjustments in memory without overwriting saved browser settings', async () => {
  vi.useFakeTimers();
  try {
    const view = renderHook(useTaskTableSettings, {
      wrapper: ({ children }: { children: ReactNode }) => (
        <TaskTableStoreProvider canPersist={false}>{children}</TaskTableStoreProvider>
      ),
    });
    act(() => {
      view.result.current.setSettings((settings) => ({ ...settings, size: 'mini' }));
      vi.advanceTimersByTime(500);
      window.dispatchEvent(new Event('pagehide'));
    });
    expect(view.result.current.settings.size).toBe('mini');
    view.unmount();
    expect(localStorage.getItem(taskTableStorageKey)).toBeNull();
  } finally {
    vi.useRealTimers();
  }
});

it('accepts cross-tab preferences and cancels pending edits after a cross-tab clear', () => {
  vi.useFakeTimers();
  try {
    const view = renderHook(useTaskTableSettings, { wrapper });
    const incoming = JSON.stringify({
      ...defaultTableSettings(),
      size: 'large',
    });
    act(() => {
      localStorage.setItem(taskTableStorageKey, incoming);
      window.dispatchEvent(
        new StorageEvent('storage', { key: taskTableStorageKey, newValue: incoming }),
      );
    });
    expect(view.result.current.settings.size).toBe('large');
    act(() => {
      view.result.current.setSettings((settings) => ({ ...settings, size: 'mini' }));
      localStorage.removeItem(taskTableStorageKey);
      window.dispatchEvent(
        new StorageEvent('storage', { key: taskTableStorageKey, newValue: null }),
      );
      vi.advanceTimersByTime(500);
    });
    expect(view.result.current.settings.size).toBe(defaultTableSettings().size);
    expect(localStorage.getItem(taskTableStorageKey)).toBeNull();
  } finally {
    vi.useRealTimers();
  }
});

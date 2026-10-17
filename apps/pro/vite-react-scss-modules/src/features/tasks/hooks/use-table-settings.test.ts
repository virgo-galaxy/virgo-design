// @vitest-environment jsdom
import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';

import { defaultTableSettings } from '../config/table-settings';
import { taskTableStorageKey } from '../model/table-preferences';
import { useTaskTableSettings } from './use-table-settings';

afterEach(() => {
  vi.restoreAllMocks();
  window.localStorage.removeItem(taskTableStorageKey);
});

it('saves a changed preference and restores it on the next mount', async () => {
  const first = renderHook(useTaskTableSettings);
  act(() => first.result.current.setSettings({ ...defaultTableSettings(), size: 'mini' }));
  await waitFor(() => expect(window.localStorage.getItem(taskTableStorageKey)).toContain('"mini"'));
  first.unmount();
  const second = renderHook(useTaskTableSettings);
  expect(second.result.current.settings.size).toBe('mini');
});

it('keeps settings usable when browser storage is unavailable', async () => {
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('Unavailable');
  });
  const { result } = renderHook(useTaskTableSettings);
  act(() => result.current.setSettings({ ...defaultTableSettings(), size: 'large' }));
  await waitFor(() => expect(result.current.storageAvailable).toBe(false));
  expect(result.current.settings.size).toBe('large');
});

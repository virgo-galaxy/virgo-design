// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react';
import { getTheme } from '@virgo-design/themes';
import type { ReactNode } from 'react';
import { afterEach, expect, it, vi } from 'vitest';

import type { SessionUser } from '@/api/auth/types';
import { useAgentMode } from '@/features/ai-workspace/store';
import { useHandoffStore } from '@/features/handoff/store';
import { useTaskTableSettings } from '@/features/tasks/store';
import { clearDemoStorage } from '@/mock/data/reset';
import { defaultPreferences, preferencesStorageKey, useAppPreferences } from '@/preferences';
import {
  type ResourceChanges,
  type ResourceSubscriber,
  useInvalidateResources,
  useResourceRevision,
} from '@/store/resources';

import { initializeAppStores } from '../bootstrap';
import { clearStoredSessionState } from './session-stores';
import { SessionStoreProvider } from './SessionStoreProvider';

const admin: SessionUser = {
  id: 'admin',
  account: 'admin',
  name: 'Admin',
  role: 'admin',
  jobTitle: 'Administrator',
  department: 'Platform',
  projects: [],
  managedProjects: [],
};

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  localStorage.clear();
  sessionStorage.clear();
});

it('keeps one set across rerenders and replaces all business stores when identity changes', () => {
  let user = admin;
  const view = renderHook(
    () => ({
      handoff: useHandoffStore((state) => state),
      table: useTaskTableSettings(),
      revision: useResourceRevision('tasks'),
      invalidate: useInvalidateResources(),
    }),
    {
      wrapper: ({ children }: { children: ReactNode }) => (
        <SessionStoreProvider user={user}>{children}</SessionStoreProvider>
      ),
    },
  );
  act(() => {
    view.result.current.handoff.setDraft((draft) => ({ ...draft, notes: 'Private draft' }));
    view.result.current.handoff.setStage(1);
    view.result.current.invalidate({ tasks: true });
  });
  const oldDraft = view.result.current.handoff;
  const invalidateOldSession = view.result.current.invalidate;
  user = { ...admin, name: 'Updated display name' };
  view.rerender();
  expect(view.result.current.handoff.draft.notes).toBe('Private draft');
  expect(view.result.current.revision).toBe(1);
  user = { ...admin, id: 'next-user', role: 'member' };
  view.rerender();
  act(() => {
    oldDraft.setDraft((draft) => ({ ...draft, notes: 'Late old-session edit' }));
    invalidateOldSession({ tasks: true });
  });
  expect(view.result.current.handoff.draft.notes).toBe('');
  expect(view.result.current.handoff.stage).toBe(0);
  expect(view.result.current.revision).toBe(0);
});

it('keeps one resource subscription per session and releases it on identity change and unmount', () => {
  const listeners = new Set<(changes: ResourceChanges) => void>();
  const unsubscribe = vi.fn();
  const subscribeToChanges = vi.fn<ResourceSubscriber>((listener) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
      unsubscribe();
    };
  });
  const changes: ResourceChanges = {
    tasks: true,
    catalog: false,
    profile: false,
    workflows: false,
    notifications: false,
  };
  let user = admin;
  const view = renderHook(() => useResourceRevision('tasks'), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <SessionStoreProvider user={user} subscribeToChanges={subscribeToChanges}>
        {children}
      </SessionStoreProvider>
    ),
  });

  act(() => listeners.forEach((listener) => listener(changes)));
  expect(view.result.current).toBe(1);

  view.rerender();
  expect(subscribeToChanges).toHaveBeenCalledTimes(1);
  expect(listeners.size).toBe(1);

  user = { ...admin, id: 'next-user', role: 'member' };
  view.rerender();
  expect(unsubscribe).toHaveBeenCalledTimes(1);
  expect(subscribeToChanges).toHaveBeenCalledTimes(2);
  expect(listeners.size).toBe(1);
  expect(view.result.current).toBe(0);

  act(() => listeners.forEach((listener) => listener(changes)));
  expect(view.result.current).toBe(1);

  view.unmount();
  expect(unsubscribe).toHaveBeenCalledTimes(2);
  expect(listeners.size).toBe(0);
});

it('passes live permissions to feature stores without losing the current business draft', () => {
  let user = admin;
  const view = renderHook(
    () => ({
      workspace: useAgentMode(),
      table: useTaskTableSettings(),
      handoff: useHandoffStore((state) => state),
    }),
    {
      wrapper: ({ children }: { children: ReactNode }) => (
        <SessionStoreProvider user={user}>{children}</SessionStoreProvider>
      ),
    },
  );
  act(() => {
    view.result.current.workspace.setAgentMode(true);
    view.result.current.handoff.setDraft((draft) => ({ ...draft, notes: 'Keep this draft' }));
  });
  expect(sessionStorage.getItem('virgo-pro.workspace.agent-mode')).toBe('true');
  user = { ...admin, role: 'member' };
  view.rerender();
  expect(view.result.current.workspace.agentMode).toBe(false);
  expect(sessionStorage.getItem('virgo-pro.workspace.agent-mode')).toBeNull();
  expect(view.result.current.handoff.draft.notes).toBe('Keep this draft');
  act(() => {
    view.result.current.table.setSettings((settings) => ({ ...settings, size: 'mini' }));
    window.dispatchEvent(new Event('pagehide'));
  });
  view.unmount();
  expect(localStorage.getItem('virgo-pro.tasks-table')).toBeNull();
});

it('cleans up a logged-out session while application preferences survive the next login', () => {
  initializeAppStores();
  const first = renderHook(
    () => ({
      workspace: useAgentMode(),
      preferences: useAppPreferences(),
    }),
    {
      wrapper: ({ children }: { children: ReactNode }) => (
        <SessionStoreProvider user={admin}>{children}</SessionStoreProvider>
      ),
    },
  );
  act(() => {
    first.result.current.workspace.setAgentMode(true);
    first.result.current.preferences.updatePreferences({ appearance: 'dark' });
  });
  const oldWorkspace = first.result.current.workspace;
  clearStoredSessionState();
  first.unmount();
  const second = renderHook(
    () => ({
      workspace: useAgentMode(),
      preferences: useAppPreferences(),
    }),
    {
      wrapper: ({ children }: { children: ReactNode }) => (
        <SessionStoreProvider user={{ ...admin, id: 'next-user' }}>{children}</SessionStoreProvider>
      ),
    },
  );
  act(() => {
    oldWorkspace.setAgentMode(false);
    oldWorkspace.setAgentMode(true);
  });
  expect(second.result.current.workspace.agentMode).toBe(false);
  expect(sessionStorage.getItem('virgo-pro.workspace.agent-mode')).toBeNull();
  expect(second.result.current.preferences.appearance).toBe('dark');
});

it('does not recreate reset preferences from pending writes, pagehide or session disposal', () => {
  vi.useFakeTimers();
  initializeAppStores();
  const view = renderHook(
    () => ({ preferences: useAppPreferences(), table: useTaskTableSettings() }),
    {
      wrapper: ({ children }: { children: ReactNode }) => (
        <SessionStoreProvider user={admin}>{children}</SessionStoreProvider>
      ),
    },
  );
  act(() => {
    view.result.current.preferences.updatePreferences({ appearance: 'dark', theme: 'contrast' });
    view.result.current.table.setSettings((settings) => ({ ...settings, striped: true }));
    clearDemoStorage();
    vi.advanceTimersByTime(500);
    window.dispatchEvent(new Event('pagehide'));
  });
  expect(view.result.current.preferences.preferences).toEqual(defaultPreferences);
  expect(getTheme()).toBe(defaultPreferences.theme);
  view.unmount();
  expect(localStorage.getItem(preferencesStorageKey)).toBeNull();
  expect(localStorage.getItem('virgo-pro.tasks-table')).toBeNull();
});

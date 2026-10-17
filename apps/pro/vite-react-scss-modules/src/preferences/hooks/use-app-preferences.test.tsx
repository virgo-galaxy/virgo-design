// @vitest-environment jsdom
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterAll, afterEach, beforeAll, beforeEach, expect, it, vi } from 'vitest';

import { login } from '@/api/auth';
import { ProfileIdentityResourceContext } from '@/features/profile';
import { AppShell } from '@/layout/shell/AppShell';
import { handlers } from '@/mock/handlers';
import { TestSessionProvider } from '@/test/TestSessionProvider';

import { initializePreferences } from '../bootstrap/initialize-preferences';
import {
  defaultPreferences,
  preferencesStorageKey,
  serializePreferences,
} from '../model/preferences';
import { preferencesStore } from '../store';
import { useAppPreferences } from './use-app-preferences';
const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
let dark = false;
const listeners = new Set<() => void>();
beforeEach(() => {
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', { configurable: true, value: vi.fn() });
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
it.each(['ava', 'nina'])(
  'keeps navigation and account access when %s inherits hidden admin layout',
  async (account) => {
    await login({ account, password: 'virgo123' });
    localStorage.setItem(
      preferencesStorageKey,
      serializePreferences({ ...defaultPreferences, showHeader: false, sidebarState: 'hidden' }),
    );
    renderShell();
    expect(screen.getByRole('button', { name: /account/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Settings' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Tasks' })).toBeInTheDocument();
  },
);
it('retains an account menu and a working restore control for hidden admin header and sidebar', () => {
  localStorage.setItem(
    preferencesStorageKey,
    serializePreferences({ ...defaultPreferences, showHeader: false, sidebarState: 'hidden' }),
  );
  renderShell();
  expect(screen.getAllByRole('button', { name: /account/i })).toHaveLength(1);
  fireEvent.click(screen.getByRole('button', { name: 'Restore navigation' }));
  expect(screen.getByRole('link', { name: 'Tasks' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Restore navigation' })).not.toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /account/i })).toHaveLength(1);
});

it('keeps responsive sidebar collapse separate from the saved desktop preference', () => {
  let narrow = false;
  const resized = new Set<() => void>();
  vi.stubGlobal('matchMedia', (query: string) => ({
    get matches() {
      return query === '(max-width: 1080px)' && narrow;
    },
    addEventListener: (_: string, listener: () => void) => {
      if (query === '(max-width: 1080px)') resized.add(listener);
    },
    removeEventListener: (_: string, listener: () => void) => resized.delete(listener),
  }));
  localStorage.setItem(preferencesStorageKey, serializePreferences(defaultPreferences));
  renderShell();
  act(() => {
    narrow = true;
    resized.forEach((listener) => listener());
  });
  expect(preferencesStore.getState().preferences.sidebarState).toBe('expanded');
  expect(JSON.parse(localStorage.getItem(preferencesStorageKey)!)).toMatchObject({
    sidebarState: 'expanded',
  });
});
function renderShell() {
  initializePreferences();
  return render(
    <TestSessionProvider>
      <ProfileIdentityResourceContext
        value={{
          data: null,
          error: null,
          loading: true,
          retry: () => {},
          setData: () => {},
          saveIdentity: async () => {},
        }}
      >
        <RouterProvider
          router={createMemoryRouter(
            [
              {
                element: <AppShell agentMode={false} onAgentModeChange={() => {}} />,
                children: [{ path: '/work/tasks', element: <p>Tasks content</p> }],
              },
            ],
            { initialEntries: ['/work/tasks'] },
          )}
        />
      </ProfileIdentityResourceContext>
    </TestSessionProvider>,
  );
}

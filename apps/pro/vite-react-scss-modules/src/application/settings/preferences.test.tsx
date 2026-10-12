// @vitest-environment jsdom
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterAll, afterEach, beforeAll, beforeEach, expect, it, vi } from 'vitest';

import { login } from '@/api/auth';
import { AppShell } from '@/app/AppShell';
import { ProfileResourceContext } from '@/application/pro-data-context';
import { clearAppearance } from '@/lib/appearance';
import { handlers } from '@/mock/handlers';
import { TestSessionProvider } from '@/test/TestSessionProvider';

import { defaultProSettings, serializeProSettings, settingsStorageKey } from './model';
import { useProSettings } from './useProSettings';
const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
let dark = false;
const listeners = new Set<() => void>();
beforeEach(() => {
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', { configurable: true, value: vi.fn() });
  clearAppearance();
  localStorage.removeItem(settingsStorageKey);
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
    settingsStorageKey,
    serializeProSettings({ ...defaultProSettings, appearance: 'system' }),
  );
  const first = renderHook(() => useProSettings());
  expect(first.result.current.theme).toBe('light');
  expect(first.result.current.settings.appearance).toBe('system');
  first.unmount();
  dark = true;
  const second = renderHook(() => useProSettings());
  expect(second.result.current.settings.appearance).toBe('system');
  expect(second.result.current.theme).toBe('dark');
  act(() => {
    dark = false;
    listeners.forEach((fn) => fn());
  });
  expect(second.result.current.theme).toBe('light');
});
it('retains the selected mode when storage is denied', () => {
  const storage = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw new Error('Denied');
  });
  try {
    const first = renderHook(() => useProSettings());
    act(() => first.result.current.updateSettings({ appearance: 'dark' }));
    first.unmount();
    const second = renderHook(() => useProSettings());
    expect(second.result.current.settings.appearance).toBe('dark');
  } finally {
    storage.mockRestore();
  }
});
it.each(['ava', 'nina'])(
  'keeps navigation and account access when %s inherits hidden admin layout',
  async (account) => {
    await login({ account, password: 'virgo123' });
    localStorage.setItem(
      settingsStorageKey,
      serializeProSettings({ ...defaultProSettings, showHeader: false, sidebarState: 'hidden' }),
    );
    renderShell();
    expect(screen.getByRole('button', { name: /account/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Settings' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Tasks' })).toBeInTheDocument();
  },
);
it('retains an account menu and a working restore control for hidden admin header and sidebar', () => {
  localStorage.setItem(
    settingsStorageKey,
    serializeProSettings({ ...defaultProSettings, showHeader: false, sidebarState: 'hidden' }),
  );
  renderShell();
  expect(screen.getAllByRole('button', { name: /account/i })).toHaveLength(1);
  fireEvent.click(screen.getByRole('button', { name: 'Restore navigation' }));
  expect(screen.getByRole('link', { name: 'Tasks' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Restore navigation' })).not.toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /account/i })).toHaveLength(1);
});
function renderShell() {
  return render(
    <TestSessionProvider>
      <ProfileResourceContext
        value={{
          data: null,
          error: null,
          loading: true,
          retry: () => {},
          setData: () => {},
          saveProfile: async () => {},
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
      </ProfileResourceContext>
    </TestSessionProvider>,
  );
}

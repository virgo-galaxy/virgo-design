// @vitest-environment jsdom
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { login } from '@/api/auth';
import { sessionExpiredEvent } from '@/lib/auth/session';
import { clearAppearance } from '@/lib/theme/appearance';
import { handlers } from '@/mock/handlers';
import { routePath } from '@/routes';

import { createAppRoutes } from '../router';

const projectFailure = vi.hoisted(() => ({ current: false }));

vi.mock('@/layout/shell/AppShell', async () => {
  const { Outlet } = await import('react-router');
  const { useSession } = await import('@/features/auth');
  return {
    AppShell: function TestShell() {
      const { signOut } = useSession();
      return (
        <>
          <button onClick={() => void signOut()}>Sign out</button>
          <Outlet />
        </>
      );
    },
  };
});
vi.mock('@/pages/workplace/WorkplacePage', () => ({
  WorkplacePage: () => <h1>Workplace route</h1>,
}));
vi.mock('@/features/projects/routes', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/features/projects/routes')>()),
  loadProjectDetailPage: async () => ({
    default: () => {
      if (projectFailure.current) throw new Error('Broken project view');
      return <h1>Project route</h1>;
    },
  }),
}));
vi.mock('@/pages/exceptions/ExceptionPage', () => ({
  ExceptionPage: ({ code }: { code: string }) => <h1>Exception {code}</h1>,
}));
vi.mock('@/features/tasks/routes', async () => {
  const { useBlocker } = await import('react-router');
  const { useState } = await import('react');
  return {
    loadTasksPage: async () => ({ default: () => <h1>Tasks route</h1> }),
    loadTaskCardsPage: async () => ({ default: () => <h1>Task cards route</h1> }),
    loadTaskWorkspacePage: async () => ({
      default: function UnsavedWorkspace() {
        const [dirty, setDirty] = useState(false);
        const blocker = useBlocker(dirty);
        return (
          <>
            <h1>Unsaved task</h1>
            <button onClick={() => setDirty(true)}>Edit task</button>
            {blocker.state === 'blocked' ? (
              <button onClick={() => blocker.proceed()}>Discard and leave</button>
            ) : null}
          </>
        );
      },
    }),
  };
});
const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
let router: ReturnType<typeof createMemoryRouter>;
beforeEach(() => {
  projectFailure.current = false;
  localStorage.clear();
  sessionStorage.clear();
  clearAppearance();
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  }));
});

it('isolates a broken page while keeping the authenticated shell and home navigation usable', async () => {
  const errors = vi.spyOn(console, 'error').mockImplementation(() => {});
  try {
    await login({ account: 'admin', password: 'virgo123' });
    projectFailure.current = true;
    start(routePath('project-detail', { projectId: 'online-store' }));
    await screen.findByText('Unable to open this page');
    expect(screen.getByRole('button', { name: 'Sign out' })).toBeInTheDocument();
    expect(screen.queryByText('Broken project view')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reload page' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Go to workplace' }));
    await screen.findByRole('heading', { name: 'Workplace route' });
    expect(router.state.location.pathname).toBe(routePath('workplace'));
  } finally {
    projectFailure.current = false;
    errors.mockRestore();
  }
});
afterEach(() => {
  router?.dispose();
  server.resetHandlers();
  vi.unstubAllGlobals();
});
function start(path: string) {
  router = createMemoryRouter(createAppRoutes(), { initialEntries: [path] });
  render(<RouterProvider router={router} />);
}

describe('one data router owns session and protected navigation', () => {
  it('redirects a signed-out deep link to Login, then replaces it with Workplace after sign-in', async () => {
    start(routePath('tasks') + '?status=todo');
    await screen.findByRole('heading', { name: 'Welcome back' });
    expect(router.state.location.pathname).toBe(routePath('login'));
    fireEvent.change(screen.getByRole('textbox', { name: 'Account' }), {
      target: { value: 'admin' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'virgo123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in to workspace' }));
    await screen.findByRole('heading', { name: 'Workplace route' });
    expect(router.state.location.pathname).toBe(routePath('workplace'));
  });
  it('restores an authenticated deep link and treats Login as a home redirect', async () => {
    await login({ account: 'admin', password: 'virgo123' });
    start(routePath('tasks'));
    await screen.findByRole('heading', { name: 'Tasks route' });
    await act(() => router.navigate(routePath('login')));
    await screen.findByRole('heading', { name: 'Workplace route' });
    expect(router.state.location.pathname).toBe(routePath('workplace'));
  });
  it('signs out through router state and keeps browser back navigation protected', async () => {
    await login({ account: 'admin', password: 'virgo123' });
    start(routePath('workplace'));
    await screen.findByRole('heading', { name: 'Workplace route' });
    await act(() => router.navigate(routePath('tasks')));
    await screen.findByRole('heading', { name: 'Tasks route' });
    fireEvent.click(screen.getByRole('button', { name: 'Sign out' }));
    await screen.findByRole('heading', { name: 'Welcome back' });
    expect(router.state.location.pathname).toBe(routePath('login'));
    await act(() => router.navigate(-1));
    await waitFor(() => expect(router.state.location.pathname).toBe(routePath('login')));
    expect(screen.queryByRole('heading', { name: 'Workplace route' })).toBeNull();
  });
  it('navigates to Login with the expired-session notice', async () => {
    await login({ account: 'admin', password: 'virgo123' });
    start(routePath('tasks'));
    await screen.findByRole('heading', { name: 'Tasks route' });
    act(() => window.dispatchEvent(new Event(sessionExpiredEvent)));
    await screen.findByRole('heading', { name: 'Welcome back' });
    expect(router.state.location.pathname).toBe(routePath('login'));
    expect(screen.getByText('Your session has expired. Please sign in again.')).toBeInTheDocument();
  });
  it('preserves permission fallback for member editing and admin showcase routes', async () => {
    await login({ account: 'nina', password: 'virgo123' });
    start(routePath('task-create'));
    await screen.findByRole('heading', { name: 'Exception 403' });
    await act(() => router.navigate(routePath('success')));
    await screen.findByRole('heading', { name: 'Workplace route' });
  });
  it('keeps legacy query redirects and encoded project selection', async () => {
    await login({ account: 'admin', password: 'virgo123' });
    start('/data/list?status=todo&view=cards');
    await screen.findByRole('heading', { name: 'Task cards route' });
    expect(router.state.location.pathname + router.state.location.search).toBe(
      routePath('task-cards') + '?status=todo',
    );
    await act(() => router.navigate('/data/detail?project=Online+Store'));
    await screen.findByRole('heading', { name: 'Project route' });
    expect(router.state.location.pathname).toBe(
      routePath('project-detail', { projectId: 'online-store' }),
    );
  });
  it('retains data-router navigation blocking and proceeds after discard', async () => {
    await login({ account: 'admin', password: 'virgo123' });
    start(routePath('task-create'));
    await screen.findByRole('heading', { name: 'Unsaved task' });
    fireEvent.click(screen.getByRole('button', { name: 'Edit task' }));
    await act(() => router.navigate(routePath('tasks')));
    expect(router.state.location.pathname).toBe(routePath('task-create'));
    fireEvent.click(screen.getByRole('button', { name: 'Discard and leave' }));
    await screen.findByRole('heading', { name: 'Tasks route' });
    expect(router.state.location.pathname).toBe(routePath('tasks'));
  });
});

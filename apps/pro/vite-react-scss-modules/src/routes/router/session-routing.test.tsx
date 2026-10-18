// @vitest-environment jsdom
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { login } from '@/api/auth';
import { sessionExpiredEvent } from '@/lib/auth/session';
import { handlers } from '@/mock/handlers';
import { routePath } from '@/routes';

import { createAppRoutes } from './router';

const projectFailure = vi.hoisted(() => ({ current: false }));

vi.mock('@/layout', async () => {
  const { Outlet } = await import('react-router');
  const { useSession } = await import('@/features/auth');
  return {
    AppLayout: function TestLayout() {
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
vi.mock('@/pages/dashboard/workplace', () => ({
  default: () => <h1>Workplace route</h1>,
}));
vi.mock('@/pages/work/projects/[projectId]', () => ({
  default: () => {
    if (projectFailure.current) throw new Error('Broken project view');
    return <h1>Project route</h1>;
  },
}));
vi.mock('@/pages/exception/403', () => ({
  default: () => <h1>Exception 403</h1>,
}));
vi.mock('@/pages/work/tasks', () => ({
  default: () => <h1>Tasks route</h1>,
}));
vi.mock('@/pages/work/task-cards', () => ({
  default: () => <h1>Task cards route</h1>,
}));
vi.mock('@/pages/work/tasks/new', async () => {
  const { useBlocker } = await import('react-router');
  const { useState } = await import('react');

  return {
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
  };
});
const server = setupServer(...handlers);
const reads: string[] = [];

server.events.on('request:start', ({ request }) => {
  if (request.method === 'GET') reads.push(new URL(request.url).pathname);
});

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
let router: ReturnType<typeof createMemoryRouter>;
beforeEach(() => {
  reads.length = 0;
  projectFailure.current = false;
  localStorage.clear();
  sessionStorage.clear();
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
    start(routePath('work.projects.[projectId]', { projectId: 'online-store' }));
    await screen.findByText('Unable to open this page');
    expect(screen.getByRole('button', { name: 'Sign out' })).toBeInTheDocument();
    expect(screen.queryByText('Broken project view')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reload page' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Go to workplace' }));
    await screen.findByRole('heading', { name: 'Workplace route' });
    expect(router.state.location.pathname).toBe(routePath('dashboard.workplace'));
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
    start(routePath('work.tasks') + '?status=todo');
    await screen.findByRole('heading', { name: 'Welcome back' });
    expect(router.state.location.pathname).toBe(routePath('login'));
    const sharedReads = ['/api/v1/tasks/metadata', '/api/v1/projects', '/api/v1/profile/identity'];

    for (const path of sharedReads) expect(reads).not.toContain(path);

    fireEvent.change(screen.getByRole('textbox', { name: 'Account' }), {
      target: { value: 'admin' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'virgo123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in to workspace' }));
    await screen.findByRole('heading', { name: 'Workplace route' });
    expect(router.state.location.pathname).toBe(routePath('dashboard.workplace'));
    await waitFor(() => {
      for (const path of sharedReads)
        expect(reads.filter((request) => request === path)).toHaveLength(1);
    });
  });
  it('restores an authenticated deep link and treats Login as a home redirect', async () => {
    await login({ account: 'admin', password: 'virgo123' });
    start(routePath('work.tasks'));
    await screen.findByRole('heading', { name: 'Tasks route' });
    await act(() => router.navigate(routePath('login')));
    await screen.findByRole('heading', { name: 'Workplace route' });
    expect(router.state.location.pathname).toBe(routePath('dashboard.workplace'));
  });
  it('signs out through router state and keeps browser back navigation protected', async () => {
    await login({ account: 'admin', password: 'virgo123' });
    start(routePath('dashboard.workplace'));
    await screen.findByRole('heading', { name: 'Workplace route' });
    await act(() => router.navigate(routePath('work.tasks')));
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
    start(routePath('work.tasks'));
    await screen.findByRole('heading', { name: 'Tasks route' });
    act(() => window.dispatchEvent(new Event(sessionExpiredEvent)));
    await screen.findByRole('heading', { name: 'Welcome back' });
    expect(router.state.location.pathname).toBe(routePath('login'));
    expect(screen.getByText('Your session has expired. Please sign in again.')).toBeInTheDocument();
  });
  it('preserves permission fallback for member editing and admin showcase routes', async () => {
    await login({ account: 'nina', password: 'virgo123' });
    start(routePath('work.tasks.new'));
    await screen.findByRole('heading', { name: 'Exception 403' });
    await act(() => router.navigate(routePath('result.success')));
    await screen.findByRole('heading', { name: 'Workplace route' });
  });
  it('uses the canonical task-card and project routes with encoded query conditions', async () => {
    await login({ account: 'admin', password: 'virgo123' });
    start(routePath('work.task-cards') + '?status=todo');
    await screen.findByRole('heading', { name: 'Task cards route' });
    expect(router.state.location.pathname + router.state.location.search).toBe(
      routePath('work.task-cards') + '?status=todo',
    );
    await act(() =>
      router.navigate(routePath('work.projects.[projectId]', { projectId: 'online-store' })),
    );
    await screen.findByRole('heading', { name: 'Project route' });
    expect(router.state.location.pathname).toBe(
      routePath('work.projects.[projectId]', { projectId: 'online-store' }),
    );
  });
  it('retains data-router navigation blocking and proceeds after discard', async () => {
    await login({ account: 'admin', password: 'virgo123' });
    start(routePath('work.tasks.new'));
    await screen.findByRole('heading', { name: 'Unsaved task' });
    fireEvent.click(screen.getByRole('button', { name: 'Edit task' }));
    await act(() => router.navigate(routePath('work.tasks')));
    expect(router.state.location.pathname).toBe(routePath('work.tasks.new'));
    fireEvent.click(screen.getByRole('button', { name: 'Discard and leave' }));
    await screen.findByRole('heading', { name: 'Tasks route' });
    expect(router.state.location.pathname).toBe(routePath('work.tasks'));
  });
});

// @vitest-environment jsdom
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { http as mswHttp, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterAll, afterEach, beforeAll, beforeEach, expect, it } from 'vitest';

import { getDeliveryTrend } from '@/api/analytics';
import { login } from '@/api/auth';
import { useNotificationInbox } from '@/components/layout/notification/hooks/use-notification-inbox';
import { CatalogBoundary, CatalogProvider } from '@/features/catalog';
import { ProfileIdentityProvider, useProfileIdentityResource } from '@/features/profile';
import { useTaskDependentQuery, useTaskOperations, useTaskQuery } from '@/features/tasks';
import { i18nInstance } from '@/i18n';
import { getDemoState } from '@/mock/data/store';
import { handlers } from '@/mock/handlers';
import { resetTasks } from '@/mock/handlers/tasks';
import { subscribeToDemoChanges } from '@/mock/runtime/resource-sync';
import { demoStorageChanges } from '@/mock/runtime/storage-changes';
import TasksPage from '@/pages/work/tasks';
import EditTaskPage from '@/pages/work/tasks/[id]/edit';
import { TestSessionProvider } from '@/test/TestSessionProvider';

const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
beforeEach(() => resetTasks());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
const paths: string[] = [];
server.events.on('request:start', ({ request }) => {
  if (request.method === 'GET') paths.push(new URL(request.url).pathname);
});
function mount(page: React.ReactNode, path = '/') {
  return render(
    <RouterProvider
      router={createMemoryRouter(
        [
          {
            path: path.includes(':') ? path : '*',
            element: (
              <TestSessionProvider subscribeToChanges={subscribeToDemoChanges}>
                <CatalogProvider>
                  <ProfileIdentityProvider>
                    <p>Application shell ready</p>
                    {page}
                  </ProfileIdentityProvider>
                </CatalogProvider>
              </TestSessionProvider>
            ),
          },
        ],
        { initialEntries: [path.includes(':') ? '/work/tasks/49e7996a-311b/edit' : path] },
      )}
    />,
  );
}
function ChangeTask() {
  const { dispatch } = useTaskOperations();
  return (
    <button
      onClick={() => void dispatch({ type: 'status', id: '49e7996a-311b', status: 'in_progress' })}
    >
      Change task
    </button>
  );
}
function QueryProbe() {
  const tasks = useTaskQuery({ pageSize: 10 });
  const analytics = useTaskDependentQuery(getDeliveryTrend);
  const notifications = useNotificationInbox();
  const profile = useProfileIdentityResource();
  return (
    <>
      <output>
        {tasks.data &&
        analytics.data &&
        notifications.data &&
        profile.data &&
        !tasks.loading &&
        !analytics.loading &&
        !notifications.loading &&
        !profile.loading
          ? 'Resources ready'
          : 'Loading resources'}
      </output>
      <ChangeTask />
    </>
  );
}
it('retries a failed task catalog without replacing the application shell', async () => {
  server.use(mswHttp.get('/api/v1/tasks/metadata', () => new HttpResponse(null, { status: 503 })));
  mount(
    <CatalogBoundary>
      <p>Task catalog ready</p>
    </CatalogBoundary>,
  );
  await screen.findByText('Unable to load data');
  expect(screen.getByText('Application shell ready')).toBeInTheDocument();
  expect(screen.queryByText('Task catalog ready')).not.toBeInTheDocument();
  server.resetHandlers();
  fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
  await screen.findByText('Task catalog ready');
});

it('keeps tasks usable when their summary fails without preloading unrelated capabilities', async () => {
  paths.length = 0;
  server.use(
    ...[
      'profile/identity',
      'analytics/delivery-trend',
      'workspace/summary',
      'workflows/latest',
      'tasks/summary',
    ].map((path) => mswHttp.get(`/api/v1/${path}`, () => new HttpResponse(null, { status: 503 }))),
  );
  mount(<TasksPage />);
  expect(screen.getByText('Application shell ready')).toBeInTheDocument();
  await screen.findByRole('checkbox', { name: 'Select task 49e7996a-311b' });
  await screen.findByText('Unable to load data');
  expect(paths).not.toContain('/api/v1/analytics/delivery-trend');
  expect(paths).not.toContain('/api/v1/workspace/summary');
  expect(paths).not.toContain('/api/v1/workflows/latest');
  expect(paths).not.toContain('/api/v1/profile/preferences');
});
it('invalidates each mounted affected resource once after one mutation', async () => {
  mount(
    <CatalogBoundary>
      <QueryProbe />
    </CatalogBoundary>,
  );
  await screen.findByText('Resources ready');
  paths.length = 0;
  fireEvent.click(screen.getByRole('button', { name: 'Change task' }));
  await waitFor(() => expect(paths.filter((path) => path === '/api/v1/tasks')).toHaveLength(1));
  await waitFor(() =>
    expect(paths.filter((path) => path === '/api/v1/analytics/delivery-trend')).toHaveLength(1),
  );
  await screen.findByText('Resources ready');
  expect(paths.filter((path) => path === '/api/v1/notifications')).toHaveLength(1);
  expect(paths.filter((path) => path === '/api/v1/tasks/metadata')).toHaveLength(1);
  expect(paths.filter((path) => path === '/api/v1/projects')).toHaveLength(1);
  expect(paths).not.toContain('/api/v1/profile/identity');
  expect(paths).not.toContain('/api/v1/workspace/summary');
});
it('retains the raw editor draft across locale changes and failed background refresh', async () => {
  mount(
    <>
      <ChangeTask />
      <EditTaskPage />
    </>,
    '/work/tasks/:id/edit',
  );
  const input = await screen.findByRole('textbox', { name: 'Title' });
  const raw = (input as HTMLInputElement).value;
  await act(() => i18nInstance.changeLanguage('zh-CN'));
  expect(input).toHaveValue(raw);
  fireEvent.change(input, { target: { value: '保留未保存草稿' } });
  server.use(
    mswHttp.get('/api/v1/tasks/49e7996a-311b', () => new HttpResponse(null, { status: 503 })),
    mswHttp.get('/api/v1/tasks/metadata', () => new HttpResponse(null, { status: 503 })),
  );
  fireEvent.click(screen.getByRole('button', { name: 'Change task' }));
  await screen.findAllByText('数据加载失败');
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue('保留未保存草稿');
});
it('refreshes only profile for a profile-only cross-tab storage change', async () => {
  mount(
    <CatalogBoundary>
      <QueryProbe />
    </CatalogBoundary>,
  );
  await screen.findByText('Resources ready');
  const oldState = structuredClone(getDemoState());
  const nextState = { ...oldState, profile: { ...oldState.profile, headline: 'New headline' } };
  const oldValue = JSON.stringify(oldState);
  const newValue = JSON.stringify(nextState);
  expect(demoStorageChanges(oldValue, newValue)).toEqual({
    tasks: false,
    catalog: false,
    profile: true,
    workflows: false,
    notifications: false,
  });
  paths.length = 0;
  act(() =>
    window.dispatchEvent(
      new StorageEvent('storage', { key: 'virgo-pro.demo-data', oldValue, newValue }),
    ),
  );
  await waitFor(() => expect(paths).toEqual(['/api/v1/profile/identity']));
});

it('opens project, profile and result views with scoped reads and bounded previews', async () => {
  const { default: ProjectsPage } = await import('@/pages/work/projects');
  const { default: ProjectDetailPage } = await import('@/pages/work/projects/[projectId]');
  const { default: ProfilePage } = await import('@/pages/profile');
  const { default: SuccessPage } = await import('@/pages/result/success');
  const { HandoffStoreProvider } = await import('@/features/handoff/store');
  const cases = [
    { page: <ProjectsPage />, path: '/work/projects', pattern: '*', ready: 'Online Store' },
    {
      page: <ProjectDetailPage />,
      path: '/work/projects/online-store',
      pattern: '/work/projects/:projectId',
      ready: 'Linked tasks',
    },
    { page: <ProfilePage />, path: '/profile', pattern: '*', ready: 'Administrator' },
    {
      page: (
        <HandoffStoreProvider>
          <SuccessPage />
        </HandoffStoreProvider>
      ),
      path: '/result/success',
      pattern: '*',
      ready: 'Linked work',
    },
  ];
  for (const item of cases) {
    paths.length = 0;
    const view = render(
      <RouterProvider
        router={createMemoryRouter(
          [
            {
              path: item.pattern,
              element: (
                <TestSessionProvider subscribeToChanges={subscribeToDemoChanges}>
                  <CatalogProvider>
                    <ProfileIdentityProvider>{item.page}</ProfileIdentityProvider>
                  </CatalogProvider>
                </TestSessionProvider>
              ),
            },
          ],
          { initialEntries: [item.path] },
        )}
      />,
    );
    expect((await screen.findAllByText(item.ready)).length).toBeGreaterThan(0);
    await waitFor(() =>
      expect(paths.filter((path) => path === '/api/v1/tasks')).toHaveLength(
        item.path.startsWith('/profile') ||
          item.path.startsWith('/result') ||
          item.path === '/work/projects/online-store'
          ? 1
          : 0,
      ),
    );
    view.unmount();
  }
});
it('limits a manager’s handoff scope and preserves its draft across steps and locale changes', async () => {
  await login({ account: 'ava', password: 'virgo123' });

  const { default: ProjectHandoffPage } = await import('@/pages/work/projects/[projectId]/handoff');
  const { HandoffStoreProvider } = await import('@/features/handoff/store');
  const requests: URL[] = [];
  const capture = ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    if (url.pathname === '/api/v1/tasks' && request.method === 'GET') requests.push(url);
  };
  server.events.on('request:start', capture);
  try {
    render(
      <RouterProvider
        router={createMemoryRouter(
          [
            {
              path: '/work/projects/:projectId/handoff',
              element: (
                <TestSessionProvider subscribeToChanges={subscribeToDemoChanges}>
                  <CatalogProvider>
                    <ProfileIdentityProvider>
                      <HandoffStoreProvider>
                        <ProjectHandoffPage />
                      </HandoffStoreProvider>
                    </ProfileIdentityProvider>
                  </CatalogProvider>
                </TestSessionProvider>
              ),
            },
          ],
          { initialEntries: ['/work/projects/online-store/handoff'] },
        )}
      />,
    );
    let title = await screen.findByRole('textbox', { name: 'Handoff title' });
    const raw = (title as HTMLInputElement).value;

    fireEvent.click(screen.getByRole('button', { name: 'Handoff project' }));
    expect(screen.getByRole('option', { name: 'Online Store' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Support Desk' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Booking System' })).not.toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'Escape' });

    fireEvent.change(title, { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(title).toHaveAttribute('aria-invalid', 'true');
    expect(screen.queryByRole('tree', { name: 'Handoff task scope' })).toBeNull();

    fireEvent.change(title, { target: { value: raw } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(screen.getByRole('tree', { name: 'Handoff task scope' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Select all' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Handoff notes' }), {
      target: { value: 'Review the release packet with the project lead.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(screen.getByText('Review the release packet with the project lead.')).toBeVisible();
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'I reviewed the task scope, audience and schedule.' }),
    );

    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByRole('textbox', { name: 'Handoff notes' })).toHaveValue(
      'Review the release packet with the project lead.',
    );
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(
      screen.getByRole('checkbox', { name: 'I reviewed the task scope, audience and schedule.' }),
    ).toBeChecked();
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    title = screen.getByRole('textbox', { name: 'Handoff title' });

    await act(() => i18nInstance.changeLanguage('zh-CN'));
    expect(title).toHaveValue(raw);
    expect(requests).toHaveLength(1);
    expect(requests[0]!.searchParams.get('project')).toBe('online-store');
    expect(requests[0]!.searchParams.get('snapshot')).toBe('create');
  } finally {
    server.events.removeListener('request:start', capture);
  }
});

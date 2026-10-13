// @vitest-environment jsdom
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { http as mswHttp, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterAll, afterEach, beforeAll, beforeEach, expect, it } from 'vitest';

import { getAnalyticsOverview } from '@/api/analytics';
import { demoStorageChanges } from '@/app/demo-storage-changes';
import { ProResourcesProvider } from '@/app/ProResourcesProvider';
import { CatalogBoundary } from '@/features/catalog';
import { useNotificationInbox } from '@/features/notifications';
import { useProfileResource } from '@/features/profile';
import { useTaskDependentQuery, useTaskOperations, useTaskQuery } from '@/features/tasks';
import { i18nInstance } from '@/i18n/runtime';
import { handlers } from '@/mock/handlers';
import { resetTasks } from '@/mock/handlers/tasks';
import { getDemoState } from '@/mock/store';
import { TasksPage } from '@/pages/tasks/TasksPage';
import { TaskWorkspacePage } from '@/pages/tasks/TaskWorkspacePage';
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
              <TestSessionProvider>
                <ProResourcesProvider>
                  <p>Application shell ready</p>
                  {page}
                </ProResourcesProvider>
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
  const analytics = useTaskDependentQuery(getAnalyticsOverview);
  const notifications = useNotificationInbox();
  const profile = useProfileResource();
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
it('opens tasks despite profile/report/workflow failures without preloading those pages', async () => {
  paths.length = 0;
  server.use(
    ...['profile', 'analytics/overview', 'workplace/overview', 'workflows/latest'].map((path) =>
      mswHttp.get(`/api/v1/${path}`, () => new HttpResponse(null, { status: 503 })),
    ),
  );
  mount(<TasksPage />);
  expect(screen.getByText('Application shell ready')).toBeInTheDocument();
  await screen.findByRole('checkbox', { name: 'Select task 49e7996a-311b' });
  expect(paths).not.toContain('/api/v1/analytics/overview');
  expect(paths).not.toContain('/api/v1/workplace/overview');
  expect(paths).not.toContain('/api/v1/workflows/latest');
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
    expect(paths.filter((path) => path === '/api/v1/analytics/overview')).toHaveLength(1),
  );
  await screen.findByText('Resources ready');
  expect(paths.filter((path) => path === '/api/v1/notifications')).toHaveLength(1);
  expect(paths.filter((path) => path === '/api/v1/tasks/metadata')).toHaveLength(1);
  expect(paths.filter((path) => path === '/api/v1/projects')).toHaveLength(1);
  expect(paths).not.toContain('/api/v1/profile');
  expect(paths).not.toContain('/api/v1/workplace/overview');
});
it('retains the raw editor draft across locale changes and failed background refresh', async () => {
  mount(
    <>
      <ChangeTask />
      <TaskWorkspacePage mode="edit" />
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
  const oldValue = JSON.stringify({ version: 3, state: oldState });
  const newValue = JSON.stringify({ version: 3, state: nextState });
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
      new StorageEvent('storage', { key: 'virgo-pro.demo-data.v1', oldValue, newValue }),
    ),
  );
  await waitFor(() => expect(paths).toEqual(['/api/v1/profile']));
});

it('opens project, profile and result views with scoped reads and bounded previews', async () => {
  const { ProjectsPage } = await import('@/pages/projects/ProjectsPage');
  const { ProjectDetailPage } = await import('@/pages/projects/ProjectDetailPage');
  const { ProfilePage } = await import('@/pages/profile/ProfilePage');
  const { ResultPage } = await import('@/pages/results/ResultPage');
  const { HandoffSessionProvider } = await import('@/features/handoff/HandoffSession');
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
        <HandoffSessionProvider>
          <ResultPage outcome="success" />
        </HandoffSessionProvider>
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
                <TestSessionProvider>
                  <ProResourcesProvider>{item.page}</ProResourcesProvider>
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
        item.path.startsWith('/profile') || item.path.startsWith('/result') ? 1 : 0,
      ),
    );
    view.unmount();
  }
});
it('loads only the selected project for handoff and preserves its raw title across locale changes', async () => {
  const { ProjectHandoffPage } = await import('@/pages/projects/ProjectHandoffPage');
  const { HandoffSessionProvider } = await import('@/features/handoff/HandoffSession');
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
                <TestSessionProvider>
                  <ProResourcesProvider>
                    <HandoffSessionProvider>
                      <ProjectHandoffPage />
                    </HandoffSessionProvider>
                  </ProResourcesProvider>
                </TestSessionProvider>
              ),
            },
          ],
          { initialEntries: ['/work/projects/online-store/handoff'] },
        )}
      />,
    );
    const title = await screen.findByRole('textbox', { name: 'Handoff title' });
    const raw = (title as HTMLInputElement).value;
    await act(() => i18nInstance.changeLanguage('zh-CN'));
    expect(title).toHaveValue(raw);
    expect(requests).toHaveLength(1);
    expect(requests[0]!.searchParams.get('project')).toBe('online-store');
    expect(requests[0]!.searchParams.get('snapshot')).toBe('create');
  } finally {
    server.events.removeListener('request:start', capture);
  }
});

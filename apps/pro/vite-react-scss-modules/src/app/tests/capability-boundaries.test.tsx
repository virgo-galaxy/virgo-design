// @vitest-environment jsdom
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { type ReactNode, useState } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterAll, afterEach, beforeAll, beforeEach, expect, it, vi } from 'vitest';

import { getProfileIdentity } from '@/api/profile';
import { prepareHandoff, type WorkflowReceiptDto } from '@/api/workflows';
import { loadAnalyticsPage } from '@/features/analytics/routes';
import { HandoffSessionProvider, useHandoffSession } from '@/features/handoff';
import { loadProfilePage } from '@/features/profile/routes';
import { loadProjectDetailPage } from '@/features/projects/routes';
import { loadTasksPage } from '@/features/tasks/routes';
import { getDemoState } from '@/mock/data/store';
import { handlers } from '@/mock/handlers';
import { resetTasks } from '@/mock/handlers/tasks';
import { ResultPage } from '@/pages/results/ResultPage';
import { WorkplacePage } from '@/pages/workplace/WorkplacePage';
import { TestSessionProvider } from '@/test/TestSessionProvider';

import { ProResourcesProvider } from '../composition/providers/ProResourcesProvider';

vi.mock('@virgo-design/charts', () => ({
  Chart: Object.fromEntries(
    [
      'Root',
      'Cartesian',
      'Line',
      'Bar',
      'Area',
      'Donut',
      'XAxis',
      'YAxis',
      'Grid',
      'Tooltip',
      'Legend',
    ].map((name) => [name, () => null]),
  ),
}));
const { default: AnalyticsPage } = await loadAnalyticsPage();
const { default: ProfilePage } = await loadProfilePage();
const { default: ProjectDetailPage } = await loadProjectDetailPage();
const { default: TasksPage } = await loadTasksPage();
const server = setupServer(...handlers);
const requests: string[] = [];
server.events.on('request:start', ({ request }) => requests.push(new URL(request.url).pathname));
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
beforeEach(() => {
  resetTasks();
  requests.length = 0;
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  }));
});
afterEach(() => {
  server.resetHandlers();
  vi.unstubAllGlobals();
});
afterAll(() => server.close());

it('refreshes a workflow result from the server after a cross-tab update even after preparing a local draft', async () => {
  const draft = {
    title: 'First handoff',
    projectId: 'online-store',
    date: '2026-10-06',
    time: '10:00',
    taskIds: ['1bbcd880-f5e5'],
    audience: 'team' as const,
    notes: '',
    confirmed: true,
  };
  let first: WorkflowReceiptDto | undefined;
  function PreparedResult() {
    const session = useHandoffSession();
    const [ready, setReady] = useState(false);
    return ready ? (
      <ResultPage outcome="success" />
    ) : (
      <button
        onClick={() =>
          void session.prepare(draft).then((receipt) => {
            first = receipt;
            setReady(true);
          })
        }
      >
        Prepare local draft
      </button>
    );
  }
  const dispose = mount(
    <HandoffSessionProvider>
      <PreparedResult />
    </HandoffSessionProvider>,
  );
  try {
    fireEvent.click(screen.getByRole('button', { name: 'Prepare local draft' }));
    await waitFor(() => expect(first).toBeDefined());
    await screen.findAllByText(first!.reference);
    const oldValue = JSON.stringify({ state: structuredClone(getDemoState()) });
    const next = await prepareHandoff({ ...draft, title: 'Updated in another tab' });
    const newValue = JSON.stringify({ state: getDemoState() });
    act(() =>
      window.dispatchEvent(
        new StorageEvent('storage', { key: 'virgo-pro.demo-data.v1', oldValue, newValue }),
      ),
    );
    await screen.findAllByText(next.reference);
    expect(screen.queryByText(first!.reference)).not.toBeInTheDocument();
    expect(requests.filter((path) => path === '/api/v1/workflows/latest')).toHaveLength(2);
  } finally {
    dispose();
  }
});
function mount(page: ReactNode, path = '/') {
  const router = createMemoryRouter(
    [
      {
        path: '/work/projects/:projectId',
        element: (
          <TestSessionProvider>
            <ProResourcesProvider>{page}</ProResourcesProvider>
          </TestSessionProvider>
        ),
      },
      {
        path: '*',
        element: (
          <TestSessionProvider>
            <ProResourcesProvider>{page}</ProResourcesProvider>
          </TestSessionProvider>
        ),
      },
    ],
    { initialEntries: [path] },
  );
  const view = render(<RouterProvider router={router} />);
  return () => {
    view.unmount();
    router.dispose();
  };
}

it('retries a failed capacity panel without refetching or removing the other analytics capabilities', async () => {
  server.use(
    http.get('/api/v1/analytics/owner-capacity', () => new HttpResponse(null, { status: 503 })),
  );
  const dispose = mount(<AnalyticsPage />);
  try {
    await screen.findByRole('heading', { name: 'Delivery analytics' });
    await screen.findByRole('region', { name: 'Task distribution' });
    await screen.findByRole('region', { name: 'Daily delivery mix' });
    await screen.findByText('Unable to load data');
    expect(requests.filter((path) => path === '/api/v1/analytics/delivery-trend')).toHaveLength(1);
    expect(requests).not.toContain('/api/v1/activity');
    server.resetHandlers();
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    await screen.findByRole('region', { name: 'Team capacity' });
    expect(requests.filter((path) => path === '/api/v1/analytics/owner-capacity')).toHaveLength(2);
    expect(requests.filter((path) => path === '/api/v1/analytics/delivery-trend')).toHaveLength(1);
  } finally {
    dispose();
  }
});

it('keeps workspace metrics, delivery and recent tasks usable when the independent token report fails', async () => {
  server.use(
    http.get('/api/v1/analytics/token-usage', () => new HttpResponse(null, { status: 503 })),
  );
  const dispose = mount(<WorkplacePage />);
  try {
    await screen.findByRole('button', { name: 'All tasks' });
    await screen.findByRole('heading', { name: 'Delivery pulse' });
    await screen.findByText('Active projects', { exact: true });
    expect((await screen.findAllByText('Unable to load data')).length).toBeGreaterThan(0);
    expect(requests.filter((path) => path === '/api/v1/analytics/token-usage')).toHaveLength(1);
    expect(requests).toContain('/api/v1/workspace/summary');
    expect(requests).toContain('/api/v1/tasks');
  } finally {
    dispose();
  }
});

it('keeps identity editing independent of a preferences outage', async () => {
  server.use(
    http.get('/api/v1/profile/preferences', () => new HttpResponse(null, { status: 503 })),
  );
  const dispose = mount(<ProfilePage />);
  try {
    fireEvent.click(await screen.findByRole('button', { name: 'Edit profile' }));
    fireEvent.change(await screen.findByRole('textbox', { name: 'Display name' }), {
      target: { value: 'Independent identity' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save profile' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect((await getProfileIdentity()).name).toBe('Independent identity');
    fireEvent.click(screen.getByRole('tab', { name: 'Preferences' }));
    await screen.findByText('Unable to load data');
  } finally {
    dispose();
  }
});

it('keeps a task list usable without its independent summary and avoids preloading profile preferences', async () => {
  server.use(http.get('/api/v1/tasks/summary', () => new HttpResponse(null, { status: 503 })));
  const dispose = mount(<TasksPage />);
  try {
    await screen.findByRole('checkbox', { name: 'Select task 49e7996a-311b' });
    await screen.findByText('Unable to load data');
    expect(requests).not.toContain('/api/v1/profile/preferences');
    expect(requests).not.toContain('/api/v1/analytics/delivery-trend');
  } finally {
    dispose();
  }
});

it('keeps linked tasks and module progress available when one project summary fails', async () => {
  server.use(
    http.get(
      '/api/v1/projects/online-store/summary',
      () => new HttpResponse(null, { status: 503 }),
    ),
  );
  const dispose = mount(<ProjectDetailPage />, '/work/projects/online-store');
  try {
    const tasks = await screen.findByRole('region', { name: 'Linked tasks' });
    await waitFor(() => expect(within(tasks).getAllByRole('listitem').length).toBeGreaterThan(0));
    await screen.findByRole('region', { name: 'Module' });
    expect((await screen.findAllByText('Unable to load data')).length).toBeGreaterThan(0);
    expect(requests).toContain('/api/v1/projects/online-store/module-stats');
    expect(requests).toContain('/api/v1/projects/online-store/member-stats');
  } finally {
    dispose();
  }
});

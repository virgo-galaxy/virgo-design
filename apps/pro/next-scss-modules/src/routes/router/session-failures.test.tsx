// @vitest-environment jsdom
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { type ReactNode, useState } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterAll, afterEach, beforeAll, beforeEach, expect, it, vi } from 'vitest';

import { getProfileIdentity } from '@/api/profile';
import { prepareHandoff } from '@/api/workflows';
import type { WorkflowReceiptDto } from '@/api/workflows/types';
import WorkplacePage from '@/app/(pro)/dashboard/workplace/page';
import ProfilePage from '@/app/(pro)/profile/page';
import SuccessPage from '@/app/(pro)/result/success/page';
import AnalyticsPage from '@/app/(pro)/visualization/analytics/page';
import ProjectDetailPage from '@/app/(pro)/work/projects/[projectId]/page';
import { subscribeToDemoChanges } from '@/demo/client/resource-sync';
import { changesFromHeader, demoChangeKey } from '@/demo/client/storage-changes';
import { CatalogProvider } from '@/features/catalog';
import { useHandoffSession } from '@/features/handoff';
import { HandoffStoreProvider } from '@/features/handoff/store';
import { ProfileIdentityProvider } from '@/features/profile';
import { resetTasks } from '@/server/demo/handlers/tasks';
import { handlers } from '@/test/demo-handlers';
import { TestSessionProvider } from '@/test/TestSessionProvider';

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
      <SuccessPage />
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
    <HandoffStoreProvider>
      <PreparedResult />
    </HandoffStoreProvider>,
  );
  try {
    fireEvent.click(screen.getByRole('button', { name: 'Prepare local draft' }));
    await waitFor(() => expect(first).toBeDefined());
    await screen.findAllByText(first!.reference);
    const next = await prepareHandoff({ ...draft, title: 'Updated in another tab' });
    const newValue = JSON.stringify({ id: 'another-tab', changes: changesFromHeader('workflows') });
    act(() => window.dispatchEvent(new StorageEvent('storage', { key: demoChangeKey, newValue })));
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
          <TestSessionProvider subscribeToChanges={subscribeToDemoChanges}>
            <CatalogProvider>
              <ProfileIdentityProvider>{page}</ProfileIdentityProvider>
            </CatalogProvider>
          </TestSessionProvider>
        ),
      },
      {
        path: '*',
        element: (
          <TestSessionProvider subscribeToChanges={subscribeToDemoChanges}>
            <CatalogProvider>
              <ProfileIdentityProvider>{page}</ProfileIdentityProvider>
            </CatalogProvider>
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

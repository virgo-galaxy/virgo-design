// @vitest-environment jsdom
import { createEvent, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { login } from '@/api/auth';
import { getTasks } from '@/api/tasks';
import { ProResourcesProvider } from '@/app/composition/providers/ProResourcesProvider';
import { initialTaskState } from '@/mock/fixtures/tasks';
import { handlers } from '@/mock/handlers';
import { resetTasks } from '@/mock/handlers/tasks';
import { TestSessionProvider } from '@/test/TestSessionProvider';

import { taskTableStorageKey } from '../hooks/use-table-settings';
import { TaskCardsPage } from './TaskCardsPage';
import { TasksPage } from './TasksPage';
import { TaskWorkspacePage } from './TaskWorkspacePage';

const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
beforeEach(() => {
  resetTasks();
  window.localStorage.removeItem(taskTableStorageKey);
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function Page() {
  return <TasksPage />;
}
function renderPage(path = '/work/tasks') {
  render(
    <RouterProvider
      router={createMemoryRouter(
        [
          {
            element: (
              <TestSessionProvider>
                <ProResourcesProvider>
                  <Outlet />
                </ProResourcesProvider>
              </TestSessionProvider>
            ),
            children: [
              { path: '/work/tasks', element: <Page /> },
              { path: '/work/task-cards', element: <TaskCardsPage /> },
              { path: '/work/tasks/new', element: <TaskWorkspacePage mode="create" /> },
              { path: '/work/tasks/:id', element: <TaskWorkspacePage mode="details" /> },
              { path: '/work/tasks/:id/edit', element: <TaskWorkspacePage mode="edit" /> },
            ],
          },
        ],
        { initialEntries: [path] },
      )}
    />,
  );
}

describe('Task row actions and batch deletion', () => {
  it('requests only the active page and does not preload the task collection', async () => {
    const requests: URL[] = [];
    const capture = ({ request }: { request: Request }) => {
      const url = new URL(request.url);
      if (request.method === 'GET' && url.pathname === '/api/v1/tasks') requests.push(url);
    };
    server.events.on('request:start', capture);
    try {
      renderPage();
      await screen.findByRole('checkbox', { name: 'Select task 49e7996a-311b' });
      expect(screen.queryByRole('radiogroup', { name: 'Task view' })).not.toBeInTheDocument();
      expect(requests).toHaveLength(1);
      expect(requests[0]!.searchParams.get('pageNum')).toBe('1');
      expect(requests[0]!.searchParams.get('pageSize')).toBe('10');
      expect(requests[0]!.searchParams.has('page')).toBe(false);
      fireEvent.click(
        within(screen.getByRole('navigation', { name: 'Task pages' })).getByRole('button', {
          name: 'Page 2',
        }),
      );
      await screen.findByRole('checkbox', { name: 'Select task 1bbcd880-f5e5' });
      expect(requests).toHaveLength(2);
      expect(requests[1]!.searchParams.get('pageNum')).toBe('2');
      expect(requests.every((url) => url.searchParams.get('pageSize') === '10')).toBe(true);
    } finally {
      server.events.removeListener('request:start', capture);
    }
  });
  it('opens task links with the requested record filter', async () => {
    renderPage('/work/tasks?search=abb01fb9-ab2f');
    const table = await screen.findByRole('table', { name: /^Workspace tasks/ });
    await within(table).findByRole('checkbox', { name: 'Select task abb01fb9-ab2f' });
    expect(screen.getByRole('textbox', { name: 'Search tasks' })).toHaveValue('abb01fb9-ab2f');
    expect(within(table).getAllByRole('row')).toHaveLength(2);
    expect(screen.getByRole('navigation', { name: 'Task pages' })).toHaveTextContent(
      'Total 1 items',
    );
  });
  it('keeps a generic total and selection summary in the pagination across pages', async () => {
    renderPage();
    const first = await screen.findByRole('checkbox', { name: 'Select task 49e7996a-311b' });
    const navigation = screen.getByRole('navigation', { name: 'Task pages' });
    const summary = navigation.querySelector('[data-slot="total"]')!;
    expect(summary).toHaveTextContent('Total 240 items');
    expect(summary.querySelector('[data-slot="selected"]')).toBeNull();
    fireEvent.click(first);
    expect(summary).toHaveTextContent('Total 240 items (Selected 1 items)');
    fireEvent.click(within(navigation).getByRole('button', { name: 'Page 2' }));
    const next = await screen.findByRole('checkbox', { name: 'Select task 1bbcd880-f5e5' });
    expect(summary).toHaveTextContent('Total 240 items (Selected 1 items)');
    fireEvent.click(next);
    expect(summary).toHaveTextContent('Total 240 items (Selected 2 items)');
  });

  it('places actions after completion time and navigates to separate task details and editing pages', async () => {
    renderPage();
    const table = await screen.findByRole('table', { name: /^Workspace tasks/ });
    await within(table).findAllByRole('button', { name: 'Details' });
    expect(
      within(table)
        .getAllByRole('columnheader')
        .slice(-2)
        .map((head) => head.textContent),
    ).toEqual(['Completed at', 'Actions']);
    fireEvent.click(within(table).getAllByRole('button', { name: 'Details' })[0]!);
    await screen.findByRole('heading', { name: 'Products: Plan delivery' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.getAllByText('Anika Rao').length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole('button', { name: 'Edit task' }));
    await screen.findByRole('heading', { name: 'Edit task' });
    expect(screen.getByRole('textbox', { name: 'Title' })).toHaveValue('Products: Plan delivery');
    expect(screen.queryByRole('combobox', { name: 'Status' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    await screen.findByRole('heading', { name: 'Products: Plan delivery' });
    fireEvent.click(screen.getByRole('link', { name: 'Back to tasks' }));
    await screen.findByRole('table', { name: /^Workspace tasks/ });
  });

  it('protects unsaved edits, preserves the draft after failure and returns to filtered list after saving', async () => {
    renderPage('/work/tasks?search=49e7996a-311b');
    const table = await screen.findByRole('table', { name: /^Workspace tasks/ });
    fireEvent.click((await within(table).findAllByRole('button', { name: 'Edit' }))[0]!);
    await screen.findByRole('heading', { name: 'Edit task' });
    fireEvent.change(screen.getByRole('textbox', { name: 'Title' }), {
      target: { value: 'Updated delivery task' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    const warning = await screen.findByRole('dialog', { name: 'Discard unsaved changes?' });
    fireEvent.click(within(warning).getByRole('button', { name: 'Keep editing' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(screen.getByRole('textbox', { name: 'Title' })).toHaveValue('Updated delivery task');
    server.use(
      http.patch('*/tasks/:id', () =>
        HttpResponse.json({ code: 'INTERNAL_ERROR', message: 'Save failed' }, { status: 500 }),
      ),
    );
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    await screen.findByRole('alert');
    expect(screen.getByRole('textbox', { name: 'Title' })).toHaveValue('Updated delivery task');
    server.resetHandlers();
    await waitFor(() => expect(screen.getByRole('button', { name: 'Save changes' })).toBeEnabled());
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    await screen.findByRole('heading', { name: 'Updated delivery task' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name: 'Back to tasks' }));
    await screen.findByRole('table', { name: /^Workspace tasks/ });
    expect(screen.getByRole('textbox', { name: 'Search tasks' })).toHaveValue('49e7996a-311b');
  });
  it('recovers safely from malformed column and pagination parameters', async () => {
    renderPage(
      '/work/tasks?page=1.5&columnSearch=%7B%22title%22%3A42%7D&columnFilters=%7B%22status%22%3Afalse%7D&sort=%7B%22column%22%3A%22nope%22%7D',
    );
    await screen.findByRole('checkbox', { name: 'Select task 49e7996a-311b' });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
  it('gives an engineer only their workflow actions and no information editing', async () => {
    await login({ account: 'hana', password: 'virgo123' });
    const own = initialTaskState.tasks.find(
      (task) => task.assignee === 'hana' && task.status === 'todo',
    )!;
    renderPage('/work/tasks/' + own.id);
    await screen.findByRole('heading', { name: own.title });
    expect(screen.queryByRole('button', { name: 'Edit task' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Confirm completion' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Start task' }));
    await screen.findByRole('button', { name: 'Submit for review' });
    fireEvent.click(screen.getByRole('button', { name: 'Submit for review' }));
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: 'Submit for review' })).not.toBeInTheDocument(),
    );
    expect(await screen.findByText(/Review requested/)).toBeInTheDocument();
  });
  it('keeps cards on their own route and restores the card filter after reading a task', async () => {
    renderPage('/work/task-cards?search=49e7996a-311b');
    const link = await screen.findByRole('link', { name: 'Products: Plan delivery' });
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(screen.queryByRole('radiogroup', { name: 'Task view' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Delete' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Table settings' })).not.toBeInTheDocument();
    fireEvent.click(link);
    await screen.findByRole('heading', { name: 'Products: Plan delivery' });
    fireEvent.click(screen.getByRole('link', { name: 'Back to task cards' }));
    await screen.findByRole('link', { name: 'Products: Plan delivery' });
    expect(screen.getByRole('textbox', { name: 'Search tasks' })).toHaveValue('49e7996a-311b');
  });
  it('switches the full search and content area while carrying shared filters without hidden table constraints', async () => {
    renderPage('/work/tasks?search=49e7996a-311b&status=backlog&status=todo&priority=low');
    const tabs = await screen.findByRole('tablist', { name: 'Task view' });
    expect(within(tabs).getByRole('tab', { name: 'Task table' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Priority' })).toBeInTheDocument();
    expect(screen.getByText('Total tasks')).toBeInTheDocument();
    expect(within(screen.getByRole('tabpanel')).queryByText('Total tasks')).not.toBeInTheDocument();
    fireEvent.click(within(tabs).getByRole('tab', { name: 'Task cards' }));
    const task = await screen.findByRole('link', { name: 'Products: Plan delivery' });
    expect(screen.getByRole('tab', { name: 'Task cards' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Priority' })).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: 'Assignee' })).not.toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Search tasks' })).toHaveValue('49e7996a-311b');
    expect(screen.getByText('Total tasks')).toBeInTheDocument();
    expect(within(screen.getByRole('tabpanel')).queryByText('Total tasks')).not.toBeInTheDocument();
    const returnTo = new URL(task.getAttribute('href')!, 'http://localhost').searchParams.get(
      'returnTo',
    )!;
    const cardParams = new URL(returnTo, 'http://localhost').searchParams;
    expect(cardParams.getAll('status')).toEqual(['backlog', 'todo']);
    expect(cardParams.has('priority')).toBe(false);
    fireEvent.click(screen.getByRole('tab', { name: 'Task table' }));
    await screen.findByRole('checkbox', { name: 'Select task 49e7996a-311b' });
    expect(screen.getByRole('button', { name: 'Priority' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Task table' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });
  it('redirects legacy card view bookmarks and keeps the regular task page as a table', async () => {
    renderPage('/work/tasks?view=cards&search=49e7996a-311b');
    await waitFor(() =>
      expect(screen.getByRole('tab', { name: 'Task cards' })).toHaveAttribute(
        'aria-selected',
        'true',
      ),
    );
    await screen.findByRole('link', { name: 'Products: Plan delivery' });
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(screen.queryByRole('radiogroup', { name: 'Task view' })).not.toBeInTheDocument();
  });
  it('keeps delete visible and disabled without selection, supports cancel and retains selection on failure before retrying', async () => {
    renderPage();
    const checkbox = await screen.findByRole('checkbox', { name: 'Select task 49e7996a-311b' });
    expect(screen.getByRole('button', { name: 'Export' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(screen.getByRole('button', { name: 'Delete' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Export' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    let dialog = await screen.findByRole('dialog', { name: 'Delete selected tasks?' });
    expect(dialog).toHaveTextContent('Delete 1 selected task');
    fireEvent.click(within(dialog).getByRole('button', { name: 'Cancel' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect((await getTasks()).total).toBe(240);
    expect(checkbox).toBeChecked();
    server.use(
      http.post(
        '/api/v1/tasks/batch-delete',
        () => new HttpResponse('Unavailable', { status: 503 }),
      ),
    );
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    dialog = await screen.findByRole('dialog', { name: 'Delete selected tasks?' });
    fireEvent.click(within(dialog).getByRole('button', { name: 'Delete' }));
    await within(dialog).findByText('Unable to delete');
    expect(screen.queryByText('Deleted 1 task')).not.toBeInTheDocument();
    expect(checkbox).toBeChecked();
    expect((await getTasks()).total).toBe(240);
    server.resetHandlers();
    fireEvent.click(within(dialog).getByRole('button', { name: 'Delete' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() =>
      expect(
        screen.queryByRole('checkbox', { name: 'Select task 49e7996a-311b' }),
      ).not.toBeInTheDocument(),
    );
    expect((await getTasks()).total).toBe(239);
    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
    expect(
      screen
        .getByRole('navigation', { name: 'Task pages' })
        .querySelector('[data-slot="selected"]'),
    ).toBeNull();
    expect(screen.getByText('Total 239 items')).toBeInTheDocument();
    expect(screen.getByText('Deleted 1 task')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Task feedback' })).toHaveAttribute(
      'data-placement',
      'top-center',
    );
  });

  it('announces every successful deletion, including consecutive batches of the same size', async () => {
    renderPage();
    let previousToast: HTMLElement | null = null;
    for (const id of ['49e7996a-311b', 'abb01fb9-ab2f']) {
      const checkbox = await screen.findByRole('checkbox', { name: `Select task ${id}` });
      fireEvent.click(checkbox);
      fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
      const dialog = await screen.findByRole('dialog', { name: 'Delete selected tasks?' });
      fireEvent.click(within(dialog).getByRole('button', { name: 'Delete' }));
      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
      const toast = screen.getByText('Deleted 1 task').closest('[data-toast-root]')!;
      expect(toast).toHaveAttribute('data-state', 'open');
      expect(toast).not.toBe(previousToast);
      previousToast = toast as HTMLElement;
      await waitFor(() =>
        expect(
          screen.queryByRole('checkbox', { name: `Select task ${id}` }),
        ).not.toBeInTheDocument(),
      );
    }
    expect((await getTasks()).total).toBe(238);
  });
});

it('applies table settings to selection, header dividers and resize handles immediately', async () => {
  renderPage();
  const table = await screen.findByRole('table', { name: /^Workspace tasks/ });
  fireEvent.click(screen.getByRole('button', { name: 'Table settings' }));
  const dialog = await screen.findByRole('dialog', { name: 'Table settings' });
  fireEvent.click(within(dialog).getByRole('switch', { name: 'Header vertical dividers' }));
  expect(table).toHaveAttribute('data-header-dividers', 'false');
  fireEvent.click(within(dialog).getByRole('tab', { name: 'Selection & pagination' }));
  fireEvent.click(within(dialog).getByRole('switch', { name: 'Enable row selection' }));
  expect(
    within(table).queryByRole('checkbox', { name: 'Select task 49e7996a-311b' }),
  ).not.toBeInTheDocument();
  expect(within(table).queryByRole('separator')).not.toBeInTheDocument();
  fireEvent.click(within(dialog).getByRole('switch', { name: 'Resize columns' }));
  expect(within(table).getAllByRole('separator').length).toBeGreaterThan(0);
  fireEvent.click(within(dialog).getByRole('switch', { name: 'Resize columns' }));
  expect(within(table).queryByRole('separator')).not.toBeInTheDocument();
  fireEvent.click(within(dialog).getByRole('tab', { name: 'Columns' }));
  expect(
    within(dialog).queryByRole('switch', { name: 'Resize this column' }),
  ).not.toBeInTheDocument();
  const preview = within(dialog).getByRole('table', { name: 'Column preview' });
  expect(within(preview).queryByRole('separator')).not.toBeInTheDocument();
  const input = within(dialog).getByRole('spinbutton', { name: 'Width (px)' });
  fireEvent.change(input, { target: { value: '420' } });
  fireEvent.blur(input);
  expect(within(preview).queryByRole('separator')).not.toBeInTheDocument();
  expect(preview.querySelector('col')).toHaveStyle({ width: '420px' });
  fireEvent.click(within(dialog).getByRole('button', { name: 'Restore defaults' }));
  expect(within(table).queryByRole('separator')).not.toBeInTheDocument();
  expect(within(preview).queryByRole('separator')).not.toBeInTheDocument();
  expect(table).toHaveAttribute('data-header-dividers', 'true');
  expect(
    within(table).getByRole('checkbox', { name: 'Select task 49e7996a-311b' }),
  ).toBeInTheDocument();
});

it('disabling pagination exposes the entire task collection rather than only the first server page', async () => {
  const records = initialTaskState.tasks.slice(0, 101);
  server.use(
    http.get('/api/v1/tasks', ({ request }) => {
      const params = new URL(request.url).searchParams;
      const pageNum = Number(params.get('pageNum')) || 1;
      const pageSize = Number(params.get('pageSize')) || 10;
      return HttpResponse.json({
        code: 0,
        msg: 'success',
        data: {
          items: records.slice((pageNum - 1) * pageSize, pageNum * pageSize),
          total: records.length,
          snapshotId: 'test-snapshot',
          pageNum,
          pageSize,
          overview: { total: records.length, inProgress: 0, completed: 0, dueSoon: 0 },
        },
      });
    }),
  );
  renderPage();
  await screen.findByRole('table', { name: /^Workspace tasks/ });
  fireEvent.click(screen.getByRole('button', { name: 'Table settings' }));
  const dialog = await screen.findByRole('dialog', { name: 'Table settings' });
  fireEvent.click(within(dialog).getByRole('tab', { name: 'Selection & pagination' }));
  fireEvent.click(within(dialog).getByRole('switch', { name: 'Show pagination' }));
  fireEvent.click(within(dialog).getByRole('button', { name: 'Done' }));
  await waitFor(() =>
    expect(screen.getAllByRole('checkbox', { name: /^Select task / })).toHaveLength(records.length),
  );
  expect(screen.queryByRole('navigation', { name: 'Task pages' })).not.toBeInTheDocument();
});

it('separates column visibility, configuration and handle-based reordering', async () => {
  renderPage();
  const table = await screen.findByRole('table', { name: /^Workspace tasks/ });
  await within(table).findByRole('checkbox', { name: 'Select task 49e7996a-311b' });
  fireEvent.click(screen.getByRole('button', { name: 'Table settings' }));
  const dialog = await screen.findByRole('dialog', { name: 'Table settings' });
  fireEvent.click(within(dialog).getByRole('tab', { name: 'Columns' }));
  expect(
    within(dialog).queryByRole('switch', { name: 'Show this column' }),
  ).not.toBeInTheDocument();
  const visibility = within(dialog).getByRole('checkbox', { name: 'Show Status column' });
  fireEvent.click(visibility);
  expect(within(table).queryByRole('columnheader', { name: /^Status/ })).not.toBeInTheDocument();
  expect(within(dialog).getByRole('region', { name: 'Task' })).toBeInTheDocument();
  fireEvent.click(within(dialog).getByRole('button', { name: 'Status' }));
  expect(visibility).not.toBeChecked();
  expect(within(dialog).getByRole('region', { name: 'Status' })).toBeInTheDocument();
  expect(within(dialog).getByRole('spinbutton', { name: 'Width (px)' })).toHaveValue(200);
  fireEvent.click(visibility);
  const handle = within(dialog).getByRole('button', { name: 'Drag column Priority' });
  expect(handle).toHaveAttribute('draggable', 'true');
  expect(within(dialog).getByRole('button', { name: 'Priority' })).not.toHaveAttribute('draggable');
  fireEvent.keyDown(handle, { key: 'ArrowUp' });
  expect(table.querySelectorAll('thead th')[3]).toHaveAttribute('data-column-key', 'priority');
  expect(within(dialog).getByRole('region', { name: 'Status' })).toBeInTheDocument();
  const setDragImage = vi.fn();
  fireEvent.dragStart(handle, { dataTransfer: { setData: vi.fn(), setDragImage } });
  expect(setDragImage).toHaveBeenCalledOnce();
  const preview = setDragImage.mock.calls[0]![0] as HTMLElement;
  expect(preview).toHaveTextContent('Priority');
  expect(preview).toHaveAttribute('aria-hidden', 'true');
  expect(preview.isConnected).toBe(true);
  fireEvent.dragEnd(handle);
  expect(preview.isConnected).toBe(false);
});

it('adjusts minimum, current and maximum width with a slider and one precise input', async () => {
  renderPage();
  const table = await screen.findByRole('table', { name: /^Workspace tasks/ });
  fireEvent.click(screen.getByRole('button', { name: 'Table settings' }));
  const dialog = await screen.findByRole('dialog', { name: 'Table settings' });
  fireEvent.click(within(dialog).getByRole('tab', { name: 'Columns' }));
  expect(within(dialog).queryByRole('button', { name: 'Fixed edge' })).not.toBeInTheDocument();
  expect(within(dialog).getAllByRole('spinbutton')).toHaveLength(1);
  const current = within(dialog).getByRole('slider', { name: 'Width (px)' });
  const minimum = within(dialog).getByRole('slider', { name: 'Minimum width (px)' });
  const maximum = within(dialog).getByRole('slider', { name: 'Maximum width (px)' });
  const input = within(dialog).getByRole('spinbutton', { name: 'Width (px)' });
  fireEvent.keyDown(current, { key: 'End' });
  fireEvent.keyDown(minimum, { key: 'ArrowRight' });
  expect(minimum).toHaveAttribute('aria-valuenow', '301');
  expect(current).toHaveAttribute('aria-valuenow', '500');
  expect(input).toHaveValue(500);
  fireEvent.keyDown(maximum, { key: 'End' });
  expect(maximum).toHaveAttribute('aria-valuenow', '3000');
  fireEvent.change(input, { target: { value: '420' } });
  fireEvent.blur(input);
  expect(current).toHaveAttribute('aria-valuenow', '420');
  expect(table.querySelector('col:nth-child(3)')).toHaveStyle({ width: '420px' });
});

it('edits the focused width thumb through the shared numeric input', async () => {
  renderPage();
  const table = await screen.findByRole('table', { name: /^Workspace tasks/ });
  fireEvent.click(screen.getByRole('button', { name: 'Table settings' }));
  const dialog = await screen.findByRole('dialog', { name: 'Table settings' });
  fireEvent.click(within(dialog).getByRole('tab', { name: 'Columns' }));
  const minimum = within(dialog).getByRole('slider', { name: 'Minimum width (px)' });
  const current = within(dialog).getByRole('slider', { name: 'Width (px)' });
  const maximum = within(dialog).getByRole('slider', { name: 'Maximum width (px)' });
  fireEvent.focus(minimum);
  let input = within(dialog).getByRole('spinbutton', { name: 'Minimum width (px)' });
  expect(input).toHaveValue(300);
  fireEvent.change(input, { target: { value: '120' } });
  fireEvent.blur(input);
  expect(minimum).toHaveAttribute('aria-valuenow', '120');
  expect(current).toHaveAttribute('aria-valuenow', '360');
  fireEvent.focus(maximum);
  input = within(dialog).getByRole('spinbutton', { name: 'Maximum width (px)' });
  expect(input).toHaveValue(500);
  fireEvent.change(input, { target: { value: '900' } });
  fireEvent.blur(input);
  expect(maximum).toHaveAttribute('aria-valuenow', '900');
  fireEvent.keyDown(maximum, { key: 'ArrowRight' });
  expect(input).toHaveValue(901);
  fireEvent.focus(current);
  input = within(dialog).getByRole('spinbutton', { name: 'Width (px)' });
  expect(input).toHaveValue(360);
  fireEvent.change(input, { target: { value: '1000' } });
  fireEvent.blur(input);
  expect(current).toHaveAttribute('aria-valuenow', '901');
  expect(table.querySelector('col:nth-child(3)')).toHaveStyle({ width: '901px' });
  fireEvent.focus(minimum);
  fireEvent.click(within(dialog).getByRole('button', { name: 'Priority' }));
  expect(within(dialog).getByRole('spinbutton', { name: 'Width (px)' })).toHaveValue(200);
  expect(within(dialog).getAllByRole('spinbutton')).toHaveLength(1);
});

it('shows insertion edges and drops columns at the indicated boundary', async () => {
  renderPage();
  await screen.findByRole('table', { name: /^Workspace tasks/ });
  fireEvent.click(screen.getByRole('button', { name: 'Table settings' }));
  const dialog = await screen.findByRole('dialog', { name: 'Table settings' });
  fireEvent.click(within(dialog).getByRole('tab', { name: 'Columns' }));
  const list = within(dialog).getByRole('list', { name: 'Column order' });
  const selectionVisibility = within(dialog).getByRole('checkbox', {
    name: 'Show Selection column',
  });
  expect(selectionVisibility).toBeEnabled();
  fireEvent.click(selectionVisibility);
  expect(selectionVisibility).not.toBeChecked();
  expect(
    screen
      .getByRole('table', { name: /^Workspace tasks/ })
      .querySelector('th[data-column-key="selection"]'),
  ).toBeNull();
  fireEvent.click(within(dialog).getByRole('button', { name: 'Selection' }));
  expect(within(dialog).getByRole('region', { name: 'Selection' })).toBeInTheDocument();
  fireEvent.click(selectionVisibility);
  expect(
    screen.getByRole('table', { name: /^Workspace tasks/ }).querySelector('thead th'),
  ).toHaveAttribute('data-column-key', 'selection');
  const lockedHandle = within(dialog).getByRole('button', { name: 'Drag column Selection' });
  expect(lockedHandle).toBeDisabled();
  expect(lockedHandle).toHaveAttribute('draggable', 'false');
  const row = (name: string) =>
    within(dialog).getByRole('button', { name }).closest('[role="listitem"]')!;
  const dataTransfer = { setData: vi.fn(), setDragImage: vi.fn(), dropEffect: '' };
  const start = (name: string) => {
    within(list)
      .getAllByRole('listitem')
      .forEach((item, index) => {
        vi.spyOn(item, 'getBoundingClientRect').mockReturnValue({
          top: 100 + index * 40,
          bottom: 140 + index * 40,
          height: 40,
          left: 0,
          right: 240,
          width: 240,
        } as DOMRect);
      });
    fireEvent.dragStart(within(dialog).getByRole('button', { name: `Drag column ${name}` }), {
      dataTransfer,
    });
  };
  const hover = (name: string, edge: 'before' | 'after') => {
    const item = row(name);
    const event = createEvent.dragOver(item, { dataTransfer });
    Object.defineProperty(event, 'clientY', {
      value: item.getBoundingClientRect().top + (edge === 'before' ? 5 : 35),
    });
    fireEvent(item, event);
  };
  const order = () =>
    within(list)
      .getAllByRole('listitem')
      .map((item) => within(item).getAllByRole('button')[1]!.textContent);
  start('Task');
  hover('Priority', 'before');
  expect(row('Priority')).toHaveAttribute('data-drop-position', 'before');
  hover('Priority', 'after');
  expect(row('Priority')).toHaveAttribute('data-drop-position', 'after');
  expect(list.querySelectorAll('[data-drop-position]')).toHaveLength(1);
  fireEvent.drop(list, { dataTransfer });
  expect(order().slice(0, 5)).toEqual(['Selection', 'ID', 'Status', 'Priority', 'Task']);
  expect(list.querySelector('[data-drop-position]')).toBeNull();

  start('Task');
  hover('Status', 'before');
  expect(row('Status')).toHaveAttribute('data-drop-position', 'before');
  fireEvent.drop(list, { dataTransfer });
  expect(order().slice(0, 5)).toEqual(['Selection', 'ID', 'Task', 'Status', 'Priority']);

  fireEvent.keyDown(within(dialog).getByRole('button', { name: 'Drag column Task' }), {
    key: 'ArrowUp',
  });
  expect(order().slice(0, 5)).toEqual(['Selection', 'ID', 'Task', 'Status', 'Priority']);
  start('Status');
  hover('Selection', 'before');
  expect(list.querySelector('[data-drop-position]')).toBeNull();
  fireEvent.drop(list, { dataTransfer });
  expect(order().slice(0, 5)).toEqual(['Selection', 'ID', 'Task', 'Status', 'Priority']);

  start('Task');
  hover('Task', 'after');
  expect(list.querySelector('[data-drop-position]')).toBeNull();
  hover('Status', 'before');
  expect(list.querySelector('[data-drop-position]')).toBeNull();
  hover('Priority', 'after');
  expect(row('Priority')).toHaveAttribute('data-drop-position', 'after');
  const leave = createEvent.dragLeave(list);
  Object.defineProperty(leave, 'clientX', { value: -1 });
  fireEvent(list, leave);
  expect(list.querySelector('[data-drop-position]')).toBeNull();
  hover('Priority', 'after');
  fireEvent.dragEnd(within(dialog).getByRole('button', { name: 'Drag column Task' }));
  expect(list.querySelector('[data-drop-position]')).toBeNull();
  expect(order().slice(0, 5)).toEqual(['Selection', 'ID', 'Task', 'Status', 'Priority']);
});

it('previews the real column width, sorting arrows and combined filter/search controls live', async () => {
  renderPage();
  const table = await screen.findByRole('table', { name: /^Workspace tasks/ });
  fireEvent.click(screen.getByRole('button', { name: 'Table settings' }));
  const dialog = await screen.findByRole('dialog', { name: 'Table settings' });
  fireEvent.click(within(dialog).getByRole('tab', { name: 'Columns' }));
  fireEvent.click(within(dialog).getByRole('button', { name: 'Priority' }));
  const preview = within(dialog).getByRole('table', { name: 'Column preview' });
  expect(preview).toHaveStyle({ width: '200px' });
  expect(preview.querySelector('thead th')).toHaveAttribute('data-column-key', 'priority');
  expect(within(preview).getByText('Urgent')).toBeInTheDocument();
  const sorting = within(dialog).getByRole('button', { name: 'Sorting' });
  fireEvent.pointerEnter(sorting, { pointerType: 'mouse' });
  expect(screen.queryByRole('menu')).toBeNull();
  expect(sorting).toHaveAttribute('aria-pressed', 'false');
  fireEvent.click(sorting);
  expect(sorting).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getAllByRole('menuitemradio')).toHaveLength(3);
  fireEvent.click(sorting);
  expect(screen.queryByRole('menu')).toBeNull();
  expect(sorting).toHaveAttribute('aria-pressed', 'false');
  fireEvent.click(sorting);
  fireEvent.click(screen.getByRole('menuitemradio', { name: 'Both arrows' }));
  expect(preview.querySelector('[data-slot="sort-indicator"]')).toHaveAttribute(
    'data-mode',
    'both',
  );
  fireEvent.click(sorting);
  fireEvent.click(sorting);
  fireEvent.click(screen.getByRole('menuitemradio', { name: 'Down arrow' }));
  expect(preview.querySelector('[data-slot="sort-indicator"]')).toHaveAttribute(
    'data-mode',
    'descending',
  );
  fireEvent.click(within(dialog).getByRole('button', { name: 'Sorting' }));
  expect(within(dialog).getByRole('button', { name: 'Sorting' })).toHaveAttribute(
    'aria-pressed',
    'false',
  );
  expect(preview.querySelector('[data-slot="sort-indicator"]')).toBeNull();
  fireEvent.click(within(dialog).getByRole('button', { name: 'Sorting' }));
  expect(preview.querySelector('[data-slot="sort-indicator"]')).toHaveAttribute(
    'data-mode',
    'descending',
  );
  // Filtering is now enabled by default for the categorical Priority column.
  fireEvent.click(within(dialog).getByRole('button', { name: 'Search' }));
  expect(within(preview).getByRole('button', { name: 'Filter Priority' })).toBeInTheDocument();
  expect(within(preview).getByRole('button', { name: 'Search Priority' })).toBeInTheDocument();
  expect(within(dialog).getByRole('button', { name: 'Filter' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  const headerAlign = within(dialog).getByRole('radiogroup', { name: 'Alignment' });
  fireEvent.click(within(headerAlign).getByRole('radio', { name: 'Align center' }));
  expect(within(headerAlign).getByRole('radio', { name: 'Align center' })).toBeChecked();
  expect(preview.querySelector('[data-layout]')).toHaveAttribute('data-layout', 'separate');
  expect(headerAlign).toHaveAttribute('data-motion', 'slide');
  fireEvent.click(within(dialog).getByRole('radio', { name: 'Together' }));
  expect(preview.querySelector('[data-layout]')).toHaveAttribute('data-layout', 'joined');
  expect(preview.querySelector('[data-layout]')).toHaveAttribute('data-align', 'center');
  expect(table.querySelector('[data-column-key="priority"] [data-layout]')).toHaveAttribute(
    'data-layout',
    'joined',
  );
  fireEvent.click(within(headerAlign).getByRole('radio', { name: 'Align right' }));
  expect(preview.querySelector('[data-layout]')).toHaveAttribute('data-align', 'end');
  const input = within(dialog).getByRole('spinbutton', { name: 'Width (px)' });
  fireEvent.change(input, { target: { value: '280' } });
  fireEvent.blur(input);
  expect(preview).toHaveStyle({ width: '280px' });
  expect(table.querySelector('col:nth-child(5)')).toHaveStyle({ width: '280px' });
  fireEvent.click(within(preview).getByRole('button', { name: 'Priority' }));
  expect(within(preview).getByRole('columnheader')).toHaveAttribute('aria-sort', 'descending');
  expect(within(table).getByRole('columnheader', { name: /Priority/ })).toHaveAttribute(
    'aria-sort',
    'none',
  );
});

it('shows optional ID beside selection, completed timestamps and distinct default header controls', async () => {
  renderPage();
  const table = await screen.findByRole('table', { name: /^Workspace tasks/ });
  await within(table).findByRole('checkbox', { name: 'Select task 49e7996a-311b' });
  const heads = () =>
    Array.from(table.querySelectorAll('thead th')).map((head) =>
      head.getAttribute('data-column-key'),
    );
  expect(heads().slice(0, 2)).toEqual(['selection', 'rowNumber']);
  expect(heads().slice(-2)).toEqual(['completedAt', 'actions']);
  const row = table.querySelector('[data-task-id="32d238f5-9380"]')!;
  expect(row.querySelector('[data-column-key="completedAt"] time')).toHaveAttribute(
    'datetime',
    initialTaskState.tasks.find((task) => task.id === '32d238f5-9380')!.completedAt!,
  );
  expect(
    table.querySelector('[data-task-id="49e7996a-311b"] [data-column-key="completedAt"]'),
  ).toHaveTextContent('—');
  expect(
    table.querySelector('th[data-column-key="createdAt"] [data-slot="sort-indicator"]'),
  ).toHaveAttribute('data-mode', 'descending');
  expect(
    table.querySelector('th[data-column-key="dueDate"] [data-slot="sort-indicator"]'),
  ).toHaveAttribute('data-mode', 'ascending');
  expect(
    table.querySelector('th[data-column-key="estimateHours"] [data-slot="sort-indicator"]'),
  ).toHaveAttribute('data-mode', 'both');
  expect(within(table).getByRole('button', { name: 'Search Task' })).toBeInTheDocument();
  expect(within(table).getByRole('button', { name: 'Filter Status' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Table settings' }));
  const dialog = await screen.findByRole('dialog', { name: 'Table settings' });
  fireEvent.click(within(dialog).getByRole('tab', { name: 'Selection & pagination' }));
  fireEvent.click(within(dialog).getByRole('switch', { name: 'Show ID column' }));
  expect(heads()).not.toContain('rowNumber');
  expect(heads()[0]).toBe('selection');
  fireEvent.click(within(dialog).getByRole('switch', { name: 'Show ID column' }));
  fireEvent.click(within(dialog).getByRole('tab', { name: 'Columns' }));
  expect(within(dialog).getByRole('button', { name: 'Drag column ID' })).toBeDisabled();
  fireEvent.click(within(dialog).getByRole('button', { name: 'ID' }));
  expect(within(dialog).getByRole('spinbutton', { name: 'Width (px)' })).toHaveValue(75);
  expect(within(dialog).getByRole('slider', { name: 'Minimum width (px)' })).toHaveAttribute(
    'aria-valuenow',
    '70',
  );
  expect(within(dialog).getByRole('slider', { name: 'Maximum width (px)' })).toHaveAttribute(
    'aria-valuenow',
    '120',
  );
});

it('numbers rows continuously across pages and preserves UUID in the Task column through paging and sorting', async () => {
  renderPage();
  const table = await screen.findByRole('table', { name: /^Workspace tasks/ });
  await within(table).findByRole('checkbox', { name: 'Select task 49e7996a-311b' });
  const numbers = () =>
    Array.from(table.querySelectorAll('tbody td[data-column-key="rowNumber"]')).map(
      (cell) => cell.textContent,
    );
  expect(numbers()).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
  expect(
    table.querySelector('[data-task-id="49e7996a-311b"] [data-column-key="title"]'),
  ).toHaveTextContent('49e7996a-311b');
  fireEvent.click(
    within(screen.getByRole('navigation', { name: 'Task pages' })).getByRole('button', {
      name: 'Page 2',
    }),
  );
  await within(table).findByRole('checkbox', { name: 'Select task 1bbcd880-f5e5' });
  expect(numbers()).toEqual(['11', '12', '13', '14', '15', '16', '17', '18', '19', '20']);
  fireEvent.click(
    within(screen.getByRole('navigation', { name: 'Task pages' })).getByRole('button', {
      name: 'Page 24',
    }),
  );
  await waitFor(() =>
    expect(numbers()).toEqual([
      '231',
      '232',
      '233',
      '234',
      '235',
      '236',
      '237',
      '238',
      '239',
      '240',
    ]),
  );
  fireEvent.click(within(table).getByRole('button', { name: 'Created at' }));
  await within(table).findByRole('checkbox', { name: 'Select task 49e7996a-311b' });
  expect(numbers()).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
  for (const row of Array.from(table.querySelectorAll('tbody tr'))) {
    expect(row.querySelector('[data-column-key="title"]')).toHaveTextContent(
      row.getAttribute('data-task-id')!,
    );
  }
});

it('sets left/right fixed ranges through pin menus and updates sticky offsets after hiding columns', async () => {
  renderPage();
  const table = await screen.findByRole('table', { name: /^Workspace tasks/ });
  await within(table).findByRole('checkbox', { name: 'Select task 49e7996a-311b' });
  const head = (key: string) => table.querySelector(`th[data-column-key="${key}"]`)!;
  expect(head('title')).toHaveAttribute('data-fixed', 'start');
  expect(head('title')).toHaveStyle({ insetInlineStart: '150px' });
  expect(head('actions')).toHaveAttribute('data-fixed', 'end');
  expect(head('status')).not.toHaveAttribute('data-fixed');
  fireEvent.click(screen.getByRole('button', { name: 'Table settings' }));
  const dialog = await screen.findByRole('dialog', { name: 'Table settings' });
  fireEvent.click(within(dialog).getByRole('tab', { name: 'Selection & pagination' }));
  fireEvent.click(within(dialog).getByRole('switch', { name: 'Show ID column' }));
  expect(head('title')).toHaveStyle({ insetInlineStart: '75px' });
  fireEvent.click(within(dialog).getByRole('tab', { name: 'Columns' }));
  fireEvent.click(within(dialog).getByRole('button', { name: 'Pin range for Task' }));
  fireEvent.click(screen.getByRole('menuitem', { name: 'Unpin' }));
  expect(head('title')).not.toHaveAttribute('data-fixed');
  expect(head('selection')).not.toHaveAttribute('data-fixed');
  fireEvent.click(within(dialog).getByRole('button', { name: 'Pin range for Status' }));
  fireEvent.click(
    screen.getByRole('menuitemradio', { name: 'Pin this column and earlier columns left' }),
  );
  expect(head('status')).toHaveAttribute('data-fixed', 'start');
  expect(head('priority')).not.toHaveAttribute('data-fixed');
  fireEvent.click(within(dialog).getByRole('button', { name: 'Pin range for Completed at' }));
  fireEvent.click(
    screen.getByRole('menuitemradio', { name: 'Pin this column and later columns right' }),
  );
  expect(head('completedAt')).toHaveAttribute('data-fixed', 'end');
  expect(head('completedAt')).toHaveStyle({ insetInlineEnd: '250px' });
  expect(table.querySelector('td[data-column-key="completedAt"]')).toHaveStyle({
    insetInlineEnd: '250px',
  });
});

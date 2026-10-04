// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { getTasks } from '@/api/tasks';
import { useProData } from '@/application/pro-data-context';
import { ProDataProvider } from '@/application/ProDataProvider';
import { handlers } from '@/mock/handlers';
import { resetTasks } from '@/mock/handlers/tasks';

import { TasksPage } from './TasksPage';

const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
beforeEach(() => resetTasks());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function Page() {
  const { state, dispatch } = useProData();
  return <TasksPage state={state} dispatch={dispatch} />;
}
function renderPage(path = '/work/tasks') {
  render(
    <MemoryRouter initialEntries={[path]}>
      <ProDataProvider>
        <Page />
      </ProDataProvider>
    </MemoryRouter>,
  );
}

describe('Task row actions and batch deletion', () => {
  it('opens task links with the requested record filter', async () => {
    renderPage('/work/tasks?search=abb01fb9-ab2f');
    const table = await screen.findByRole('table');
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
    expect(summary).toHaveTextContent('Total 256 items');
    expect(summary.querySelector('[data-slot="selected"]')).toBeNull();
    fireEvent.click(first);
    expect(summary).toHaveTextContent('Total 256 items (Selected 1 items)');
    fireEvent.click(within(navigation).getByRole('button', { name: 'Page 2' }));
    const next = await screen.findByRole('checkbox', { name: 'Select task 1bbcd880-f5e5' });
    expect(summary).toHaveTextContent('Total 256 items (Selected 1 items)');
    fireEvent.click(next);
    expect(summary).toHaveTextContent('Total 256 items (Selected 2 items)');
  });

  it('places actions after due date and opens separate read-only details and editing flows', async () => {
    renderPage();
    const table = await screen.findByRole('table');
    await within(table).findAllByRole('button', { name: 'Details' });
    expect(
      within(table)
        .getAllByRole('columnheader')
        .slice(-2)
        .map((head) => head.textContent),
    ).toEqual(['Due date', 'Actions']);
    fireEvent.click(within(table).getAllByRole('button', { name: 'Details' })[0]!);
    const details = await screen.findByRole('dialog', { name: 'Task details' });
    expect(within(details).queryByRole('textbox')).not.toBeInTheDocument();
    expect(within(details).getByText('Nina Wu')).toBeInTheDocument();
    fireEvent.click(within(details).getByRole('button', { name: 'Edit' }));
    const editor = await screen.findByRole('dialog', { name: 'Edit task' });
    expect(within(editor).getByRole('textbox', { name: 'Title' })).toHaveValue(
      'Align release readiness with support',
    );
    fireEvent.click(within(editor).getAllByRole('button', { name: 'Close' })[0]!);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    fireEvent.click(within(table).getAllByRole('button', { name: 'Edit' })[0]!);
    expect(await screen.findByRole('dialog', { name: 'Edit task' })).toBeInTheDocument();
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
    expect((await getTasks()).total).toBe(256);
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
    expect((await getTasks()).total).toBe(256);
    server.resetHandlers();
    fireEvent.click(within(dialog).getByRole('button', { name: 'Delete' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() =>
      expect(
        screen.queryByRole('checkbox', { name: 'Select task 49e7996a-311b' }),
      ).not.toBeInTheDocument(),
    );
    expect((await getTasks()).total).toBe(255);
    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
    expect(
      screen
        .getByRole('navigation', { name: 'Task pages' })
        .querySelector('[data-slot="selected"]'),
    ).toBeNull();
    expect(screen.getByText('Total 255 items')).toBeInTheDocument();
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
    expect((await getTasks()).total).toBe(254);
  });
});

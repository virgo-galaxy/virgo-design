// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { http as mswHttp, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { API_ERROR_CODES } from '@/api/error-codes';
import { getTask } from '@/api/tasks';
import { i18nInstance } from '@/i18n/runtime';
import { handlers } from '@/mock/handlers';
import { resetTasks } from '@/mock/handlers/tasks';
import { TaskDialog } from '@/pages/tasks/TaskDialog';

import { useProData } from './pro-data-context';
import { ProDataProvider } from './ProDataProvider';
import { TaskCollectionBoundary } from './TaskCollectionBoundary';
import { useRemoteData } from './use-remote-data';
const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
beforeEach(async () => {
  resetTasks();
  await i18nInstance.changeLanguage('en-US');
});
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());
function Editor() {
  const { state, dispatch } = useProData();
  const task = state.tasks[0]!;
  return (
    <TaskDialog
      task={task}
      hiddenByFilters={false}
      onSave={async (draft) => {
        await dispatch({ type: 'edit', id: task.id, draft });
      }}
      onStatusChange={async (status) => {
        await dispatch({ type: 'status', id: task.id, status });
      }}
      onClose={() => {}}
      restoreFocus={() => {}}
    />
  );
}
describe('remote UI states', () => {
  it('shows bootstrap error and retries through the API', async () => {
    server.use(
      mswHttp.get(
        '/api/v1/profile',
        () => new HttpResponse('Gateway unavailable', { status: 503 }),
      ),
    );
    render(
      <ProDataProvider>
        <p>Remote application ready</p>
      </ProDataProvider>,
    );
    expect(screen.getByRole('status')).toBeTruthy();
    await screen.findByText('Unable to load data');
    expect(screen.queryByText('Remote application ready')).toBeNull();
    server.resetHandlers();
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(await screen.findByText('Remote application ready')).toBeTruthy();
  });
  it('retains the edited draft on API failure and saves successfully on retry', async () => {
    render(
      <ProDataProvider>
        <TaskCollectionBoundary>
          <Editor />
        </TaskCollectionBoundary>
      </ProDataProvider>,
    );
    const title = await screen.findByRole('textbox', { name: 'Title' });
    fireEvent.change(title, { target: { value: 'Remote saved title' } });
    server.use(
      mswHttp.patch('/api/v1/tasks/:id', () =>
        HttpResponse.json(
          {
            code: API_ERROR_CODES.TASK_VALIDATION_FAILED,
            msg: 'Rejected task',
            data: {
              detail: 'Please retry this save',
              fields: { title: ['Backend validation'] },
              timestamp: new Date().toISOString(),
            },
          },
          { status: 422 },
        ),
      ),
    );
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    await screen.findByText('Unable to save');
    expect((title as HTMLInputElement).value).toBe('Remote saved title');
    expect((await getTask('49e7996a-311b')).title).not.toBe('Remote saved title');
    server.resetHandlers();
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    await waitFor(() => expect(screen.queryByText('Unable to save')).toBeNull());
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Save changes' }).hasAttribute('disabled')).toBe(
        true,
      ),
    );
    expect((await getTask('49e7996a-311b')).title).toBe('Remote saved title');
  });
  it('cancels replaced requests and ignores late results after query changes', async () => {
    let resolveFirst: ((value: string) => void) | undefined;
    let firstSignal: AbortSignal | undefined;
    const first = vi.fn((signal: AbortSignal) => {
      firstSignal = signal;
      return new Promise<string>((resolve) => {
        resolveFirst = resolve;
      });
    });
    const second = vi.fn(async () => 'Newest result');
    function View({ load }: { load: (signal: AbortSignal) => Promise<string> }) {
      const result = useRemoteData(load);
      return <p>{result.data ?? 'Loading'}</p>;
    }
    const view = render(<View load={first} />);
    view.rerender(<View load={second} />);
    expect(await screen.findByText('Newest result')).toBeTruthy();
    expect(firstSignal?.aborted).toBe(true);
    await act(async () => resolveFirst?.('Old result'));
    expect(screen.queryByText('Old result')).toBeNull();
  });
});

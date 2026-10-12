// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { http as mswHttp, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { API_ERROR_CODES } from '@/api/error-codes';
import { getTask } from '@/api/tasks';
import { i18nInstance } from '@/i18n/runtime';
import { handlers } from '@/mock/handlers';
import { resetTasks } from '@/mock/handlers/tasks';
import { TaskForm } from '@/pages/tasks/TaskForm';
import { TestSessionProvider } from '@/test/TestSessionProvider';

import { CatalogBoundary } from './CatalogBoundary';
import { useTaskOperations } from './pro-data-context';
import { ProDataProvider } from './ProDataProvider';
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
const loadEditorTask = (signal: AbortSignal) => getTask('49e7996a-311b', signal);
function Editor() {
  const { dispatch } = useTaskOperations();
  const resource = useRemoteData(loadEditorTask);
  if (!resource.data) return null;
  const task = resource.data;
  return (
    <TaskForm
      task={task}
      onSave={async (draft) => {
        await dispatch({ type: 'edit', id: task.id, draft });
      }}
      onCancel={() => {}}
    />
  );
}
describe('remote UI states', () => {
  it('shows bootstrap error and retries through the API', async () => {
    server.use(
      mswHttp.get(
        '/api/v1/tasks/metadata',
        () => new HttpResponse('Gateway unavailable', { status: 503 }),
      ),
    );
    render(
      <TestSessionProvider>
        <ProDataProvider>
          <CatalogBoundary>
            <p>Remote application ready</p>
          </CatalogBoundary>
        </ProDataProvider>
      </TestSessionProvider>,
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
      <RouterProvider
        router={createMemoryRouter([
          {
            path: '/',
            element: (
              <TestSessionProvider>
                <ProDataProvider>
                  <CatalogBoundary>
                    <Editor />
                  </CatalogBoundary>
                </ProDataProvider>
              </TestSessionProvider>
            ),
          },
        ])}
      />,
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

it('keeps a successful mutation result when an older read resolves afterwards', async () => {
  let resolveRead: ((value: string) => void) | undefined;
  const load = () =>
    new Promise<string>((resolve) => {
      resolveRead = resolve;
    });
  function View() {
    const resource = useRemoteData(load);
    return (
      <>
        <p>{resource.data ?? 'Reading'}</p>
        <button onClick={() => resource.setData('Saved mutation')}>Save result</button>
      </>
    );
  }
  render(<View />);
  fireEvent.click(screen.getByRole('button', { name: 'Save result' }));
  await act(async () => resolveRead?.('Older read'));
  expect(screen.getByText('Saved mutation')).toBeInTheDocument();
  expect(screen.queryByText('Older read')).not.toBeInTheDocument();
});

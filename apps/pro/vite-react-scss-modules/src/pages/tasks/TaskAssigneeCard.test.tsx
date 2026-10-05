// @vitest-environment jsdom
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { userDetailsCache } from '@/application/user-details-cache';
import { users } from '@/mock/fixtures/users';
import { members } from '@/mock/fixtures/workplace';
import { handlers } from '@/mock/handlers';

import { TaskAssigneeCard } from './TaskAssigneeCard';

const server = setupServer(...handlers);
const nina = members.find((member) => member.id === 'nina')!;
const profile = users.find((user) => user.id === 'nina')!;
const load = vi.fn();
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
beforeEach(() => {
  userDetailsCache.clear();
  load.mockClear();
  server.use(
    http.get('/api/v1/users/:id', async () => {
      load();
      await delay(60);
      return HttpResponse.json({ code: 0, msg: 'success', data: profile });
    }),
  );
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('assignee profile card', () => {
  it('ignores a passing hover and fetches only after intentional hover', async () => {
    render(<TaskAssigneeCard member={nina} size="md" />);
    const trigger = screen.getByRole('button', { name: 'View Nina Wu profile' });
    expect(load).not.toHaveBeenCalled();
    fireEvent.pointerEnter(trigger, { pointerType: 'mouse' });
    fireEvent.pointerLeave(trigger, { pointerType: 'mouse' });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 350));
    });
    expect(load).not.toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.pointerEnter(trigger, { pointerType: 'mouse' });
    const card = await screen.findByRole('dialog', { name: 'Nina Wu profile' });
    await within(card).findByText('nina.wu@virgo.example');
    expect(card).toHaveTextContent('VD-0003');
    expect(within(card).getByRole('img', { name: 'Nina Wu' })).toHaveAttribute(
      'src',
      '/api/v1/avatars/user_3.png',
    );
    expect(load).toHaveBeenCalledTimes(1);
  });

  it('reuses the same profile on another row and closes with Escape without reopening', async () => {
    render(
      <>
        <TaskAssigneeCard member={nina} size="md" />
        <TaskAssigneeCard member={nina} size="md" />
      </>,
    );
    const [first, second] = screen.getAllByRole('button', { name: 'View Nina Wu profile' });
    fireEvent.pointerEnter(first!, { pointerType: 'mouse' });
    await screen.findByText('nina.wu@virgo.example');
    fireEvent.pointerLeave(first!, { pointerType: 'mouse' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    fireEvent.focus(second!);
    const card = await screen.findByRole('dialog', { name: 'Nina Wu profile' });
    await within(card).findByText('nina.wu@virgo.example');
    expect(load).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(card, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 350));
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('supports a clicked trigger and retries a failed request', async () => {
    let attempt = 0;
    server.use(
      http.get('/api/v1/users/nina', () => {
        attempt += 1;
        return attempt === 1
          ? HttpResponse.json(
              { code: 10001, msg: 'Unavailable', data: { detail: 'Unavailable' } },
              { status: 503 },
            )
          : HttpResponse.json({ code: 0, msg: 'success', data: profile });
      }),
    );
    render(<TaskAssigneeCard member={nina} size="md" />);
    fireEvent.click(screen.getByRole('button', { name: 'View Nina Wu profile' }));
    await screen.findByRole('alert');
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    await screen.findByText('nina.wu@virgo.example');
    expect(attempt).toBe(2);
  });
});

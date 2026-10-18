// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { beforeEach, expect, it, vi } from 'vitest';

import { SessionContext } from '@/features/auth';
import { getStoredUser } from '@/lib/auth/session';
import { TestSessionProvider } from '@/test/TestSessionProvider';

import { DemoResetAction } from './DemoResetAction';

const { resetDemo } = vi.hoisted(() => ({ resetDemo: vi.fn() }));
vi.mock('../client', () => ({ resetDemo }));

function renderSettings() {
  return render(
    <TestSessionProvider>
      <DemoResetAction />
    </TestSessionProvider>,
  );
}

async function openReset() {
  fireEvent.click(screen.getByRole('button', { name: 'Reset demo data' }));

  return screen.findByRole('dialog', { name: 'Restore the initial demo?' });
}

beforeEach(() => vi.resetAllMocks());

it('requires confirmation and allows cancellation without changing data', async () => {
  renderSettings();
  const dialog = await openReset();
  expect(dialog).toHaveTextContent('Local changes and the current session will be cleared.');
  expect(resetDemo).not.toHaveBeenCalled();
  fireEvent.click(within(dialog).getByRole('button', { name: 'Cancel' }));
  await waitFor(() =>
    expect(screen.queryByRole('dialog', { name: 'Restore the initial demo?' })).toBeNull(),
  );
  expect(resetDemo).not.toHaveBeenCalled();
});

it('blocks cancellation and duplicate submissions while resetting', async () => {
  resetDemo.mockReturnValue(new Promise(() => {}));
  renderSettings();
  const dialog = await openReset();
  fireEvent.click(within(dialog).getByRole('button', { name: 'Reset demo data' }));
  const confirm = within(dialog).getByRole('button', { name: 'Resetting…' });
  expect(confirm).toBeDisabled();
  expect(confirm).toHaveAttribute('aria-busy', 'true');
  expect(within(dialog).getByRole('button', { name: 'Cancel' })).toBeDisabled();
  fireEvent.click(confirm);
  fireEvent.keyDown(dialog, { key: 'Escape' });
  expect(resetDemo).toHaveBeenCalledOnce();
  expect(dialog).toBeVisible();
});

it('shows reset failures and permits retry', async () => {
  resetDemo
    .mockRejectedValueOnce(new Error('Network failed'))
    .mockReturnValueOnce(new Promise(() => {}));
  renderSettings();
  const dialog = await openReset();
  fireEvent.click(within(dialog).getByRole('button', { name: 'Reset demo data' }));
  expect(await within(dialog).findByRole('alert')).toHaveTextContent('Unable to reset demo data');
  expect(within(dialog).getByRole('button', { name: 'Cancel' })).not.toBeDisabled();
  fireEvent.click(within(dialog).getByRole('button', { name: 'Reset demo data' }));
  expect(resetDemo).toHaveBeenCalledTimes(2);
  expect(within(dialog).queryByRole('alert')).toBeNull();
});

it('ends the local session after the server resets demo data', async () => {
  resetDemo.mockResolvedValue({ authenticated: false });
  const endSession = vi.fn();

  render(
    <SessionContext value={{ user: getStoredUser()!, signOut: vi.fn(), endSession }}>
      <DemoResetAction />
    </SessionContext>,
  );

  const dialog = await openReset();
  fireEvent.click(within(dialog).getByRole('button', { name: 'Reset demo data' }));

  await waitFor(() => expect(endSession).toHaveBeenCalledOnce());
});

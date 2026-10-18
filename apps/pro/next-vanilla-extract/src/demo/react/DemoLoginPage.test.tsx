// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router';
import { afterAll, afterEach, beforeAll, beforeEach, expect, it, vi } from 'vitest';

import { handlers } from '@/test/demo-handlers';

import { DemoLoginPage } from './DemoLoginPage';

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
beforeEach(() => {
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});
afterEach(() => vi.unstubAllGlobals());

it('adds demo credentials and account selection to the regular login flow', async () => {
  const onLogin = vi.fn();

  render(
    <RouterProvider
      router={createMemoryRouter([
        {
          element: (
            <Outlet context={{ current: { authenticated: false }, expired: false, onLogin }} />
          ),
          children: [{ path: '*', element: <DemoLoginPage /> }],
        },
      ])}
    />,
  );

  expect(screen.getByRole('textbox', { name: 'Account' })).toHaveValue('admin');
  expect(screen.getByLabelText(/^Password/)).toHaveValue('virgo123');

  const accounts = await screen.findByRole('button', { name: 'Choose a demo account' });
  fireEvent.click(accounts);
  fireEvent.click(await screen.findByRole('option', { name: /Anika Rao/ }));

  expect(screen.getByRole('textbox', { name: 'Account' })).toHaveValue('ava');
  fireEvent.click(screen.getByRole('button', { name: 'Sign in to workspace' }));

  await vi.waitFor(() =>
    expect(onLogin).toHaveBeenCalledWith(
      expect.objectContaining({
        authenticated: true,
        user: expect.objectContaining({ account: 'ava' }),
      }),
    ),
  );
});

vi.mock('@/features/auth/context/app-session-context', async () => {
  const { useOutletContext } = await import('react-router');
  return { useAppSession: useOutletContext };
});

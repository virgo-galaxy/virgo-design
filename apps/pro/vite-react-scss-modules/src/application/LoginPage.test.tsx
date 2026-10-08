// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, expect, it, vi } from 'vitest';

import { ProControlLabels } from '@/app/ProControlLabels';
import { handlers } from '@/mock/handlers';

import { LoginPage } from './LoginPage';

const server = setupServer(...handlers);
beforeAll(() => {
  window.matchMedia = vi.fn().mockImplementation(() => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  server.listen({ onUnhandledRequest: 'error' });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('toggles password visibility by clicking the eye and pressing Enter without submitting', async () => {
  const onLogin = vi.fn();
  const user = userEvent.setup();
  render(
    <ProControlLabels>
      <LoginPage onLogin={onLogin} expired={false} />
    </ProControlLabels>,
  );
  const password = screen.getByLabelText(/^Password/);
  expect(password).toHaveAttribute('type', 'password');
  fireEvent.change(password, { target: { value: 'virgo123' } });
  await user.click(screen.getByRole('button', { name: 'Show password' }));
  expect(password).toHaveAttribute('type', 'text');
  expect(password).toHaveValue('virgo123');
  expect(password).toHaveFocus();
  await user.tab();
  expect(screen.getByRole('button', { name: 'Hide password' })).toHaveFocus();
  await user.keyboard('{Enter}');
  expect(password).toHaveAttribute('type', 'password');
  expect(password).toHaveValue('virgo123');
  expect(onLogin).not.toHaveBeenCalled();
});

it('switches light/dark appearance and renders the monochrome footer brand', async () => {
  const user = userEvent.setup();
  render(
    <ProControlLabels>
      <LoginPage onLogin={vi.fn()} expired={false} />
    </ProControlLabels>,
  );
  await user.click(screen.getByRole('button', { name: 'Dark Mode' }));
  expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  await user.click(screen.getByRole('button', { name: 'Light Mode' }));
  expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  expect(screen.getByText('Virgo Design Pro').parentElement?.querySelector('svg')).not.toBeNull();
});

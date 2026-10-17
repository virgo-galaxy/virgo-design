// @vitest-environment jsdom
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, beforeEach, expect, it, vi } from 'vitest';

import { i18nInstance } from '@/i18n';
import { handlers } from '@/mock/handlers';
import { initializePreferences } from '@/preferences';

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
beforeEach(() => initializePreferences());

it('keeps a failed sign-in message localized when the user changes language', async () => {
  render(<LoginPage onLogin={vi.fn()} expired={false} />);
  fireEvent.change(screen.getByRole('textbox', { name: 'Account' }), {
    target: { value: 'missing-account' },
  });
  fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
    target: { value: 'wrong-password' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Sign in to workspace' }));
  const error = await screen.findByRole('alert');
  expect(error).toHaveTextContent(i18nInstance.t('auth.login.invalidCredentials'));
  await act(() => i18nInstance.changeLanguage('zh-CN'));
  expect(error).toHaveTextContent(i18nInstance.t('auth.login.invalidCredentials'));
});

it('toggles password visibility by clicking the eye and pressing Enter without submitting', async () => {
  const onLogin = vi.fn();
  const user = userEvent.setup();
  render(<LoginPage onLogin={onLogin} expired={false} />);
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

it('switches light/dark appearance from the login page', async () => {
  const user = userEvent.setup();
  render(<LoginPage onLogin={vi.fn()} expired={false} />);
  await user.click(screen.getByRole('button', { name: 'Dark Mode' }));
  expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  await user.click(screen.getByRole('button', { name: 'Light Mode' }));
  expect(document.documentElement).toHaveAttribute('data-theme', 'light');
});

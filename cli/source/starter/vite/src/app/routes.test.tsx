import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterEach, expect, it, vi } from 'vitest';

import { initializeLocale } from '@/i18n/locale';

import { routes } from './routes';

afterEach(() => vi.unstubAllGlobals());

it('opens Workplace through workspace navigation from an unknown page', async () => {
  vi.stubGlobal('matchMedia', () => Object.assign(new EventTarget(), { matches: false }));
  await initializeLocale();
  const router = createMemoryRouter(routes, { initialEntries: ['/missing'] });
  render(<RouterProvider router={router} />);

  await screen.findByRole('heading', { name: 'Page not found' });
  await userEvent.click(screen.getByRole('link', { name: /^Workplace$/ }));
  expect(await screen.findByRole('heading', { name: 'Workplace' })).toBeTruthy();
  expect(router.state.location.pathname).toBe('/dashboard/workplace');
});

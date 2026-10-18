// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterAll, afterEach, beforeAll, beforeEach, expect, it, vi } from 'vitest';

import { handlers } from '@/mock/handlers';
import { initializePreferences } from '@/preferences';
import { createAppRoutes } from '@/routes/router';

vi.hoisted(() => vi.stubEnv('VITE_API_MOCKING', 'true'));

vi.mock('@/pages/work/tasks', () => ({ default: () => <h1>Tasks content</h1> }));

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => {
  server.close();
  vi.unstubAllEnvs();
});
beforeEach(() => {
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', { configurable: true, value: vi.fn() });
  initializePreferences();
});
afterEach(() => vi.unstubAllGlobals());

it('composes the demo account and reset action around the routed business view', async () => {
  const router = createMemoryRouter(createAppRoutes(), { initialEntries: ['/work/tasks'] });
  const view = render(<RouterProvider router={router} />);

  try {
    expect(await screen.findByRole('heading', { name: 'Tasks content' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Admin account' })).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Settings' }));

    expect(await screen.findByRole('dialog', { name: 'Settings' })).toBeVisible();
    expect(await screen.findByRole('button', { name: 'Reset demo data' })).toBeVisible();
  } finally {
    view.unmount();
    router.dispose();
  }
});

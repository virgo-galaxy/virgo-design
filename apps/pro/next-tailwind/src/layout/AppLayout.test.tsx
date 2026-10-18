// @vitest-environment jsdom
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterAll, afterEach, beforeAll, beforeEach, expect, it, vi } from 'vitest';

import { login } from '@/api/auth';
import { handlers } from '@/mock/handlers';
import {
  defaultPreferences,
  initializePreferences,
  preferencesStorageKey,
  serializePreferences,
} from '@/preferences';
import { createAppRoutes } from '@/test/router';

vi.hoisted(() => vi.stubEnv('NEXT_PUBLIC_API_MOCKING', 'true'));

vi.mock('@/app/(pro)/work/tasks/page', () => ({ default: () => <h1>Tasks content</h1> }));
vi.mock('@/app/(pro)/work/tasks/[id]/edit/page', () => ({
  default: () => <h1>Edit task content</h1>,
}));
vi.mock('@/app/(pro)/work/projects/page', () => ({ default: () => <h1>Projects content</h1> }));
vi.mock('@/app/(pro)/work/projects/[projectId]/handoff/page', () => ({
  default: () => <h1>Handoff content</h1>,
}));

const server = setupServer(...handlers);
let router: ReturnType<typeof createMemoryRouter>;

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

beforeEach(() => {
  localStorage.removeItem(preferencesStorageKey);
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', { configurable: true, value: vi.fn() });
});

afterEach(() => {
  router?.dispose();
  server.resetHandlers();
  vi.unstubAllGlobals();
});

afterAll(() => {
  server.close();
  vi.unstubAllEnvs();
});

it('composes the demo account and reset action around the routed business view', async () => {
  await renderLayout();

  expect(await screen.findByRole('heading', { name: 'Tasks content' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Admin account' })).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: 'Settings' }));

  expect(await screen.findByRole('dialog', { name: 'Settings' })).toBeVisible();
  expect(await screen.findByRole('button', { name: 'Reset demo data' })).toBeVisible();
});

it('keeps navigation and account access when customization is disabled', async () => {
  localStorage.setItem(
    preferencesStorageKey,
    serializePreferences({ ...defaultPreferences, showHeader: false, sidebarState: 'hidden' }),
  );
  await renderLayout('nina');

  expect(screen.getByRole('button', { name: / account$/ })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Settings' })).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Tasks' })).toBeInTheDocument();
});

it('retains an account menu and a working restore control for hidden admin header and sidebar', async () => {
  localStorage.setItem(
    preferencesStorageKey,
    serializePreferences({ ...defaultPreferences, showHeader: false, sidebarState: 'hidden' }),
  );
  await renderLayout();

  expect(screen.getAllByRole('button', { name: /account/i })).toHaveLength(1);

  fireEvent.click(screen.getByRole('button', { name: 'Restore navigation' }));

  expect(screen.getByRole('link', { name: 'Tasks' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Restore navigation' })).not.toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /account/i })).toHaveLength(1);
});

it('keeps responsive sidebar collapse separate from the saved desktop preference', async () => {
  let narrow = false;
  const resized = new Set<() => void>();
  vi.stubGlobal('matchMedia', (query: string) => ({
    get matches() {
      return query === '(max-width: 1080px)' && narrow;
    },
    addEventListener: (_: string, listener: () => void) => {
      if (query === '(max-width: 1080px)') resized.add(listener);
    },
    removeEventListener: (_: string, listener: () => void) => resized.delete(listener),
  }));
  localStorage.setItem(preferencesStorageKey, serializePreferences(defaultPreferences));
  await renderLayout();

  expect(screen.getByRole('complementary')).toHaveAttribute('data-state', 'expanded');

  act(() => {
    narrow = true;
    resized.forEach((listener) => listener());
  });

  expect(screen.getByRole('complementary')).toHaveAttribute('data-state', 'collapsed');
  expect(JSON.parse(localStorage.getItem(preferencesStorageKey)!)).toMatchObject({
    sidebarState: 'expanded',
  });
});

it.each([
  {
    path: '/work/tasks/task-1/edit',
    label: 'Tasks',
    title: 'Edit task',
    href: '/work/tasks',
  },
  {
    path: '/work/projects/project-1/handoff',
    label: 'Projects',
    title: 'Prepare handoff',
    href: '/work/projects',
  },
])(
  'selects $label for a nested route and updates page context after navigation',
  async ({ path, label, title, href }) => {
    const router = await renderLayout('admin', path);
    const content = document.getElementById('pro-main');
    const breadcrumb = screen.getByRole('navigation', { name: 'Page breadcrumb' });
    const selected = screen.getByRole('link', { current: 'page' });

    expect(selected).toHaveAccessibleName(label);
    expect(selected).toHaveAttribute('href', href);
    expect(document.title).toBe(`${title} · Virgo Design Pro`);
    expect(breadcrumb).toHaveTextContent(title);
    expect(content).toHaveFocus();

    selected.focus();
    expect(selected).toHaveFocus();

    await act(() => router.navigate(href));

    expect(document.title).toBe(`${label} · Virgo Design Pro`);
    expect(breadcrumb).toHaveTextContent(label);
    expect(content).toHaveFocus();
  },
);

it('restores focus to the settings control when hiding the header and closing the drawer', async () => {
  const user = userEvent.setup();
  await renderLayout();

  await user.click(screen.getByRole('button', { name: 'Settings' }));
  await user.click(screen.getByRole('switch', { name: 'Header' }));

  await waitFor(() => {
    expect(screen.queryByRole('dialog', { name: 'Settings' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Settings' })).toHaveFocus();
  });
  expect(screen.getByRole('button', { name: 'Restore navigation' })).toBeInTheDocument();

  const trigger = screen.getByRole('button', { name: 'Settings' });
  await user.click(trigger);
  expect(screen.getByRole('dialog', { name: 'Settings' })).toBeVisible();
  await user.keyboard('{Escape}');

  await waitFor(() => {
    expect(screen.queryByRole('dialog', { name: 'Settings' })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});

async function renderLayout(account = 'admin', initialPath = '/work/tasks') {
  if (account !== 'admin') await login({ account, password: 'virgo123' });

  initializePreferences();
  router = createMemoryRouter(createAppRoutes(), { initialEntries: [initialPath] });
  render(<RouterProvider router={router} />);

  await screen.findByRole('main', undefined, { timeout: 3_000 });

  return router;
}

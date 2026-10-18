// @vitest-environment jsdom
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import {
  defaultPreferences,
  initializePreferences,
  preferencesStorageKey,
  serializePreferences,
} from '@/preferences';

import { AppShell } from './AppShell';

let router: ReturnType<typeof createMemoryRouter>;

beforeEach(() => {
  localStorage.removeItem(preferencesStorageKey);
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', { configurable: true, value: vi.fn() });
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});

afterEach(() => {
  router?.dispose();
  vi.unstubAllGlobals();
});

it('keeps navigation and account access when customization is disabled', () => {
  localStorage.setItem(
    preferencesStorageKey,
    serializePreferences({ ...defaultPreferences, showHeader: false, sidebarState: 'hidden' }),
  );
  renderShell(false);

  expect(screen.getByRole('button', { name: 'Account' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Settings' })).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Tasks' })).toBeInTheDocument();
});

it('retains an account menu and a working restore control for hidden admin header and sidebar', () => {
  localStorage.setItem(
    preferencesStorageKey,
    serializePreferences({ ...defaultPreferences, showHeader: false, sidebarState: 'hidden' }),
  );
  renderShell();

  expect(screen.getAllByRole('button', { name: /account/i })).toHaveLength(1);

  fireEvent.click(screen.getByRole('button', { name: 'Restore navigation' }));

  expect(screen.getByRole('link', { name: 'Tasks' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Restore navigation' })).not.toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /account/i })).toHaveLength(1);
});

it('keeps responsive sidebar collapse separate from the saved desktop preference', () => {
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
  renderShell();

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
    const router = renderShell(true, path);
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
  renderShell();

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

function renderShell(canCustomize = true, initialPath = '/work/tasks') {
  initializePreferences();
  router = createMemoryRouter(
    [
      {
        path: '*',
        element: (
          <AppShell canCustomize={canCustomize} accountMenu={<button>Account</button>}>
            <p>Tasks content</p>
          </AppShell>
        ),
      },
    ],
    { initialEntries: [initialPath] },
  );

  render(<RouterProvider router={router} />);

  return router;
}

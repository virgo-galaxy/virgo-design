import '@/i18n';

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import { AppearanceProvider } from '@/app/theme/AppearanceProvider';
import { setAppLocale } from '@/i18n';
import { LocaleProvider } from '@/i18n/react';
import { copyTextToClipboard } from '@/shared/lib/clipboard';

import { HomePage } from './HomePage';

vi.mock('./components/OverviewDemo', () => ({ OverviewDemo: () => <div>Chart preview</div> }));
vi.mock('@/shared/lib/clipboard', () => ({
  copyTextToClipboard: vi.fn().mockResolvedValue(undefined),
}));

beforeEach(() => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion: reduce'),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
    })),
  );
});

afterEach(async () => {
  await setAppLocale('en-US');
  window.localStorage.clear();
});

function renderHome() {
  return render(
    <AppearanceProvider>
      <LocaleProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </LocaleProvider>
    </AppearanceProvider>,
  );
}

it('routes the homepage navigation to the existing documentation entrances', () => {
  renderHome();
  const navigation = screen.getByRole('navigation', { name: 'Home navigation' });

  expect(
    within(navigation)
      .getAllByRole('link')
      .map((link) => [link.textContent, link.getAttribute('href')]),
  ).toEqual([
    ['Home', '/'],
    ['Design', '/colors'],
    ['Development', '/components'],
  ]);
  expect(screen.getAllByRole('main')).toHaveLength(1);
  expect(screen.queryByRole('navigation', { name: 'Primary navigation' })).toBeNull();
});

it('generates and copies the command for the selected tier, framework, and styling', async () => {
  const user = userEvent.setup();
  renderHome();
  const templates = document.getElementById('create-project')!;

  await user.click(
    within(screen.getByRole('radiogroup', { name: 'Application template' })).getByRole('radio', {
      name: /^Pro/,
    }),
  );
  await user.click(screen.getByRole('radio', { name: 'Next.js' }));
  await user.click(screen.getByRole('radio', { name: 'SCSS Modules' }));
  const command = 'pnpm create @virgo-design ./virgo-app --template pro-next-scss-modules';
  expect(within(templates).getByText(command)).toBeInTheDocument();
  await user.click(within(templates).getByRole('button', { name: 'Copy create command' }));
  expect(copyTextToClipboard).toHaveBeenLastCalledWith(command);

  await user.click(
    within(screen.getByRole('radiogroup', { name: 'Application template' })).getByRole('radio', {
      name: /^Minimal/,
    }),
  );
  await user.click(screen.getByRole('button', { name: 'Count is 0' }));
  expect(screen.getByRole('button', { name: 'Count is 1' })).toBeInTheDocument();
  expect(
    within(templates).getByText(
      'pnpm create @virgo-design ./virgo-app --template minimal-next-scss-modules',
    ),
  ).toBeInTheDocument();
});

it('keeps task completion and creation interactive', async () => {
  const user = userEvent.setup();
  renderHome();
  const workspace = screen.getByRole('region', { name: 'Interactive workspace demo' });

  await user.click(within(workspace).getByRole('checkbox', { name: 'Complete Design foundation' }));
  expect(within(workspace).getByLabelText('Status for Design foundation')).toHaveTextContent(
    'Done',
  );
  await user.click(within(workspace).getByRole('button', { name: 'New task' }));
  await user.type(screen.getByRole('textbox', { name: 'Task name' }), 'Build a Virgo app');
  await user.click(screen.getByRole('button', { name: 'Add task' }));
  expect(
    within(workspace).getByRole('checkbox', { name: 'Complete Build a Virgo app' }),
  ).toBeInTheDocument();
});

it('scopes theme changes to the light and dark preview cards', async () => {
  const user = userEvent.setup();
  renderHome();
  const previous = document.documentElement.getAttribute('data-virgo-theme');

  await user.click(screen.getByRole('button', { name: 'Retro' }));
  expect(screen.getByRole('region', { name: 'Light theme preview' })).toHaveAttribute(
    'data-virgo-theme',
    'retro',
  );
  expect(screen.getByRole('region', { name: 'Dark theme preview' })).toHaveAttribute(
    'data-virgo-theme',
    'retro',
  );
  expect(document.documentElement.getAttribute('data-virgo-theme')).toBe(previous);
});

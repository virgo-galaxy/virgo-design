import '../../i18n';

import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AppearanceContext } from '@/shared/theme/appearance-context';

import { AppRouter } from './AppRouter';

function CurrentPath() {
  return <output data-testid="current-path">{useLocation().pathname}</output>;
}

beforeEach(() => {
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));
});

function renderRoute(path: string) {
  return render(
    <AppearanceContext.Provider value={{ appearance: 'light', setAppearance: () => {} }}>
      <MemoryRouter initialEntries={[path]}>
        <AppRouter />
        <CurrentPath />
      </MemoryRouter>
    </AppearanceContext.Provider>,
  );
}

describe('Token routes', () => {
  it('redirects /tokens to the formal Color Semantic page', async () => {
    renderRoute('/tokens');

    await screen.findByRole('heading', { level: 1, name: 'Color with meaning' });
    const navigation = screen.getByRole('navigation', { name: 'Token categories' });

    expect(
      within(navigation).getByRole('link', { name: 'Colors' }).getAttribute('aria-current'),
    ).toBe('page');
    expect(within(navigation).getByRole('link', { name: 'Typography' }).getAttribute('href')).toBe(
      '/tokens/typography',
    );
  });

  it('renders the formal Semantic Typography page', async () => {
    renderRoute('/tokens/typography');

    await screen.findByRole('heading', { level: 1, name: 'Semantic Typography' });
    expect(screen.getByRole('table', { name: 'Document Typography' })).toBeTruthy();
    expect(screen.getByRole('table', { name: 'UI Typography' })).toBeTruthy();
  });
});

describe('Components and Playground routes', () => {
  it('links to the remaining internal playgrounds from Resources', async () => {
    renderRoute('/resources');

    await screen.findByRole('heading', { level: 1, name: 'Playgrounds' });
    expect(screen.getByRole('link', { name: /Primitives Playground/ })).toHaveAttribute(
      'href',
      '/playground/primitives',
    );
    expect(screen.queryByRole('link', { name: /UI Playground/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Icons Playground/ })).not.toBeInTheDocument();
  });

  it('renders the copied primitives playground', async () => {
    renderRoute('/playground/primitives');

    await screen.findByRole('heading', { level: 1, name: 'Virgo Design Primitives' });
    expect(screen.getByRole('button', { name: 'Native button' })).toBeInTheDocument();
  });

  it('renders a canonical component route', async () => {
    renderRoute('/components/button');

    await screen.findByRole('heading', { level: 1, name: 'Button' }, { timeout: 5000 });
    expect(screen.getByRole('navigation', { name: 'Component navigation' })).toBeInTheDocument();
  });

  it('redirects /components to the default component', async () => {
    renderRoute('/components');

    await screen.findByRole('heading', { level: 1, name: 'Button' }, { timeout: 5000 });
  });

  it('redirects legacy UI Playground component routes to Components', async () => {
    renderRoute('/playground/ui/components/dialog');

    await screen.findByRole('heading', { level: 1, name: 'Dialog' }, { timeout: 5000 });
  });
});

describe('Foundation routes', () => {
  it('renders Icons as a canonical Foundation with its complete review surface', async () => {
    renderRoute('/foundations/icons');

    await screen.findByRole('heading', { level: 1, name: 'Icons' });
    const navigation = screen.getByRole('navigation', { name: 'Foundation categories' });

    expect(within(navigation).getByRole('link', { name: 'Icons' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByTestId('icon-canvas')).toHaveAttribute('data-icon', 'plus');
    expect(screen.getByTestId('grid-coordinates')).toBeInTheDocument();
    expect(screen.getByText('Actual 24px')).toBeInTheDocument();
  });

  it('redirects the legacy Icons Playground route to Foundations / Icons', async () => {
    renderRoute('/playground/icons');

    await screen.findByRole('heading', { level: 1, name: 'Icons' });
    expect(screen.getByTestId('current-path')).toHaveTextContent('/foundations/icons');
  });

  it.each([
    ['/foundations/colors', 'Colors'],
    ['/foundations/typography', 'Typography'],
    ['/foundations/layout', 'Layout'],
    ['/foundations/shape-depth', 'Shape & Depth'],
    ['/foundations/motion', 'Motion'],
  ])('keeps %s available', async (path, heading) => {
    renderRoute(path);

    await screen.findByRole('heading', { level: 1, name: heading });
  });
});

import '../../i18n';

import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { AppRouter } from './AppRouter';

function renderRoute(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRouter />
    </MemoryRouter>,
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

describe('Playground routes', () => {
  it('links to every consolidated playground from Resources', async () => {
    renderRoute('/resources');

    await screen.findByRole('heading', { level: 1, name: 'Playgrounds' });
    expect(screen.getByRole('link', { name: /Primitives Playground/ })).toHaveAttribute(
      'href',
      '/playground/primitives',
    );
    expect(screen.getByRole('link', { name: /UI Playground/ })).toHaveAttribute(
      'href',
      '/playground/ui',
    );
    expect(screen.getByRole('link', { name: /Icons Playground/ })).toHaveAttribute(
      'href',
      '/playground/icons',
    );
  });

  it('renders the copied primitives playground', async () => {
    renderRoute('/playground/primitives');

    await screen.findByRole('heading', { level: 1, name: 'Virgo Design Primitives' });
    expect(screen.getByRole('button', { name: 'Native button' })).toBeInTheDocument();
  });

  it('renders a namespaced UI playground component route', async () => {
    renderRoute('/playground/ui/components/button');

    await screen.findByRole('heading', { level: 1, name: 'Button' }, { timeout: 5000 });
    expect(screen.getByRole('navigation', { name: 'Component navigation' })).toBeInTheDocument();
  });

  it('renders the copied icons playground', async () => {
    renderRoute('/playground/icons');

    await screen.findByRole('heading', { level: 1, name: 'Icons Playground' });
    expect(screen.getByTestId('icon-canvas')).toHaveAttribute('data-icon', 'plus');
  });
});

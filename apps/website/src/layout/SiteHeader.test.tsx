import '../i18n';

import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { AppearanceContext } from '@/shared/theme/appearance-context';

import { SiteHeader } from './SiteHeader';

describe('SiteHeader', () => {
  it('uses the official logo and real text in one Home link', () => {
    render(
      <AppearanceContext.Provider value={{ appearance: 'light', setAppearance: () => {} }}>
        <MemoryRouter>
          <SiteHeader />
        </MemoryRouter>
      </AppearanceContext.Provider>,
    );

    const brand = screen.getByRole('link', { name: 'Virgo Design' });
    const logo = brand.querySelector('img');

    expect(brand).toHaveAttribute('href', '/');
    expect(brand).toHaveTextContent('Virgo Design');
    expect(logo).toHaveAttribute('src', '/virgo-design.svg');
    expect(logo).toHaveAttribute('alt', '');
    expect(logo).toHaveAttribute('aria-hidden', 'true');
  });

  it('presents Primitives as a top-level product area instead of Resources', () => {
    render(
      <AppearanceContext.Provider value={{ appearance: 'light', setAppearance: () => {} }}>
        <MemoryRouter>
          <SiteHeader />
        </MemoryRouter>
      </AppearanceContext.Provider>,
    );

    const navigation = screen.getByRole('navigation', { name: 'Primary navigation' });

    expect(
      within(navigation)
        .getAllByRole('link')
        .map((link) => [link.textContent, link.getAttribute('href')]),
    ).toEqual([
      ['Foundations', '/foundations'],
      ['Tokens', '/tokens'],
      ['Primitives', '/primitives'],
      ['Components', '/components'],
    ]);
    expect(within(navigation).queryByRole('link', { name: 'Resources' })).not.toBeInTheDocument();
  });
});

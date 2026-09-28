import '../i18n';

import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { AppearanceContext } from '@/shared/theme/appearance-context';

import { SiteHeader } from './SiteHeader';

function renderHeader(initialEntry = '/') {
  return render(
    <AppearanceContext.Provider value={{ appearance: 'light', setAppearance: () => {} }}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <SiteHeader />
      </MemoryRouter>
    </AppearanceContext.Provider>,
  );
}

describe('SiteHeader', () => {
  it('uses the official logo and real text in one Home link', () => {
    renderHeader();

    const brand = screen.getByRole('link', { name: 'Virgo Design' });
    const logo = brand.querySelector('svg');

    expect(brand).toHaveAttribute('href', '/');
    expect(brand).toHaveTextContent('Virgo Design');
    expect(logo).toHaveAttribute('viewBox', '0 0 590 470');
    expect(logo?.querySelectorAll('[data-brand-track]')).toHaveLength(2);
    expect(logo?.querySelector('ellipse')).toHaveAttribute('rx', '62.65');
    expect(logo).toHaveAttribute('aria-hidden', 'true');
  });

  it('self-hosts the site header with fixed Layout composition and NavigationMenu state', () => {
    renderHeader('/foundations/colors');

    const header = screen.getByRole('banner');
    const navigation = screen.getByRole('navigation', { name: 'Primary navigation' });

    expect(header).toHaveAttribute('data-position', 'fixed');
    expect(header.style.getPropertyValue('--vd-layout-header-height')).toBe(
      'var(--layout-header-height)',
    );
    expect(header).toHaveAttribute('data-content-align', 'start');
    expect(header.querySelector('[data-slot="header-logo"]')).toContainElement(
      screen.getByRole('link', { name: 'Virgo Design' }),
    );
    expect(header.querySelector('[data-slot="header-content"]')).toContainElement(navigation);
    expect(header.querySelector('[data-slot="header-actions"]')).toContainElement(
      screen.getByLabelText('Global controls'),
    );
    const controls = screen.getByLabelText('Global controls');
    expect(controls).toHaveAttribute('data-material', 'glass');
    const controlButtons = within(controls).getAllByRole('button');
    expect(controlButtons).toHaveLength(2);
    controlButtons.forEach((button) => expect(button).toHaveAttribute('data-size', 'medium'));
    expect(controls.querySelector('[data-orientation="vertical"]')).toHaveAttribute(
      'data-decorative',
      '',
    );
    expect(within(navigation).getByRole('link', { name: 'Foundations' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('presents Primitives as a top-level product area instead of Resources', () => {
    renderHeader();

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

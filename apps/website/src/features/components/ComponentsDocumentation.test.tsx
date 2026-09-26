import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { AppearanceContext } from '@/shared/theme/appearance-context';

import { componentRoutes } from './app/componentRoutes';
import { ComponentsDocumentation } from './ComponentsDocumentation';

// These pages use their first review section instead of duplicating it in a hero.
const singleOverviewIds = new Set([
  'layout',
  'separator',
  'avatar',
  'badge',
  'card',
  'empty',
  'progress',
  'skeleton',
  'spinner',
  'tag',
  'toast',
  'command',
  'context-menu',
  'menu',
  'menubar',
]);

describe('Components documentation integration', () => {
  it('keeps every copied component route and follows the Website appearance', async () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const user = userEvent.setup();

    function AppearanceHarness() {
      const [appearance, setAppearance] = useState<'light' | 'dark'>('light');

      return (
        <AppearanceContext.Provider value={{ appearance, setAppearance }}>
          <button type="button" onClick={() => setAppearance('dark')}>
            Set Website dark
          </button>
          <MemoryRouter initialEntries={['/components/button']}>
            <Routes>
              <Route path="/components/*" element={<ComponentsDocumentation />} />
            </Routes>
          </MemoryRouter>
        </AppearanceContext.Provider>
      );
    }

    render(<AppearanceHarness />);

    const navigation = screen.getByRole('navigation', { name: 'Component navigation' });

    expect(screen.queryByText('UI Laboratory')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Virgo Design' })).not.toBeInTheDocument();
    expect(
      within(navigation)
        .getAllByRole('link')
        .map((link) => link.getAttribute('href')),
    ).toEqual(componentRoutes.map((route) => route.path));
    expect(screen.getByRole('heading', { level: 1, name: 'Button' })).toBeInTheDocument();
    expect(document.querySelectorAll('[data-article-section]')).toHaveLength(4);
    expect(document.querySelectorAll('[data-example-frame]')).toHaveLength(5);
    expect(screen.queryByRole('heading', { name: 'Examples' })).not.toBeInTheDocument();
    expect(document.querySelector('.components-documentation-shell')).toHaveAttribute(
      'data-theme',
      'light',
    );
    expect(screen.queryByRole('group', { name: 'Preview theme' })).not.toBeInTheDocument();
    expect(componentRoutes).toHaveLength(35);
    expect(componentRoutes.map((route) => route.index)).toEqual(
      Array.from({ length: 35 }, (_, index) => String(index + 1).padStart(2, '0')),
    );
    expect(componentRoutes.some((route) => route.id === 'floating-action')).toBe(true);
    expect(componentRoutes.at(-1)).toMatchObject({
      id: 'floating-action',
      group: 'actions',
      index: '35',
    });
    expect(componentRoutes.some((route) => route.id === ('textarea' as string))).toBe(false);

    await user.click(screen.getByRole('link', { name: /Surface/ }));
    expect(screen.getByRole('heading', { level: 1, name: 'Surface' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Set Website dark' }));
    expect(document.querySelector('.components-documentation-shell')).toHaveAttribute(
      'data-theme',
      'dark',
    );
  });

  it('keeps Textarea inside the Input documentation family', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    render(
      <AppearanceContext.Provider value={{ appearance: 'light', setAppearance: () => {} }}>
        <MemoryRouter initialEntries={['/components/input']}>
          <Routes>
            <Route path="/components/*" element={<ComponentsDocumentation />} />
          </Routes>
        </MemoryRouter>
      </AppearanceContext.Provider>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Input' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Textarea' })).toBeInTheDocument();
    expect(
      within(screen.getByRole('navigation', { name: 'Component navigation' })).queryByRole('link', {
        name: /Textarea/,
      }),
    ).not.toBeInTheDocument();
  });

  describe.each(['light', 'dark'] as const)('%s overviews', (appearance) => {
    it.each(componentRoutes)(
      'renders $name with shared heading structure and an intentional specimen layout',
      ({ id, index, name, path }) => {
        vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

        const { container } = render(
          <AppearanceContext.Provider value={{ appearance, setAppearance: () => {} }}>
            <MemoryRouter initialEntries={[path]}>
              <Routes>
                <Route path="/components/*" element={<ComponentsDocumentation />} />
              </Routes>
            </MemoryRouter>
          </AppearanceContext.Provider>,
        );

        const heading = screen.getByRole('heading', { level: 1, name });
        const board = heading.closest('.review-board');
        const overview = heading.closest('#overview');
        const copy = overview?.querySelector(':scope > .overview-copy');
        const firstReview = board?.querySelector(':scope > [data-review-section]:not(#overview)');

        expect(container.querySelectorAll('#overview')).toHaveLength(1);
        expect(container.querySelector('.components-documentation-shell')).toHaveAttribute(
          'data-theme',
          appearance,
        );
        expect(overview).toHaveClass('overview');
        expect(overview).toHaveAttribute('data-review-section', 'overview');
        expect(overview?.parentElement).toBe(board);
        expect(heading.parentElement).toBe(copy);
        expect(copy?.querySelector(':scope > .eyebrow-row')).toHaveTextContent(
          `Component ${index}`,
        );
        expect(copy?.querySelector(':scope > .eyebrow-row .version-badge')).toHaveTextContent(
          'STABLE · V1.0.0',
        );
        expect(copy?.querySelector(':scope > p')).not.toBeEmptyDOMElement();
        expect(firstReview).toBeInTheDocument();
        expect(firstReview?.querySelector('h2')).toBeInTheDocument();

        if (singleOverviewIds.has(id)) {
          expect(overview).toHaveClass('overview overview--single', { exact: true });
          expect(overview?.children).toHaveLength(1);
          expect(overview?.querySelector('.hero-specimen')).not.toBeInTheDocument();
          expect(overview?.nextElementSibling).toBe(firstReview);
          expect(firstReview?.children.length).toBeGreaterThan(1);
        } else {
          expect(overview).not.toHaveClass('overview--single');
          expect(overview?.children).toHaveLength(2);
          const specimen = overview?.querySelector(':scope > .hero-specimen');
          expect(specimen).toBeInTheDocument();
          expect(specimen?.querySelector('.specimen-toolbar')).toHaveTextContent(
            'Reference specimen',
          );
          // Surface uses a photograph instead of a grid to demonstrate its material.
          expect(
            specimen?.querySelector(':scope > .hero-stage, :scope > .surface-hero-stage'),
          ).not.toBeEmptyDOMElement();
        }
      },
    );
  });
});

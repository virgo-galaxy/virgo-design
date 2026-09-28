import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { AppearanceContext } from '@/shared/theme/appearance-context';

import { componentRoutes } from './app/componentRoutes';
import { ComponentsDocumentation } from './ComponentsDocumentation';

type ExampleManifest = Record<string, Readonly<Record<string, ComponentExampleDefinition>>>;
const exampleModules = import.meta.glob<ExampleManifest>(
  '../../examples/components/*/examples.ts',
  { eager: true },
);
const examplesBySlug = Object.fromEntries(
  Object.entries(exampleModules).map(([file, module]) => [
    file.split('/').at(-2)!,
    Object.values(module).flatMap((examples) => Object.values(examples)),
  ]),
);

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
    expect(componentRoutes).toHaveLength(36);
    expect(new Set(componentRoutes.map((route) => route.index)).size).toBe(componentRoutes.length);
    expect(componentRoutes.map((route) => route.index).sort()).toEqual(
      Array.from({ length: 36 }, (_, index) => String(index + 1).padStart(2, '0')).sort(),
    );
    expect(componentRoutes.some((route) => route.id === 'floating-action')).toBe(true);
    expect(componentRoutes.find((route) => route.id === 'dock')).toMatchObject({
      group: 'layout',
      index: '36',
    });
    expect(componentRoutes.at(-1)).toMatchObject({
      id: 'floating-action',
      group: 'actions',
      index: '35',
    });
    expect(componentRoutes.some((route) => route.id === ('textarea' as string))).toBe(false);

    await user.click(screen.getByRole('button', { name: 'Expand all' }));
    expect(screen.getByRole('button', { name: 'Collapse all' })).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: /Surface/ }));
    expect(screen.getByRole('heading', { level: 1, name: 'Surface' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Expand all' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    document
      .querySelectorAll('[data-example-source]')
      .forEach((source) => expect(source).toHaveAttribute('data-state', 'closed'));

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
      'renders $name with shared heading structure and a Reference specimen hero',
      ({ id, index, name, path, status, version }) => {
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
        const specimen = overview?.querySelector(':scope > .hero-specimen');
        const specimenStage = specimen?.querySelector(
          ':scope > .hero-stage, :scope > .surface-hero-stage',
        );

        expect(container.querySelectorAll('#overview')).toHaveLength(1);
        expect(container.querySelector('.components-documentation-shell')).toHaveAttribute(
          'data-theme',
          appearance,
        );
        expect(overview).toHaveClass('overview', { exact: true });
        expect(overview).toHaveAttribute('data-review-section', 'overview');
        expect(overview?.parentElement).toBe(board);
        expect(heading.parentElement).toBe(copy);
        expect(copy?.querySelector(':scope > .eyebrow-row')).toHaveTextContent(
          `Component ${index}`,
        );
        expect(copy?.querySelector(':scope > .eyebrow-row .version-badge')).toHaveTextContent(
          `${status.toUpperCase()} · ${version}`,
        );
        expect(copy?.querySelector(':scope > p')).not.toBeEmptyDOMElement();
        expect(firstReview).toBeInTheDocument();
        expect(firstReview?.querySelector('h2')).toBeInTheDocument();

        expect(overview?.children).toHaveLength(2);
        expect(container.querySelector('.overview--single')).not.toBeInTheDocument();
        expect(specimen).toBeInTheDocument();
        expect(specimen?.querySelector('.specimen-toolbar')).toHaveTextContent(
          'Reference specimen',
        );
        expect(specimenStage).toBeInTheDocument();
        expect(specimenStage).not.toBeEmptyDOMElement();
        expect(specimen?.querySelector(':scope > .specimen-caption')).not.toBeEmptyDOMElement();

        const examples = examplesBySlug[id] ?? [];
        expect(examples.length).toBeGreaterThan(0);
        const frames = container.querySelectorAll('[data-example-id]');
        const sources = container.querySelectorAll('[data-example-source]');
        const sourceButtons = container.querySelectorAll('[data-example-action="source"]');
        expect(frames).toHaveLength(examples.length);
        expect(sources).toHaveLength(examples.length);
        expect(sourceButtons).toHaveLength(examples.length);
        expect(
          new Set(Array.from(frames, (frame) => frame.getAttribute('data-example-id'))),
        ).toEqual(new Set(examples.map((example) => example.id)));
        expect(specimen?.querySelector('[data-example-id]')).toBeNull();
        expect(container.querySelector('.review-section')).toBeNull();
        const control = screen.getByRole('button', { name: 'Expand all' });
        expect(specimen?.querySelector('.specimen-caption')?.contains(control)).toBe(true);
        expect(control).toBeEnabled();
        expect(control.querySelector('svg')).toBeNull();
        sources.forEach((source) => expect(source).toHaveAttribute('data-state', 'closed'));

        // Bulk disclosure only changes code panels, never opens the components' overlays.
        const overlayCount = document.querySelectorAll('[role="dialog"], [role="menu"]').length;
        fireEvent.click(control);
        expect(control).toHaveTextContent('Collapse all');
        sources.forEach((source) => expect(source).toHaveAttribute('data-state', 'open'));
        sourceButtons.forEach((button) => expect(button).toHaveAttribute('aria-expanded', 'true'));
        expect(document.querySelectorAll('[role="dialog"], [role="menu"]')).toHaveLength(
          overlayCount,
        );
        fireEvent.click(control);
        expect(control).toHaveTextContent('Expand all');
        sources.forEach((source) => expect(source).toHaveAttribute('data-state', 'closed'));
        sourceButtons.forEach((button) => expect(button).toHaveAttribute('aria-expanded', 'false'));
      },
    );
  });
});

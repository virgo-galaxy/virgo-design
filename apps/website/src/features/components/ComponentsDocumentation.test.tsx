import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { AppearanceContext } from '@/shared/theme/appearance-context';

import { componentRoutes } from './app/componentRoutes';
import { ComponentsDocumentation } from './ComponentsDocumentation';

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
    expect(componentRoutes.some((route) => route.id === 'floating-action')).toBe(true);
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

  it.each(componentRoutes)('renders $name at its canonical route', ({ name, path }) => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    render(
      <AppearanceContext.Provider value={{ appearance: 'light', setAppearance: () => {} }}>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path="/components/*" element={<ComponentsDocumentation />} />
          </Routes>
        </MemoryRouter>
      </AppearanceContext.Provider>,
    );

    expect(screen.getByRole('heading', { level: 1, name })).toBeInTheDocument();
  });
});

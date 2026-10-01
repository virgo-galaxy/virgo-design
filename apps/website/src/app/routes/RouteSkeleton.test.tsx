import '@/i18n/runtime';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { AppLayout } from '@/layout/AppLayout';
import { AppearanceContext } from '@/shared/theme/appearance-context';

import { RouteSkeleton } from './RouteSkeleton';

vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

describe('Pending route landmarks', () => {
  it.each([
    '/components',
    '/primitives/',
    '/components/button',
    '/primitives/table',
    '/tokens/colors',
  ])('keeps one main landmark and the skip target while %s loads', (path) => {
    render(
      <AppearanceContext.Provider value={{ appearance: 'light', setAppearance: () => {} }}>
        <MemoryRouter initialEntries={[path]}>
          <AppLayout>
            <RouteSkeleton />
          </AppLayout>
        </MemoryRouter>
      </AppearanceContext.Provider>,
    );
    expect(screen.getAllByRole('main')).toHaveLength(1);
    expect(screen.getByRole('main')).toHaveAttribute('id', 'website-main');
    expect(screen.getByRole('main')).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('link', { name: 'Skip to main content' })).toHaveAttribute(
      'href',
      '#website-main',
    );
    expect(screen.getAllByRole('status')).toHaveLength(1);
    expect(screen.queryByRole('navigation', { name: 'Component navigation' })).toBeNull();
  });

  it('gives a standalone pending example one main without documentation navigation', () => {
    render(
      <MemoryRouter initialEntries={['/examples/button-variants']}>
        <RouteSkeleton />
      </MemoryRouter>,
    );
    expect(screen.getAllByRole('main')).toHaveLength(1);
    expect(screen.queryByRole('navigation')).toBeNull();
    expect(screen.getAllByRole('status')).toHaveLength(1);
  });
});

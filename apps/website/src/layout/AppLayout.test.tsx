import '@/i18n/runtime';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { DocumentationDetailShell } from '@/components/docs/DocumentationDetailShell';
import { AppearanceContext } from '@/shared/theme/appearance-context';

import { AppLayout } from './AppLayout';

vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

describe('Website landmarks', () => {
  it.each(['/components', '/components/', '/primitives', '/primitives/', '/tokens/typography'])(
    'gives %s one main region and a keyboard reachable skip target',
    async (pathname) => {
      render(
        <AppearanceContext.Provider value={{ appearance: 'light', setAppearance: () => {} }}>
          <MemoryRouter initialEntries={[pathname]}>
            <AppLayout>
              <h1>Catalogue</h1>
            </AppLayout>
          </MemoryRouter>
        </AppearanceContext.Provider>,
      );
      const main = screen.getByRole('main');
      expect(main).toHaveAttribute('id', 'website-main');
      expect(main).toHaveAttribute('tabindex', '-1');
      const skip = screen.getByRole('link', { name: 'Skip to main content' });
      expect(skip).toHaveAttribute('href', '#website-main');
      await userEvent.tab();
      expect(skip).toHaveFocus();
    },
  );

  it.each(['/components/button', '/primitives/calendar'])(
    'lets the detail shell own the main region on %s',
    (pathname) => {
      render(
        <AppearanceContext.Provider value={{ appearance: 'light', setAppearance: () => {} }}>
          <MemoryRouter initialEntries={[pathname]}>
            <AppLayout>
              <DocumentationDetailShell breadcrumb="Breadcrumb">
                <h1>Detail</h1>
              </DocumentationDetailShell>
            </AppLayout>
          </MemoryRouter>
        </AppearanceContext.Provider>,
      );
      expect(screen.getAllByRole('main')).toHaveLength(1);
      expect(screen.getByRole('main')).toHaveAttribute('id', 'website-main');
      expect(
        screen.getByRole('contentinfo', { name: 'Documentation footer' }).closest('main'),
      ).toBeNull();
    },
  );
});

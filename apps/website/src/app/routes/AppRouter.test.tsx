import '../../i18n';

import { render, screen, within } from '@testing-library/react';
import { floatingActionMetadata } from '@virgo-design/ui/metadata';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { primitiveDocs } from '@/features/primitives/primitiveDocs';
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

    expect(navigation).toHaveAttribute('data-variant', 'segmented');
    expect(navigation.querySelectorAll('[data-slot="separator"]')).toHaveLength(1);
    expect(navigation.querySelectorAll('[data-slot="icon"]')).toHaveLength(2);
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
  it('redirects the retired Resources route to the Primitives catalogue', async () => {
    renderRoute('/resources');

    await screen.findByRole('heading', { level: 1, name: 'Primitives' }, { timeout: 5000 });
    expect(screen.getByTestId('current-path')).toHaveTextContent('/primitives');
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
    expect(screen.getByRole('heading', { level: 2, name: 'Relationships' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Built with' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Button Primitive/ })).toHaveAttribute(
      'href',
      '/primitives/button',
    );
  });

  it('renders an indirect component-to-primitive relationship at the page bottom', async () => {
    renderRoute('/components/drawer');

    await screen.findByRole('heading', { level: 1, name: 'Drawer' }, { timeout: 5000 });
    const relationshipHeading = screen.getByRole('heading', { level: 2, name: 'Relationships' });
    expect(relationshipHeading.closest('section')).toHaveTextContent('Built with');
    expect(screen.getByRole('link', { name: /Dialog Primitive/ })).toHaveAttribute(
      'href',
      '/primitives/dialog',
    );
  });

  it('renders FloatingAction as a canonical component with metadata and relationships', async () => {
    renderRoute('/components/floating-action');

    await screen.findByRole('heading', { level: 1, name: 'FloatingAction' }, { timeout: 5000 });
    expect(screen.getByText(floatingActionMetadata.description)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Help' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Quick actions' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Button Primitive/ })).toHaveAttribute(
      'href',
      '/primitives/button',
    );
    expect(screen.getByRole('link', { name: /Popover Primitive/ })).toHaveAttribute(
      'href',
      '/primitives/popover',
    );
  });

  it('does not create a canonical Textarea component route', async () => {
    renderRoute('/components/textarea');

    await screen.findByRole('heading', { level: 1, name: 'Button' }, { timeout: 5000 });
    expect(screen.getByTestId('current-path')).toHaveTextContent('/components/button');
  });

  it('does not render Relationships for a UI-only component', async () => {
    renderRoute('/components/card');

    await screen.findByRole('heading', { level: 1, name: 'Card' }, { timeout: 5000 });
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Relationships' }),
    ).not.toBeInTheDocument();
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

describe('Primitive routes', () => {
  it('renders the complete public primitive catalogue', async () => {
    renderRoute('/primitives');

    await screen.findByRole('heading', { level: 1, name: 'Primitives' });
    expect(screen.getAllByRole('link')).toHaveLength(23);
    expect(screen.getByRole('link', { name: /Button/ })).toHaveAttribute(
      'href',
      '/primitives/button',
    );
    expect(screen.getByRole('link', { name: /Textarea/ })).toHaveAttribute(
      'href',
      '/primitives/textarea',
    );
  });

  it.each(primitiveDocs)(
    'renders the /primitives/$slug detail documentation',
    async ({ slug, exportName }) => {
      renderRoute(`/primitives/${slug}`);

      await screen.findByRole('heading', { level: 1, name: exportName });
      expect(
        screen.getByText(`import { ${exportName} } from '@virgo-design/primitives';`),
      ).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: 'Basic example' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: 'Anatomy' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: 'Behavior' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: 'Accessibility' })).toBeInTheDocument();
    },
  );

  it('redirects an unknown primitive slug to the catalogue', async () => {
    renderRoute('/primitives/not-a-primitive');

    await screen.findByRole('heading', { level: 1, name: 'Primitives' });
    expect(screen.getByTestId('current-path')).toHaveTextContent('/primitives');
  });

  it('renders reverse-computed component links at the bottom of a primitive page', async () => {
    renderRoute('/primitives/dialog');

    await screen.findByRole('heading', { level: 1, name: 'Dialog' });
    const relationshipHeading = screen.getByRole('heading', { level: 2, name: 'Relationships' });
    const relationshipSection = relationshipHeading.closest('section');

    expect(relationshipSection).not.toBeNull();
    expect(
      within(relationshipSection!).getByRole('heading', { name: 'Used by' }),
    ).toBeInTheDocument();
    expect(within(relationshipSection!).getByRole('link', { name: /Command/ })).toHaveAttribute(
      'href',
      '/components/command',
    );
    expect(within(relationshipSection!).getByRole('link', { name: /Drawer/ })).toHaveAttribute(
      'href',
      '/components/drawer',
    );
  });

  it('reverse-computes FloatingAction for Button and Popover primitives', async () => {
    const { unmount } = renderRoute('/primitives/button');

    await screen.findByRole('heading', { level: 1, name: 'Button' });
    expect(screen.getByRole('link', { name: /Floating Action/ })).toHaveAttribute(
      'href',
      '/components/floating-action',
    );

    unmount();
    renderRoute('/primitives/popover');
    await screen.findByRole('heading', { level: 1, name: 'Popover' });
    expect(screen.getByRole('link', { name: /Floating Action/ })).toHaveAttribute(
      'href',
      '/components/floating-action',
    );
  });

  it('does not render Used by for a primitive with no UI consumer', async () => {
    renderRoute('/primitives/collapsible');

    await screen.findByRole('heading', { level: 1, name: 'Collapsible' });
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Relationships' }),
    ).not.toBeInTheDocument();
  });
});

describe('Foundation routes', () => {
  it('renders Icons as a canonical Foundation with its complete review surface', async () => {
    renderRoute('/foundations/icons');

    await screen.findByRole('heading', { level: 1, name: 'Icons' });
    const navigation = screen.getByRole('navigation', { name: 'Foundation categories' });

    expect(screen.getByText('FOUNDATIONS V1')).toBeInTheDocument();
    expect(screen.queryByText('VIRGO DESIGN · FOUNDATIONS')).not.toBeInTheDocument();
    expect(navigation).toHaveAttribute('data-variant', 'segmented');
    expect(navigation.querySelectorAll('[data-slot="separator"]')).toHaveLength(5);
    expect(navigation.querySelectorAll('[data-slot="icon"]')).toHaveLength(6);
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

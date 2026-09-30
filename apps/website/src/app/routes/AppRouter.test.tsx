import '@/i18n';

import { render, screen, within } from '@testing-library/react';
import { floatingActionMetadata } from '@virgo-design/ui/metadata';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { primitiveDocs } from '@/features/primitives/primitiveDocs';
import { DocumentationNavigationDock } from '@/layout/DocumentationNavigationDock';
import { AppearanceContext } from '@/shared/theme/appearance-context';

import { AppRouter } from './AppRouter';

vi.mock('@/generated/api-reference.generated', () => ({
  componentApiReference: {},
  primitiveApiReference: {},
}));

vi.mock('@/components/docs/ApiReference', () => ({
  RegistryApiReference: () => null,
}));

const ROUTE_LOAD_TIMEOUT = 15_000;

function CurrentPath() {
  return <output data-testid="current-path">{useLocation().pathname}</output>;
}

beforeAll(async () => {
  await Promise.all([
    import('@/features/components/ComponentsDocumentation'),
    import('@/app/relationships/DocumentationRelationships'),
  ]);
}, 30_000);

beforeEach(() => {
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));
});

function renderRoute(path: string) {
  return render(
    <AppearanceContext.Provider value={{ appearance: 'light', setAppearance: () => {} }}>
      <MemoryRouter initialEntries={[path]}>
        <DocumentationNavigationDock />
        <AppRouter />
        <CurrentPath />
      </MemoryRouter>
    </AppearanceContext.Provider>,
  );
}

function findRouteHeading(name: string) {
  return screen.findByRole('heading', { level: 1, name }, { timeout: ROUTE_LOAD_TIMEOUT });
}

describe('Token routes', () => {
  it('redirects /tokens to the formal Color Semantic page', async () => {
    renderRoute('/tokens');

    await findRouteHeading('Semantic colors');
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

    await findRouteHeading('Semantic Typography');
    expect(screen.getByRole('table', { name: 'Document Typography' })).toBeTruthy();
    expect(screen.getByRole('table', { name: 'UI Typography' })).toBeTruthy();
  });
});

describe('Component routes', () => {
  it('renders a canonical component route', async () => {
    renderRoute('/components/button');

    await findRouteHeading('Button');
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

    await findRouteHeading('Drawer');
    const relationshipHeading = screen.getByRole('heading', { level: 2, name: 'Relationships' });
    expect(relationshipHeading.closest('section')).toHaveTextContent('Built with');
    expect(screen.getByRole('link', { name: /Dialog Primitive/ })).toHaveAttribute(
      'href',
      '/primitives/dialog',
    );
  });

  it('renders FloatingAction as a canonical component with metadata and relationships', async () => {
    renderRoute('/components/floating-action');

    await findRouteHeading('FloatingAction');
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

    await findRouteHeading('Button');
    expect(screen.getByTestId('current-path')).toHaveTextContent('/components/button');
  });

  it('does not render Relationships for a UI-only component', async () => {
    renderRoute('/components/card');

    await findRouteHeading('Card');
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Relationships' }),
    ).not.toBeInTheDocument();
  });

  it('renders the component catalogue from the canonical component metadata', async () => {
    renderRoute('/components');

    await findRouteHeading('Components');
    expect(screen.queryByRole('navigation', { name: 'Component navigation' })).toBeNull();
    expect(screen.getAllByRole('link')).toHaveLength(37);
    expect(screen.getByRole('heading', { level: 2, name: 'General' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Layout' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Navigation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Button\b/ })).toHaveAttribute(
      'href',
      '/components/button',
    );
  });
});

describe('Primitive routes', () => {
  it('renders the complete public primitive catalogue', async () => {
    renderRoute('/primitives');

    await findRouteHeading('Primitives');
    expect(screen.getAllByRole('link')).toHaveLength(primitiveDocs.length);
    expect(screen.getByRole('link', { name: /Button/ })).toHaveAttribute(
      'href',
      '/primitives/button',
    );
    expect(screen.getByRole('link', { name: /Textarea/ })).toHaveAttribute(
      'href',
      '/primitives/textarea',
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Actions & Commands' })).toHaveAttribute(
      'id',
      'primitive-category-actions-commands',
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Form Controls' })).toHaveAttribute(
      'id',
      'primitive-category-form-controls',
    );
  });

  it.each(primitiveDocs)(
    'renders the /primitives/$slug detail documentation',
    async ({ slug, exportName }) => {
      renderRoute(`/primitives/${slug}`);

      await findRouteHeading(exportName);
      expect(
        screen.getByText(`import { ${exportName} } from '@virgo-design/primitives';`),
      ).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: 'Basic example' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: 'Anatomy' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: 'Behavior' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: 'Accessibility' })).toBeInTheDocument();
    },
  );

  it('wraps primitive detail content in its own grouped sidebar and shared detail structure', async () => {
    renderRoute('/primitives/button');

    await findRouteHeading('Button');
    const sidebar = screen.getByRole('complementary', { name: 'Primitives sidebar' });
    const navigation = within(sidebar).getByRole('navigation', { name: 'Primitive navigation' });

    expect(within(navigation).getAllByRole('link')).toHaveLength(primitiveDocs.length);
    const primitiveLinks = within(navigation).getAllByRole('link');
    expect(primitiveLinks[0]).toHaveAccessibleName('01ButtonHeadless');
    expect(primitiveLinks[1]).toHaveAccessibleName('02CommandHeadless');
    expect(within(navigation).getByRole('link', { name: /Button/ })).toHaveAttribute(
      'data-active',
      'true',
    );
    expect(screen.getByText('Primitives', { exact: true })).toBeInTheDocument();
    expect(
      within(screen.getByRole('contentinfo', { name: 'Documentation footer' })).getByRole(
        'button',
        { name: 'Powered by Virgo Design' },
      ),
    ).toBeInTheDocument();
  });

  it('redirects an unknown primitive slug to the catalogue', async () => {
    renderRoute('/primitives/not-a-primitive');

    await findRouteHeading('Primitives');
    expect(screen.getByTestId('current-path')).toHaveTextContent('/primitives');
  });

  it('renders reverse-computed component links at the bottom of a primitive page', async () => {
    renderRoute('/primitives/dialog');

    await findRouteHeading('Dialog');
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

    await findRouteHeading('Button');
    expect(screen.getByRole('link', { name: /Floating Action/ })).toHaveAttribute(
      'href',
      '/components/floating-action',
    );

    unmount();
    renderRoute('/primitives/popover');
    await findRouteHeading('Popover');
    expect(screen.getByRole('link', { name: /Floating Action/ })).toHaveAttribute(
      'href',
      '/components/floating-action',
    );
  });

  it('does not render Used by for a primitive with no UI consumer', async () => {
    renderRoute('/primitives/collapsible');

    await findRouteHeading('Collapsible');
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Relationships' }),
    ).not.toBeInTheDocument();
  });
});

describe('Foundation routes', () => {
  it('renders the icon catalogue within Foundations', async () => {
    renderRoute('/foundations/icons');

    await findRouteHeading('Icons');
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
    expect(screen.getByRole('textbox', { name: 'Search icons…' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /settings/ })).toHaveAttribute(
      'href',
      '/foundations/icons/settings',
    );
  });

  it('opens a deep-linked icon detail and keeps the Icons navigation active', async () => {
    renderRoute('/foundations/icons/settings');
    await screen.findByRole('button', { name: 'Code format' });
    const navigation = screen.getByRole('navigation', { name: 'Foundation categories' });
    expect(within(navigation).getByRole('link', { name: 'Icons' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByTestId('icon-canvas')).toHaveAttribute('data-icon', 'settings');
    expect(screen.getByTestId('actual-20')).toHaveAttribute('width', '20');
  });

  it.each([
    ['/foundations/colors', 'Colors'],
    ['/foundations/typography', 'Typography'],
    ['/foundations/layout', 'Layout'],
    ['/foundations/shape-depth', 'Shape & Depth'],
    ['/foundations/motion', 'Motion'],
  ])('keeps %s available', async (path, heading) => {
    renderRoute(path);

    await findRouteHeading(heading);
  });
});

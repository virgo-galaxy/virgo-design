import '@/i18n';

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { floatingActionMetadata } from '@virgo-design/ui/metadata';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { primitiveDocs } from '@/features/primitives/primitiveDocs';
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
    import('../relationships/DocumentationRelationships'),
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
  it('opens the mobile contents and closes it after selecting a page', async () => {
    const user = userEvent.setup();
    renderRoute('/tokens/foundations/layout');
    await findRouteHeading('Spacing & sizing');

    const trigger = screen.getByRole('button', { name: 'Token contents' });
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const navigation = screen.getByRole('navigation', { name: 'Mobile token navigation' });
    await user.click(within(navigation).getByRole('link', { name: 'Motion' }));

    await findRouteHeading('Motion');
    expect(screen.getByTestId('current-path')).toHaveTextContent('/tokens/foundations/motion');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('main')).toHaveFocus();
  });

  it('opens the complete token overview without a sidebar', async () => {
    renderRoute('/tokens');

    await findRouteHeading('Design tokens');
    expect(screen.queryByRole('navigation', { name: 'Token navigation' })).toBeNull();
    expect(document.querySelector('[data-docs-sidebar]')).toBeNull();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Foundation values' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Semantic tokens' })).toBeInTheDocument();
    expect(document.querySelectorAll('[data-docs-page="tokens"] a')).toHaveLength(6);
    expect(screen.getByText('@virgo-design/tokens')).toBeInTheDocument();
  });

  it('keeps semantic typography separate from the foundation scale', async () => {
    renderRoute('/tokens/semantic/typography');

    await findRouteHeading('Semantic Typography');
    expect(screen.getByRole('table', { name: 'Document Typography' })).toBeTruthy();
    expect(screen.getByRole('table', { name: 'UI Typography' })).toBeTruthy();
    expect(
      within(screen.getByRole('navigation', { name: 'Token navigation' })).getByRole('link', {
        name: 'Semantic Typography',
      }),
    ).toHaveAttribute('aria-current', 'page');
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
    expect(screen.getAllByRole('link')).toHaveLength(54);
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
      const publicApi = screen.getByRole('complementary', { name: 'Public API' });
      expect(publicApi.firstElementChild).toHaveAttribute('data-variant', 'outlined');
      expect(publicApi.firstElementChild).toHaveAttribute('data-radius', '12');
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
    expect(screen.getByRole('link', { name: /FloatingAction/ })).toHaveAttribute(
      'href',
      '/components/floating-action',
    );

    unmount();
    renderRoute('/primitives/popover');
    await findRouteHeading('Popover');
    expect(screen.getByRole('link', { name: /FloatingAction/ })).toHaveAttribute(
      'href',
      '/components/floating-action',
    );
  });

  it('renders the newly added styled Collapsible consumer', async () => {
    renderRoute('/primitives/collapsible');

    await findRouteHeading('Collapsible');
    expect(screen.queryByRole('heading', { level: 2, name: 'Relationships' })).toBeInTheDocument();
    expect(
      screen
        .getAllByRole('link', { name: /Collapsible/ })
        .some((link) => link.getAttribute('href') === '/components/collapsible'),
    ).toBe(true);
  });
});

describe('Icon routes', () => {
  it('renders the standalone icon catalogue with its package header', async () => {
    renderRoute('/icons');

    await findRouteHeading('Icons');
    expect(screen.getByText('@virgo-design/icons')).toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: 'Foundation categories' })).toBeNull();
    expect(document.querySelector('[data-documentation-navigation]')).toBeNull();
    expect(screen.getByRole('combobox', { name: 'Search icons…' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'settings Outline' })).toHaveAttribute(
      'href',
      '/icons/settings',
    );
  });

  it('opens a standalone deep-linked icon detail without foundation navigation', async () => {
    renderRoute('/icons/settings');
    await screen.findByRole('button', { name: 'Code format' });
    expect(screen.getByText('@virgo-design/icons')).toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: 'Foundation categories' })).toBeNull();
    expect(screen.getByTestId('icon-canvas')).toHaveAttribute('data-icon', 'settings');
    expect(screen.getByTestId('actual-20')).toHaveAttribute('width', '20');
  });
});

describe('Color routes', () => {
  it.each(['/', '/colors'])('opens the standalone color page from %s', async (path) => {
    renderRoute(path);

    await findRouteHeading('Colors');
    expect(screen.getByTestId('current-path')).toHaveTextContent('/colors');
    expect(screen.getByText('@virgo-design/colors')).toBeInTheDocument();
    expect(document.querySelector('[data-documentation-navigation]')).toBeNull();
    for (const id of ['color-studio', 'palette-gallery', 'foundation-export']) {
      expect(document.getElementById(id)).toBeInTheDocument();
    }
  });
});

describe('Grouped token pages', () => {
  it.each([
    ['/tokens/foundations/typography', 'Typography scale', 'Foundation values'],
    ['/tokens/foundations/layout', 'Spacing & sizing', 'Foundation values'],
    ['/tokens/foundations/shape-depth', 'Shape & Depth', 'Foundation values'],
    ['/tokens/foundations/motion', 'Motion', 'Foundation values'],
    ['/tokens/semantic/colors', 'Semantic colors', 'Semantic tokens'],
  ])('opens %s within the shared documentation shell', async (path, heading, group) => {
    renderRoute(path);

    await findRouteHeading(heading);
    const navigation = screen.getByRole('navigation', { name: 'Token navigation' });
    expect(
      within(within(navigation).getByRole('group', { name: group })).getByRole('link', {
        name: heading,
      }),
    ).toHaveAttribute('aria-current', 'page');
    expect(document.querySelector('[data-docs-detail-shell]')).toBeInTheDocument();
    expect(document.querySelector('[data-documentation-navigation]')).toBeNull();
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toHaveTextContent(group);
  });
});

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Layout } from '@virgo-design/ui';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import {
  DocumentationSidebar,
  DocumentationSidebarCopy,
  DocumentationSidebarGroup,
  DocumentationSidebarIndex,
  DocumentationSidebarItem,
  DocumentationSidebarSeparator,
} from './DocumentationSidebar';

describe('DocumentationSidebar', () => {
  it('composes groups and items while preserving active and collapsed navigation state', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <MemoryRouter>
        <Layout direction="horizontal">
          <DocumentationSidebar
            label="Documentation sidebar"
            navigationLabel="Documentation navigation"
            activeValue="/docs/surface"
          >
            <DocumentationSidebarGroup id="general" label="General">
              {(
                [
                  ['/docs/button', '01', 'Button'],
                  ['/docs/surface', '02', 'Surface'],
                  ['/docs/foo', '03', 'Foo'],
                ] as const
              ).map(([to, index, title]) => (
                <DocumentationSidebarItem key={to} to={to}>
                  <DocumentationSidebarIndex>{index}</DocumentationSidebarIndex>
                  <DocumentationSidebarCopy>
                    <strong>{title}</strong>
                    <small>General</small>
                  </DocumentationSidebarCopy>
                </DocumentationSidebarItem>
              ))}
              <DocumentationSidebarSeparator />
            </DocumentationSidebarGroup>
            <DocumentationSidebarGroup id="layout" label="Layout">
              <DocumentationSidebarItem to="/docs/dock">
                <DocumentationSidebarIndex>04</DocumentationSidebarIndex>
                <DocumentationSidebarCopy>
                  <strong>Dock</strong>
                  <small>Layout</small>
                </DocumentationSidebarCopy>
              </DocumentationSidebarItem>
            </DocumentationSidebarGroup>
          </DocumentationSidebar>
        </Layout>
      </MemoryRouter>,
    );

    const sidebar = screen.getByRole('complementary', { name: 'Documentation sidebar' });
    const navigation = within(sidebar).getByRole('navigation', {
      name: 'Documentation navigation',
    });

    expect(within(navigation).getByRole('group', { name: 'General' })).toBeInTheDocument();
    expect(within(navigation).getAllByRole('link')).toHaveLength(4);
    expect(within(navigation).getByRole('link', { name: '02SurfaceGeneral' })).toHaveAttribute(
      'data-active',
      'true',
    );
    expect(container.querySelector('[data-slot="separator"]')).toBeInTheDocument();

    await user.click(within(sidebar).getByRole('button', { name: 'Collapse sidebar' }));

    expect(sidebar).toHaveAttribute('data-state', 'collapsed');
    expect(navigation).toHaveAttribute('aria-hidden', 'true');
    expect(navigation).toHaveAttribute('inert');
    expect(within(sidebar).getByRole('button', { name: 'Expand sidebar' })).toBeInTheDocument();
  });
});

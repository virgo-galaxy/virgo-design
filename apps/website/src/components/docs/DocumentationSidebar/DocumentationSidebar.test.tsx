import '@/i18n/runtime';

import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Layout, UIControlLabelsProvider } from '@virgo-design/ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';

import { setAppLocale } from '@/i18n/runtime';

import {
  DocumentationSidebar,
  DocumentationSidebarCopy,
  DocumentationSidebarGroup,
  DocumentationSidebarIndex,
  DocumentationSidebarItem,
  DocumentationSidebarSeparator,
} from './DocumentationSidebar';

function LocalizedControls({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  return (
    <UIControlLabelsProvider
      labels={{
        collapseSidebar: t('shared.controls.collapseSidebar'),
        expandSidebar: t('shared.controls.expandSidebar'),
      }}
    >
      {children}
    </UIControlLabelsProvider>
  );
}

describe('DocumentationSidebar', () => {
  afterEach(async () => {
    await setAppLocale('en-US');
  });
  it('composes groups and items while preserving active and collapsed navigation state', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <LocalizedControls>
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
        </MemoryRouter>
      </LocalizedControls>,
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
    const toggle = within(sidebar).getByRole('button', { name: 'Expand sidebar' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveAttribute('aria-controls', sidebar.id);
    expect(toggle).toHaveFocus();
    await act(async () => {
      await setAppLocale('zh-CN');
    });
    expect(within(sidebar).getByRole('button', { name: '展开侧栏' })).toBe(toggle);
    expect(sidebar).toHaveAttribute('data-state', 'collapsed');
    await user.click(toggle);
    expect(toggle).toHaveAccessibleName('收起侧栏');
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(navigation).not.toHaveAttribute('inert');
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Layout } from './index';

describe('Layout primitive', () => {
  it('coordinates an uncontrolled sidebar with its keyboard trigger and render state', async () => {
    const user = userEvent.setup();
    const onCollapsedChange = vi.fn();
    render(
      <Layout.Root>
        <Layout.Sidebar id="navigation-region" onCollapsedChange={onCollapsedChange}>
          {({ collapsed }) => (
            <>
              <span>{collapsed ? 'Compact' : 'Expanded'}</span>
              <Layout.SidebarTrigger />
            </>
          )}
        </Layout.Sidebar>
      </Layout.Root>,
    );
    const trigger = screen.getByRole('button', { name: 'Collapse sidebar' });
    expect(trigger).toHaveAttribute('aria-controls', 'navigation-region');
    await user.tab();
    await user.keyboard('{Enter}');
    expect(screen.getByText('Compact')).toBeVisible();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveFocus();
    await user.keyboard(' ');
    expect(screen.getByText('Expanded')).toBeVisible();
    expect(onCollapsedChange.mock.calls).toEqual([[true], [false]]);
  });

  it('honors controlled state, custom rendering, disabled and canceled triggers', async () => {
    const user = userEvent.setup();
    const onCollapsedChange = vi.fn();
    const example = (collapsed: boolean, disabled = false, cancel = false) => (
      <Layout.Sidebar collapsed={collapsed} onCollapsedChange={onCollapsedChange}>
        <Layout.SidebarTrigger
          disabled={disabled}
          onClick={(event) => {
            if (cancel) event.preventDefault();
          }}
          render={(props) => <button {...props} data-custom="true" />}
        />
      </Layout.Sidebar>
    );
    const { rerender } = render(example(false));
    await user.click(screen.getByRole('button'));
    expect(onCollapsedChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    rerender(example(true));
    expect(screen.getByRole('button')).toHaveAccessibleName('Expand sidebar');
    expect(screen.getByRole('button')).toHaveAttribute('data-custom', 'true');
    onCollapsedChange.mockClear();
    rerender(example(true, true));
    await user.click(screen.getByRole('button'));
    rerender(example(true, false, true));
    await user.click(screen.getByRole('button'));
    expect(onCollapsedChange).not.toHaveBeenCalled();
  });

  it('keeps multiple sidebars independent and supports defaultCollapsed', async () => {
    const user = userEvent.setup();
    render(
      <Layout direction="horizontal">
        <Layout.Sidebar defaultCollapsed>
          <Layout.SidebarTrigger />
        </Layout.Sidebar>
        <Layout.Sidebar>
          <Layout.SidebarTrigger />
        </Layout.Sidebar>
      </Layout>,
    );
    const expand = screen.getByRole('button', { name: 'Expand sidebar' });
    const collapse = screen.getByRole('button', { name: 'Collapse sidebar' });
    expect(expand.getAttribute('aria-controls')).not.toBe(collapse.getAttribute('aria-controls'));
    await user.click(expand);
    expect(collapse).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getAllByRole('button', { name: 'Collapse sidebar' })).toHaveLength(2);
  });
  it('renders vertical by default and forwards native props and refs', () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Layout ref={ref} data-testid="layout" aria-label="Application layout">
        <Layout.Header>Header</Layout.Header>
        <Layout.Content>Content</Layout.Content>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>,
    );

    const layout = screen.getByTestId('layout');
    expect(layout).toHaveAttribute('data-direction', 'vertical');
    expect(layout).toHaveAttribute('aria-label', 'Application layout');
    expect(ref.current).toBe(layout);
  });

  it('renders horizontal layouts and preserves nested child order', () => {
    render(
      <Layout direction="horizontal" data-testid="outer-layout">
        <Layout.Sidebar>Navigation region</Layout.Sidebar>
        <Layout data-testid="inner-layout">
          <Layout.Header>Header region</Layout.Header>
          <Layout.Content>Content region</Layout.Content>
          <Layout.Footer>Footer region</Layout.Footer>
        </Layout>
      </Layout>,
    );

    const outerLayout = screen.getByTestId('outer-layout');
    const innerLayout = screen.getByTestId('inner-layout');

    expect(outerLayout).toHaveAttribute('data-direction', 'horizontal');
    expect(innerLayout).toHaveAttribute('data-direction', 'vertical');
    expect(Array.from(outerLayout.children)).toEqual([
      screen.getByText('Navigation region'),
      innerLayout,
    ]);
    expect(Array.from(innerLayout.children).map((element) => element.tagName)).toEqual([
      'HEADER',
      'MAIN',
      'FOOTER',
    ]);
  });

  it('uses semantic region elements and forwards region refs and props', () => {
    const headerRef = createRef<HTMLElement>();
    const sidebarRef = createRef<HTMLElement>();
    const contentRef = createRef<HTMLElement>();
    const footerRef = createRef<HTMLElement>();

    render(
      <Layout>
        <Layout.Header ref={headerRef} data-testid="header" aria-label="Page header" />
        <Layout.Sidebar
          ref={sidebarRef}
          data-testid="sidebar"
          aria-label="Side region"
          style={{ width: '18rem' }}
        />
        <Layout.Content ref={contentRef} data-testid="content" aria-label="Page content" />
        <Layout.Footer ref={footerRef} data-testid="footer" aria-label="Page footer" />
      </Layout>,
    );

    expect(headerRef.current).toBe(screen.getByTestId('header'));
    expect(sidebarRef.current).toBe(screen.getByTestId('sidebar'));
    expect(contentRef.current).toBe(screen.getByTestId('content'));
    expect(footerRef.current).toBe(screen.getByTestId('footer'));
    expect(headerRef.current?.tagName).toBe('HEADER');
    expect(sidebarRef.current?.tagName).toBe('ASIDE');
    expect(contentRef.current?.tagName).toBe('MAIN');
    expect(footerRef.current?.tagName).toBe('FOOTER');
    expect(sidebarRef.current?.style.width).toBe('18rem');
  });
});

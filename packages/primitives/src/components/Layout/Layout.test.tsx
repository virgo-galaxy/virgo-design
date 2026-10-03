import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Layout } from './index';

describe('Layout primitive', () => {
  it('preserves callback refs across updates and cleans up when the semantic element changes', () => {
    const cleanup = vi.fn();
    const ref = vi.fn(() => cleanup);
    const { rerender, unmount } = render(
      <Layout.Content as="div" ref={ref}>
        One
      </Layout.Content>,
    );
    const embedded = ref.mock.calls.length;
    rerender(
      <Layout.Content as="div" ref={ref}>
        Two
      </Layout.Content>,
    );
    expect(ref).toHaveBeenCalledTimes(embedded);
    expect(cleanup).not.toHaveBeenCalled();
    rerender(<Layout.Content ref={ref}>Page main</Layout.Content>);
    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('main')).toHaveTextContent('Page main');
    unmount();
    expect(cleanup).toHaveBeenCalledTimes(2);
  });

  it('allows embedded content without introducing another main landmark', () => {
    const ref = createRef<HTMLElement>();
    render(
      <Layout.Content aria-label="Page content">
        <Layout.Content as="div" ref={ref} className="embedded-content" tabIndex={-1}>
          Embedded content
        </Layout.Content>
      </Layout.Content>,
    );
    expect(screen.getAllByRole('main')).toHaveLength(1);
    expect(ref.current?.tagName).toBe('DIV');
    expect(ref.current).toHaveClass('embedded-content');
    expect(ref.current).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('main')).toHaveAccessibleName('Page content');
  });

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
  it('shares three states with external provider triggers while honoring controlled state', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const example = (state: 'expanded' | 'collapsed' | 'hidden') => (
      <Layout.SidebarProvider id="shared-sidebar" state={state} onStateChange={change}>
        <Layout.Header>
          <Layout.SidebarTrigger action="expand">Restore</Layout.SidebarTrigger>
        </Layout.Header>
        <Layout.Sidebar>
          <Layout.SidebarTrigger action="hide">Hide</Layout.SidebarTrigger>
        </Layout.Sidebar>
      </Layout.SidebarProvider>
    );
    const { rerender } = render(example('expanded'));
    const sidebar = screen.getByRole('complementary');
    expect(sidebar.id).toBe('shared-sidebar');
    const restore = screen.getByRole('button', { name: 'Expand sidebar' });
    expect(restore).toHaveAttribute('aria-controls', sidebar.id);
    await user.click(screen.getByRole('button', { name: 'Hide sidebar' }));
    expect(change).toHaveBeenLastCalledWith('hidden');
    expect(sidebar).toHaveAttribute('data-state', 'expanded');
    rerender(example('hidden'));
    expect(sidebar).toHaveAttribute('inert');
    expect(sidebar).toHaveAttribute('aria-hidden', 'true');
    expect(restore).toHaveFocus();
    await user.click(restore);
    expect(change).toHaveBeenLastCalledWith('expanded');
    expect(sidebar).toHaveAttribute('data-state', 'hidden');
    rerender(example('collapsed'));
    expect(sidebar).toHaveAttribute('data-state', 'collapsed');
    expect(sidebar).not.toHaveAttribute('inert');
  });

  it('isolates provider scopes and uses explicit three-state control over legacy collapsed', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Layout.SidebarProvider defaultState="hidden">
          <Layout.SidebarTrigger action="expand">First</Layout.SidebarTrigger>
          <Layout.Sidebar aria-label="First navigation" />
        </Layout.SidebarProvider>
        <Layout.SidebarProvider>
          <Layout.SidebarTrigger action="collapse">Second</Layout.SidebarTrigger>
          <Layout.Sidebar aria-label="Second navigation" />
        </Layout.SidebarProvider>
        <Layout.Sidebar state="expanded" collapsed aria-label="Legacy precedence" />
      </>,
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]?.getAttribute('aria-controls')).not.toBe(
      buttons[1]?.getAttribute('aria-controls'),
    );
    await user.click(buttons[0]!);
    expect(screen.getByRole('complementary', { name: 'First navigation' })).toHaveAttribute(
      'data-state',
      'expanded',
    );
    await user.click(buttons[1]!);
    expect(screen.getByRole('complementary', { name: 'Second navigation' })).toHaveAttribute(
      'data-state',
      'collapsed',
    );
    expect(screen.getByRole('complementary', { name: 'Legacy precedence' })).toHaveAttribute(
      'data-state',
      'expanded',
    );
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

  it('provides a neutral lane boundary with independent composition direction', () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Layout.Lane ref={ref} direction="horizontal" data-testid="lane" aria-label="Workspace lane">
        <span>Lane content</span>
      </Layout.Lane>,
    );

    const lane = screen.getByTestId('lane');
    expect(ref.current).toBe(lane);
    expect(lane.tagName).toBe('DIV');
    expect(lane).toHaveAttribute('data-vd-layout-lane', '');
    expect(lane).toHaveAttribute('data-direction', 'horizontal');
    expect(lane).toHaveAttribute('aria-label', 'Workspace lane');
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

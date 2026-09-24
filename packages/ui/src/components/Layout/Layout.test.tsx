import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Layout } from './index';

describe('Layout', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('preserves floating sidebar behavior and permits surface overrides', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <Layout.Content>
        <Layout.Sidebar
          mode="floating"
          offset={32}
          side="end"
          collapsible
          aria-label="Floating tools"
        >
          Tools
        </Layout.Sidebar>
        <Layout.Floating aria-label="Local controls">
          <button>Help</button>
        </Layout.Floating>
      </Layout.Content>,
    );
    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toHaveAttribute('data-mode', 'floating');
    expect(sidebar.style.getPropertyValue('--vd-layout-sidebar-offset')).toBe('32px');
    expect(sidebar.querySelector('[data-radius]')).toHaveAttribute('data-radius', '12');
    await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }));
    expect(sidebar.querySelector('[data-radius]')).toHaveAttribute('data-radius', 'full');
    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toHaveFocus();
    const helpContainer = screen.getByRole('button', { name: 'Help' }).parentElement;
    expect(helpContainer).toHaveAttribute('data-placement', 'bottom-end');
    expect(helpContainer?.parentElement).toBe(screen.getByRole('main'));
    rerender(
      <Layout.Sidebar mode="floating" defaultCollapsed surface={{ radius: 8, elevation: 0 }}>
        Tools
      </Layout.Sidebar>,
    );
    expect(screen.getByRole('complementary').querySelector('[data-radius]')).toHaveAttribute(
      'data-radius',
      '8',
    );
  });

  it('forwards floating anchor placement, offset, native props and refs', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Layout.Floating
        ref={ref}
        className="consumer-anchor"
        placement="top-start"
        offset="var(--vd-spacing-16)"
        data-testid="anchor"
      >
        Controls
      </Layout.Floating>,
    );
    expect(ref.current).toBe(screen.getByTestId('anchor'));
    expect(ref.current).toHaveClass('consumer-anchor');
    expect(ref.current).toHaveAttribute('data-placement', 'top-start');
    expect(ref.current?.style.getPropertyValue('--vd-layout-floating-offset')).toBe(
      'var(--vd-spacing-16)',
    );
  });

  it('composes sidebar slots, token widths, and the default icon trigger', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLElement>();
    render(
      <Layout.Sidebar
        ref={ref}
        collapsible
        className="custom-sidebar"
        header={({ collapsed }) => (collapsed ? 'V' : 'Virgo Design')}
        footer={<a href="#settings">Settings</a>}
      >
        {({ collapsed }) => (
          <a href="#projects" aria-label="Projects">
            {collapsed ? 'P' : 'Projects'}
          </a>
        )}
      </Layout.Sidebar>,
    );
    expect(ref.current).toHaveClass('custom-sidebar');
    expect(ref.current?.style.getPropertyValue('--vd-layout-sidebar-width')).toBe(
      'calc(var(--vd-sizing-80) * 3)',
    );
    expect(screen.getByText('Virgo Design')).toBeVisible();
    const trigger = screen.getByRole('button', { name: 'Collapse sidebar' });
    const initialIcon = trigger.querySelector('svg')?.innerHTML;
    await user.click(trigger);
    expect(ref.current).toHaveAttribute('data-state', 'collapsed');
    expect(screen.getByText('V')).toBeVisible();
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveTextContent('P');
    expect(trigger.querySelector('svg')?.innerHTML).not.toBe(initialIcon);
    expect(trigger).toHaveFocus();
  });

  it('supports zero-width controlled overlay and custom external controls', () => {
    const { rerender } = render(
      <Layout.Sidebar
        collapsed
        collapsedWidth={0}
        width="18rem"
        mode="overlay"
        side="end"
        aria-label="Tools"
        trigger={null}
      >
        <button>Tool</button>
      </Layout.Sidebar>,
    );
    const aside = screen.getByRole('complementary');
    expect(aside).toHaveAttribute('data-mode', 'overlay');
    expect(aside).toHaveAttribute('data-side', 'end');
    expect(aside.style.getPropertyValue('--vd-layout-sidebar-width')).toBe('18rem');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    rerender(
      <Layout.Sidebar collapsed={false} collapsedWidth={0} trigger={null}>
        <button>Tool</button>
      </Layout.Sidebar>,
    );
    expect(screen.getByRole('button', { name: 'Tool' })).toBeVisible();
  });

  it('reuses Surface while preserving landmarks and header slots', () => {
    render(
      <Layout minHeight="100dvh" data-testid="root">
        <Layout.Header
          height="var(--vd-sizing-72)"
          position="sticky"
          top={8}
          logo="Virgo"
          actions={<button>Account</button>}
          surface={{
            tone: 'elevated',
            material: 'glass',
            background: {
              type: 'gradient',
              value: 'linear-gradient(var(--vd-surface-default), var(--vd-surface-strong))',
            },
          }}
        >
          Navigation
        </Layout.Header>
        <Layout.Content padding={24} scrollable>
          Content
        </Layout.Content>
      </Layout>,
    );
    const header = screen.getByRole('banner');
    expect(header).toHaveAttribute('data-position', 'sticky');
    expect(header).toHaveStyle({ top: '8px' });
    expect(header.querySelector('[data-material="glass"]')).toHaveAttribute('aria-hidden', 'true');
    expect(header.querySelector('[data-slot="background"]')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveAttribute('data-scrollable', 'true');
    expect(screen.getByTestId('root')).toHaveStyle({ minHeight: '100dvh' });
  });

  it('collapses at the viewport threshold, restores the prior preference, and cleans up', () => {
    let listener: (() => void) | undefined;
    const remove = vi.fn();
    const media = {
      matches: false,
      addEventListener: vi.fn((_event, callback) => {
        listener = callback;
      }),
      removeEventListener: remove,
    };
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => media),
    );
    const { unmount } = render(
      <Layout.Sidebar collapseBelow={800} collapsible>
        Content
      </Layout.Sidebar>,
    );
    expect(window.matchMedia).toHaveBeenCalledWith('(max-width: 800px)');
    act(() => {
      media.matches = true;
      listener?.();
    });
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    act(() => {
      media.matches = false;
      listener?.();
    });
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    unmount();
    expect(remove).toHaveBeenCalledWith('change', listener);
  });

  it('requests responsive changes without overriding controlled state', () => {
    const onCollapsedChange = vi.fn();
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
    );
    render(
      <Layout.Sidebar
        collapsed={false}
        onCollapsedChange={onCollapsedChange}
        collapseBelow={800}
        collapsible
      >
        Content
      </Layout.Sidebar>,
    );
    expect(onCollapsedChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });
  it('composes a vertical semantic page skeleton by default', () => {
    render(
      <Layout data-testid="layout">
        <Layout.Header>Header</Layout.Header>
        <Layout.Content>Content</Layout.Content>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>,
    );

    const layout = screen.getByTestId('layout');
    expect(layout).toHaveAttribute('data-direction', 'vertical');
    expect(Array.from(layout.children).map((element) => element.tagName)).toEqual([
      'HEADER',
      'MAIN',
      'FOOTER',
    ]);
  });

  it('supports horizontal nesting and preserves sidebar placement through child order', () => {
    render(
      <Layout>
        <Layout.Header>Header</Layout.Header>
        <Layout direction="horizontal" data-testid="body-layout">
          <Layout.Content>Content</Layout.Content>
          <Layout.Sidebar>Right sidebar</Layout.Sidebar>
        </Layout>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>,
    );

    const bodyLayout = screen.getByTestId('body-layout');
    expect(bodyLayout).toHaveAttribute('data-direction', 'horizontal');
    expect(Array.from(bodyLayout.children)).toEqual([
      screen.getByText('Content'),
      screen.getByRole('complementary'),
    ]);
  });

  it('applies the default and custom sidebar widths', () => {
    const { rerender } = render(<Layout.Sidebar data-testid="sidebar">Sidebar</Layout.Sidebar>);

    expect(screen.getByTestId('sidebar').style.getPropertyValue('--vd-layout-sidebar-width')).toBe(
      'calc(var(--vd-sizing-80) * 3)',
    );

    rerender(
      <Layout.Sidebar data-testid="sidebar" width="18rem">
        Sidebar
      </Layout.Sidebar>,
    );

    expect(screen.getByTestId('sidebar').style.getPropertyValue('--vd-layout-sidebar-width')).toBe(
      '18rem',
    );
  });

  it('forwards native props, consumer classes, and refs', () => {
    const layoutRef = createRef<HTMLDivElement>();
    const sidebarRef = createRef<HTMLElement>();

    render(
      <Layout ref={layoutRef} className="consumer-layout" data-testid="layout">
        <Layout.Sidebar
          ref={sidebarRef}
          className="consumer-sidebar"
          aria-label="Supporting region"
          data-testid="sidebar"
        />
      </Layout>,
    );

    expect(layoutRef.current).toBe(screen.getByTestId('layout'));
    expect(sidebarRef.current).toBe(screen.getByTestId('sidebar'));
    expect(layoutRef.current).toHaveClass('consumer-layout');
    expect(sidebarRef.current).toHaveClass('consumer-sidebar');
    expect(sidebarRef.current).toHaveAttribute('aria-label', 'Supporting region');
  });
});

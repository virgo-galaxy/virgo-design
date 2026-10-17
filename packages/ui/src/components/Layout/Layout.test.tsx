import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Layout } from './index';

describe('Layout', () => {
  afterEach(() => vi.unstubAllGlobals());

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
      <Layout.Sidebar
        mode="floating"
        defaultState="collapsed"
        surface={{ radius: 8, elevation: 0 }}
      >
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
        header={({ collapsed }) => (collapsed ? 'V' : 'Item A')}
        footer={<a href="#settings">Settings</a>}
      >
        {({ collapsed }) => (
          <a href="#items" aria-label="Items">
            {collapsed ? 'P' : 'Items'}
          </a>
        )}
      </Layout.Sidebar>,
    );
    expect(ref.current).toHaveClass('custom-sidebar');
    expect(ref.current?.style.getPropertyValue('--vd-layout-sidebar-width')).toBe(
      'calc(var(--vd-sizing-80) * 3)',
    );
    expect(screen.getByText('Item A')).toBeVisible();
    const trigger = screen.getByRole('button', { name: 'Collapse sidebar' });
    const initialIcon = trigger.querySelector('svg')?.innerHTML;
    await user.click(trigger);
    expect(ref.current).toHaveAttribute('data-state', 'collapsed');
    expect(screen.getByText('V')).toBeVisible();
    expect(screen.getByRole('link', { name: 'Items' })).toHaveTextContent('P');
    expect(trigger.querySelector('svg')?.innerHTML).not.toBe(initialIcon);
    expect(trigger).toHaveFocus();
  });

  it('keeps the edge trigger operable when zero-width content becomes hidden and inert', async () => {
    const user = userEvent.setup();
    render(
      <Layout.Sidebar collapsible collapsedWidth={0} triggerPlacement="edge">
        <a href="#items">Items</a>
      </Layout.Sidebar>,
    );

    const aside = screen.getByRole('complementary');
    const trigger = screen.getByRole('button', { name: 'Collapse sidebar' });
    const contents = aside.querySelector('[data-slot="sidebar-contents"]');
    expect(trigger).toHaveAttribute('aria-controls', aside.id);
    expect(contents).not.toContainElement(trigger);
    trigger.focus();
    await user.keyboard('{Enter}');
    expect(aside).toHaveAttribute('data-state', 'collapsed');
    expect(contents).toHaveAttribute('hidden');
    expect(contents).toHaveAttribute('inert');
    expect(screen.queryByRole('link', { name: 'Items' })).not.toBeInTheDocument();
    expect(trigger).toHaveAccessibleName('Expand sidebar');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveFocus();

    await user.keyboard(' ');
    expect(aside).toHaveAttribute('data-state', 'expanded');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: 'Items' })).toBeVisible();
  });

  it('supports zero-width controlled overlay and custom external controls', () => {
    const { rerender } = render(
      <Layout.Sidebar
        state="collapsed"
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
      <Layout.Sidebar state="expanded" collapsedWidth={0} trigger={null}>
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
          logo="Example"
          actions={<button>Section</button>}
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

  it('supports fixed composed headers with configurable spacing and stable slots', () => {
    render(
      <Layout.Header
        position="fixed"
        top={12}
        height={72}
        gap="clamp(20px, 3vw, 64px)"
        paddingInline={32}
        contentAlign="center"
        logo={<a href="#home">Example</a>}
        actions={<button>Section</button>}
      >
        Navigation
      </Layout.Header>,
    );

    const header = screen.getByRole('banner');
    expect(header).toHaveAttribute('data-position', 'fixed');
    expect(header).toHaveAttribute('data-content-align', 'center');
    expect(header).toHaveStyle({ top: '12px' });
    expect(header.style.getPropertyValue('--vd-layout-header-height')).toBe('72px');
    expect(header.style.getPropertyValue('--vd-layout-header-gap')).toBe('clamp(20px, 3vw, 64px)');
    expect(header.style.getPropertyValue('--vd-layout-header-padding-inline')).toBe('32px');
    expect(header.querySelector('[data-slot="header-logo"]')).toContainElement(
      screen.getByRole('link', { name: 'Example' }),
    );
    expect(header.querySelector('[data-slot="header-content"]')).toHaveTextContent('Navigation');
    expect(header.querySelector('[data-slot="header-actions"]')).toContainElement(
      screen.getByRole('button', { name: 'Section' }),
    );
  });

  it('keeps every header slot optional and defaults content alignment to start', () => {
    const { rerender } = render(<Layout.Header>Navigation</Layout.Header>);

    let header = screen.getByRole('banner');
    expect(header).toHaveAttribute('data-composed', 'true');
    expect(header).toHaveAttribute('data-content-align', 'start');
    expect(header.querySelector('[data-slot="header-logo"]')).not.toBeInTheDocument();
    expect(header.querySelector('[data-slot="header-content"]')).toHaveTextContent('Navigation');
    expect(header.querySelector('[data-slot="header-actions"]')).not.toBeInTheDocument();

    rerender(<Layout.Header logo="Example" />);
    header = screen.getByRole('banner');
    expect(header.querySelector('[data-slot="header-logo"]')).toHaveTextContent('Example');
    expect(header.querySelector('[data-slot="header-content"]')).not.toBeInTheDocument();
    expect(header.querySelector('[data-slot="header-actions"]')).not.toBeInTheDocument();

    rerender(<Layout.Header actions={<button>Section</button>} contentAlign="end" />);
    header = screen.getByRole('banner');
    expect(header).toHaveAttribute('data-content-align', 'end');
    expect(header.querySelector('[data-slot="header-logo"]')).not.toBeInTheDocument();
    expect(header.querySelector('[data-slot="header-content"]')).not.toBeInTheDocument();
    expect(header.querySelector('[data-slot="header-actions"]')).toContainElement(
      screen.getByRole('button', { name: 'Section' }),
    );

    rerender(<Layout.Header />);
    header = screen.getByRole('banner');
    expect(header).not.toHaveAttribute('data-composed');
    expect(header.querySelector('[data-slot]')).not.toBeInTheDocument();
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
    const onStateChange = vi.fn();
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
    );
    render(
      <Layout.Sidebar
        state="expanded"
        onStateChange={onStateChange}
        collapseBelow={800}
        collapsible
      >
        Content
      </Layout.Sidebar>,
    );
    expect(onStateChange).toHaveBeenCalledWith('collapsed');
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });
  it('sizes a lane independently from its children and exposes configurable edge inset', () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Layout.Lane
        ref={ref}
        data-testid="lane"
        direction="horizontal"
        width="calc(100% - 64px)"
        maxWidth={1440}
        minHeight={320}
        inset={24}
        insetInline={32}
        surface={{ tone: 'secondary' }}
        className="consumer-lane"
      >
        <div>Lane content</div>
      </Layout.Lane>,
    );

    const lane = screen.getByTestId('lane');
    expect(ref.current).toBe(lane);
    expect(lane).toHaveClass('consumer-lane');
    expect(lane).toHaveAttribute('data-direction', 'horizontal');
    expect(lane.style.getPropertyValue('--vd-layout-lane-width')).toBe('calc(100% - 64px)');
    expect(lane.style.getPropertyValue('--vd-layout-lane-max-width')).toBe('1440px');
    expect(lane.style.getPropertyValue('--vd-layout-lane-inset-inline')).toBe('32px');
    expect(lane.style.getPropertyValue('--vd-layout-lane-inset-block')).toBe('24px');
    expect(lane).toHaveStyle({ minHeight: '320px' });
    expect(lane.querySelector('[data-tone="secondary"]')).toHaveAttribute('aria-hidden', 'true');
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

  it('resizes an expanded sidebar with pointer and keyboard input', () => {
    const onWidthChange = vi.fn();
    render(
      <Layout direction="horizontal">
        <Layout.Sidebar
          width={240}
          minWidth={160}
          maxWidth={320}
          resizable
          onWidthChange={onWidthChange}
        >
          Sidebar
        </Layout.Sidebar>
        <Layout.Content>Content</Layout.Content>
      </Layout>,
    );

    const sidebar = screen.getByRole('complementary');
    const rect = vi.spyOn(sidebar, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      width: 240,
      height: 400,
      top: 0,
      right: 240,
      bottom: 400,
      left: 0,
      toJSON: () => ({}),
    });
    const handle = screen.getByRole('separator', { name: 'Resize sidebar' });

    fireEvent.pointerDown(handle, { button: 0, clientX: 240 });
    fireEvent.pointerMove(window, { clientX: 300 });
    expect(sidebar.style.getPropertyValue('--vd-layout-sidebar-width')).toBe('300px');
    expect(onWidthChange).toHaveBeenLastCalledWith(300);

    fireEvent.pointerMove(window, { clientX: 500 });
    expect(sidebar.style.getPropertyValue('--vd-layout-sidebar-width')).toBe('320px');
    fireEvent.pointerUp(window);

    rect.mockReturnValue({
      x: 0,
      y: 0,
      width: 320,
      height: 400,
      top: 0,
      right: 320,
      bottom: 400,
      left: 0,
      toJSON: () => ({}),
    });
    fireEvent.keyDown(handle, { key: 'ArrowLeft' });
    expect(sidebar.style.getPropertyValue('--vd-layout-sidebar-width')).toBe('312px');
    expect(handle).toHaveAttribute('aria-valuemin', '160');
    expect(handle).toHaveAttribute('aria-valuemax', '320');
  });

  it('keeps a continuous resize gesture through rail and hidden states with hysteresis and external recovery', async () => {
    const user = userEvent.setup();
    const onResizeEnd = vi.fn();
    const onStateChange = vi.fn();
    render(
      <Layout.SidebarProvider onStateChange={onStateChange}>
        <Layout.SidebarTrigger action="expand">Restore navigation</Layout.SidebarTrigger>
        <Layout.Sidebar
          width={240}
          minWidth={200}
          maxWidth={320}
          collapsedWidth={48}
          resizable
          resizeSnap={{ collapseAt: 160, hideAt: 24, hysteresis: 16 }}
          onResizeEnd={onResizeEnd}
        >
          <a href="#work">Work</a>
        </Layout.Sidebar>
      </Layout.SidebarProvider>,
    );
    const sidebar = screen.getByRole('complementary');
    const handle = screen.getByRole('separator');
    vi.spyOn(sidebar, 'getBoundingClientRect').mockReturnValue({ width: 240 } as DOMRect);
    fireEvent.pointerDown(handle, { button: 0, clientX: 240, pointerId: 1 });
    fireEvent.pointerMove(window, { clientX: 500, pointerId: 2 });
    fireEvent.pointerCancel(window, { pointerId: 2 });
    fireEvent.pointerUp(window, { pointerId: 2 });
    expect(onResizeEnd).not.toHaveBeenCalled();
    expect(sidebar.style.getPropertyValue('--vd-layout-sidebar-width')).toBe('240px');
    fireEvent.pointerMove(window, { clientX: 500, pointerId: 1 });
    expect(sidebar.style.getPropertyValue('--vd-layout-sidebar-width')).toBe('320px');
    fireEvent.pointerMove(window, { clientX: 150, pointerId: 1 });
    expect(sidebar).toHaveAttribute('data-state', 'collapsed');
    fireEvent.pointerMove(window, { clientX: 168, pointerId: 1 });
    expect(sidebar).toHaveAttribute('data-state', 'collapsed');
    fireEvent.pointerMove(window, { clientX: 178, pointerId: 1 });
    expect(sidebar).toHaveAttribute('data-state', 'expanded');
    expect(sidebar.style.getPropertyValue('--vd-layout-sidebar-width')).toBe('200px');
    fireEvent.pointerMove(window, { clientX: 20, pointerId: 1 });
    expect(sidebar).toHaveAttribute('data-state', 'hidden');
    expect(sidebar).toHaveAttribute('inert');
    expect(screen.queryByRole('link', { name: 'Work' })).not.toBeInTheDocument();
    const restore = screen.getByRole('button', { name: 'Expand sidebar' });
    expect(restore).toHaveFocus();
    fireEvent.pointerUp(window, { pointerId: 1 });
    expect(onResizeEnd).toHaveBeenLastCalledWith({ width: 200, state: 'hidden', cancelled: false });
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
    await user.click(restore);
    expect(sidebar).toHaveAttribute('data-state', 'expanded');
    expect(sidebar.style.getPropertyValue('--vd-layout-sidebar-width')).toBe('200px');
    expect(onStateChange.mock.calls.map(([state]) => state)).toEqual([
      'collapsed',
      'expanded',
      'hidden',
      'expanded',
    ]);
  });

  it('cancels a resize by restoring its starting state and width and cleans up global drag styles', () => {
    const onResizeEnd = vi.fn();
    const { unmount } = render(
      <Layout.Sidebar
        width={240}
        resizable
        minWidth={200}
        maxWidth={320}
        resizeSnap={{ collapseAt: 160, hideAt: 24 }}
        onResizeEnd={onResizeEnd}
      >
        Navigation
      </Layout.Sidebar>,
    );
    const sidebar = screen.getByRole('complementary');
    vi.spyOn(sidebar, 'getBoundingClientRect').mockReturnValue({ width: 240 } as DOMRect);
    const handle = screen.getByRole('separator');
    fireEvent.pointerDown(handle, { button: 0, clientX: 240 });
    fireEvent.pointerMove(window, { clientX: 20 });
    expect(sidebar).toHaveAttribute('data-state', 'hidden');
    fireEvent.pointerCancel(window);
    expect(sidebar).toHaveAttribute('data-state', 'expanded');
    expect(sidebar.style.getPropertyValue('--vd-layout-sidebar-width')).toBe('240px');
    expect(onResizeEnd).toHaveBeenLastCalledWith({
      width: 240,
      state: 'expanded',
      cancelled: true,
    });
    expect(document.body.style.userSelect).toBe('');
    fireEvent.pointerDown(screen.getByRole('separator'), { button: 0, clientX: 240 });
    unmount();
    expect(document.body.style.cursor).toBe('');
    expect(document.body.style.userSelect).toBe('');
    fireEvent.pointerMove(window, { clientX: 300 });
    expect(onResizeEnd).toHaveBeenCalledTimes(1);
  });

  it('supports keyboard bounds, rail snapping, hiding and external focus return', () => {
    render(
      <Layout.SidebarProvider>
        <Layout.SidebarTrigger action="expand" />
        <Layout.Sidebar
          width={240}
          minWidth={200}
          maxWidth={320}
          collapsedWidth={48}
          resizable
          resizeSnap={{ collapseAt: 160, hideAt: 24 }}
        >
          Navigation
        </Layout.Sidebar>
      </Layout.SidebarProvider>,
    );
    const sidebar = screen.getByRole('complementary');
    vi.spyOn(sidebar, 'getBoundingClientRect').mockImplementation(
      () =>
        ({
          width:
            sidebar.dataset.state === 'collapsed'
              ? 48
              : Number.parseFloat(sidebar.style.getPropertyValue('--vd-layout-sidebar-width')),
        }) as DOMRect,
    );
    const handle = screen.getByRole('separator');
    handle.focus();
    fireEvent.keyDown(handle, { key: 'End' });
    expect(handle).toHaveAttribute('aria-valuenow', '320');
    fireEvent.keyDown(handle, { key: 'Home' });
    expect(handle).toHaveAttribute('aria-valuenow', '200');
    for (let i = 0; i < 5; i++) fireEvent.keyDown(handle, { key: 'ArrowLeft' });
    expect(sidebar).toHaveAttribute('data-state', 'collapsed');
    expect(handle).toHaveAttribute('aria-valuenow', '48');
    for (let i = 0; i < 3; i++) fireEvent.keyDown(handle, { key: 'ArrowLeft' });
    expect(sidebar).toHaveAttribute('data-state', 'hidden');
    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toHaveFocus();
  });

  it.each([
    { side: 'end' as const, direction: 'ltr' as const },
    { side: 'start' as const, direction: 'rtl' as const },
  ])('mirrors resize direction for $side/$direction', ({ side, direction }) => {
    render(
      <Layout.Sidebar
        width={240}
        resizable
        side={side}
        style={{ direction }}
        minWidth={200}
        maxWidth={320}
      />,
    );
    const sidebar = screen.getByRole('complementary');
    vi.spyOn(sidebar, 'getBoundingClientRect').mockReturnValue({ width: 240 } as DOMRect);
    fireEvent.pointerDown(screen.getByRole('separator'), { button: 0, clientX: 240 });
    fireEvent.pointerMove(window, { clientX: 180 });
    fireEvent.pointerUp(window);
    expect(sidebar.style.getPropertyValue('--vd-layout-sidebar-width')).toBe('300px');
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

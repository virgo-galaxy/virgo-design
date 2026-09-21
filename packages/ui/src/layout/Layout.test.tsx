import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { Layout, LayoutContent, LayoutFooter, LayoutHeader, LayoutSider } from './Layout';

describe('Layout', () => {
  it('composes a vertical semantic page skeleton by default', () => {
    render(
      <Layout data-testid="layout">
        <LayoutHeader>Header</LayoutHeader>
        <LayoutContent>Content</LayoutContent>
        <LayoutFooter>Footer</LayoutFooter>
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

  it('supports horizontal nesting and preserves sider placement through child order', () => {
    render(
      <Layout>
        <LayoutHeader>Header</LayoutHeader>
        <Layout direction="horizontal" data-testid="body-layout">
          <LayoutContent>Content</LayoutContent>
          <LayoutSider>Right sider</LayoutSider>
        </Layout>
        <LayoutFooter>Footer</LayoutFooter>
      </Layout>,
    );

    const bodyLayout = screen.getByTestId('body-layout');
    expect(bodyLayout).toHaveAttribute('data-direction', 'horizontal');
    expect(Array.from(bodyLayout.children)).toEqual([
      screen.getByText('Content'),
      screen.getByText('Right sider'),
    ]);
  });

  it('applies the default and custom sider widths', () => {
    const { rerender } = render(<LayoutSider data-testid="sider">Sider</LayoutSider>);

    expect(screen.getByTestId('sider')).toHaveStyle({ width: '240px' });

    rerender(
      <LayoutSider data-testid="sider" width="18rem">
        Sider
      </LayoutSider>,
    );

    expect(screen.getByTestId('sider').style.width).toBe('18rem');
  });

  it('forwards native props, consumer classes, and refs', () => {
    const layoutRef = createRef<HTMLDivElement>();
    const siderRef = createRef<HTMLElement>();

    render(
      <Layout ref={layoutRef} className="consumer-layout" data-testid="layout">
        <LayoutSider
          ref={siderRef}
          className="consumer-sider"
          aria-label="Supporting region"
          data-testid="sider"
        />
      </Layout>,
    );

    expect(layoutRef.current).toBe(screen.getByTestId('layout'));
    expect(siderRef.current).toBe(screen.getByTestId('sider'));
    expect(layoutRef.current).toHaveClass('consumer-layout');
    expect(siderRef.current).toHaveClass('consumer-sider');
    expect(siderRef.current).toHaveAttribute('aria-label', 'Supporting region');
  });
});

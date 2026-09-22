import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { Layout } from './index';

describe('Layout', () => {
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

  it('supports horizontal nesting and preserves sider placement through child order', () => {
    render(
      <Layout>
        <Layout.Header>Header</Layout.Header>
        <Layout direction="horizontal" data-testid="body-layout">
          <Layout.Content>Content</Layout.Content>
          <Layout.Sider>Right sider</Layout.Sider>
        </Layout>
        <Layout.Footer>Footer</Layout.Footer>
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
    const { rerender } = render(<Layout.Sider data-testid="sider">Sider</Layout.Sider>);

    expect(screen.getByTestId('sider')).toHaveStyle({ width: '240px' });

    rerender(
      <Layout.Sider data-testid="sider" width="18rem">
        Sider
      </Layout.Sider>,
    );

    expect(screen.getByTestId('sider').style.width).toBe('18rem');
  });

  it('forwards native props, consumer classes, and refs', () => {
    const layoutRef = createRef<HTMLDivElement>();
    const siderRef = createRef<HTMLElement>();

    render(
      <Layout ref={layoutRef} className="consumer-layout" data-testid="layout">
        <Layout.Sider
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

import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { Layout } from './index';

describe('Layout primitive', () => {
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
        <Layout.Sider>Navigation region</Layout.Sider>
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
    const siderRef = createRef<HTMLElement>();
    const contentRef = createRef<HTMLElement>();
    const footerRef = createRef<HTMLElement>();

    render(
      <Layout>
        <Layout.Header ref={headerRef} data-testid="header" aria-label="Page header" />
        <Layout.Sider ref={siderRef} data-testid="sider" aria-label="Side region" width="18rem" />
        <Layout.Content ref={contentRef} data-testid="content" aria-label="Page content" />
        <Layout.Footer ref={footerRef} data-testid="footer" aria-label="Page footer" />
      </Layout>,
    );

    expect(headerRef.current).toBe(screen.getByTestId('header'));
    expect(siderRef.current).toBe(screen.getByTestId('sider'));
    expect(contentRef.current).toBe(screen.getByTestId('content'));
    expect(footerRef.current).toBe(screen.getByTestId('footer'));
    expect(headerRef.current?.tagName).toBe('HEADER');
    expect(siderRef.current?.tagName).toBe('ASIDE');
    expect(contentRef.current?.tagName).toBe('MAIN');
    expect(footerRef.current?.tagName).toBe('FOOTER');
    expect(siderRef.current?.style.width).toBe('18rem');
  });
});

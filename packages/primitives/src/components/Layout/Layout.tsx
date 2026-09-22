import { forwardRef } from 'react';

import type {
  LayoutContentProps,
  LayoutFooterProps,
  LayoutHeaderProps,
  LayoutProps,
  LayoutSiderProps,
} from './Layout.types';

export const Layout = forwardRef<HTMLDivElement, LayoutProps>(function Layout(
  { direction = 'vertical', ...props },
  forwardedRef,
) {
  return <div {...props} ref={forwardedRef} data-direction={direction} />;
});

Layout.displayName = 'Layout';

export const LayoutHeader = forwardRef<HTMLElement, LayoutHeaderProps>(
  function LayoutHeader(props, forwardedRef) {
    return <header {...props} ref={forwardedRef} />;
  },
);

LayoutHeader.displayName = 'Layout.Header';

export const LayoutSider = forwardRef<HTMLElement, LayoutSiderProps>(function LayoutSider(
  { width, style, ...props },
  forwardedRef,
) {
  return (
    <aside
      {...props}
      ref={forwardedRef}
      style={width === undefined ? style : { ...style, width }}
    />
  );
});

LayoutSider.displayName = 'Layout.Sider';

export const LayoutContent = forwardRef<HTMLElement, LayoutContentProps>(
  function LayoutContent(props, forwardedRef) {
    return <main {...props} ref={forwardedRef} />;
  },
);

LayoutContent.displayName = 'Layout.Content';

export const LayoutFooter = forwardRef<HTMLElement, LayoutFooterProps>(
  function LayoutFooter(props, forwardedRef) {
    return <footer {...props} ref={forwardedRef} />;
  },
);

LayoutFooter.displayName = 'Layout.Footer';

import {
  Layout as PrimitiveLayout,
  LayoutContent as PrimitiveLayoutContent,
  LayoutFooter as PrimitiveLayoutFooter,
  LayoutHeader as PrimitiveLayoutHeader,
  LayoutSider as PrimitiveLayoutSider,
} from '@virgo-design/primitives';
import { type CSSProperties, forwardRef } from 'react';

import styles from './Layout.module.scss';
import type {
  LayoutContentProps,
  LayoutFooterProps,
  LayoutHeaderProps,
  LayoutProps,
  LayoutSiderProps,
} from './Layout.types';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const Layout = forwardRef<HTMLDivElement, LayoutProps>(function Layout(
  { className, ...props },
  forwardedRef,
) {
  return (
    <PrimitiveLayout
      {...props}
      ref={forwardedRef}
      className={joinClassNames(styles.root, className)}
    />
  );
});

Layout.displayName = 'Layout';

export const LayoutHeader = forwardRef<HTMLElement, LayoutHeaderProps>(function LayoutHeader(
  { className, ...props },
  forwardedRef,
) {
  return (
    <PrimitiveLayoutHeader
      {...props}
      ref={forwardedRef}
      className={joinClassNames(styles.header, className)}
    />
  );
});

LayoutHeader.displayName = 'LayoutHeader';

type SiderStyle = CSSProperties & {
  '--vd-layout-sider-width'?: string;
};

export const LayoutSider = forwardRef<HTMLElement, LayoutSiderProps>(function LayoutSider(
  { className, width = 240, style, ...props },
  forwardedRef,
) {
  const siderStyle: SiderStyle = {
    ...style,
    '--vd-layout-sider-width': typeof width === 'number' ? `${width}px` : width,
  };

  return (
    <PrimitiveLayoutSider
      {...props}
      ref={forwardedRef}
      className={joinClassNames(styles.sider, className)}
      style={siderStyle}
      width={width}
    />
  );
});

LayoutSider.displayName = 'LayoutSider';

export const LayoutContent = forwardRef<HTMLElement, LayoutContentProps>(function LayoutContent(
  { className, ...props },
  forwardedRef,
) {
  return (
    <PrimitiveLayoutContent
      {...props}
      ref={forwardedRef}
      className={joinClassNames(styles.content, className)}
    />
  );
});

LayoutContent.displayName = 'LayoutContent';

export const LayoutFooter = forwardRef<HTMLElement, LayoutFooterProps>(function LayoutFooter(
  { className, ...props },
  forwardedRef,
) {
  return (
    <PrimitiveLayoutFooter
      {...props}
      ref={forwardedRef}
      className={joinClassNames(styles.footer, className)}
    />
  );
});

LayoutFooter.displayName = 'LayoutFooter';

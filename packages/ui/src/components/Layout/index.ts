import {
  Layout as LayoutRoot,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutSider,
} from './Layout';

export const Layout = Object.assign(LayoutRoot, {
  Header: LayoutHeader,
  Sider: LayoutSider,
  Content: LayoutContent,
  Footer: LayoutFooter,
});
export type {
  LayoutContentProps,
  LayoutDirection,
  LayoutFooterProps,
  LayoutHeaderProps,
  LayoutProps,
  LayoutSiderProps,
} from './Layout.types';

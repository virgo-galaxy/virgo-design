import {
  Layout as LayoutRoot,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutSidebar,
  LayoutSidebarTrigger,
} from './Layout';

export const Layout = Object.assign(LayoutRoot, {
  Root: LayoutRoot,
  Header: LayoutHeader,
  Sidebar: LayoutSidebar,
  SidebarTrigger: LayoutSidebarTrigger,
  Content: LayoutContent,
  Footer: LayoutFooter,
});
export type {
  LayoutContentProps,
  LayoutDirection,
  LayoutFooterProps,
  LayoutHeaderProps,
  LayoutProps,
  LayoutSidebarProps,
  LayoutSidebarState,
  LayoutSidebarTriggerProps,
} from './Layout.types';

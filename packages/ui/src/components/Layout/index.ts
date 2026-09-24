import {
  Layout as LayoutRoot,
  LayoutContent,
  LayoutFloating,
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
  Floating: LayoutFloating,
});
export type {
  LayoutContentProps,
  LayoutDirection,
  LayoutFloatingProps,
  LayoutFooterProps,
  LayoutHeaderProps,
  LayoutLength,
  LayoutProps,
  LayoutSidebarProps,
  LayoutSidebarSlot,
  LayoutSidebarState,
  LayoutSidebarTriggerProps,
  LayoutSurface,
} from './Layout.types';

import {
  Layout as LayoutRoot,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutLane,
  LayoutSidebar,
  LayoutSidebarTrigger,
} from './Layout';

export const Layout = Object.assign(LayoutRoot, {
  Root: LayoutRoot,
  Header: LayoutHeader,
  Lane: LayoutLane,
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
  LayoutLaneProps,
  LayoutProps,
  LayoutSidebarProps,
  LayoutSidebarState,
  LayoutSidebarTriggerProps,
} from './Layout.types';

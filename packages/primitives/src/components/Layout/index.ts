import {
  Layout as LayoutRoot,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutLane,
  LayoutSidebar,
  LayoutSidebarProvider,
  LayoutSidebarTrigger,
} from './Layout';

export const Layout = Object.assign(LayoutRoot, {
  Root: LayoutRoot,
  Header: LayoutHeader,
  Lane: LayoutLane,
  Sidebar: LayoutSidebar,
  SidebarProvider: LayoutSidebarProvider,
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
  LayoutSidebarDisplayState,
  LayoutSidebarProps,
  LayoutSidebarProviderProps,
  LayoutSidebarState,
  LayoutSidebarTriggerProps,
} from './Layout.types';

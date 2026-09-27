import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import LayoutBasicExample from './LayoutBasicExample';
import layoutBasicSource from './LayoutBasicExample.tsx?raw';
import LayoutControlledSidebarExample from './LayoutControlledSidebarExample';
import layoutControlledSidebarSource from './LayoutControlledSidebarExample.tsx?raw';
import LayoutFloatingActionsExample from './LayoutFloatingActionsExample';
import layoutFloatingActionsSource from './LayoutFloatingActionsExample.tsx?raw';
import LayoutFloatingSidebarExample from './LayoutFloatingSidebarExample';
import layoutFloatingSidebarSource from './LayoutFloatingSidebarExample.tsx?raw';
import LayoutFullHeightSidebarExample from './LayoutFullHeightSidebarExample';
import layoutFullHeightSidebarSource from './LayoutFullHeightSidebarExample.tsx?raw';
import LayoutHeaderExample from './LayoutHeaderExample';
import layoutHeaderSource from './LayoutHeaderExample.tsx?raw';
import LayoutLeftSidebarExample from './LayoutLeftSidebarExample';
import layoutLeftSidebarSource from './LayoutLeftSidebarExample.tsx?raw';
import LayoutOverlaySidebarExample from './LayoutOverlaySidebarExample';
import layoutOverlaySidebarSource from './LayoutOverlaySidebarExample.tsx?raw';
import LayoutRailSidebarExample from './LayoutRailSidebarExample';
import layoutRailSidebarSource from './LayoutRailSidebarExample.tsx?raw';
import LayoutRegionSizingExample from './LayoutRegionSizingExample';
import layoutRegionSizingSource from './LayoutRegionSizingExample.tsx?raw';
import LayoutResizableSidebarExample from './LayoutResizableSidebarExample';
import layoutResizableSidebarSource from './LayoutResizableSidebarExample.tsx?raw';
import LayoutRightSidebarExample from './LayoutRightSidebarExample';
import layoutRightSidebarSource from './LayoutRightSidebarExample.tsx?raw';
import LayoutSidebarExample from './LayoutSidebarExample';
import layoutSidebarSource from './LayoutSidebarExample.tsx?raw';
import LayoutStickyHeaderExample from './LayoutStickyHeaderExample';
import layoutStickyHeaderSource from './LayoutStickyHeaderExample.tsx?raw';
import LayoutSurfaceRegionsExample from './LayoutSurfaceRegionsExample';
import layoutSurfaceRegionsSource from './LayoutSurfaceRegionsExample.tsx?raw';

export const layoutExamples = {
  layoutBasic: {
    id: 'layout-basic',
    title: 'Header, content, and footer',
    description: 'Compose semantic regions with vertical and horizontal Layout containers.',
    Component: LayoutBasicExample,
    source: layoutBasicSource,
  },
  layoutLeftSidebar: {
    id: 'layout-left-sidebar',
    title: 'Left sidebar',
    description: 'Compose semantic regions with vertical and horizontal Layout containers.',
    Component: LayoutLeftSidebarExample,
    source: layoutLeftSidebarSource,
  },
  layoutRightSidebar: {
    id: 'layout-right-sidebar',
    title: 'Right sidebar',
    description: 'Compose semantic regions with vertical and horizontal Layout containers.',
    Component: LayoutRightSidebarExample,
    source: layoutRightSidebarSource,
  },
  layoutFullHeightSidebar: {
    id: 'layout-full-height-sidebar',
    title: 'Full-height sidebar',
    description: 'Compose semantic regions with vertical and horizontal Layout containers.',
    Component: LayoutFullHeightSidebarExample,
    source: layoutFullHeightSidebarSource,
  },
  layoutRailSidebar: {
    id: 'layout-rail-sidebar',
    title: 'Rail and sidebar',
    description: 'Place a compact rail beside a wider sidebar before the main content region.',
    Component: LayoutRailSidebarExample,
    source: layoutRailSidebarSource,
  },
  layoutSurfaceRegions: {
    id: 'layout-surface-regions',
    title: 'Surface regions',
    description: 'Apply Surface treatments independently to Header, Sidebar, Content, and Footer.',
    Component: LayoutSurfaceRegionsExample,
    source: layoutSurfaceRegionsSource,
  },
  layoutResizableSidebar: {
    id: 'layout-resizable-sidebar',
    title: 'Resizable sidebar',
    description:
      'Drag the divider, or use the keyboard, to resize Sidebar within its minimum and maximum width.',
    Component: LayoutResizableSidebarExample,
    source: layoutResizableSidebarSource,
  },
  layoutStickyHeader: {
    id: 'layout-sticky-header',
    title: 'Sticky header',
    description:
      'Scroll the structure while Header remains pinned to the top of its scroll region.',
    Component: LayoutStickyHeaderExample,
    source: layoutStickyHeaderSource,
  },
  layoutRegionSizing: {
    id: 'layout-region-sizing',
    title: 'Region sizing',
    description: 'Tune Header height, Sidebar width, and Content padding through Layout props.',
    Component: LayoutRegionSizingExample,
    source: layoutRegionSizingSource,
  },
  layoutHeader: {
    id: 'layout-header',
    title: 'Logo, navigation, and actions',
    description: 'Navigation stays inside Header while Surface selects its background.',
    Component: LayoutHeaderExample,
    source: layoutHeaderSource,
  },
  layoutSidebar: {
    id: 'layout-sidebar',
    title: 'Collapsible sidebar',
    description: 'Navigation and container sizing are included in this standalone example.',
    Component: LayoutSidebarExample,
    source: layoutSidebarSource,
  },
  layoutControlledSidebar: {
    id: 'layout-controlled-sidebar',
    title: 'External sidebar control',
    description: 'Navigation and container sizing are included in this standalone example.',
    Component: LayoutControlledSidebarExample,
    source: layoutControlledSidebarSource,
  },
  layoutOverlaySidebar: {
    id: 'layout-overlay-sidebar',
    title: 'Overlay sidebar',
    description: 'Navigation and container sizing are included in this standalone example.',
    Component: LayoutOverlaySidebarExample,
    source: layoutOverlaySidebarSource,
  },
  layoutFloatingSidebar: {
    id: 'layout-floating-sidebar',
    title: 'Floating navigation inside a canvas',
    description:
      'The sidebar remains local to its containing content region, including compact navigation and a nested popover.',
    Component: LayoutFloatingSidebarExample,
    source: layoutFloatingSidebarSource,
  },
  layoutFloatingActions: {
    id: 'layout-floating-actions',
    title: 'Canvas-local actions',
    description:
      'The layout positions a standalone action and a controlled action group inside its content region.',
    Component: LayoutFloatingActionsExample,
    source: layoutFloatingActionsSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;

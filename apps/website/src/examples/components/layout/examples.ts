import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import LayoutBasicExample from './LayoutBasicExample';
import layoutBasicStyles from './LayoutBasicExample.module.scss?virgo-raw';
import layoutBasicSource from './LayoutBasicExample.tsx?raw';
import LayoutControlledSidebarExample from './LayoutControlledSidebarExample';
import layoutControlledSidebarStyles from './LayoutControlledSidebarExample.module.scss?virgo-raw';
import layoutControlledSidebarSource from './LayoutControlledSidebarExample.tsx?raw';
import LayoutFloatingActionsExample from './LayoutFloatingActionsExample';
import layoutFloatingActionsStyles from './LayoutFloatingActionsExample.module.scss?virgo-raw';
import layoutFloatingActionsSource from './LayoutFloatingActionsExample.tsx?raw';
import LayoutFloatingSidebarExample from './LayoutFloatingSidebarExample';
import layoutFloatingSidebarStyles from './LayoutFloatingSidebarExample.module.scss?virgo-raw';
import layoutFloatingSidebarSource from './LayoutFloatingSidebarExample.tsx?raw';
import LayoutFullHeightSidebarExample from './LayoutFullHeightSidebarExample';
import layoutFullHeightSidebarStyles from './LayoutFullHeightSidebarExample.module.scss?virgo-raw';
import layoutFullHeightSidebarSource from './LayoutFullHeightSidebarExample.tsx?raw';
import LayoutHeaderExample from './LayoutHeaderExample';
import layoutHeaderStyles from './LayoutHeaderExample.module.scss?virgo-raw';
import layoutHeaderSource from './LayoutHeaderExample.tsx?raw';
import LayoutLaneExample from './LayoutLaneExample';
import layoutLaneStyles from './LayoutLaneExample.module.scss?virgo-raw';
import layoutLaneSource from './LayoutLaneExample.tsx?raw';
import LayoutLeftSidebarExample from './LayoutLeftSidebarExample';
import layoutLeftSidebarStyles from './LayoutLeftSidebarExample.module.scss?virgo-raw';
import layoutLeftSidebarSource from './LayoutLeftSidebarExample.tsx?raw';
import LayoutOverlaySidebarExample from './LayoutOverlaySidebarExample';
import layoutOverlaySidebarStyles from './LayoutOverlaySidebarExample.module.scss?virgo-raw';
import layoutOverlaySidebarSource from './LayoutOverlaySidebarExample.tsx?raw';
import LayoutRailSidebarExample from './LayoutRailSidebarExample';
import layoutRailSidebarStyles from './LayoutRailSidebarExample.module.scss?virgo-raw';
import layoutRailSidebarSource from './LayoutRailSidebarExample.tsx?raw';
import LayoutResizableSidebarExample from './LayoutResizableSidebarExample';
import layoutResizableSidebarStyles from './LayoutResizableSidebarExample.module.scss?virgo-raw';
import layoutResizableSidebarSource from './LayoutResizableSidebarExample.tsx?raw';
import LayoutRightSidebarExample from './LayoutRightSidebarExample';
import layoutRightSidebarStyles from './LayoutRightSidebarExample.module.scss?virgo-raw';
import layoutRightSidebarSource from './LayoutRightSidebarExample.tsx?raw';
import LayoutSidebarExample from './LayoutSidebarExample';
import layoutSidebarStyles from './LayoutSidebarExample.module.scss?virgo-raw';
import layoutSidebarSource from './LayoutSidebarExample.tsx?raw';
import LayoutStickyHeaderExample from './LayoutStickyHeaderExample';
import layoutStickyHeaderStyles from './LayoutStickyHeaderExample.module.scss?virgo-raw';
import layoutStickyHeaderSource from './LayoutStickyHeaderExample.tsx?raw';
import LayoutSurfaceRegionsExample from './LayoutSurfaceRegionsExample';
import layoutSurfaceRegionsStyles from './LayoutSurfaceRegionsExample.module.scss?virgo-raw';
import layoutSurfaceRegionsSource from './LayoutSurfaceRegionsExample.tsx?raw';

export const layoutExamples = {
  layoutBasic: {
    id: 'layout-basic',
    title: 'Header, content, and footer',
    description: 'Compose semantic regions with vertical and horizontal Layout containers.',
    Component: LayoutBasicExample,
    source: layoutBasicSource,
    styleSource: layoutBasicStyles,
  },
  layoutLeftSidebar: {
    id: 'layout-left-sidebar',
    title: 'Left sidebar',
    description: 'Compose semantic regions with vertical and horizontal Layout containers.',
    Component: LayoutLeftSidebarExample,
    source: layoutLeftSidebarSource,
    styleSource: layoutLeftSidebarStyles,
  },
  layoutRightSidebar: {
    id: 'layout-right-sidebar',
    title: 'Right sidebar',
    description: 'Compose semantic regions with vertical and horizontal Layout containers.',
    Component: LayoutRightSidebarExample,
    source: layoutRightSidebarSource,
    styleSource: layoutRightSidebarStyles,
  },
  layoutFullHeightSidebar: {
    id: 'layout-full-height-sidebar',
    title: 'Full-height sidebar',
    description: 'Compose semantic regions with vertical and horizontal Layout containers.',
    Component: LayoutFullHeightSidebarExample,
    source: layoutFullHeightSidebarSource,
    styleSource: layoutFullHeightSidebarStyles,
  },
  layoutRailSidebar: {
    id: 'layout-rail-sidebar',
    title: 'Rail and sidebar',
    description: 'Place a compact rail beside a wider sidebar before the main content region.',
    Component: LayoutRailSidebarExample,
    source: layoutRailSidebarSource,
    styleSource: layoutRailSidebarStyles,
  },
  layoutSurfaceRegions: {
    id: 'layout-surface-regions',
    title: 'Surface regions',
    description: 'Apply Surface treatments independently to Header, Sidebar, Content, and Footer.',
    Component: LayoutSurfaceRegionsExample,
    source: layoutSurfaceRegionsSource,
    styleSource: layoutSurfaceRegionsStyles,
  },
  layoutResizableSidebar: {
    id: 'layout-resizable-sidebar',
    title: 'Resizable sidebar',
    description:
      'Drag the divider, or use the keyboard, to resize Sidebar within its minimum and maximum width.',
    Component: LayoutResizableSidebarExample,
    source: layoutResizableSidebarSource,
    styleSource: layoutResizableSidebarStyles,
  },
  layoutStickyHeader: {
    id: 'layout-sticky-header',
    title: 'Sticky header',
    description:
      'Scroll the structure while Header remains pinned to the top of its scroll region.',
    Component: LayoutStickyHeaderExample,
    source: layoutStickyHeaderSource,
    styleSource: layoutStickyHeaderStyles,
  },
  layoutLane: {
    id: 'layout-lane',
    title: 'Lane boundary',
    description:
      'Create a shared spatial lane for Breadcrumb, Dock, navigation, and nested regions while Content keeps its own width.',
    Component: LayoutLaneExample,
    source: layoutLaneSource,
    styleSource: layoutLaneStyles,
  },
  layoutHeader: {
    id: 'layout-header',
    title: 'Logo, navigation, and actions',
    description: 'Navigation stays inside Header while Surface selects its background.',
    Component: LayoutHeaderExample,
    source: layoutHeaderSource,
    styleSource: layoutHeaderStyles,
  },
  layoutSidebar: {
    id: 'layout-sidebar',
    title: 'Collapsible sidebar',
    description: 'Navigation and container sizing are included in this standalone example.',
    Component: LayoutSidebarExample,
    source: layoutSidebarSource,
    styleSource: layoutSidebarStyles,
  },
  layoutControlledSidebar: {
    id: 'layout-controlled-sidebar',
    title: 'External sidebar control',
    description: 'Navigation and container sizing are included in this standalone example.',
    Component: LayoutControlledSidebarExample,
    source: layoutControlledSidebarSource,
    styleSource: layoutControlledSidebarStyles,
  },
  layoutOverlaySidebar: {
    id: 'layout-overlay-sidebar',
    title: 'Overlay sidebar',
    description: 'Navigation and container sizing are included in this standalone example.',
    Component: LayoutOverlaySidebarExample,
    source: layoutOverlaySidebarSource,
    styleSource: layoutOverlaySidebarStyles,
  },
  layoutFloatingSidebar: {
    id: 'layout-floating-sidebar',
    title: 'Floating navigation inside a canvas',
    description:
      'The sidebar remains local to its containing content region, including compact navigation and a nested popover.',
    Component: LayoutFloatingSidebarExample,
    source: layoutFloatingSidebarSource,
    styleSource: layoutFloatingSidebarStyles,
  },
  layoutFloatingActions: {
    id: 'layout-floating-actions',
    title: 'Canvas-local actions',
    description:
      'The layout positions a standalone action and a controlled action group inside its content region.',
    Component: LayoutFloatingActionsExample,
    source: layoutFloatingActionsSource,
    styleSource: layoutFloatingActionsStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;

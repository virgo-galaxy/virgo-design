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
import LayoutResponsiveSidebarExample from './LayoutResponsiveSidebarExample';
import layoutResponsiveSidebarSource from './LayoutResponsiveSidebarExample.tsx?raw';
import LayoutRightSidebarExample from './LayoutRightSidebarExample';
import layoutRightSidebarSource from './LayoutRightSidebarExample.tsx?raw';
import LayoutSidebarExample from './LayoutSidebarExample';
import layoutSidebarSource from './LayoutSidebarExample.tsx?raw';
import LayoutStickyHeaderExample from './LayoutStickyHeaderExample';
import layoutStickyHeaderSource from './LayoutStickyHeaderExample.tsx?raw';

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
  layoutHeader: {
    id: 'layout-header',
    title: 'Logo, navigation, and actions',
    description: 'The header keeps its native controls while Surface selects its background.',
    Component: LayoutHeaderExample,
    source: layoutHeaderSource,
  },
  layoutStickyHeader: {
    id: 'layout-sticky-header',
    title: 'Sticky header in a scroll region',
    description: 'The header keeps its native controls while Surface selects its background.',
    Component: LayoutStickyHeaderExample,
    source: layoutStickyHeaderSource,
  },
  layoutSidebar: {
    id: 'layout-sidebar',
    title: 'Collapsible sidebar',
    description:
      'Navigation, controls, and container sizing are all included in this standalone example.',
    Component: LayoutSidebarExample,
    source: layoutSidebarSource,
  },
  layoutControlledSidebar: {
    id: 'layout-controlled-sidebar',
    title: 'External sidebar control',
    description:
      'Navigation, controls, and container sizing are all included in this standalone example.',
    Component: LayoutControlledSidebarExample,
    source: layoutControlledSidebarSource,
  },
  layoutOverlaySidebar: {
    id: 'layout-overlay-sidebar',
    title: 'Overlay sidebar',
    description:
      'Navigation, controls, and container sizing are all included in this standalone example.',
    Component: LayoutOverlaySidebarExample,
    source: layoutOverlaySidebarSource,
  },
  layoutResponsiveSidebar: {
    id: 'layout-responsive-sidebar',
    title: 'Responsive sidebar',
    description:
      'Navigation, controls, and container sizing are all included in this standalone example.',
    Component: LayoutResponsiveSidebarExample,
    source: layoutResponsiveSidebarSource,
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

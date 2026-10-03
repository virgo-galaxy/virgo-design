import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

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
import LayoutGroupedSidebarExample from './LayoutGroupedSidebarExample';
import layoutGroupedSidebarStyles from './LayoutGroupedSidebarExample.module.scss?virgo-raw';
import layoutGroupedSidebarSource from './LayoutGroupedSidebarExample.tsx?raw';
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
  layoutGroupedSidebar: {
    id: 'layout-grouped-sidebar',
    title: 'Sticky group labels',
    titleTranslationKey: 'examples.layout.copy.stickyGroupLabels',
    description: 'Compose Sidebar with grouped navigation and CSS sticky group labels.',
    descriptionTranslationKey:
      'examples.layout.copy.composeSidebarWithGroupedNavigationAndCssStickyGroupLabels',
    Component: LayoutGroupedSidebarExample,
    source: createExampleSource(layoutGroupedSidebarSource),
    styleSource: layoutGroupedSidebarStyles,
  },
  layoutBasic: {
    id: 'layout-basic',
    title: 'Header, content, and footer',
    titleTranslationKey: 'examples.layout.copy.headerContentAndFooter',
    description: 'Compose semantic regions with vertical and horizontal Layout containers.',
    descriptionTranslationKey:
      'examples.layout.copy.composeSemanticRegionsWithVerticalAndHorizontalLayoutContainers',
    Component: LayoutBasicExample,
    source: createExampleSource(layoutBasicSource),
    styleSource: layoutBasicStyles,
  },
  layoutLeftSidebar: {
    id: 'layout-left-sidebar',
    title: 'Left sidebar',
    titleTranslationKey: 'examples.layout.copy.leftSidebar',
    description: 'Compose semantic regions with vertical and horizontal Layout containers.',
    descriptionTranslationKey:
      'examples.layout.copy.composeSemanticRegionsWithVerticalAndHorizontalLayoutContainers',
    Component: LayoutLeftSidebarExample,
    source: createExampleSource(layoutLeftSidebarSource),
    styleSource: layoutLeftSidebarStyles,
  },
  layoutRightSidebar: {
    id: 'layout-right-sidebar',
    title: 'Right sidebar',
    titleTranslationKey: 'examples.layout.copy.rightSidebar',
    description: 'Compose semantic regions with vertical and horizontal Layout containers.',
    descriptionTranslationKey:
      'examples.layout.copy.composeSemanticRegionsWithVerticalAndHorizontalLayoutContainers',
    Component: LayoutRightSidebarExample,
    source: createExampleSource(layoutRightSidebarSource),
    styleSource: layoutRightSidebarStyles,
  },
  layoutFullHeightSidebar: {
    id: 'layout-full-height-sidebar',
    title: 'Full-height sidebar',
    titleTranslationKey: 'examples.layout.copy.fullHeightSidebar',
    description: 'Compose semantic regions with vertical and horizontal Layout containers.',
    descriptionTranslationKey:
      'examples.layout.copy.composeSemanticRegionsWithVerticalAndHorizontalLayoutContainers',
    Component: LayoutFullHeightSidebarExample,
    source: createExampleSource(layoutFullHeightSidebarSource),
    styleSource: layoutFullHeightSidebarStyles,
  },
  layoutRailSidebar: {
    id: 'layout-rail-sidebar',
    title: 'Rail and sidebar',
    titleTranslationKey: 'examples.layout.copy.railAndSidebar',
    description: 'Place a compact rail beside a wider sidebar before the main content region.',
    descriptionTranslationKey: 'examples.layout.copy.placeACompactRailBesideAWiderSidebarBeforeThe',
    Component: LayoutRailSidebarExample,
    source: createExampleSource(layoutRailSidebarSource),
    styleSource: layoutRailSidebarStyles,
  },
  layoutSurfaceRegions: {
    id: 'layout-surface-regions',
    title: 'Surface regions',
    titleTranslationKey: 'examples.layout.copy.surfaceRegions',
    description: 'Apply Surface treatments independently to Header, Sidebar, Content, and Footer.',
    descriptionTranslationKey:
      'examples.layout.copy.applySurfaceTreatmentsIndependentlyToHeaderSidebarContentAndFooter',
    Component: LayoutSurfaceRegionsExample,
    source: createExampleSource(layoutSurfaceRegionsSource),
    styleSource: layoutSurfaceRegionsStyles,
  },
  layoutResizableSidebar: {
    id: 'layout-resizable-sidebar',
    title: 'Resizable sidebar',
    titleTranslationKey: 'examples.layout.copy.resizableSidebar',
    description:
      'Resize within bounds, snap to a rail, continue to hide, and restore through a provider-scoped external trigger.',
    descriptionTranslationKey: 'examples.layout.copy.dragTheDividerOrUseTheKeyboardToResizeSidebar',
    Component: LayoutResizableSidebarExample,
    source: createExampleSource(layoutResizableSidebarSource),
    styleSource: layoutResizableSidebarStyles,
  },
  layoutStickyHeader: {
    id: 'layout-sticky-header',
    title: 'Sticky header',
    titleTranslationKey: 'examples.layout.copy.stickyHeader',
    description:
      'Scroll the structure while Header remains pinned to the top of its scroll region.',
    descriptionTranslationKey:
      'examples.layout.copy.scrollTheStructureWhileHeaderRemainsPinnedToTheTop',
    Component: LayoutStickyHeaderExample,
    source: createExampleSource(layoutStickyHeaderSource),
    styleSource: layoutStickyHeaderStyles,
  },
  layoutLane: {
    id: 'layout-lane',
    title: 'Lane boundary',
    titleTranslationKey: 'examples.layout.copy.laneBoundary',
    description:
      'Create a shared spatial lane for Breadcrumb, Dock, navigation, and nested regions while Content keeps its own width.',
    descriptionTranslationKey:
      'examples.layout.copy.createASharedSpatialLaneForBreadcrumbDockNavigationAnd',
    Component: LayoutLaneExample,
    source: createExampleSource(layoutLaneSource),
    styleSource: layoutLaneStyles,
  },
  layoutHeader: {
    id: 'layout-header',
    title: 'Logo, navigation, and actions',
    titleTranslationKey: 'examples.layout.copy.logoNavigationAndActions',
    description: 'Navigation stays inside Header while Surface selects its background.',
    descriptionTranslationKey:
      'examples.layout.copy.navigationStaysInsideHeaderWhileSurfaceSelectsItsBackground',
    Component: LayoutHeaderExample,
    source: createExampleSource(layoutHeaderSource),
    styleSource: layoutHeaderStyles,
  },
  layoutSidebar: {
    id: 'layout-sidebar',
    title: 'Collapsible sidebar',
    titleTranslationKey: 'examples.layout.copy.collapsibleSidebar',
    description: 'Navigation and container sizing are included in this standalone example.',
    descriptionTranslationKey:
      'examples.layout.copy.navigationAndContainerSizingAreIncludedInThisStandaloneExample',
    Component: LayoutSidebarExample,
    source: createExampleSource(layoutSidebarSource),
    styleSource: layoutSidebarStyles,
  },
  layoutControlledSidebar: {
    id: 'layout-controlled-sidebar',
    title: 'External sidebar control',
    titleTranslationKey: 'examples.layout.copy.externalSidebarControl',
    description: 'Navigation and container sizing are included in this standalone example.',
    descriptionTranslationKey:
      'examples.layout.copy.navigationAndContainerSizingAreIncludedInThisStandaloneExample',
    Component: LayoutControlledSidebarExample,
    source: createExampleSource(layoutControlledSidebarSource),
    styleSource: layoutControlledSidebarStyles,
  },
  layoutOverlaySidebar: {
    id: 'layout-overlay-sidebar',
    title: 'Overlay sidebar',
    titleTranslationKey: 'examples.layout.copy.overlaySidebar',
    description: 'Navigation and container sizing are included in this standalone example.',
    descriptionTranslationKey:
      'examples.layout.copy.navigationAndContainerSizingAreIncludedInThisStandaloneExample',
    Component: LayoutOverlaySidebarExample,
    source: createExampleSource(layoutOverlaySidebarSource),
    styleSource: layoutOverlaySidebarStyles,
  },
  layoutFloatingSidebar: {
    id: 'layout-floating-sidebar',
    title: 'Floating navigation inside a canvas',
    titleTranslationKey: 'examples.layout.copy.floatingNavigationInsideACanvas',
    description:
      'The sidebar remains local to its containing content region, including compact navigation and a nested popover.',
    descriptionTranslationKey:
      'examples.layout.copy.theSidebarRemainsLocalToItsContainingContentRegionIncluding',
    Component: LayoutFloatingSidebarExample,
    source: createExampleSource(layoutFloatingSidebarSource),
    styleSource: layoutFloatingSidebarStyles,
  },
  layoutFloatingActions: {
    id: 'layout-floating-actions',
    title: 'Canvas-local actions',
    titleTranslationKey: 'examples.layout.copy.canvasLocalActions',
    description:
      'The layout positions a standalone action and a controlled action group inside its content region.',
    descriptionTranslationKey:
      'examples.layout.copy.theLayoutPositionsAStandaloneActionAndAControlledAction',
    Component: LayoutFloatingActionsExample,
    source: createExampleSource(layoutFloatingActionsSource),
    styleSource: layoutFloatingActionsStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;

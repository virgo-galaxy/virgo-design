import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const layoutMetadata = {
  name: 'Layout',
  package: '@virgo-design/ui',
  category: 'Layout',
  description:
    'Composes semantic regions and independent spatial lanes with collapsible sidebars, sticky or fixed headers, responsive sizing, and shared Surface treatments. Navigation remains independent.',
  import: "import { Layout } from '@virgo-design/ui';",
  states: [
    'default',
    'expanded',
    'collapsed',
    'hidden',
    'snapped',
    'responsive',
    'resizing',
    'sticky',
    'fixed',
  ],
  anatomy: [
    {
      name: 'Layout.SidebarProvider',
      description:
        'Shared three-state Sidebar scope for one sidebar and internal or external action triggers; returns focus to an external trigger when hiding the focused sidebar.',
    },
    {
      name: 'Layout.Root',
      description: 'Flex container that arranges direct child regions vertically or horizontally.',
    },
    {
      name: 'Layout.Header',
      description:
        'Semantic header region with optional logo, content, and actions slots; configurable content alignment; and static, sticky, or fixed positioning.',
    },
    {
      name: 'Layout.Lane',
      description:
        'Neutral spatial boundary with independent width, maximum width, direction, and edge inset. It can contain Content, Sidebar, Header, Footer, navigation, or other attachment-aware UI without inheriting Content width.',
    },
    {
      name: 'Layout.Sidebar',
      description:
        'Semantic aside with controlled or uncontrolled expanded/rail/hidden state, header/body/footer slots, bounded resizing, optional snap thresholds and resize-end callbacks.',
    },
    {
      name: 'Layout.SidebarTrigger',
      description: 'Accessible collapse control scoped to its Sidebar, supporting render(props).',
    },
    {
      name: 'Layout.Content',
      description: 'Semantic main region that grows into available layout space.',
    },
    {
      name: 'Layout.Footer',
      description: 'Semantic footer region for page-level closing content.',
    },
    {
      name: 'Layout.Floating',
      description: 'Logical corner anchor within Content, independent of the controls it holds.',
    },
  ],
  capabilities: {
    verticalComposition: true,
    horizontalComposition: true,
    nestedLayout: true,
    laneComposition: true,
    laneSizing: true,
    laneInset: true,
    sidebarWidth: true,
    resizableSidebar: true,
    sidebarResizeSnap: true,
    hiddenSidebar: true,
    externalSidebarTriggers: true,
    semanticRegions: true,
    collapsibleSidebar: true,
    responsiveBreakpoint: true,
    surfaceIntegration: true,
    stickyHeader: true,
    overlaySidebar: true,
    floatingSidebar: true,
    localFloatingControls: true,
    fixedRegions: true,
  },
  accessibility: [
    'Header, Sidebar, Content and Footer render native header, aside, main and footer elements. Lane is intentionally a neutral div and adds no landmark of its own.',
    'Children retain document order, so visual placement and reading order stay aligned.',
    'SidebarTrigger uses a native button with aria-expanded, aria-controls, and an action label. Layout adds no navigation behavior.',
    'Resizable Sidebar exposes a keyboard-focusable separator with arrow-key resizing and optional minimum and maximum widths.',
    'Zero-width collapsed content is hidden and inert. Use an edge or external trigger to reopen it. Icon-only navigation must retain accessible labels.',
    'SidebarProvider scopes external SidebarTrigger actions without prescribing a logo or navigation. Supply an external trigger when enabling hidden state. Hidden content is inert and leaves the landmark/tab order; focus inside it transfers to an available external trigger.',
    'Consumers should avoid nesting multiple main regions in the same document landmark scope.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;

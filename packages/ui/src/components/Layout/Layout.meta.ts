import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const layoutMetadata = {
  name: 'Layout',
  package: '@virgo-design/ui',
  category: 'Layout',
  description:
    'Composes semantic regions with collapsible sidebars, sticky or fixed headers, responsive width changes, and shared Surface treatments. Navigation remains independent.',
  import: "import { Layout } from '@virgo-design/ui';",
  states: ['default', 'expanded', 'collapsed', 'responsive', 'resizing', 'sticky', 'fixed'],
  anatomy: [
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
      name: 'Layout.Sidebar',
      description:
        'Semantic aside with controlled or uncontrolled collapse, header/body/footer slots, configurable widths, and optional resizing.',
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
    sidebarWidth: true,
    resizableSidebar: true,
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
    'Header, Sidebar, Content and Footer render native header, aside, main and footer elements.',
    'Children retain document order, so visual placement and reading order stay aligned.',
    'SidebarTrigger uses a native button with aria-expanded, aria-controls, and an action label. Layout adds no navigation behavior.',
    'Resizable Sidebar exposes a keyboard-focusable separator with arrow-key resizing and optional minimum and maximum widths.',
    'Zero-width collapsed content is hidden and inert. Supply an external trigger. Icon-only navigation must retain accessible labels.',
    'Consumers should avoid nesting multiple main regions in the same document landmark scope.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;

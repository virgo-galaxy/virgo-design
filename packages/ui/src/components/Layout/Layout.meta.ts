import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const layoutMetadata = {
  name: 'Layout',
  package: '@virgo-design/ui',
  category: 'Layout',
  description:
    'Composes semantic regions with collapsible sidebars, sticky headers, responsive width changes, and shared Surface treatments. Navigation remains independent.',
  import: "import { Layout } from '@virgo-design/ui';",
  states: ['default', 'expanded', 'collapsed', 'responsive', 'sticky'],
  anatomy: [
    {
      name: 'Layout.Root',
      description: 'Flex container that arranges direct child regions vertically or horizontally.',
    },
    {
      name: 'Layout.Header',
      description: 'Semantic header region for page-level introductory content.',
    },
    {
      name: 'Layout.Sidebar',
      description:
        'Semantic aside with controlled or uncontrolled collapse, header/body/footer slots and configurable widths.',
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
    semanticRegions: true,
    collapsibleSidebar: true,
    responsiveBreakpoint: true,
    surfaceIntegration: true,
    stickyHeader: true,
    overlaySidebar: true,
    floatingSidebar: true,
    localFloatingControls: true,
    fixedRegions: false,
  },
  accessibility: [
    'Header, Sidebar, Content and Footer render native header, aside, main and footer elements.',
    'Children retain document order, so visual placement and reading order stay aligned.',
    'SidebarTrigger uses a native button with aria-expanded, aria-controls, and an action label. Layout adds no navigation behavior.',
    'Zero-width collapsed content is hidden and inert. Supply an external trigger. Icon-only navigation must retain accessible labels.',
    'Consumers should avoid nesting multiple main regions in the same document landmark scope.',
  ],
  examples: [
    {
      name: 'Floating regions',
      code: '<Layout.Content><Layout.Sidebar mode="floating" collapsible>{navigation}</Layout.Sidebar><Layout.Floating><FloatingAction aria-label="Help"><InfoIcon /></FloatingAction></Layout.Floating></Layout.Content>',
    },
    {
      name: 'Basic',
      code: '<Layout><Layout.Header /><Layout.Content /><Layout.Footer /></Layout>',
    },
    {
      name: 'Collapsible Sidebar',
      code: '<Layout.Root direction="horizontal"><Layout.Sidebar collapsible header={<Logo />}>{({ collapsed }) => <Navigation compact={collapsed} />}</Layout.Sidebar><Layout.Content /></Layout.Root>',
    },
    {
      name: 'Sticky Header',
      code: '<Layout.Header position="sticky" logo={<Logo />} surface={{ tone: "default" }}><NavigationMenu.Root orientation="horizontal">...</NavigationMenu.Root></Layout.Header>',
    },
    {
      name: 'Controlled Responsive Sidebar',
      code: '<Layout.Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} collapseBelow={800} trigger={null}>{children}</Layout.Sidebar>',
    },
  ],
} as const satisfies ComponentMetadata;

import type { ComponentMetadata } from '../metadata/ComponentMetadata';

export const layoutMetadata = {
  name: 'Layout',
  package: '@virgo-design/ui',
  category: 'Layout',
  description:
    'Composes semantic page-level regions into vertical, horizontal, and nested structural skeletons.',
  import:
    "import { Layout, LayoutContent, LayoutFooter, LayoutHeader, LayoutSider } from '@virgo-design/ui';",
  states: ['default'],
  anatomy: [
    {
      name: 'Layout',
      description: 'Flex container that arranges direct child regions vertically or horizontally.',
    },
    {
      name: 'LayoutHeader',
      description: 'Semantic header region for page-level introductory content.',
    },
    {
      name: 'LayoutSider',
      description: 'Semantic aside region with a configurable structural width.',
    },
    {
      name: 'LayoutContent',
      description: 'Semantic main region that grows into available layout space.',
    },
    {
      name: 'LayoutFooter',
      description: 'Semantic footer region for page-level closing content.',
    },
  ],
  capabilities: {
    verticalComposition: true,
    horizontalComposition: true,
    nestedLayout: true,
    siderWidth: true,
    semanticRegions: true,
    collapsibleSider: false,
    responsiveBreakpoint: false,
    fixedRegions: false,
  },
  accessibility: [
    'LayoutHeader, LayoutSider, LayoutContent, and LayoutFooter render native header, aside, main, and footer elements.',
    'Children retain document order, so visual placement and reading order stay aligned.',
    'Layout itself adds no navigation, landmark labels, or interactive behavior.',
    'Consumers should avoid nesting multiple main regions in the same document landmark scope.',
  ],
  examples: [
    {
      name: 'Basic',
      code: '<Layout><LayoutHeader /><LayoutContent /><LayoutFooter /></Layout>',
    },
    {
      name: 'Left Sider',
      code: '<Layout><LayoutHeader /><Layout direction="horizontal"><LayoutSider /><LayoutContent /></Layout><LayoutFooter /></Layout>',
    },
    {
      name: 'Right Sider',
      code: '<Layout><LayoutHeader /><Layout direction="horizontal"><LayoutContent /><LayoutSider /></Layout><LayoutFooter /></Layout>',
    },
    {
      name: 'Full-height Sider',
      code: '<Layout direction="horizontal"><LayoutSider /><Layout><LayoutHeader /><LayoutContent /><LayoutFooter /></Layout></Layout>',
    },
  ],
} as const satisfies ComponentMetadata;

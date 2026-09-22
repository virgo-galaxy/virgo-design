import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const layoutMetadata = {
  name: 'Layout',
  package: '@virgo-design/ui',
  category: 'Layout',
  description:
    'Composes semantic page-level regions into vertical, horizontal, and nested structural skeletons.',
  import: "import { Layout } from '@virgo-design/ui';",
  states: ['default'],
  anatomy: [
    {
      name: 'Layout',
      description: 'Flex container that arranges direct child regions vertically or horizontally.',
    },
    {
      name: 'Layout.Header',
      description: 'Semantic header region for page-level introductory content.',
    },
    {
      name: 'Layout.Sider',
      description: 'Semantic aside region with a configurable structural width.',
    },
    {
      name: 'Layout.Content',
      description: 'Semantic main region that grows into available layout space.',
    },
    {
      name: 'Layout.Footer',
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
    'Layout.Header, Layout.Sider, Layout.Content, and Layout.Footer render native header, aside, main, and footer elements.',
    'Children retain document order, so visual placement and reading order stay aligned.',
    'Layout itself adds no navigation, landmark labels, or interactive behavior.',
    'Consumers should avoid nesting multiple main regions in the same document landmark scope.',
  ],
  examples: [
    {
      name: 'Basic',
      code: '<Layout><Layout.Header /><Layout.Content /><Layout.Footer /></Layout>',
    },
    {
      name: 'Left Sider',
      code: '<Layout><Layout.Header /><Layout direction="horizontal"><Layout.Sider /><Layout.Content /></Layout><Layout.Footer /></Layout>',
    },
    {
      name: 'Right Sider',
      code: '<Layout><Layout.Header /><Layout direction="horizontal"><Layout.Content /><Layout.Sider /></Layout><Layout.Footer /></Layout>',
    },
    {
      name: 'Full-height Sider',
      code: '<Layout direction="horizontal"><Layout.Sider /><Layout><Layout.Header /><Layout.Content /><Layout.Footer /></Layout></Layout>',
    },
  ],
} as const satisfies ComponentMetadata;

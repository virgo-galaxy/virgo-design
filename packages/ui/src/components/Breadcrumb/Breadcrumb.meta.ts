import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const breadcrumbMetadata = {
  name: 'Breadcrumb',
  package: '@virgo-design/ui',
  category: 'Navigation',
  description:
    'Shows the current location within a hierarchy using native links and a current-page item.',
  import: "import { Breadcrumb } from '@virgo-design/ui';",
  states: ['default', 'hover', 'focus-visible', 'current'],
  anatomy: [
    {
      name: 'root',
      description: 'Named navigation landmark containing the breadcrumb path.',
    },
    {
      name: 'list',
      description: 'Ordered list that preserves the hierarchy of breadcrumb items.',
    },
    {
      name: 'item',
      description: 'Native link for a previous level or current-page text for the final level.',
    },
    {
      name: 'icon',
      description: 'Optional decorative ReactNode displayed before an item label.',
    },
    {
      name: 'separator',
      description: 'Decorative ReactNode displayed between adjacent items.',
    },
  ],
  capabilities: {
    basic: true,
    icons: true,
    customSeparator: true,
    dynamicContent: true,
    nativeLinks: true,
    currentPage: true,
    collapsed: false,
    routerIntegration: false,
  },
  accessibility: [
    'Renders a nav landmark with the accessible name "Breadcrumb" by default.',
    'Uses an ordered list to preserve the hierarchy of the path.',
    'Items with href render as native links and retain browser link behavior.',
    'An item without href represents the current page with aria-current="page".',
    'Separators and item icons are decorative and hidden from assistive technology.',
    'Link hover and focus styles apply only to interactive breadcrumb items.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;

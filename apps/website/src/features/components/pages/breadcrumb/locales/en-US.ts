export const breadcrumbEnUS = {
  overview: {
    description:
      'Communicates the current location within a hierarchy using native links, ordered-list semantics, and a clearly identified current page.',
  },
  facts: {
    items: 'Items',
    separator: 'Separator',
    custom: 'Custom',
    semantics: 'Semantics',
    native: 'Native',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    nativeLinks: 'Native links',
    orderedPath: 'Ordered path',
    currentPage: 'Current page',
  },
  basic: {
    title: 'Basic',
    description:
      'Previous hierarchy levels are native links while the final item identifies the current page.',
  },
  icons: {
    title: 'Icons',
    description:
      'Decorative icons can accompany item labels without changing the default separator or link semantics.',
  },
  separator: {
    title: 'Separator',
    description:
      'Only the decorative separator changes; item content and hierarchy remain identical.',
  },
  dynamicValue: {
    title: 'Dynamic Value',
    description:
      'Runtime values render naturally through ReactNode item content without router integration.',
  },
} as const;

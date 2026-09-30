export const cardEnUS = {
  overview: {
    description: 'Content structure backed by Surface tokens, without implicit interaction.',
  },
  facts: {
    variants: 'Variants',
    sizes: 'Sizes',
    slots: 'Slots',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    surfaceBacked: 'Surface-backed',
    consumerOwnedContent: 'Consumer-owned content',
    explicitActions: 'Explicit actions',
  },
  structure: {
    title: 'Basic and header',
    description: 'Card organizes related content; consumers choose the document heading level.',
  },
  actions: {
    title: 'Footer actions',
    description: 'Actions remain explicit controls composed into the Footer slot.',
  },
  variants: {
    title: 'Outlined and elevated',
    description:
      'Variants map directly to existing Surface border, tone, radius, and elevation tokens.',
  },
  composition: {
    title: 'Avatar, Badge, and arbitrary composition',
    description: 'Card accepts normal children and does not constrain content to its own anatomy.',
  },
} as const;

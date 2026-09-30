export const tabsEnUS = {
  overview: {
    description:
      'Navigates between related content panels with standard tab semantics, automatic keyboard activation, and line, plain, or card visual treatments.',
  },
  facts: {
    variants: 'Variants',
    alignment: 'Alignment',
    panels: 'Panels',
    linked: 'Linked',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    automaticActivation: 'Automatic activation',
    slidingIndicator: 'Sliding indicator',
    linkedPanels: 'Linked panels',
  },
  basic: {
    title: 'Basic',
    description:
      'Choose labels with different widths to inspect both the position and width transition of the independent indicator.',
  },
  disabled: {
    title: 'Disabled',
    description: 'The disabled tab remains visible but pointer and keyboard navigation skip it.',
  },
  alignment: {
    title: 'Alignment',
    description:
      'Only horizontal alignment changes; tab content and line treatment remain identical.',
  },
  icons: {
    title: 'Icons',
    description:
      'Decorative Virgo icons inherit tab state color while the text label keeps the accessible name.',
  },
  plain: {
    title: 'Plain',
    description:
      'Plain tabs keep selection lightweight: separators organize adjacent labels, hover adds a soft surface, and the active label is color-only.',
  },
  card: {
    title: 'Card',
    description:
      'Card tabs replace the underline with connected document-like surfaces while preserving the same tab and panel semantics.',
  },
  editableCard: {
    title: 'Editable Card',
    description:
      'Close actions preserve an adjacent active tab; the trailing add action creates and activates a new tab.',
  },
} as const;

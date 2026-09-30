export const segmentedControlEnUS = {
  overview: {
    description:
      'Compact single-selection control for switching between a small set of mutually exclusive modes or views.',
  },
  facts: {
    variants: 'Variants',
    sizes: 'Sizes',
    motion: 'Motion',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    '28pxHeight': '28px height',
    slidingIndicator: 'Sliding indicator',
  },
  segmentedVariants: {
    title: 'Variants',
    description:
      'Only the visual treatment changes; size, motion, content, and selected value remain identical.',
  },
  segmentedMotion: {
    title: 'Motion',
    description: 'For each visual variant, only the selected-indicator motion changes.',
  },
  segmentedSizes: {
    title: 'Sizes',
    description: 'Only the control size changes; all other properties use their defaults.',
  },
  segmentedContent: {
    title: 'Content',
    description:
      'Only the option content changes; visual treatment, size, and motion use their defaults.',
  },
} as const;

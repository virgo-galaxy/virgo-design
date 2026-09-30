export const skeletonEnUS = {
  overview: {
    description: 'Visual content placeholders that preserve layout while real content loads.',
  },
  facts: {
    shapes: 'Shapes',
    textBlockCircle: 'Text · Block · Circle',
    motion: 'Motion',
    optional: 'Optional',
    purpose: 'Purpose',
    layoutPreservation: 'Layout preservation',
  },
  specimen: {
    summary: 'card placeholder · animated',
    referenceSpecimen: 'Reference specimen',
    predictableDimensions: 'Predictable dimensions',
    contentLoading: 'Content loading',
    reducedMotionAware: 'Reduced-motion aware',
  },
  variants: {
    title: 'Text, rectangle, and circle',
    description: 'A small set of shapes covers text lines, media blocks, and avatar placeholders.',
  },
  card: {
    title: 'Card placeholder',
    description: 'Native dimensions and normal layout composition keep the API predictable.',
  },
  motion: {
    title: 'Motion control',
    description:
      'Pulse is enabled by default, can be disabled, and stops for reduced-motion preferences.',
  },
} as const;

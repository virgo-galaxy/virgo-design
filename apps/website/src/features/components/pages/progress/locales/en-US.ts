export const progressEnUS = {
  overview: {
    description: 'Determinate progress for tasks with a known completion amount.',
  },
  facts: {
    state: 'State',
    determinate: 'Determinate',
    sizes: 'Sizes',
    intents: 'Intents',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    clampedValues: 'Clamped values',
    visibleStatus: 'Visible status',
    semanticIntent: 'Semantic intent',
  },
  values: {
    title: 'Values and boundaries',
    description:
      'Values are normalized against max and remain honest at empty and complete boundaries.',
  },
  sizes: {
    title: 'Sizes',
    description: 'Size changes track thickness without changing the semantic value.',
  },
  intents: {
    title: 'Semantic intents',
    description: 'Intent uses Virgo semantic status colors for meaningful task outcomes.',
  },
} as const;

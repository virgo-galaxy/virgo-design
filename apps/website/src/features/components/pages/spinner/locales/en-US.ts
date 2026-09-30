export const spinnerEnUS = {
  overview: {
    description: 'Indeterminate loading feedback that composes through currentColor.',
  },
  facts: {
    state: 'State',
    indeterminate: 'Indeterminate',
    sizes: 'Sizes',
    intent: 'Intent',
    brandAware: 'Brand-aware',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    inlineFeedback: 'Inline feedback',
    composable: 'Composable',
    themeAwareColor: 'Theme-aware color',
  },
  sizes: {
    title: 'Sizes and intents',
    description: 'Three token sizes and a small semantic color surface cover inline loading needs.',
  },
  composition: {
    title: 'Inline and Button composition',
    description: 'Spinner owns no async state and can be composed into existing controls.',
  },
  environments: {
    title: 'Light and dark environments',
    description: 'Current and semantic colors stay theme-aware in both environments.',
  },
} as const;

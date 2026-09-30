export const separatorEnUS = {
  overview: {
    description: 'A token-based rule for visual and semantic separation in general layouts.',
  },
  facts: {
    orientations: 'Orientations',
    semantics: 'Semantics',
    decorative: 'Decorative',
    optional: 'Optional',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    ruleBasedRhythm: 'Rule-based rhythm',
    horizontalByDefault: 'Horizontal by default',
    decorativeOrSemantic: 'Decorative or semantic',
  },
  horizontal: {
    title: 'Horizontal',
    description: 'The default orientation separates stacked content with explicit semantics.',
  },
  label: {
    title: 'A pause with a purpose',
    description:
      'Give a horizontal rule a short label through children. labelAlign accepts start, center (the default), or end; start and end follow the reading direction. orientation still controls whether the rule is horizontal or vertical.',
  },
  vertical: {
    title: 'Vertical',
    description: 'Vertical separators stretch naturally between adjacent inline items.',
  },
  decorative: {
    title: 'Decorative between content blocks',
    description:
      'Decorative rules remain visual-only when existing structure already conveys separation.',
  },
} as const;

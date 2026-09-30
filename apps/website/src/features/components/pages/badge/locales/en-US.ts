export const badgeEnUS = {
  overview: {
    description:
      'A small count or status marker attached to a host element, with an inline standalone form.',
  },
  facts: {
    forms: 'Forms',
    count: 'Count',
    status: 'Status',
    dot: 'Dot',
    standalone: 'Standalone',
    inline: 'Inline',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    attachedCount: 'Attached count',
    statusDot: 'Status dot',
    inlineMetadata: 'Inline metadata',
  },
  counts: {
    title: 'Counts and overflow',
    description:
      'Numeric counts stay compact, cap at max, and hide zero unless showZero is explicit.',
  },
  status: {
    title: 'Dots and intents',
    description:
      'Meaningful dots use an accessible label; semantic intent never depends on arbitrary colors.',
  },
  composition: {
    title: 'Buttons, icons and standalone badges',
    description:
      'The indicator ignores pointer events, so wrapped controls keep their normal interaction.',
  },
} as const;

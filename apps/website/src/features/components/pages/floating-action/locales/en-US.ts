export const floatingActionEnUS = {
  overview: {
    description:
      'Circular elevated actions, standalone or grouped in an accessible Popover. Positioning belongs to the containing layout.',
  },
  facts: {
    parts: 'Parts',
    states: 'States',
    patterns: 'Patterns',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    buttonSemantics: 'Button semantics',
    circularShape: 'Circular shape',
    tokenElevation: 'Token elevation',
  },
  basic: {
    title: 'Basic',
    description:
      'Standalone actions reuse Virgo Button variants, sizing, keyboard activation and disabled behavior.',
  },
  group: {
    title: 'Button and Popover composition',
    description:
      'Group, Trigger and Content combine circular Button actions with Popover open state, focus handling and dismissal.',
  },
  placement: {
    title: 'Popover placement',
    description:
      'Grouped actions inherit Popover placement. Standalone positioning remains the responsibility of the containing layout.',
  },
} as const;

export const drawerEnUS = {
  overview: {
    description:
      "Open a temporary inspector, settings surface, or secondary example from any screen edge while retaining Dialog's interaction model.",
  },
  facts: {
    placements: 'Placements',
    sizes: 'Sizes',
    default: 'Default',
    right: 'Right',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    dialogBehavior: 'Dialog behavior',
    edgeMotion: 'Edge motion',
    scrollableBody: 'Scrollable body',
  },
  placements: {
    title: 'Placements',
    description:
      'Choose the physical screen edge that best preserves context for the underlying example.',
  },
  sizes: {
    title: 'Sizes',
    description: 'Size controls width for side drawers and height for top or bottom drawers.',
  },
  anatomy: {
    title: 'Header, body and footer',
    description:
      'The body flexes and scrolls independently while header and action regions remain stable.',
  },
  form: {
    title: 'Form content',
    description:
      'Controlled state lets an application validate and save a form before closing the panel.',
  },
  nonModal: {
    title: 'Non-modal drawer',
    description:
      'Use non-modal behavior when the surrounding example must remain directly interactive.',
  },
} as const;

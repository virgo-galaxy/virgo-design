export const toastEnUS = {
  overview: {
    description:
      'Brief feedback that announces itself without interrupting the current task or moving focus.',
  },
  facts: {
    placement: 'Placement',
    priority: 'Priority',
    politeAssertive: 'Polite · Assertive',
    actions: 'Actions',
    optional: 'Optional',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    nonBlockingFeedback: 'Non-blocking feedback',
    semanticStatus: 'Semantic status',
    actionableDismissal: 'Actionable dismissal',
  },
  status: {
    title: 'Status variants',
    description: 'Each intent uses semantic status tokens and an icon from Virgo Icons.',
  },
  stack: {
    title: 'Action and stacking',
    description:
      'Create several notifications. Hover or focus a toast to pause only its remaining duration.',
  },
  placement: {
    title: 'Viewport placement',
    description:
      'Choose a position to show a notification inside the preview canvas. Other examples keep their own viewports and notifications.',
  },
} as const;

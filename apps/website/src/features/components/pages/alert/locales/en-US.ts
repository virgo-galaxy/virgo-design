export const alertEnUS = {
  overview: {
    description:
      'Keep page-level feedback visible in context with semantic intent, structured content, and application-owned actions.',
  },
  facts: {
    intents: 'Intents',
    variants: 'Variants',
    default: 'Default',
    soft: 'Soft',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    persistent: 'Persistent',
    inline: 'Inline',
    themeAware: 'Theme aware',
  },
  intents: {
    title: 'Semantic intents',
    description:
      'Status icons reinforce each semantic treatment without making color the only signal.',
  },
  content: {
    title: 'Content structure',
    description:
      'Use a concise title alone, or add a description when the user needs explanation or recovery guidance.',
  },
  action: {
    title: 'Application action',
    description:
      'Action is a layout slot; the application supplies the control and owns its behavior.',
  },
  close: {
    title: 'Closable',
    description:
      'Close only notifies the owner. This example removes the message in application state and can restore it.',
  },
  customIcon: {
    title: 'Custom icon',
    description: 'Use a custom status icon with semantic colors.',
  },
} as const;

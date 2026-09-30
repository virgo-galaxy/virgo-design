export const switchEnUS = {
  overview: {
    description:
      'Toggles an immediate binary state with a familiar pill control or a more technical console-style fader appearance.',
  },
  facts: {
    appearances: 'Appearances',
    sizes: 'Sizes',
    states: 'States',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    nativeSwitchSemantics: 'Native switch semantics',
  },
  basic: {
    title: 'Basic',
    description:
      'The standard pill switch communicates off and on state through thumb position and brand fill.',
  },
  sizes: {
    title: 'Sizes',
    description:
      'Switch keeps a focused two-size scale: default for normal interfaces and small for dense controls.',
  },
  content: {
    title: 'Content',
    description:
      'Toggle appearance can carry compact decorative cues without changing the accessible switch state.',
  },
  appearances: {
    title: 'Appearance',
    description:
      'The fader keeps native switch semantics while using a thin console rail and a compact sliding control block.',
  },
  disabled: {
    title: 'Disabled',
    description:
      'Disabled preserves off and on state in both visual appearances without introducing another semantic mode.',
  },
} as const;

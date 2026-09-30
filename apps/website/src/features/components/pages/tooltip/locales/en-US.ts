export const tooltipEnUS = {
  overview: {
    description:
      'A little context without interrupting the flow. Hover or focus for a brief description, with twelve positions that stay connected to the control.',
  },
  facts: {
    placement: 'Placement',
    '12Positions': '12 positions',
    trigger: 'Trigger',
    hoverFocus: 'Hover / focus',
    content: 'Content',
    descriptive: 'Descriptive',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    nativeActions: 'Native actions',
    keyboardReady: 'Keyboard ready',
    themeAware: 'Theme aware',
  },
  basic: {
    title: 'Hover & focus',
    description:
      'Hover opens after a short delay. Keyboard focus opens immediately. Escape dismisses and leaves focus on the control.',
  },
  smoothTransition: {
    title: 'Smooth transition',
    description:
      'Smooth transition is enabled for this example. Move between the four buttons to pass the tooltip from one control to the next without a repeated delay or fade.',
  },
  placement: {
    title: 'Placement & arrow',
    description:
      'Twelve physical positions arranged around the trigger area. The arrow follows the trigger center; the panel flips and shifts at viewport edges.',
  },
  tone: {
    title: 'Semantic colors',
    description:
      'Semantic tones pair solid backgrounds with on-solid foregrounds. Custom tones can set both using palette tokens.',
  },
  actions: {
    title: 'Real controls',
    description:
      'Our own Settings icon and Button are used together. The tooltip describes the action; clicking still runs it. The icon button keeps its accessible name.',
  },
  dynamic: {
    title: 'Content & direction',
    description:
      'The first description grows while open to check automatic realignment. The second uses a local RTL direction and logical start alignment.',
  },
  sizes: {
    title: 'Content sizes',
    description:
      'Content size is independent of the trigger button. Medium is unchanged; small is a compact description for toolbars.',
  },
  activation: {
    title: 'Keep feedback on activation',
    description:
      'closeOnClick=false keeps the current tooltip open during activation. Its text changes in place; Escape and leaving hover/focus still dismiss it.',
  },
  cursor: {
    title: 'Cursor integration',
    description:
      'Opt into pointer follow on Cursor.Provider. It owns custom visuals and tracking; ordinary Tooltips follow mouse hover automatically and keep element anchoring for keyboard focus.',
  },
} as const;

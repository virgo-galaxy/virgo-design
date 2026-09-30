export const cursorEnUS = {
  overview: {
    description:
      'A small glass pointer, with context close behind. Scope it to a canvas, an editor, or an entire application.',
  },
  facts: {
    input: 'Input',
    mouseAware: 'Mouse aware',
    visual: 'Visual',
    yoursOrVirgo: 'Yours or Virgo',
    feedback: 'Feedback',
    pointerFollow: 'Pointer follow',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    scopedInput: 'Scoped input',
    customVisuals: 'Custom visuals',
    keyboardReady: 'Keyboard ready',
  },
  lifecycle: {
    title: 'Lifecycle',
    description: 'Cursor owns tracking and visuals. Consumers subscribe to the nearest scope.',
    note: 'Mouse coordinates are coalesced once per animation frame. Leaving the scope, scrolling, window blur, visibility changes, cancellation, route resets and unmount all clear pointer-follow feedback. Touch and pen keep native input behavior, while keyboard Tooltips retain their element anchor and description relationship.',
  },
} as const;

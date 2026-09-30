export const popoverEnUS = {
  overview: {
    description:
      'Open a little more context, right where you need it. Details, forms and actions share a compact panel that stays connected to its trigger.',
  },
  facts: {
    content: 'Content',
    flexible: 'Flexible',
    triggers: 'Triggers',
    '2Modes': '2 modes',
    focus: 'Focus',
    nonModal: 'Non-modal',
  },
  specimen: {
    summary: 'contextual content',
    referenceSpecimen: 'Reference specimen',
    anyContent: 'Any content',
    keyboardReady: 'Keyboard ready',
    themeAware: 'Theme aware',
  },
  triggers: {
    title: 'Click & hover',
    description:
      'Click to focus the panel. Hover offers a quick preview without moving keyboard focus; interactive content stays open while focused.',
  },
  form: {
    title: 'Edit in context',
    description:
      'A controlled panel with a real form. Save updates the workspace name and returns focus to Edit workspace.',
  },
  placement: {
    title: 'Placement & offset',
    description:
      'Twelve physical positions around the trigger area. Panels flip and shift at viewport edges. These examples use a 12px offset and an arrow.',
  },
  nested: {
    title: 'Actions inside a panel',
    description:
      'Open a Dropdown inside the Popover. Escape closes the menu first; selecting an action keeps the parent panel open.',
  },
} as const;

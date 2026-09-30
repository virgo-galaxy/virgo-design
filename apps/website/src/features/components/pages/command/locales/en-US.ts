export const commandEnUS = {
  overview: {
    description:
      'Search application actions, keep focus in one input, and execute the active result.',
  },
  facts: {
    modes: 'Modes',
    inlineDialog: 'Inline · Dialog',
    search: 'Search',
    builtIn: 'Built-in',
    results: 'Results',
    grouped: 'Grouped',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    singleInput: 'Single input',
    groupedResults: 'Grouped results',
    keyboardFirst: 'Keyboard-first',
  },
  inline: {
    title: 'Inline command list',
    description: 'Type settings or home. Arrow keys change the active option; Enter selects it.',
  },
  dialog: {
    title: 'Dialog palette',
    description:
      'Open with the button, or focus this example and press ⌘/Ctrl K. The shortcut does not intercept keys elsewhere on the page.',
  },
  filter: {
    title: 'Custom filter',
    description: 'This list only matches the beginning of each command value.',
  },
} as const;

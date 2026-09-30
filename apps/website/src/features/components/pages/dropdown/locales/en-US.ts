export const dropdownEnUS = {
  overview: {
    description:
      'Keep related actions within reach. Menus open where you need them, with clear choices and familiar keyboard navigation.',
  },
  facts: {
    triggers: 'Triggers',
    hoverClick: 'Hover / click',
    placement: 'Placement',
    '12Positions': '12 positions',
    actions: 'Actions',
    splitButton: 'Split button',
  },
  specimen: {
    summary: 'contextual actions',
    referenceSpecimen: 'Reference specimen',
    virgoIcons: 'Virgo icons',
    keyboardReady: 'Keyboard ready',
    themeAware: 'Theme aware',
  },
  triggers: {
    title: 'Hover & click',
    description:
      'Two activation modes. Disabled items stay unavailable; destructive actions use the danger treatment.',
  },
  placement: {
    title: 'Placement & arrow',
    description:
      'Twelve preferred positions. Menus flip and shift near the viewport edges; the optional arrow follows the trigger.',
  },
  split: {
    title: 'Split buttons & custom triggers',
    description:
      'The main button runs an action. Its adjacent button opens related actions, with a default ellipsis or a custom Virgo icon.',
  },
  controlled: {
    title: 'Controlled & keyboard',
    description:
      'Use Arrow keys, Home, End and typing to navigate. Escape returns focus; Tab continues to the next control.',
  },
  density: {
    title: 'Sizes',
    description:
      'Four trigger sizes with coordinated menu density, using the existing Button and typography tokens.',
  },
} as const;

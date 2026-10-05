export const toolbarEnUS = {
  exampleDescription: 'Independent buttons can change content or open menus.',
  description: 'Groups independent actions and popup triggers without a shared selected value.',
  actions: 'Toolbar actions',
  keyboard:
    'Tab enters and exits; arrow keys, Home and End move between enabled controls. Inputs and open menus keep their own keyboard behavior.',
  composition: 'Composition and existing layouts',
  customLayout:
    'Use layout="custom" with the existing className to keep the current UI unchanged. Use render to reuse a Surface root. Two related actions use Button.Group; a single selected value uses SegmentedControl.',
  export: 'Export',
  theme: 'Toggle theme icon',
  more: 'More actions',
  profile: 'Personal center',
  settings: 'Settings',
} as const;

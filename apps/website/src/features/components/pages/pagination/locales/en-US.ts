export const paginationEnUS = {
  overview: {
    description:
      'Move through a collection at your own pace. Clear page positions, focused navigation, and optional controls that fit the task.',
  },
  facts: {
    alignment: 'Alignment',
    '3Positions': '3 positions',
    options: 'Options',
    '3Controls': '3 controls',
    state: 'State',
    bothModes: 'Both modes',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    currentPage: 'Current page',
    boundedPages: 'Bounded pages',
    quickNavigation: 'Quick navigation',
  },
  basic: {
    title: 'Basic',
    description: 'Five pages, native buttons, and disabled navigation at the first and last page.',
  },
  more: {
    title: 'More pages',
    description:
      'The first and last pages stay visible. Hover or focus an ellipsis to reveal the five-page jump action.',
  },
  size: {
    title: 'Page size',
    description:
      'Show the size menu independently. Virgo Dropdown marks the current size and supports keyboard navigation; changing size returns to page one.',
  },
  jump: {
    title: 'Quick jump',
    description:
      'Enter a page number and press Enter. Out-of-range or nonnumeric input is marked invalid; Escape clears the draft.',
  },
  total: {
    title: 'Total & range',
    description:
      'Display the count by itself, or render the visible item range with the total callback.',
  },
  all: {
    title: 'All options',
    description:
      'showAll enables total, page size and jump together. Each can be overridden independently; this example owns both page and page size.',
  },
  align: {
    title: 'Alignment',
    description: 'Align the whole pagination group to the left, center or right of its container.',
  },
  labels: {
    title: 'Navigation labels',
    description:
      'Replace arrow icons with text, or localize the controls and their accessible names.',
  },
  states: {
    title: 'Disabled & empty',
    description:
      'All controls honor the disabled state. Empty collections keep a stable page-one layout with a zero item range.',
  },
} as const;

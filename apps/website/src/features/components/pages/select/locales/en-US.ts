export const selectEnUS = {
  overview: {
    description:
      'Single or multiple selection through a custom Virgo listbox. Select.Multiple uses checkboxes and removable tags while sharing the same sizes and keyboard navigation.',
  },
  facts: {
    mode: 'Mode',
    sizes: 'Sizes',
    states: 'States',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    '36pxTrigger': '36px trigger',
    radius8: 'Radius 8',
  },
  sizes: {
    title: 'Sizes',
    description:
      'Four trigger heights aligned with Input and Button while the dropdown follows the same density.',
  },
  content: {
    title: 'Content',
    description:
      'Placeholder and selected value share the trigger while the selected option remains the source of display text.',
  },
  states: {
    title: 'States',
    description:
      'Hover and focus remain live; open keeps the trigger highlighted while disabled and invalid use semantic state colors.',
  },
  options: {
    title: 'Options & behavior',
    description:
      'Options support selected, disabled, long-content, pointer, and keyboard interaction in both selection modes.',
  },
} as const;

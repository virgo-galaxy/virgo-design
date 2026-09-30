export const checkboxEnUS = {
  overview: {
    description:
      'Boolean and multi-selection control with a single standard geometry. Built on the native checkbox and extended with mixed and grouped selection.',
  },
  facts: {
    selection: 'Selection',
    disabled: 'Disabled',
    group: 'Group',
    yes: 'Yes',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    '16pxControl': '16px control',
    radius4: 'Radius 4',
  },
  basic: {
    title: 'Basic',
    description:
      'Checkbox uses one standard visual size across unchecked, checked, and mixed selection.',
  },
  disabled: {
    title: 'Disabled',
    description:
      'Disabled preserves unchecked, checked, and mixed selection without introducing a separate visual variant.',
  },
  group: {
    title: 'Group',
    description:
      'Checkbox.Group coordinates multiple values while each checkbox keeps native form semantics.',
  },
  checkAll: {
    title: 'Check all',
    description: 'Indeterminate naturally represents a partially selected group.',
  },
} as const;

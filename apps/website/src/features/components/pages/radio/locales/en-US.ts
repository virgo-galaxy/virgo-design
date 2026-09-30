export const radioEnUS = {
  overview: {
    description:
      'Single-selection control for mutually exclusive choices using standard circular radio controls.',
  },
  facts: {
    orientation: 'Orientation',
    states: 'States',
    selection: 'Selection',
    single: 'Single',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    '16pxControl': '16px control',
    singleSelection: 'Single selection',
  },
  basic: {
    title: 'Basic',
    description:
      'Standard radio controls express one selected value among mutually exclusive choices.',
  },
  orientation: {
    title: 'Orientation',
    description:
      'Radio.Group supports horizontal and vertical option layouts without changing selection semantics.',
  },
  disabled: {
    title: 'Disabled',
    description:
      'Disabled preserves both unselected and selected state without adding another visual mode.',
  },
} as const;

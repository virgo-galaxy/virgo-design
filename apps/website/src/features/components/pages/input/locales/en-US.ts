export const inputEnUS = {
  overview: {
    description:
      'Text-entry family for single-line and multiline content. Built on native Virgo primitives, with decorative content, clearable values, and password reveal calibrated against the same sizing, typography, color, and motion foundations as Button.',
  },
  facts: {
    controls: 'Controls',
    sizes: 'Sizes',
    states: 'States',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    '36pxHeight': '36px height',
    radius8: 'Radius 8',
  },
  sizes: {
    title: 'Sizes',
    description: 'Four control heights aligned with the Virgo sizing foundation and Button scale.',
  },
  content: {
    title: 'Content',
    description:
      'Placeholder and entered value use native input semantics and Virgo body typography.',
  },
  icons: {
    title: 'Prefix and suffix',
    description:
      'Prefix and suffix accept text, units, or icons. Text uses its natural width; icons follow the input size. Decorative slots stay outside the tab order, so include meaningful units in the accessible label.',
  },
  actions: {
    title: 'Actions',
    description:
      'Clearable, password, and numeric inputs add keyboard-accessible actions. Numeric steppers use the native min, max, and step rules.',
  },
  states: {
    title: 'States',
    description:
      'Hover and focus remain live; use Tab or click a field to inspect the focus treatment.',
  },
  textarea: {
    title: 'Textarea',
    description:
      'Multiline text entry shares the Input family state language while keeping native textarea semantics.',
  },
} as const;

export const CHROMATIC_FAMILIES = [
  'red',
  'vermilion',
  'orange',
  'amber',
  'yellow',
  'chartreuse',
  'green',
  'teal',
  'blue',
  'indigo',
  'violet',
  'magenta',
] as const;

export type ColorFamily = (typeof CHROMATIC_FAMILIES)[number];

export const CHROMATIC_FAMILY_COUNT = CHROMATIC_FAMILIES.length;
export const CHROMATIC_HUE_STEP = 360 / CHROMATIC_FAMILY_COUNT;

export const DEFAULT_ANCHOR_FAMILY: ColorFamily = 'blue';

export const DEFAULT_HUE_SPREAD = 1;
export const DEFAULT_DISTRIBUTION_CURVE = 1;

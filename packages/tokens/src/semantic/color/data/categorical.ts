export const categoricalDataColorTokens = {
  1: 'data.categorical.1',
  2: 'data.categorical.2',
  3: 'data.categorical.3',
  4: 'data.categorical.4',
  5: 'data.categorical.5',
  6: 'data.categorical.6',
  7: 'data.categorical.7',
  8: 'data.categorical.8',
  9: 'data.categorical.9',
  10: 'data.categorical.10',
  11: 'data.categorical.11',
  12: 'data.categorical.12',
} as const;

export type CategoricalDataColorRole = keyof typeof categoricalDataColorTokens;

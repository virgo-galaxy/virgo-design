export const sequentialDataColorTokens = {
  1: 'data.sequential.1',
  2: 'data.sequential.2',
  3: 'data.sequential.3',
  4: 'data.sequential.4',
  5: 'data.sequential.5',
  6: 'data.sequential.6',
  7: 'data.sequential.7',
  8: 'data.sequential.8',
  9: 'data.sequential.9',
  10: 'data.sequential.10',
} as const;

export type SequentialDataColorRole = keyof typeof sequentialDataColorTokens;

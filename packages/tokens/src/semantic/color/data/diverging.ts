export const divergingDataColorTokens = {
  negative: {
    strong: 'data.diverging.negative.strong',
    default: 'data.diverging.negative.default',
    subtle: 'data.diverging.negative.subtle',
  },
  neutral: 'data.diverging.neutral',
  positive: {
    subtle: 'data.diverging.positive.subtle',
    default: 'data.diverging.positive.default',
    strong: 'data.diverging.positive.strong',
  },
} as const;

export type DivergingDataDirection = 'negative' | 'positive';
export type DivergingDataStrength = 'strong' | 'default' | 'subtle';

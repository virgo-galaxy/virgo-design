import type { SemanticTypographyToken } from '../../../types/semantic.js';

export const documentHeadingTypography = {
  1: {
    fontFamily: 'sans',
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 1,
  },
  2: {
    fontFamily: 'sans',
    fontSize: 40,
    fontWeight: 600,
    lineHeight: 1,
  },
  3: {
    fontFamily: 'sans',
    fontSize: 32,
    fontWeight: 600,
    lineHeight: 2,
  },
  4: {
    fontFamily: 'sans',
    fontSize: 28,
    fontWeight: 600,
    lineHeight: 2,
  },
  5: {
    fontFamily: 'sans',
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 2,
  },
  6: {
    fontFamily: 'sans',
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 2,
  },
} as const satisfies Record<1 | 2 | 3 | 4 | 5 | 6, SemanticTypographyToken>;

import type { SemanticTypographyToken } from '../../../types/semantic.js';

export const documentBodyTypography = {
  large: {
    fontFamily: 'sans',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 4,
  },
  medium: {
    fontFamily: 'sans',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 4,
  },
  small: {
    fontFamily: 'sans',
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 4,
  },
} as const satisfies Record<'large' | 'medium' | 'small', SemanticTypographyToken>;

import type { SemanticTypographyToken } from '../../../types/semantic.js';

export const uiBodyTypography = {
  large: {
    fontFamily: 'sans',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 3,
  },
  medium: {
    fontFamily: 'sans',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 3,
  },
  small: {
    fontFamily: 'sans',
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 3,
  },
} as const satisfies Record<'large' | 'medium' | 'small', SemanticTypographyToken>;

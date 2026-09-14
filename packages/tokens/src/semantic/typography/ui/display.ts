import type { SemanticTypographyToken } from '../../../types/semantic.js';

export const uiDisplayTypography = {
  large: {
    fontFamily: 'sans',
    fontSize: 40,
    fontWeight: 700,
    lineHeight: 1,
  },
  medium: {
    fontFamily: 'sans',
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 1,
  },
  small: {
    fontFamily: 'sans',
    fontSize: 28,
    fontWeight: 600,
    lineHeight: 2,
  },
} as const satisfies Record<'large' | 'medium' | 'small', SemanticTypographyToken>;

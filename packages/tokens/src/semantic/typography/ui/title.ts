import type { SemanticTypographyToken } from '../../../types/semantic.js';

export const uiTitleTypography = {
  large: {
    fontFamily: 'sans',
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 2,
  },
  medium: {
    fontFamily: 'sans',
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 2,
  },
  small: {
    fontFamily: 'sans',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 2,
  },
} as const satisfies Record<'large' | 'medium' | 'small', SemanticTypographyToken>;

import type { SemanticTypographyToken } from '../../../types/semantic.js';

export const documentTitleTypography = {
  large: {
    fontFamily: 'sans',
    fontSize: 64,
    fontWeight: 700,
    lineHeight: 1,
  },
  medium: {
    fontFamily: 'sans',
    fontSize: 56,
    fontWeight: 700,
    lineHeight: 1,
  },
} as const satisfies Record<'large' | 'medium', SemanticTypographyToken>;

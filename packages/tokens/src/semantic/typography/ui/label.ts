import type { SemanticTypographyToken } from '../../../types/semantic.js';

export const uiLabelTypography = {
  medium: {
    fontFamily: 'sans',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 2,
  },
  small: {
    fontFamily: 'sans',
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 2,
  },
} as const satisfies Record<'medium' | 'small', SemanticTypographyToken>;

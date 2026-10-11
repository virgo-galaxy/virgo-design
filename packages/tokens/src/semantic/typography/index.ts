import { documentTypography } from './document/index.js';
import { uiTypography } from './ui/index.js';

export type { ResolvedTypographyStyle, SemanticTypographyToken } from '../../types/semantic.js';
export { resolveTypography } from './resolve.js';

export const typography = {
  document: documentTypography,
  ui: uiTypography,
  code: {
    body: { fontFamily: 'mono', fontSize: 14, fontWeight: 400, lineHeight: 3 },
    caption: { fontFamily: 'mono', fontSize: 12, fontWeight: 400, lineHeight: 3 },
  },
} as const;

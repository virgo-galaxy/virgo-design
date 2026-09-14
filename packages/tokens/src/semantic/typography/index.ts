import { documentTypography } from './document/index.js';
import { uiTypography } from './ui/index.js';

export type { ResolvedTypographyStyle, SemanticTypographyToken } from '../../types/semantic.js';
export { resolveTypography } from './resolve.js';

export const typography = {
  document: documentTypography,
  ui: uiTypography,
} as const;

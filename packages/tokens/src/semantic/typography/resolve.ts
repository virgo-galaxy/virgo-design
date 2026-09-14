import {
  fontFamily,
  fontSize,
  fontWeight,
  internationalSans,
  lineHeight,
  sansLocaleMapping,
} from '../../foundations/typography.js';
import type { ResolvedTypographyStyle, SemanticTypographyToken } from '../../types/semantic.js';

function resolveFontFamily(token: SemanticTypographyToken, locale: string): string {
  if (token.fontFamily !== 'sans') {
    return fontFamily[token.fontFamily];
  }

  const sansRole = sansLocaleMapping[locale as keyof typeof sansLocaleMapping] ?? 'latin';
  return internationalSans[sansRole].family;
}

export function resolveTypography(
  token: SemanticTypographyToken,
  locale = 'en',
): ResolvedTypographyStyle {
  return {
    fontFamily: resolveFontFamily(token, locale),
    fontSize: fontSize[token.fontSize],
    fontWeight: fontWeight[token.fontWeight],
    lineHeight: lineHeight[token.lineHeight],
  };
}

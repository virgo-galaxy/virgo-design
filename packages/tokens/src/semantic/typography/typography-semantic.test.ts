import { describe, expect, expectTypeOf, it } from 'vitest';

import {
  fontFamily,
  fontSize,
  fontWeight,
  internationalSans,
  lineHeight,
} from '../../foundations/typography.js';
import type {
  ResolvedTypographyStyle as RootResolvedTypographyStyle,
  SemanticTypographyToken as RootSemanticTypographyToken,
} from '../../index.js';
import * as rootTokens from '../../index.js';
import type {
  ResolvedTypographyStyle as SubpathResolvedTypographyStyle,
  SemanticTypographyToken as SubpathSemanticTypographyToken,
} from './index.js';
import * as typographyPublicApi from './index.js';

const { resolveTypography, typography } = typographyPublicApi;

const internalExportNames = [
  'documentTitleTypography',
  'documentHeadingTypography',
  'documentBodyTypography',
  'documentCaptionTypography',
  'documentTypography',
  'uiDisplayTypography',
  'uiTitleTypography',
  'uiBodyTypography',
  'uiLabelTypography',
  'uiMetaTypography',
  'uiTypography',
] as const;

const expectedDocumentTypography = {
  title: {
    large: { fontFamily: 'sans', fontSize: 64, fontWeight: 700, lineHeight: 1 },
    medium: { fontFamily: 'sans', fontSize: 56, fontWeight: 700, lineHeight: 1 },
  },
  heading: {
    1: { fontFamily: 'sans', fontSize: 48, fontWeight: 600, lineHeight: 1 },
    2: { fontFamily: 'sans', fontSize: 40, fontWeight: 600, lineHeight: 1 },
    3: { fontFamily: 'sans', fontSize: 32, fontWeight: 600, lineHeight: 2 },
    4: { fontFamily: 'sans', fontSize: 28, fontWeight: 600, lineHeight: 2 },
    5: { fontFamily: 'sans', fontSize: 24, fontWeight: 600, lineHeight: 2 },
    6: { fontFamily: 'sans', fontSize: 20, fontWeight: 600, lineHeight: 2 },
  },
  body: {
    large: { fontFamily: 'sans', fontSize: 16, fontWeight: 400, lineHeight: 4 },
    medium: { fontFamily: 'sans', fontSize: 14, fontWeight: 400, lineHeight: 4 },
    small: { fontFamily: 'sans', fontSize: 13, fontWeight: 400, lineHeight: 4 },
  },
  caption: { fontFamily: 'sans', fontSize: 12, fontWeight: 400, lineHeight: 3 },
} as const;

const expectedUiTypography = {
  display: {
    large: { fontFamily: 'sans', fontSize: 40, fontWeight: 700, lineHeight: 1 },
    medium: { fontFamily: 'sans', fontSize: 32, fontWeight: 700, lineHeight: 1 },
    small: { fontFamily: 'sans', fontSize: 28, fontWeight: 600, lineHeight: 2 },
  },
  title: {
    large: { fontFamily: 'sans', fontSize: 24, fontWeight: 600, lineHeight: 2 },
    medium: { fontFamily: 'sans', fontSize: 20, fontWeight: 600, lineHeight: 2 },
    small: { fontFamily: 'sans', fontSize: 16, fontWeight: 600, lineHeight: 2 },
  },
  body: {
    large: { fontFamily: 'sans', fontSize: 16, fontWeight: 400, lineHeight: 3 },
    medium: { fontFamily: 'sans', fontSize: 14, fontWeight: 400, lineHeight: 3 },
    small: { fontFamily: 'sans', fontSize: 13, fontWeight: 400, lineHeight: 3 },
  },
  label: {
    medium: { fontFamily: 'sans', fontSize: 14, fontWeight: 500, lineHeight: 2 },
    small: { fontFamily: 'sans', fontSize: 13, fontWeight: 500, lineHeight: 2 },
  },
  meta: { fontFamily: 'sans', fontSize: 12, fontWeight: 400, lineHeight: 3 },
} as const;

function flattenTypographyTokens() {
  return [
    ...Object.values(typography.document.title),
    ...Object.values(typography.document.heading),
    ...Object.values(typography.document.body),
    typography.document.caption,
    ...Object.values(typography.ui.display),
    ...Object.values(typography.ui.title),
    ...Object.values(typography.ui.body),
    ...Object.values(typography.ui.label),
    typography.ui.meta,
  ];
}

function documentTypographyTokens() {
  return [
    ...Object.values(typography.document.title),
    ...Object.values(typography.document.heading),
    ...Object.values(typography.document.body),
    typography.document.caption,
  ];
}

function uiTypographyTokens() {
  return [
    ...Object.values(typography.ui.display),
    ...Object.values(typography.ui.title),
    ...Object.values(typography.ui.body),
    ...Object.values(typography.ui.label),
    typography.ui.meta,
  ];
}

describe('Semantic Typography', () => {
  it('exposes only the canonical runtime API from the typography subpath', () => {
    expect(Object.keys(typographyPublicApi).sort()).toEqual(['resolveTypography', 'typography']);
    expect(rootTokens.typography).toBe(typography);
    expect(rootTokens.resolveTypography).toBe(resolveTypography);

    for (const exportName of internalExportNames) {
      expect(exportName in typographyPublicApi).toBe(false);
      expect(exportName in rootTokens).toBe(false);
    }

    expectTypeOf<RootSemanticTypographyToken>().toEqualTypeOf<SubpathSemanticTypographyToken>();
    expectTypeOf<RootResolvedTypographyStyle>().toEqualTypeOf<SubpathResolvedTypographyStyle>();
  });

  it('exports all 24 approved role references from the canonical typography object', () => {
    expect(typography.document).toEqual(expectedDocumentTypography);
    expect(typography.ui).toEqual(expectedUiTypography);
    expect(documentTypographyTokens()).toHaveLength(12);
    expect(uiTypographyTokens()).toHaveLength(12);
    expect(flattenTypographyTokens()).toHaveLength(24);
  });

  it('uses the final medium, meta, and caption names without legacy aliases', () => {
    expect(typography.document.body.medium).toBeDefined();
    expect('default' in typography.document.body).toBe(false);
    expect(typography.ui.body.medium).toBeDefined();
    expect('default' in typography.ui.body).toBe(false);
    expect(typography.ui.label.medium).toBeDefined();
    expect('default' in typography.ui.label).toBe(false);
    expect(typography.ui.meta).toBeDefined();
    expect('caption' in typography.ui).toBe(false);
    expect(typography.document.caption).toBeDefined();
  });

  it('keeps every role as a four-field Foundation reference', () => {
    for (const token of flattenTypographyTokens()) {
      expect(Object.keys(token).sort()).toEqual([
        'fontFamily',
        'fontSize',
        'fontWeight',
        'lineHeight',
      ]);
      expect('letterSpacing' in token).toBe(false);
    }
  });

  it.each([
    ['en', internationalSans.latin.family],
    ['zh-CN', internationalSans.zhHans.family],
    ['zh-TW', internationalSans.zhHantTW.family],
    ['zh-HK', internationalSans.zhHantHK.family],
    ['ja', internationalSans.ja.family],
    ['ko', internationalSans.ko.family],
  ])('resolves the sans stack for %s', (locale, expectedFamily) => {
    expect(resolveTypography(typography.document.body.medium, locale)).toEqual({
      fontFamily: expectedFamily,
      fontSize: fontSize[14],
      fontWeight: fontWeight[400],
      lineHeight: lineHeight[4],
    });
  });

  it('defaults to English and leaves non-sans roles locale-independent', () => {
    expect(resolveTypography(typography.ui.meta).fontFamily).toBe(internationalSans.latin.family);

    const monoToken: SubpathSemanticTypographyToken = {
      ...typography.ui.meta,
      fontFamily: 'mono',
    };

    expect(resolveTypography(monoToken, 'zh-CN').fontFamily).toBe(fontFamily.mono);
  });
});

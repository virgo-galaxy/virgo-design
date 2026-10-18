import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const distributionSummary = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-12'],
  marginBlockEnd: tokens['--vd-spacing-20'],
});

export const distributionBar = style({
  display: 'flex',
  gap: '3px',
  height: tokens['--vd-spacing-8'],
  overflow: 'hidden',
  borderRadius: 'var(--vd-shape-radius-4, var(--vd-radius-4))',
  marginBlockEnd: tokens['--vd-spacing-24'],
});

export const distributionList = style({
  display: 'grid',
  gap: tokens['--vd-spacing-16'],
});

export const distributionProgress = style({
  selectors: {
    '&[data-series="1"]': {
      vars: {
        '--progress-indicator': tokens['--vd-data-categorical-1'],
      },
    },
    '&[data-series="2"]': {
      vars: {
        '--progress-indicator': tokens['--vd-data-categorical-2'],
      },
    },
    '&[data-series="3"]': {
      vars: {
        '--progress-indicator': tokens['--vd-data-categorical-3'],
      },
    },
    '&[data-series="4"]': {
      vars: {
        '--progress-indicator': tokens['--vd-data-categorical-4'],
      },
    },
  },
});

export const distributionLabel = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: tokens['--vd-spacing-8'],
  marginBlockEnd: tokens['--vd-spacing-8'],
  fontSize: tokens['--vd-font-size-12'],
});

export const distributionShare = style({
  display: 'block',
  marginBlockStart: tokens['--vd-spacing-4'],
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-10'],
});

globalStyle(`${distributionSummary} strong`, {
  fontFamily: tokens['--vd-font-family-mono'],
  fontSize: tokens['--vd-font-size-40'],
  lineHeight: tokens['--vd-line-height-1'],
  fontWeight: tokens['--vd-font-weight-500'],
  letterSpacing: '-1px',
});

globalStyle(`${distributionSummary} span`, {
  fontSize: tokens['--vd-font-size-11'],
  lineHeight: tokens['--vd-line-height-4'],
  color: tokens['--vd-text-tertiary'],
});

globalStyle(`${distributionLabel} span`, {
  display: 'flex',
  gap: tokens['--vd-spacing-8'],
  alignItems: 'center',
});

globalStyle(`${distributionLabel} i`, {
  width: '6px',
  height: '6px',
  borderRadius: 'var(--vd-shape-radius-4, var(--vd-radius-4))',
});

globalStyle(`${distributionLabel} strong`, {
  fontFamily: tokens['--vd-font-family-mono'],
  fontWeight: tokens['--vd-font-weight-500'],
});

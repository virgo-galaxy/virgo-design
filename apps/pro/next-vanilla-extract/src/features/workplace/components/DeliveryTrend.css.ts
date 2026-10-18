import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const trendCard = style({
  selectors: {
    '&[data-size=md]': {
      alignContent: 'start',
      vars: {
        '--card-padding': tokens['--vd-spacing-20'],
        '--card-title-font-size': tokens['--vd-font-size-14'],
        '--card-gap': tokens['--vd-spacing-20'],
      },
    },
  },
});

export const panelHeader = style({
  flexWrap: 'wrap',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: tokens['--vd-spacing-12'],
  '@media': {
    '(max-width: 640px)': {
      flexWrap: 'wrap',
    },
  },
});

export const trendSummary = style({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-12'],
  marginBlockEnd: tokens['--vd-spacing-16'],
  '@media': {
    '(max-width: 640px)': {
      flexWrap: 'wrap',
    },
  },
});

export const trendRatio = style({});

globalStyle(`${trendSummary} > div:first-child`, {
  display: 'flex',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  gap: tokens['--vd-spacing-8'],
});

globalStyle(`${trendSummary} strong`, {
  fontFamily: tokens['--vd-font-family-mono'],
  fontSize: tokens['--vd-font-size-32'],
  lineHeight: tokens['--vd-line-height-1'],
  fontWeight: tokens['--vd-font-weight-500'],
  letterSpacing: '-1px',
});

globalStyle(`${trendSummary} span`, {
  fontSize: tokens['--vd-font-size-12'],
  color: tokens['--vd-text-tertiary'],
});

globalStyle(`${trendSummary} ${trendRatio}`, {
  marginInlineStart: tokens['--vd-spacing-4'],
  color: tokens['--vd-status-success-text'],
  fontFamily: tokens['--vd-font-family-mono'],
  fontSize: tokens['--vd-font-size-11'],
});

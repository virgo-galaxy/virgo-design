import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const trendSummary = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: tokens['--vd-spacing-8'],
  padding: 'var(--vd-spacing-8) var(--vd-spacing-24) var(--vd-spacing-12)',
});

globalStyle(`${trendSummary} strong`, {
  fontSize: tokens['--vd-font-size-28'],
  fontWeight: 600,
  fontVariantNumeric: 'tabular-nums',
});

globalStyle(`${trendSummary} span`, {
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-12'],
});

globalStyle(`${trendSummary} em`, {
  fontStyle: 'normal',
  fontSize: tokens['--vd-font-size-11'],
  color: tokens['--vd-status-success-text'],
  marginLeft: tokens['--vd-spacing-8'],
});

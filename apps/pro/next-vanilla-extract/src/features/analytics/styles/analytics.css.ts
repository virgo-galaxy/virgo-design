import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const panel = style({});

export const chartBody = style({
  padding: 'var(--vd-spacing-8) var(--vd-spacing-20) var(--vd-spacing-20)',
  minWidth: 0,
  '@media': {
    '(max-width: 640px)': {
      paddingInline: tokens['--vd-spacing-12'],
    },
  },
});

globalStyle(`${panel} > div:first-child`, {
  borderBottom: 0,
  paddingBottom: tokens['--vd-spacing-8'],
});

import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const metrics = style({
  padding: tokens['--vd-spacing-20'],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-24'],
  '@media': {
    '(max-width: 1050px)': {
      gap: tokens['--vd-spacing-16'],
    },
    '(max-width: 640px)': {
      padding: tokens['--vd-spacing-16'],
    },
  },
});

export const caption = style({
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-11'],
});

export const metricGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: tokens['--vd-spacing-32'],
  width: '100%',
  '@media': {
    '(max-width: 760px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: tokens['--vd-spacing-20'],
    },
  },
});

globalStyle(`${metrics} > ${caption}`, {
  '@media': {
    '(max-width: 1050px)': {
      display: 'none',
    },
  },
});

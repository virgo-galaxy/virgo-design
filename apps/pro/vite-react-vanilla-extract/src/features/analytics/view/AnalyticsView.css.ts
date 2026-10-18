import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const page = style({
  display: 'grid',
  gap: tokens['--vd-spacing-20'],
  minWidth: 0,
  '@media': {
    '(max-width: 640px)': {
      gap: tokens['--vd-spacing-16'],
    },
  },
});

export const heading = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-16'],
  '@media': {
    '(max-width: 640px)': {
      alignItems: 'flex-start',
      flexDirection: 'column',
      gap: tokens['--vd-spacing-8'],
    },
  },
});

export const mainRow = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.65fr) minmax(0, 1fr)',
  gap: tokens['--vd-spacing-20'],
  '@media': {
    '(max-width: 1000px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const detailRow = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.65fr) minmax(0, 1fr)',
  gap: tokens['--vd-spacing-20'],
  '@media': {
    '(max-width: 1000px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

globalStyle(`${heading} h1`, {
  margin: 0,
  fontSize: tokens['--vd-font-size-20'],
  fontWeight: 600,
});

globalStyle(`${heading} p`, {
  margin: 'var(--vd-spacing-4) 0 0',
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-12'],
});

globalStyle(`${heading} > span`, {
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-12'],
  whiteSpace: 'nowrap',
});

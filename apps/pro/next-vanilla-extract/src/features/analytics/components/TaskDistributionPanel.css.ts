import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const distribution = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
  alignItems: 'center',
  gap: tokens['--vd-spacing-12'],
  padding: 'var(--vd-spacing-16) var(--vd-spacing-24) var(--vd-spacing-24)',
  minHeight: '310px',
  '@media': {
    '(max-width: 1400px)': {
      gridTemplateColumns: '1fr',
      gap: 0,
      paddingTop: 0,
    },
    '(max-width: 1000px)': {
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
    },
    '(max-width: 640px)': {
      paddingInline: tokens['--vd-spacing-16'],
      gap: tokens['--vd-spacing-8'],
      minHeight: '250px',
    },
  },
});

export const distributionList = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'grid',
  gap: tokens['--vd-spacing-20'],
  '@media': {
    '(max-width: 1400px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: tokens['--vd-spacing-16'],
    },
    '(max-width: 1000px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

globalStyle(`${distributionList} li`, {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto 38px',
  gap: tokens['--vd-spacing-12'],
  alignItems: 'center',
  fontSize: tokens['--vd-font-size-12'],
});

globalStyle(`${distributionList} span`, {
  display: 'flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-8'],
  color: tokens['--vd-text-secondary'],
});

globalStyle(`${distributionList} i`, {
  width: '7px',
  height: '7px',
  borderRadius: '50%',
  flex: 'none',
});

globalStyle(`${distributionList} strong`, {
  fontWeight: 500,
  fontVariantNumeric: 'tabular-nums',
});

globalStyle(`${distributionList} small`, {
  textAlign: 'right',
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-11'],
});

globalStyle(`${distributionList} li`, {
  '@media': {
    '(max-width: 1400px)': {
      gridTemplateColumns: 'minmax(0, 1fr) auto',
      gap: tokens['--vd-spacing-8'],
    },
  },
});

globalStyle(`${distributionList} small`, {
  '@media': {
    '(max-width: 1400px)': {
      display: 'none',
    },
  },
});

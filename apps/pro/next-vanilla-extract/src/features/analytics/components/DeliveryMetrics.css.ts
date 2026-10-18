import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const metrics = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: tokens['--vd-spacing-16'],
  '@media': {
    '(max-width: 1400px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    '(max-width: 640px)': {
      gap: tokens['--vd-spacing-12'],
    },
  },
});

export const metric = style({
  display: 'flex',
  alignItems: 'center',
  minWidth: 0,
  minHeight: '144px',
  padding: tokens['--vd-spacing-20'],
  gap: tokens['--vd-spacing-12'],
  vars: {
    '--metric-color': tokens['--vd-data-categorical-1'],
  },
  background:
    'linear-gradient(135deg, color-mix(in srgb, var(--metric-color) 6%, var(--vd-surface-default)), color-mix(in srgb, var(--metric-color) 11%, var(--vd-surface-default)))',
  selectors: {
    '&[data-metric=throughput]': {
      vars: {
        '--metric-color': tokens['--vd-data-categorical-3'],
      },
    },
    '&[data-metric=attainment]': {
      vars: {
        '--metric-color': tokens['--vd-data-categorical-6'],
      },
    },
    '&[data-metric=momentum]': {
      vars: {
        '--metric-color': tokens['--vd-data-categorical-8'],
      },
    },
  },
  '@media': {
    '(max-width: 640px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
      minHeight: '180px',
      padding: tokens['--vd-spacing-16'],
      gap: tokens['--vd-spacing-4'],
    },
  },
});

export const metricCopy = style({
  flex: 'none',
  maxWidth: '60%',
  display: 'grid',
  gap: tokens['--vd-spacing-8'],
  '@media': {
    '(max-width: 640px)': {
      maxWidth: 'none',
      gap: tokens['--vd-spacing-6'],
    },
  },
});

export const microChart = style({
  flex: '1',
  minWidth: 0,
  '@media': {
    '(max-width: 640px)': {
      width: '100%',
      flex: 'none',
    },
  },
});

globalStyle(`${metricCopy} h2`, {
  margin: 0,
  fontSize: tokens['--vd-font-size-12'],
  fontWeight: 500,
  color: tokens['--vd-text-secondary'],
});

globalStyle(`${metricCopy} [data-slot=value]`, {
  fontFamily: tokens['--vd-font-family-sans'],
  fontSize: tokens['--vd-font-size-28'],
  fontWeight: 600,
  lineHeight: 1.2,
  letterSpacing: '-0.6px',
  fontVariantNumeric: 'tabular-nums',
});

globalStyle(`${metricCopy} > span`, {
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-11'],
});

globalStyle(`${metricCopy} [data-slot=value]`, {
  '@media': {
    '(max-width: 640px)': {
      fontSize: tokens['--vd-font-size-24'],
    },
  },
});

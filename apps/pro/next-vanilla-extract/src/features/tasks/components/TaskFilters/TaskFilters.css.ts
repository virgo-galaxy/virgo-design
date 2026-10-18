import { style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const filterToolbar = style({
  padding: tokens['--vd-spacing-20'],
  borderBottom: 'var(--vd-stroke-width, var(--vd-border-width-1)) solid var(--vd-border-subtle)',
  '@media': {
    '(max-width: 640px)': {
      padding: tokens['--vd-spacing-16'],
    },
  },
});

export const filterGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: tokens['--vd-spacing-16'],
  '@media': {
    '(max-width: 850px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    '(max-width: 640px)': {
      gap: tokens['--vd-spacing-12'],
    },
    '(max-width: 480px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
});

export const filterLabel = style({
  fontSize: tokens['--vd-font-size-11'],
  color: tokens['--vd-text-secondary'],
});

export const queryActions = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: tokens['--vd-spacing-12'],
  marginTop: tokens['--vd-spacing-20'],
});

export const queryHint = style({
  marginInlineEnd: 'auto',
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-11'],
});

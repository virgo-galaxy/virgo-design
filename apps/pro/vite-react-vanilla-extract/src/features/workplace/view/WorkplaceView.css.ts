import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const workplace = style({
  display: 'grid',
  gap: tokens['--vd-spacing-24'],
  '@media': {
    '(max-width: 640px)': {
      gap: tokens['--vd-spacing-20'],
    },
  },
});

export const welcomeDot = style({
  color: tokens['--vd-brand-primary'],
});

export const welcome = style({});

export const workspaceGrid = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) 288px',
  gap: tokens['--vd-spacing-20'],
  alignItems: 'start',
  transition:
    'grid-template-columns var(--vd-motion-state-duration, var(--vd-duration-180)) var(--vd-motion-easing-standard, var(--vd-easing-standard)), column-gap var(--vd-motion-state-duration, var(--vd-duration-180)) var(--vd-motion-easing-standard, var(--vd-easing-standard))',
  selectors: {
    '&[data-aside-hidden=true]': {
      '@media': {
        '(min-width: 1201px)': {
          gridTemplateColumns: 'minmax(0, 1fr) 0px',
          columnGap: 0,
        },
      },
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
    '(min-width: 1680px)': {
      gridTemplateColumns: 'minmax(0, 1fr) 320px',
    },
    '(max-width: 1200px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
});

export const primaryColumn = style({
  display: 'grid',
  gap: tokens['--vd-spacing-20'],
  minWidth: 0,
  containerType: 'inline-size',
});

export const secondaryColumn = style({
  display: 'grid',
  gap: 0,
  minWidth: 0,
  '@media': {
    '(max-width: 1200px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      alignItems: 'start',
    },
    '(max-width: 850px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    '(max-width: 640px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
});

export const shortcuts = style({
  display: 'grid',
  gap: tokens['--vd-spacing-4'],
});

export const overviewPanels = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) min(48%, 560px)',
  gap: tokens['--vd-spacing-20'],
  '@container': {
    '(max-width: 720px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
});

globalStyle(`${welcome} [data-slot=page-heading]`, {
  '@media': {
    '(max-width: 640px)': {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
});

globalStyle(`${welcome} [data-slot=page-heading] > div:last-child`, {
  '@media': {
    '(max-width: 640px)': {
      width: 'auto',
    },
  },
});

globalStyle(`${workspaceGrid}[data-aside-hidden=true] ${secondaryColumn}`, {
  display: 'none',
});

globalStyle(`${overviewPanels} > *`, {
  minWidth: 0,
});

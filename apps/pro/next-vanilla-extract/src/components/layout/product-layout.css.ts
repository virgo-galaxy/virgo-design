import { style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const page = style({
  display: 'grid',
  gap: tokens['--vd-spacing-20'],
  minWidth: 0,
});

export const eyebrow = style({
  color: tokens['--vd-text-tertiary'],
  font: 'var(--vd-font-size-10) var(--vd-font-family-mono)',
  letterSpacing: '1px',
});

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: tokens['--vd-spacing-8'],
});

export const caption = style({
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-11'],
});

export const toolbar = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: tokens['--vd-spacing-12'],
  padding: 'var(--vd-spacing-16) var(--vd-spacing-20)',
  '@media': {
    '(max-width: 640px)': {
      padding: tokens['--vd-spacing-16'],
    },
  },
});

export const search = style({
  width: '100%',
  maxWidth: '370px',
  '@media': {
    '(max-width: 640px)': {
      maxWidth: 'none',
    },
  },
});

export const count = style({
  marginInlineStart: 'auto',
  color: tokens['--vd-text-tertiary'],
  font: 'var(--vd-font-size-11) var(--vd-font-family-mono)',
  '@media': {
    '(max-width: 640px)': {
      marginInlineStart: 0,
    },
  },
});

export const body = style({
  padding: tokens['--vd-spacing-20'],
  '@media': {
    '(max-width: 640px)': {
      padding: tokens['--vd-spacing-16'],
    },
  },
});

export const stack = style({
  display: 'grid',
  gap: tokens['--vd-spacing-20'],
  minWidth: 0,
});

export const twoColumns = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.8fr) minmax(280px, 1fr)',
  gap: tokens['--vd-spacing-20'],
  alignItems: 'start',
  '@media': {
    '(max-width: 1050px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
});

export const footer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-12'],
  flexWrap: 'wrap',
  padding: 'var(--vd-spacing-16) var(--vd-spacing-20)',
  borderTop: '1px solid var(--vd-border-subtle)',
  fontSize: tokens['--vd-font-size-11'],
  color: tokens['--vd-text-tertiary'],
  '@media': {
    '(max-width: 640px)': {
      padding: tokens['--vd-spacing-16'],
    },
  },
});

export const link = style({
  color: tokens['--vd-brand-link'],
  textDecoration: 'none',
  selectors: {
    '&:hover': {
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
    },
    '&:focus-visible': {
      outline: '2px solid var(--vd-brand-link)',
      outlineOffset: '4px',
      borderRadius: '2px',
    },
  },
});

export const mono = style({
  fontFamily: tokens['--vd-font-family-mono'],
  fontSize: tokens['--vd-font-size-11'],
  color: tokens['--vd-text-tertiary'],
});

export const srOnly = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
});

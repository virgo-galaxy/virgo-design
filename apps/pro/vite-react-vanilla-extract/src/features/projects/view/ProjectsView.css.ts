import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const filters = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 230px))',
  gap: tokens['--vd-spacing-16'],
  padding: '0 var(--vd-spacing-20) var(--vd-spacing-20)',
  '@media': {
    '(max-width: 640px)': {
      padding: '0 var(--vd-spacing-16) var(--vd-spacing-16)',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    '(max-width: 480px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
});

export const projectGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: tokens['--vd-spacing-20'],
  padding: '0 var(--vd-spacing-20) var(--vd-spacing-20)',
  alignItems: 'stretch',
  '@media': {
    '(max-width: 760px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
    '(max-width: 640px)': {
      padding: '0 var(--vd-spacing-16) var(--vd-spacing-16)',
    },
  },
});

export const projectCard = style({
  padding: tokens['--vd-spacing-20'],
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  transition:
    'box-shadow var(--vd-motion-interaction-duration, var(--vd-duration-120)) var(--vd-motion-easing-standard, var(--vd-easing-standard))',
  selectors: {
    '&:hover': {
      boxShadow: tokens['--vd-elevation-1'],
    },
    '&:focus-within': {
      boxShadow: tokens['--vd-elevation-1'],
    },
  },
  '@media': {
    '(max-width: 640px)': {
      padding: tokens['--vd-spacing-16'],
    },
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

export const cardHeading = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: tokens['--vd-spacing-12'],
});

export const projectCode = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-8'],
  color: tokens['--vd-text-tertiary'],
  font: 'var(--vd-font-size-10) var(--vd-font-family-mono)',
});

export const owner = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: 'var(--vd-spacing-20) 0',
  gap: tokens['--vd-spacing-12'],
});

export const progressLabel = style({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: tokens['--vd-font-size-11'],
  marginBottom: tokens['--vd-spacing-8'],
  color: tokens['--vd-text-secondary'],
});

export const projectStats = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  margin: 'var(--vd-spacing-20) 0',
  gap: tokens['--vd-spacing-12'],
});

export const schedule = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-12'],
  fontSize: tokens['--vd-font-size-11'],
  color: tokens['--vd-text-secondary'],
});

export const completion = style({
  paddingTop: tokens['--vd-spacing-8'],
});

export const cardActions = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: tokens['--vd-spacing-16'],
  borderTop: '1px solid var(--vd-border-subtle)',
  paddingTop: tokens['--vd-spacing-16'],
  marginTop: tokens['--vd-spacing-16'],
  fontSize: tokens['--vd-font-size-12'],
});

globalStyle(`${projectCard} h3`, {
  margin: 'var(--vd-spacing-16) 0 var(--vd-spacing-6)',
  fontSize: tokens['--vd-font-size-20'],
  fontWeight: 600,
});

globalStyle(`${projectCard} h3 a`, {
  color: tokens['--vd-text-primary'],
});

globalStyle(`${projectCard} > p`, {
  margin: 0,
  fontSize: tokens['--vd-font-size-12'],
  color: tokens['--vd-text-secondary'],
});

globalStyle(`${projectCode} i`, {
  width: '8px',
  height: '8px',
  borderRadius: '2px',
});

globalStyle(`${progressLabel} strong`, {
  fontFamily: tokens['--vd-font-family-mono'],
  color: tokens['--vd-text-primary'],
});

globalStyle(`${projectStats} dt`, {
  fontSize: tokens['--vd-font-size-11'],
  color: tokens['--vd-text-tertiary'],
});

globalStyle(`${projectStats} dd`, {
  margin: 'var(--vd-spacing-4) 0 0',
  font: 'var(--vd-font-size-20) var(--vd-font-family-mono)',
});

globalStyle(`${projectStats} dd span`, {
  fontSize: tokens['--vd-font-size-10'],
  color: tokens['--vd-text-tertiary'],
});

globalStyle(`${owner} > span:last-child`, {
  '@media': {
    '(max-width: 640px)': {
      display: 'none',
    },
  },
});

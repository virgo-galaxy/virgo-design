import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const page = style({
  display: 'grid',
  gap: '20px',
  minWidth: 0,
});

export const filters = style({
  padding: '20px',
});

export const panel = style({
  display: 'grid',
  gap: '20px',
  padding: '20px',
  minWidth: 0,
  background: 'var(--vd-overlay-background, #fff)',
  boxShadow:
    'var(--vd-panel-shadow, 0 4px 18px color-mix(in srgb, var(--vd-text-primary) 5%, transparent))',
});

export const cards = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
  gap: '20px',
  '@media': {
    '(max-width: 2199px)': {
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    },
    '(max-width: 1599px)': {
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    },
    '(max-width: 1199px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    '(max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  gap: '12px',
  minWidth: 0,
  transition:
    'transform var(--vd-motion-state-duration, var(--vd-duration-180)) var(--vd-motion-easing-standard, var(--vd-easing-standard)), box-shadow var(--vd-motion-state-duration, var(--vd-duration-180)) var(--vd-motion-easing-standard, var(--vd-easing-standard))',
  selectors: {
    '&:is(:hover, :focus-within)': {
      transform: 'translateY(-2px)',
      boxShadow:
        'var(--vd-panel-shadow, 0 6px 18px color-mix(in srgb, var(--vd-text-primary) 10%, transparent))',
      '@media': {
        '(prefers-reduced-motion: reduce)': {
          transform: 'none',
        },
      },
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

export const cardHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
});

export const schedule = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  marginTop: 'auto',
  fontSize: '12px',
  color: tokens['--vd-text-secondary'],
  flexWrap: 'wrap',
});

export const footer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  paddingTop: '12px',
  borderTop: '1px solid var(--vd-border-subtle)',
  fontSize: '12px',
  color: tokens['--vd-text-secondary'],
});

export const id = style({
  font: '11px var(--vd-font-family-mono)',
  color: tokens['--vd-text-tertiary'],
});

export const title = style({
  fontSize: '15px',
  fontWeight: 600,
  lineHeight: 1.6,
  color: tokens['--vd-text-primary'],
  textDecoration: 'none',
  selectors: {
    '&:hover': {
      color: tokens['--vd-brand-primary'],
    },
  },
});

export const context = style({
  margin: 0,
  fontSize: '13px',
  lineHeight: 1.7,
  color: tokens['--vd-text-secondary'],
});

export const description = style({
  margin: 0,
  fontSize: '13px',
  lineHeight: 1.7,
  color: tokens['--vd-text-secondary'],
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  minHeight: '44px',
});

export const srOnly = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
});

globalStyle(`[data-theme='dark'] ${panel}`, {
  background: tokens['--vd-surface-elevated'],
});

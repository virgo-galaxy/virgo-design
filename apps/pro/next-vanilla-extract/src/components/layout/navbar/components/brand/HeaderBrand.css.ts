import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const brand = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-8'],
  color: tokens['--vd-text-primary'],
  textDecoration: 'none',
  fontSize: tokens['--vd-font-size-16'],
  fontWeight: tokens['--vd-font-weight-600'],
  letterSpacing: '-0.5px',
  selectors: {
    '&[data-scale=large]': {
      fontSize: tokens['--vd-font-size-20'],
    },
  },
});

export const brandHome = style({
  color: 'inherit',
  textDecoration: 'none',
  '@media': {
    '(max-width: 640px)': {
      display: 'none',
    },
  },
});

export const brandTrigger = style({
  flex: 'none',
  width: tokens['--vd-sizing-36'],
  height: tokens['--vd-sizing-36'],
  selectors: {
    '&:not([data-state=hidden]):hover': {
      color: 'inherit',
      background: 'transparent',
    },
    '&:not([data-state=hidden]):active': {
      color: 'inherit',
      background: 'transparent',
    },
  },
});

export const proBadge = style({
  selectors: {
    '&[data-intent=brand]': {
      borderColor: 'color-mix(in srgb, var(--vd-brand-primary) 24%, transparent)',
    },
  },
});

globalStyle(`${brand} img`, {
  display: 'block',
  flex: 'none',
  width: tokens['--vd-sizing-32'],
  height: 'auto',
});

globalStyle(`${brand}[data-scale=large] img`, {
  width: tokens['--vd-sizing-40'],
});

globalStyle(`${brand}[data-scale=large] ${brandTrigger}`, {
  width: tokens['--vd-sizing-44'],
  height: tokens['--vd-sizing-44'],
});

globalStyle(`${brand} > span`, {
  '@media': {
    '(max-width: 640px)': {
      display: 'none',
    },
  },
});

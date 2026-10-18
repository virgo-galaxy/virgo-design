import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const trigger = style({
  selectors: {
    '&[data-variant=text]': {
      vars: {
        '--button-padding-inline': tokens['--vd-spacing-8'],
        '--button-font-size': tokens['--vd-font-size-13'],
        '--button-foreground': tokens['--vd-text-primary'],
      },
    },
    '&[data-variant=text][aria-expanded=true]': {
      background: tokens['--vd-fill-hover'],
    },
  },
});

export const chevron = style({
  transition:
    'transform var(--vd-motion-interaction-duration, var(--vd-duration-120)) var(--vd-motion-easing-standard, var(--vd-easing-standard))',
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

export const name = style({
  maxWidth: 'clamp(60px, 10vw, 140px)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '@media': {
    '(max-width: 640px)': {
      display: 'none',
    },
  },
});

export const menu = style({
  width: '260px',
  maxWidth: 'calc(100vw - var(--vd-spacing-16))',
  padding: tokens['--vd-spacing-6'],
});

export const identity = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-12'],
  padding: tokens['--vd-spacing-12'],
});

export const error = style({
  margin: 'var(--vd-spacing-8) var(--vd-spacing-12)',
  color: tokens['--vd-status-danger-accent'],
  fontSize: tokens['--vd-font-size-12'],
});

export const account = style({
  color: tokens['--vd-text-tertiary'],
  font: 'var(--vd-font-size-11) var(--vd-font-family-mono)',
});

globalStyle(`${trigger}[data-variant=text] [data-slot=label]`, {
  gap: tokens['--vd-spacing-8'],
});

globalStyle(`${trigger}[data-variant=text] [data-slot=trailing-icon]`, {
  width: tokens['--vd-sizing-12'],
  height: tokens['--vd-sizing-12'],
  color: tokens['--vd-icon-secondary'],
});

globalStyle(`${trigger}[data-variant=text][aria-expanded=true] ${chevron}`, {
  transform: 'rotate(180deg)',
});

globalStyle(`${identity} > div`, {
  minWidth: 0,
});

globalStyle(`${identity} strong`, {
  fontSize: tokens['--vd-font-size-14'],
  fontWeight: tokens['--vd-font-weight-600'],
});

globalStyle(`${identity} p`, {
  margin: 'var(--vd-spacing-4) 0 0',
  fontSize: tokens['--vd-font-size-12'],
  color: tokens['--vd-text-tertiary'],
  overflowWrap: 'anywhere',
});

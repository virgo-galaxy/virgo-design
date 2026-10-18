import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const wizardSurface = style({
  minWidth: 0,
});

export const wizardStage = style({
  selectors: {
    '&[data-border=default]': {
      border: 0,
      borderRadius: 0,
      background: 'transparent',
    },
  },
});

export const fields = style({
  padding: tokens['--vd-spacing-20'],
  display: 'grid',
  gap: tokens['--vd-spacing-24'],
  '@media': {
    '(max-width: 640px)': {
      padding: tokens['--vd-spacing-16'],
      gap: tokens['--vd-spacing-20'],
    },
  },
});

export const stepsFrame = style({
  padding: tokens['--vd-spacing-16'],
  borderBottom: 'var(--vd-stroke-width, var(--vd-border-width-1)) solid var(--vd-border-subtle)',
  '@media': {
    '(max-width: 640px)': {
      padding: tokens['--vd-spacing-8'],
    },
  },
});

export const steps = style({
  '@media': {
    '(max-width: 640px)': {
      gap: tokens['--vd-spacing-4'],
    },
  },
});

export const wizard = style({
  boxSizing: 'border-box',
  maxWidth: '1080px',
  width: '100%',
  marginInline: 'auto',
  display: 'grid',
  padding: tokens['--vd-spacing-20'],
  '@media': {
    '(max-width: 640px)': {
      padding: 'var(--vd-spacing-16) 0',
    },
  },
});

export const wizardForm = style({
  width: '100%',
});

export const stageHeading = style({
  margin: 0,
  fontSize: tokens['--vd-font-size-20'],
  letterSpacing: '-0.3px',
});

export const wizardFooter = style({
  borderTop: '1px solid var(--vd-border-subtle)',
  padding: 'var(--vd-spacing-16) var(--vd-spacing-20)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: tokens['--vd-spacing-12'],
  flexWrap: 'wrap',
  '@media': {
    '(max-width: 640px)': {
      padding: tokens['--vd-spacing-16'],
    },
  },
});

globalStyle(`${steps} [data-slot=trigger]`, {
  border: '1px solid transparent',
});

globalStyle(`${steps} [data-status=current] [data-slot=trigger]`, {
  borderColor: 'var(--vd-brand-border)',
  background: tokens['--vd-brand-subtle'],
});

globalStyle(`${steps} [data-slot=indicator]`, {
  font: 'var(--vd-font-size-11) var(--vd-font-family-mono)',
});

globalStyle(`${steps} [data-slot=title]`, {
  fontSize: tokens['--vd-font-size-13'],
});

globalStyle(`${steps} [data-slot=description]`, {
  fontSize: tokens['--vd-font-size-11'],
});

globalStyle(`${steps} [data-slot=trigger]`, {
  '@media': {
    '(max-width: 640px)': {
      padding: tokens['--vd-spacing-8'],
    },
  },
});

globalStyle(`${steps} [data-slot=description]`, {
  '@media': {
    '(max-width: 640px)': {
      display: 'none',
    },
  },
});

globalStyle(`${steps} [data-slot=title]`, {
  '@media': {
    '(max-width: 640px)': {
      fontSize: tokens['--vd-font-size-11'],
    },
  },
});

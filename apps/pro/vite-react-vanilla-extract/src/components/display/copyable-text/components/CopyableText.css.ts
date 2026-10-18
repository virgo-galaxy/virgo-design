import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const root = style({
  display: 'inline-flex',
  width: 'fit-content',
  maxWidth: '100%',
  minWidth: 0,
  alignItems: 'center',
  gap: tokens['--vd-spacing-4'],
});

export const text = style({
  minWidth: 0,
  overflowWrap: 'anywhere',
});

export const copyButton = style({
  selectors: {
    '&[data-variant=text]': {
      vars: {
        '--button-foreground': tokens['--vd-text-tertiary'],
      },
      opacity: 0,
      pointerEvents: 'none',
      transition:
        'opacity var(--vd-motion-interaction-duration, var(--vd-duration-120)) var(--vd-motion-easing-standard, var(--vd-easing-standard))',
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

export const announcement = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
});

globalStyle(`${root}:is(:hover, :has(:focus-visible)) ${copyButton}`, {
  opacity: 1,
  pointerEvents: 'auto',
});

globalStyle(`${root}:not([data-copy-state=idle]) ${copyButton}`, {
  opacity: 1,
  pointerEvents: 'auto',
});

globalStyle(`${root}[data-copy-state=copied] ${copyButton}`, {
  vars: {
    '--button-foreground': tokens['--vd-status-success-accent'],
  },
});

globalStyle(`${root} ${copyButton}`, {
  '@media': {
    '(hover: none)': {
      opacity: 1,
      pointerEvents: 'auto',
    },
  },
});

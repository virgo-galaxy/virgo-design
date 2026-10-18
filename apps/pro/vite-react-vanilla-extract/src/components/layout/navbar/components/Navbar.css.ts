import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const header = style({
  position: 'absolute',
  insetBlockStart: 0,
  insetInline: 0,
  flex: 'none',
  borderBottom: 'var(--vd-stroke-width, var(--vd-border-width-1)) solid var(--vd-border-subtle)',
  zIndex: 4,
  selectors: {
    '&[hidden]': {
      display: 'none',
    },
    '&[data-scale=large]': {
      vars: {
        '--pro-search-width': '310px',
      },
    },
  },
  '@media': {
    '(max-width: 640px)': {
      paddingInline: tokens['--vd-spacing-12'],
      gap: tokens['--vd-spacing-12'],
    },
  },
});

export const actionDivider = style({
  selectors: {
    '&[data-orientation=vertical]': {
      alignSelf: 'center',
      height: tokens['--vd-sizing-24'],
    },
  },
});

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-8'],
  '@media': {
    '(max-width: 640px)': {
      gap: tokens['--vd-spacing-4'],
    },
  },
});

globalStyle(`${header}[data-scale=large] ${actionDivider}`, {
  height: tokens['--vd-sizing-32'],
});

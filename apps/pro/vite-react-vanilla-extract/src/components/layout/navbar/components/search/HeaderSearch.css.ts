import { style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const search = style({
  width: 'var(--pro-search-width, 280px)',
  marginInlineStart: 'auto',
  selectors: {
    '&[data-size=medium]': {
      vars: {
        '--input-padding-inline': tokens['--vd-spacing-12'],
        '--input-background': tokens['--vd-surface-secondary'],
        '--input-border': 'transparent',
        '--input-border-hover': 'transparent',
      },
    },
  },
  '@media': {
    '(max-width: 900px)': {
      width: '230px',
    },
    '(max-width: 640px)': {
      width: '100%',
    },
  },
});

import { style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const dangerAction = style({
  selectors: {
    '&:not(:disabled)': {
      color: tokens['--vd-status-danger-accent'],
      borderColor: tokens['--vd-status-danger-border'],
    },
  },
});

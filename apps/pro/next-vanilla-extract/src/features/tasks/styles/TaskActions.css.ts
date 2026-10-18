import { style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const deleteButton = style({
  selectors: {
    '&[data-variant=primary]': {
      vars: {
        '--button-background': tokens['--vd-status-danger-solid'],
        '--button-background-hover': 'color-mix(in srgb, var(--vd-status-danger-solid) 90%, black)',
        '--button-background-active':
          'color-mix(in srgb, var(--vd-status-danger-solid) 80%, black)',
        '--button-foreground': tokens['--vd-status-danger-on-solid'],
      },
    },
  },
});

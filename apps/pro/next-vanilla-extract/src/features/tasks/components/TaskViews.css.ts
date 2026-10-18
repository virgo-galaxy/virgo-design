import { style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const page = style({
  display: 'grid',
  gap: tokens['--vd-spacing-20'],
  minWidth: 0,
});

export const panel = style({
  paddingBlockStart: tokens['--vd-spacing-20'],
  minWidth: 0,
});

import { style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const filterLabel = style({
  color: tokens['--vd-text-secondary'],
  fontSize: tokens['--vd-font-size-11'],
});

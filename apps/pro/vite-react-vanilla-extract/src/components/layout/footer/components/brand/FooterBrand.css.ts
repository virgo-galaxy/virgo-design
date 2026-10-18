import { style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const footerBrand = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-4'],
});

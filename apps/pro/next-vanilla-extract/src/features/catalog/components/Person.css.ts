import { style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const person = style({
  display: 'inline-flex',
  gap: tokens['--vd-spacing-8'],
  alignItems: 'center',
  color: tokens['--vd-text-secondary'],
  fontSize: tokens['--vd-font-size-12'],
  whiteSpace: 'nowrap',
});

export const avatar = style({
  fontFamily: tokens['--vd-font-family-mono'],
  flexShrink: 0,
});

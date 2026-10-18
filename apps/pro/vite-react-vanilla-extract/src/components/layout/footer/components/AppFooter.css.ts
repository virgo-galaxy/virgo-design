import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const footer = style({
  textAlign: 'center',
  marginBlockStart: tokens['--vd-spacing-24'],
  paddingBlock: 'var(--vd-spacing-16) var(--vd-spacing-4)',
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-11'],
});

globalStyle(`${footer} a`, {
  display: 'inline-flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-4'],
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle(`${footer} a:hover`, {
  color: tokens['--vd-brand-link'],
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
});

globalStyle(`${footer} a:focus-visible`, {
  outline: 'var(--vd-border-width-2) solid var(--vd-border-focus)',
  outlineOffset: tokens['--vd-spacing-4'],
  borderRadius: 'var(--vd-shape-radius-4, var(--vd-radius-4))',
});

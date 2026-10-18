import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const menu = style({
  width: 'min(280px, 100vw - var(--vd-spacing-24))',
});

export const copy = style({
  display: 'grid',
  gap: tokens['--vd-spacing-2'],
  paddingBlock: tokens['--vd-spacing-2'],
});

export const name = style({
  fontWeight: tokens['--vd-font-weight-500'],
});

export const description = style({
  color: tokens['--vd-text-secondary'],
  fontSize: tokens['--vd-typography-ui-body-small-font-size'],
  lineHeight: tokens['--vd-typography-ui-body-small-line-height'],
});

globalStyle(`${menu} [data-dropdown-viewport]`, {
  gridAutoRows: 'max-content',
  maxHeight: 'min(480px, 100dvh - var(--vd-sizing-80))',
});

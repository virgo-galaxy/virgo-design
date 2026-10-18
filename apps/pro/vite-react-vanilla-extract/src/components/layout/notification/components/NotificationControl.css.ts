import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const notificationBadge = style({
  width: '100%',
  height: '100%',
});

export const notificationPanel = style({
  width: 'min(380px, 100vw - 24px)',
  fontSize: '13px',
});

globalStyle(`${notificationBadge} > [data-intent]:not([data-dot])`, {
  minWidth: 'calc(var(--vd-sizing-12) + var(--vd-spacing-2))',
  height: 'calc(var(--vd-sizing-12) + var(--vd-spacing-2))',
  paddingInline: tokens['--vd-spacing-2'],
  borderWidth: 'var(--vd-stroke-width, var(--vd-border-width-1))',
  fontSize: tokens['--vd-font-size-10'],
  lineHeight: tokens['--vd-sizing-12'],
});

globalStyle(`${notificationBadge} > svg`, {
  width: '100%',
  height: '100%',
});

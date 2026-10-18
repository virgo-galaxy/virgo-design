import { style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const root = style({
  display: 'flex',
  minHeight: '100dvh',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: tokens['--vd-spacing-16'],
  padding: tokens['--vd-spacing-24'],
});

export const title = style({
  margin: 0,
  fontSize: tokens['--vd-typography-ui-body-large-font-size'],
});

export const description = style({
  margin: 0,
  color: tokens['--vd-text-secondary'],
});

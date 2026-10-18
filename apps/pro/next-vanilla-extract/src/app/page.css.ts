import { style } from '@vanilla-extract/css';

export const page = style({
  display: 'grid',
  minHeight: '100svh',
  padding: 24,
  placeItems: 'center',
});

export const title = style({
  margin: 0,
  fontSize: 32,
  fontWeight: 600,
  lineHeight: 1.25,
});

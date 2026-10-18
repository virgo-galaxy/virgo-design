import { globalStyle, style } from '@vanilla-extract/css';

export const carousel = style({
  vars: {
    '--carousel-control-background': 'rgb(0 0 0 / 45%)',
    '--carousel-control-background-hover': 'rgb(0 0 0 / 60%)',
    '--carousel-control-border': 'rgb(255 255 255 / 70%)',
    '--carousel-control-foreground': 'var(--vd-color-white, #fff)',
  },
});

export const viewport = style({
  borderRadius: 'var(--vd-shape-radius-8, var(--vd-radius-8))',
});

export const indicator = style({
  vars: {
    '--carousel-indicator-width': '88px',
    '--carousel-indicator-color': 'var(--vd-color-white, #fff)',
    '--carousel-indicator-background': 'rgb(255 255 255 / 35%)',
  },
});

globalStyle(`${viewport} img`, {
  display: 'block',
  width: '100%',
  height: '160px',
  objectFit: 'cover',
  userSelect: 'none',
});

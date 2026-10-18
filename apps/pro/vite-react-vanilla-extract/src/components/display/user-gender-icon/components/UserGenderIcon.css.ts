import { globalStyle, style } from '@vanilla-extract/css';

export const icon = style({
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  verticalAlign: 'middle',
  selectors: {
    '&[data-gender=female]': {
      color: '#c9367c',
    },
    '&[data-gender=male]': {
      color: '#2169cb',
    },
  },
});

globalStyle(`[data-theme='dark'] ${icon}[data-gender=female]`, {
  color: '#f588b7',
});

globalStyle(`[data-theme='dark'] ${icon}[data-gender=male]`, {
  color: '#78b0ff',
});

import { globalStyle } from '@vanilla-extract/css';

globalStyle('*', {
  boxSizing: 'border-box',
});

globalStyle('body', {
  margin: 0,
  background: '#fff',
  color: '#171717',
  fontFamily: 'Arial, Helvetica, sans-serif',
});

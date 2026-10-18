import { style } from '@vanilla-extract/css';

export const filterForm = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(220px, 1.6fr) repeat(2, minmax(160px, 1fr)) auto',
  gap: '16px',
  alignItems: 'end',
  '@media': {
    '(max-width: 1100px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    '(max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

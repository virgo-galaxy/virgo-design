import { style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const taskEditorContent = style({
  display: 'grid',
  alignContent: 'start',
  gap: tokens['--vd-spacing-20'],
  minWidth: 0,
});

export const formGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: tokens['--vd-spacing-16'],
  alignItems: 'start',
  '@media': {
    '(max-width: 640px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
});

export const form = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
  gap: '32px',
  alignItems: 'start',
  '@media': {
    '(max-width: 1000px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const formActions = style({
  marginTop: '24px',
  paddingTop: '20px',
  borderTop: '1px solid var(--vd-border-subtle)',
  justifyContent: 'flex-end',
  width: '100%',
});

import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const editorDialog = style({
  vars: {
    '--dialog-width': 'calc(var(--vd-sizing-80) * 8)',
  },
});

export const editorHeader = style({
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-16'],
});

export const editorForm = style({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: tokens['--vd-spacing-20'],
  '@media': {
    '(max-width: 640px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
});

export const fullWidth = style({
  gridColumn: '1/-1',
});

export const photoLayout = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-24'],
  '@media': {
    '(max-width: 640px)': {
      flexWrap: 'wrap',
      gap: tokens['--vd-spacing-12'],
    },
  },
});

export const photoRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-16'],
  minWidth: 0,
});

export const photoActions = style({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  flexShrink: 0,
  gap: tokens['--vd-spacing-8'],
});

export const photoFilename = style({
  minWidth: 0,
  margin: 0,
  color: tokens['--vd-text-secondary'],
  fontSize: tokens['--vd-font-size-12'],
  overflowWrap: 'anywhere',
});

export const colorRow = style({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: tokens['--vd-spacing-8'],
  '@media': {
    '(max-width: 640px)': {
      gap: tokens['--vd-spacing-6'],
    },
  },
});

export const editorFooter = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-12'],
  alignItems: 'center',
});

globalStyle(`${photoRow} > div`, {
  minWidth: 0,
});

globalStyle(`${photoRow} strong`, {
  fontSize: tokens['--vd-font-size-12'],
});

globalStyle(`${photoRow} p`, {
  fontSize: tokens['--vd-font-size-11'],
  color: tokens['--vd-text-tertiary'],
  margin: 'var(--vd-spacing-6) 0 0',
});

globalStyle(`${colorRow} > input`, {
  width: '110px',
});

import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const taskList = style({
  margin: 0,
  padding: '0 var(--vd-spacing-20)',
  listStyle: 'none',
  '@media': {
    '(max-width: 640px)': {
      padding: '0 var(--vd-spacing-16)',
    },
  },
});

export const taskButton = style({
  color: tokens['--vd-text-primary'],
  textDecoration: 'none',
  vars: {
    '--button-foreground': tokens['--vd-text-primary'],
  },
  padding: 0,
  height: 'auto',
  whiteSpace: 'normal',
  textAlign: 'start',
  fontSize: tokens['--vd-font-size-12'],
  selectors: {
    '&:hover': {
      color: tokens['--vd-brand-link'],
      textDecoration: 'underline',
    },
  },
});

export const taskTags = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'end',
  gap: tokens['--vd-spacing-6'],
  flexShrink: 0,
  '@media': {
    '(max-width: 640px)': {
      flexDirection: 'row',
    },
  },
});

globalStyle(`${taskList} li`, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-20'],
  padding: 'var(--vd-spacing-16) 0',
});

globalStyle(`${taskList} li + li`, {
  borderTop: '1px solid var(--vd-border-subtle)',
});

globalStyle(`${taskList} li > div:first-child`, {
  display: 'grid',
  justifyItems: 'start',
  gap: tokens['--vd-spacing-6'],
});

globalStyle(`${taskList} li`, {
  '@media': {
    '(max-width: 640px)': {
      flexWrap: 'wrap',
      gap: tokens['--vd-spacing-12'],
    },
  },
});

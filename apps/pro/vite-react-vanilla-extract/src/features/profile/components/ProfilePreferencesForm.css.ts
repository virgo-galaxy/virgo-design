import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const preferencesForm = style({
  width: '100%',
  padding: '0 var(--vd-spacing-20)',
  '@media': {
    '(max-width: 640px)': {
      paddingInline: tokens['--vd-spacing-16'],
    },
  },
});

export const preferenceRow = style({
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-32'],
  padding: 'var(--vd-spacing-24) 0',
  '@media': {
    '(max-width: 640px)': {
      flexDirection: 'column',
      gap: tokens['--vd-spacing-16'],
    },
  },
});

export const preferenceControl = style({
  width: '250px',
  flexShrink: 0,
  display: 'grid',
  gap: tokens['--vd-spacing-16'],
  '@media': {
    '(max-width: 640px)': {
      width: '100%',
    },
  },
});

export const preferenceFooter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: tokens['--vd-spacing-12'],
  padding: 'var(--vd-spacing-20) 0',
  borderTop: '1px solid var(--vd-border-subtle)',
});

globalStyle(`${preferenceRow} + ${preferenceRow}`, {
  borderTop: '1px solid var(--vd-border-subtle)',
});

globalStyle(`${preferenceRow} h3`, {
  margin: '0 0 var(--vd-spacing-6)',
  fontSize: tokens['--vd-font-size-13'],
});

globalStyle(`${preferenceRow} p`, {
  margin: 0,
  fontSize: tokens['--vd-font-size-12'],
  color: tokens['--vd-text-secondary'],
});

globalStyle(`${preferenceRow} [role=radiogroup]`, {
  flexWrap: 'wrap',
});

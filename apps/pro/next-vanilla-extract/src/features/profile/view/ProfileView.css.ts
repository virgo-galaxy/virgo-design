import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const identity = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-24'],
  padding: tokens['--vd-spacing-32'],
  borderTop: '3px solid var(--vd-brand-primary)',
  '@media': {
    '(max-width: 850px)': {
      padding: tokens['--vd-spacing-24'],
    },
    '(max-width: 640px)': {
      padding: tokens['--vd-spacing-20'],
      flexDirection: 'column',
      alignItems: 'start',
    },
  },
});

export const identityMain = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-24'],
  minWidth: 0,
  '@media': {
    '(max-width: 850px)': {
      gap: tokens['--vd-spacing-16'],
    },
    '(max-width: 640px)': {
      alignItems: 'start',
      flexWrap: 'wrap',
    },
  },
});

export const heroAvatar = style({
  fontFamily: tokens['--vd-font-family-mono'],
});

export const identityActions = style({
  display: 'grid',
  gap: tokens['--vd-spacing-16'],
  justifyItems: 'end',
  flexShrink: 0,
  '@media': {
    '(max-width: 640px)': {
      width: '100%',
      justifyItems: 'start',
      gap: tokens['--vd-spacing-12'],
    },
  },
});

export const tabs = style({
  minWidth: 0,
});

export const bio = style({
  color: tokens['--vd-text-secondary'],
  fontSize: tokens['--vd-font-size-13'],
  lineHeight: 1.8,
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
  margin: '0 0 var(--vd-spacing-24)',
});

export const accountMetadata = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: tokens['--vd-spacing-24'],
  margin: 0,
  '@media': {
    '(max-width: 640px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
      gap: tokens['--vd-spacing-16'],
    },
  },
});

export const focusTitle = style({
  fontSize: tokens['--vd-font-size-20'],
  margin: 'var(--vd-spacing-12) 0 var(--vd-spacing-8)',
});

export const focusLink = style({
  marginTop: tokens['--vd-spacing-20'],
  fontSize: tokens['--vd-font-size-12'],
});

export const responsibilities = style({
  listStyle: 'none',
  margin: 0,
  padding: tokens['--vd-spacing-20'],
  display: 'grid',
  gap: tokens['--vd-spacing-24'],
});

globalStyle(`${identityMain} h1`, {
  display: 'flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-8'],
  margin: 'var(--vd-spacing-8) 0 var(--vd-spacing-6)',
  fontSize: tokens['--vd-font-size-24'],
  letterSpacing: '-0.5px',
  overflowWrap: 'anywhere',
});

globalStyle(`${identityMain} p`, {
  color: tokens['--vd-text-secondary'],
  fontSize: tokens['--vd-font-size-13'],
  margin: '0 0 var(--vd-spacing-12)',
  overflowWrap: 'anywhere',
});

globalStyle(`${tabs} [role=tablist]`, {
  marginBottom: tokens['--vd-spacing-20'],
});

globalStyle(`${tabs} [role=tabpanel]`, {
  outlineOffset: '4px',
});

globalStyle(`${accountMetadata} > div`, {
  display: 'grid',
  gap: tokens['--vd-spacing-6'],
});

globalStyle(`${accountMetadata} dt`, {
  fontSize: tokens['--vd-font-size-11'],
  color: tokens['--vd-text-tertiary'],
});

globalStyle(`${accountMetadata} dd`, {
  margin: 0,
  fontSize: tokens['--vd-font-size-12'],
});

globalStyle(`${responsibilities} li`, {
  display: 'flex',
  gap: tokens['--vd-spacing-16'],
});

globalStyle(`${responsibilities} h3`, {
  margin: 0,
  fontSize: tokens['--vd-font-size-13'],
  display: 'flex',
  gap: tokens['--vd-spacing-8'],
  alignItems: 'center',
});

globalStyle(`${responsibilities} p`, {
  margin: 'var(--vd-spacing-6) 0 var(--vd-spacing-12)',
  color: tokens['--vd-text-secondary'],
  fontSize: tokens['--vd-font-size-12'],
});

globalStyle(`${responsibilities} a`, {
  fontSize: tokens['--vd-font-size-12'],
});

globalStyle(`${responsibilities} li > span`, {
  paddingTop: '3px',
});

globalStyle(`${tabs} [role=tab]`, {
  '@media': {
    '(max-width: 640px)': {
      paddingInline: tokens['--vd-spacing-8'],
      fontSize: tokens['--vd-font-size-12'],
    },
  },
});

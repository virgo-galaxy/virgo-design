import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const projectPicker = style({
  width: '220px',
  maxWidth: '100%',
});

export const recordSummary = style({
  minWidth: 0,
});

export const recordControls = style({
  justifyContent: 'flex-end',
  maxWidth: '100%',
});

export const summaryMetrics = style({
  selectors: {
    '&[data-border=default]': {
      border: 0,
      background: 'transparent',
    },
  },
});

export const recordBar = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-12'],
  padding: 'var(--vd-spacing-20) var(--vd-spacing-20) 0',
  fontSize: tokens['--vd-font-size-12'],
  '@media': {
    '(max-width: 640px)': {
      padding: 'var(--vd-spacing-16) var(--vd-spacing-16) 0',
    },
  },
});

export const objective = style({
  color: tokens['--vd-text-secondary'],
  margin: 'var(--vd-spacing-12) 0 var(--vd-spacing-24)',
  fontSize: tokens['--vd-font-size-13'],
  lineHeight: 1.8,
});

export const acceptance = style({
  padding: tokens['--vd-spacing-16'],
  border: '1px solid var(--vd-border-subtle)',
  borderRadius: 'var(--vd-shape-radius-8, var(--vd-radius-8))',
  background: tokens['--vd-surface-secondary'],
});

export const progress = style({
  marginTop: tokens['--vd-spacing-24'],
  display: 'grid',
  gap: tokens['--vd-spacing-12'],
});

export const metadata = style({
  padding: tokens['--vd-spacing-20'],
  margin: 0,
  display: 'grid',
  gap: tokens['--vd-spacing-20'],
  '@media': {
    '(max-width: 640px)': {
      padding: tokens['--vd-spacing-16'],
    },
  },
});

export const team = style({
  listStyle: 'none',
  padding: tokens['--vd-spacing-20'],
  margin: 0,
  display: 'grid',
  gap: tokens['--vd-spacing-16'],
});

export const related = style({
  padding: tokens['--vd-spacing-20'],
  margin: 0,
  listStyle: 'none',
  display: 'grid',
  gap: tokens['--vd-spacing-20'],
});

export const moduleGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: tokens['--vd-spacing-12'],
  padding: tokens['--vd-spacing-20'],
  '@media': {
    '(max-width: 640px)': {
      gridTemplateColumns: '1fr',
      padding: tokens['--vd-spacing-16'],
    },
  },
});

export const moduleCard = style({
  display: 'grid',
  gap: tokens['--vd-spacing-12'],
  minWidth: 0,
  padding: tokens['--vd-spacing-16'],
  border: '1px solid var(--vd-border-subtle)',
  borderRadius: 'var(--vd-shape-radius-8, var(--vd-radius-8))',
  color: tokens['--vd-text-primary'],
  textDecoration: 'none',
  fontSize: tokens['--vd-font-size-13'],
  selectors: {
    '&:hover': {
      background: tokens['--vd-surface-secondary'],
    },
    '&:focus-visible': {
      outline: '2px solid var(--vd-brand-primary)',
      outlineOffset: '2px',
    },
  },
});

globalStyle(`${recordBar} > div`, {
  display: 'flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-12'],
  flexWrap: 'wrap',
});

globalStyle(`${acceptance} h3`, {
  margin: '0 0 var(--vd-spacing-12)',
  fontSize: tokens['--vd-font-size-12'],
  fontWeight: 600,
});

globalStyle(`${acceptance} ul`, {
  margin: 0,
  paddingLeft: tokens['--vd-spacing-16'],
  display: 'grid',
  gap: tokens['--vd-spacing-8'],
  color: tokens['--vd-text-secondary'],
  fontSize: tokens['--vd-font-size-12'],
});

globalStyle(`${progress} > div:first-child`, {
  display: 'flex',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-12'],
  flexWrap: 'wrap',
  fontSize: tokens['--vd-font-size-11'],
});

globalStyle(`${progress} > div:first-child span`, {
  color: tokens['--vd-text-tertiary'],
});

globalStyle(`${metadata} > div`, {
  display: 'grid',
  gridTemplateColumns: '110px minmax(0, 1fr)',
  gap: tokens['--vd-spacing-12'],
  alignItems: 'center',
});

globalStyle(`${metadata} dt`, {
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-11'],
});

globalStyle(`${metadata} dd`, {
  margin: 0,
  fontSize: tokens['--vd-font-size-12'],
});

globalStyle(`${team} li`, {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: tokens['--vd-spacing-12'],
});

globalStyle(`${team} li > span:last-child`, {
  fontSize: tokens['--vd-font-size-10'],
  color: tokens['--vd-text-tertiary'],
});

globalStyle(`${related} li`, {
  display: 'grid',
  gap: tokens['--vd-spacing-6'],
});

globalStyle(`${related} a`, {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: tokens['--vd-font-size-12'],
});

globalStyle(`${metadata} > div`, {
  '@media': {
    '(max-width: 640px)': {
      gridTemplateColumns: '90px minmax(0, 1fr)',
    },
  },
});

globalStyle(`${moduleCard} span`, {
  color: tokens['--vd-text-secondary'],
  fontSize: tokens['--vd-font-size-12'],
});

import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const fieldGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: tokens['--vd-spacing-20'],
  alignItems: 'start',
  '@media': {
    '(max-width: 640px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
});

export const fieldset = style({
  margin: 0,
  padding: 0,
  border: 0,
  minWidth: 0,
});

export const stageCopy = style({
  margin: 'var(--vd-spacing-6) 0 0',
  fontSize: tokens['--vd-font-size-12'],
  color: tokens['--vd-text-secondary'],
});

export const scopeLayout = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.4fr) minmax(230px, 1fr)',
  gap: tokens['--vd-spacing-24'],
  '@media': {
    '(max-width: 760px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
});

export const scopeTree = style({
  minWidth: 0,
});

export const treeLabel = style({
  display: 'flex',
  alignItems: 'start',
  gap: tokens['--vd-spacing-8'],
  width: '100%',
  fontSize: tokens['--vd-font-size-12'],
  '@media': {
    '(max-width: 640px)': {
      flexWrap: 'wrap',
    },
  },
});

export const treeCopy = style({
  display: 'grid',
  gap: tokens['--vd-spacing-4'],
  minWidth: 0,
  flex: '1',
});

export const treeMark = style({
  color: tokens['--vd-text-tertiary'],
  width: '16px',
  flexShrink: 0,
  fontFamily: tokens['--vd-font-family-mono'],
  selectors: {
    '&[data-selected=true]': {
      color: tokens['--vd-brand-primary'],
    },
  },
});

export const treeTools = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-12'],
  paddingBottom: tokens['--vd-spacing-12'],
});

export const scopeNote = style({
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-11'],
  lineHeight: 1.7,
  margin: 'var(--vd-spacing-12) 0 0',
});

export const choice = style({
  padding: tokens['--vd-spacing-12'],
  border: '1px solid var(--vd-border-subtle)',
  borderRadius: 'var(--vd-shape-radius-8, var(--vd-radius-8))',
  fontSize: tokens['--vd-font-size-12'],
});

export const reviewGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: tokens['--vd-spacing-20'],
  '@media': {
    '(max-width: 760px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
});

export const reviewMetadata = style({
  margin: 0,
  padding: tokens['--vd-spacing-16'],
  border: '1px solid var(--vd-border-subtle)',
  borderRadius: 'var(--vd-shape-radius-8, var(--vd-radius-8))',
  display: 'grid',
  gap: tokens['--vd-spacing-16'],
});

export const scopeReview = style({
  padding: 0,
  listStyle: 'none',
  margin: 0,
  display: 'grid',
  gap: tokens['--vd-spacing-12'],
});

export const reviewNotes = style({
  background: tokens['--vd-surface-secondary'],
  borderRadius: 'var(--vd-shape-radius-8, var(--vd-radius-8))',
  padding: tokens['--vd-spacing-16'],
  color: tokens['--vd-text-secondary'],
  fontSize: tokens['--vd-font-size-12'],
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
});

globalStyle(`${fieldset} legend`, {
  marginBottom: tokens['--vd-spacing-12'],
  fontSize: tokens['--vd-font-size-12'],
  fontWeight: 500,
});

globalStyle(`${fieldset} [role=radiogroup]`, {
  flexWrap: 'wrap',
  gap: 'var(--vd-spacing-12) var(--vd-spacing-24)',
});

globalStyle(`${fieldset} p`, {
  margin: 'var(--vd-spacing-12) 0 0',
});

globalStyle(`${scopeTree} [role=treeitem]`, {
  minWidth: 0,
});

globalStyle(`${scopeTree} [data-slot=label]`, {
  minWidth: 0,
  whiteSpace: 'normal',
});

globalStyle(`${reviewMetadata} > div`, {
  display: 'grid',
  gap: tokens['--vd-spacing-4'],
});

globalStyle(`${reviewMetadata} dt`, {
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-11'],
});

globalStyle(`${reviewMetadata} dd`, {
  margin: 0,
  fontSize: tokens['--vd-font-size-13'],
  overflowWrap: 'anywhere',
});

globalStyle(`${scopeReview} li`, {
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-12'],
  fontSize: tokens['--vd-font-size-12'],
});

globalStyle(`${scopeReview} li > span:first-child`, {
  display: 'grid',
  gap: tokens['--vd-spacing-4'],
});

globalStyle(`${treeLabel} > [data-slot=root]`, {
  '@media': {
    '(max-width: 640px)': {
      marginInlineStart: tokens['--vd-spacing-24'],
    },
  },
});

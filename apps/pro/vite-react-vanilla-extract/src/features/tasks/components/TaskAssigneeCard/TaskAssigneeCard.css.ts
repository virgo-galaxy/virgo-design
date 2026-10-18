import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const trigger = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-8'],
  maxWidth: '100%',
  padding: 0,
  border: 0,
  borderRadius: 'var(--vd-shape-radius-4, var(--vd-radius-4))',
  background: 'transparent',
  color: tokens['--vd-text-secondary'],
  font: 'inherit',
  textAlign: 'start',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  transition:
    'color var(--vd-motion-interaction-duration, var(--vd-duration-120)) var(--vd-motion-easing-standard, var(--vd-easing-standard))',
  selectors: {
    '&:hover': {
      color: tokens['--vd-text-primary'],
    },
    '&[aria-expanded=true]': {
      color: tokens['--vd-text-primary'],
    },
    '&:focus-visible': {
      outline: 'var(--vd-border-width-2) solid var(--vd-border-focus)',
      outlineOffset: tokens['--vd-spacing-4'],
    },
  },
});

export const avatar = style({
  flexShrink: 0,
  fontFamily: tokens['--vd-font-family-mono'],
});

export const card = style({
  width: '340px',
  maxWidth: 'calc(100vw - 32px)',
  padding: tokens['--vd-spacing-20'],
  fontSize: tokens['--vd-font-size-14'],
});

export const details = style({
  display: 'grid',
  gap: tokens['--vd-spacing-16'],
});

export const identity = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-12'],
});

export const photo = style({
  flexShrink: 0,
  width: '56px',
  height: '56px',
});

export const heading = style({
  display: 'grid',
  minWidth: 0,
  gap: tokens['--vd-spacing-4'],
  color: tokens['--vd-text-secondary'],
  fontSize: tokens['--vd-font-size-12'],
});

export const employeeNumber = style({
  color: tokens['--vd-text-tertiary'],
  fontVariantNumeric: 'tabular-nums',
});

export const fields = style({
  display: 'grid',
  gap: tokens['--vd-spacing-12'],
  margin: 0,
  paddingBlock: tokens['--vd-spacing-16'],
  borderBlock: 'var(--vd-stroke-width, var(--vd-border-width-1)) solid var(--vd-border-default)',
});

export const projects = style({
  display: 'grid',
  gap: tokens['--vd-spacing-8'],
});

export const loading = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-16'],
  minHeight: '232px',
});

export const loadingLines = style({
  display: 'grid',
  flex: '1',
  gap: tokens['--vd-spacing-12'],
});

export const error = style({
  display: 'grid',
  justifyItems: 'start',
  gap: tokens['--vd-spacing-12'],
  minHeight: '120px',
});

globalStyle(`${trigger} > span:last-child`, {
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

globalStyle(`${heading} strong`, {
  display: 'flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-8'],
  color: tokens['--vd-text-primary'],
  fontSize: tokens['--vd-font-size-16'],
  fontWeight: tokens['--vd-font-weight-600'],
});

globalStyle(`${fields} > div`, {
  display: 'grid',
  gridTemplateColumns: '92px minmax(0, 1fr)',
  gap: tokens['--vd-spacing-12'],
});

globalStyle(`${fields} dt`, {
  color: tokens['--vd-text-tertiary'],
});

globalStyle(`${fields} dd`, {
  margin: 0,
  color: tokens['--vd-text-primary'],
  overflowWrap: 'anywhere',
});

globalStyle(`${fields} a`, {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle(`${fields} a:hover`, {
  color: tokens['--vd-brand-link'],
  textDecoration: 'underline',
});

globalStyle(`${fields} a:focus-visible`, {
  outline: 'var(--vd-border-width-2) solid var(--vd-border-focus)',
  outlineOffset: tokens['--vd-spacing-2'],
});

globalStyle(`${projects} > span`, {
  color: tokens['--vd-text-tertiary'],
});

globalStyle(`${projects} > div`, {
  display: 'flex',
  flexWrap: 'wrap',
  gap: tokens['--vd-spacing-8'],
});

globalStyle(`${error} p`, {
  margin: 0,
  color: tokens['--vd-text-secondary'],
});

import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const panel = style({
  vars: {
    '--drawer-size': 'calc(var(--vd-sizing-80) * 5 + var(--vd-sizing-32))',
    '--drawer-section-padding': tokens['--vd-spacing-24'],
  },
  fontSize: tokens['--vd-font-size-13'],
  '@media': {
    '(max-width: 480px)': {
      vars: {
        '--drawer-section-padding': tokens['--vd-spacing-20'],
      },
    },
  },
});

export const title = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-8'],
});

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens['--vd-spacing-24'],
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens['--vd-spacing-16'],
});

export const segments = style({
  display: 'flex',
  width: '100%',
});

export const appearanceLabel = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-4'],
  verticalAlign: 'middle',
});

export const hint = style({
  margin: 0,
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-12'],
  lineHeight: tokens['--vd-line-height-4'],
});

export const row = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  alignItems: 'center',
  columnGap: tokens['--vd-spacing-16'],
});

export const footer = style({
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: tokens['--vd-spacing-12'],
});

export const width = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens['--vd-spacing-8'],
});

export const widthLabel = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const controlLabel = style({
  margin: 0,
  color: tokens['--vd-text-primary'],
});

export const widthInputFrame = style({
  width: tokens['--vd-sizing-80'],
  flex: 'none',
});

export const heightInputFrame = style({
  width: 'calc(var(--vd-sizing-80) + var(--vd-sizing-40))',
  flex: 'none',
});

export const widthInput = style({
  textAlign: 'right',
  fontVariantNumeric: 'tabular-nums',
});

export const range = style({
  display: 'flex',
  justifyContent: 'space-between',
  color: tokens['--vd-text-tertiary'],
  fontFamily: tokens['--vd-font-family-mono'],
  fontSize: tokens['--vd-font-size-10'],
});

export const footerActions = style({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: tokens['--vd-spacing-12'],
});

export const resetActions = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: tokens['--vd-spacing-12'],
});

export const edgeTrigger = style({
  position: 'fixed',
  top: 'clamp(var(--vd-spacing-8), var(--settings-anchor-y) - var(--vd-sizing-36) / 2, 100dvh - var(--vd-sizing-36) - var(--vd-spacing-8))',
  right: 0,
  zIndex: 5,
  width: tokens['--vd-sizing-36'],
  height: tokens['--vd-sizing-36'],
  borderRadius:
    'var(--vd-shape-radius-4, var(--vd-radius-4)) 0 0 var(--vd-shape-radius-4, var(--vd-radius-4))',
  selectors: {
    '&:focus-visible': {
      outlineOffset: '-3px',
    },
  },
});

globalStyle(`${title} > svg`, {
  width: tokens['--vd-sizing-24'],
  height: tokens['--vd-sizing-24'],
  color: tokens['--vd-brand-link'],
});

globalStyle(`${section} h2`, {
  margin: 0,
  fontSize: tokens['--vd-font-size-14'],
  fontWeight: tokens['--vd-font-weight-600'],
  color: tokens['--vd-text-primary'],
});

globalStyle(`${segments} > label`, {
  flex: '1',
  justifyContent: 'center',
});

globalStyle(`${appearanceLabel} svg`, {
  width: tokens['--vd-sizing-16'],
  height: tokens['--vd-sizing-16'],
});

globalStyle(`${row} p`, {
  margin: 0,
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-12'],
  lineHeight: tokens['--vd-line-height-4'],
});

globalStyle(`${footer} p`, {
  margin: 0,
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-12'],
  lineHeight: tokens['--vd-line-height-4'],
});

globalStyle(`${row} > div`, {
  display: 'contents',
});

globalStyle(`${row} > div > label`, {
  gridColumn: '1',
  gridRow: '1',
});

globalStyle(`${row} label`, {
  color: tokens['--vd-text-primary'],
});

globalStyle(`${row} p`, {
  gridColumn: '1',
  gridRow: '2',
  marginBlockStart: tokens['--vd-spacing-4'],
});

globalStyle(`${row} > label`, {
  gridColumn: '2',
  gridRow: '1',
});

globalStyle(`${footerActions} > button`, {
  marginInlineStart: 'auto',
});

globalStyle(`${edgeTrigger} > [data-slot=icon]`, {
  vars: {
    '--button-icon-size': tokens['--vd-sizing-28'],
  },
});

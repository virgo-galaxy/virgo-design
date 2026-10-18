import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const owners = style({
  margin: 0,
  padding: 'var(--vd-spacing-16) var(--vd-spacing-24) var(--vd-spacing-12)',
  minHeight: '282px',
  boxSizing: 'border-box',
  listStyle: 'none',
  display: 'grid',
  gap: tokens['--vd-spacing-16'],
  alignContent: 'start',
  '@media': {
    '(max-width: 640px)': {
      paddingInline: tokens['--vd-spacing-16'],
    },
  },
});

export const rank = style({
  flex: 'none',
  width: '20px',
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-12'],
  fontVariantNumeric: 'tabular-nums',
});

export const ownerDetail = style({
  flex: '1',
  minWidth: 0,
  display: 'grid',
  gap: tokens['--vd-spacing-6'],
});

export const ownerIdentity = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 'var(--vd-spacing-4) var(--vd-spacing-8)',
});

export const ownerPagination = style({
  padding: '0 var(--vd-spacing-24) var(--vd-spacing-12)',
  flexWrap: 'wrap',
  gap: tokens['--vd-spacing-8'],
  '@media': {
    '(max-width: 640px)': {
      paddingInline: tokens['--vd-spacing-16'],
    },
  },
});

export const ownerTrack = style({
  display: 'block',
  height: '4px',
  background: tokens['--vd-fill-hover'],
  borderRadius: '2px',
});

export const ownerNote = style({
  margin: 0,
  padding: '0 var(--vd-spacing-24) var(--vd-spacing-20)',
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-11'],
});

globalStyle(`${owners} li`, {
  display: 'flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-12'],
});

globalStyle(`${owners} > li > strong`, {
  fontSize: tokens['--vd-font-size-16'],
  fontWeight: 500,
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap',
});

globalStyle(`${owners} > li > strong small`, {
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-11'],
  fontWeight: 400,
  marginLeft: tokens['--vd-spacing-4'],
});

globalStyle(`${ownerIdentity} > small`, {
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-11'],
  whiteSpace: 'nowrap',
});

globalStyle(`${ownerTrack} > span`, {
  display: 'block',
  height: '100%',
  borderRadius: 'inherit',
});

import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const controls = style({
  boxSizing: 'border-box',
  display: 'flex',
  flex: '1',
  minWidth: 0,
  minHeight: tokens['--vd-sizing-28'],
  justifyContent: 'center',
  selectors: {
    '&[data-state=expanded]': {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) var(--vd-sizing-28)',
      columnGap: tokens['--vd-spacing-8'],
      alignItems: 'center',
      paddingInline: tokens['--vd-spacing-8'],
    },
  },
});

export const toggleButton = style({
  flex: 'none',
  width: tokens['--vd-sizing-28'],
  minWidth: tokens['--vd-sizing-28'],
  height: tokens['--vd-sizing-28'],
});

export const workspace = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-8'],
  color: tokens['--vd-text-tertiary'],
  fontFamily: tokens['--vd-font-family-mono'],
  fontSize: tokens['--vd-font-size-10'],
  letterSpacing: '0.8px',
  whiteSpace: 'nowrap',
});

export const toggleHint = style({});

export const statusDot = style({
  flex: 'none',
});

globalStyle(`${controls}[data-state=collapsed][data-rail-icon-size=large] ${toggleButton} > svg`, {
  flex: 'none',
  width: tokens['--vd-sizing-20'],
  height: tokens['--vd-sizing-20'],
});

globalStyle(`${controls}[data-state=expanded] ${workspace}`, {
  gridColumn: '1',
  justifySelf: 'center',
});

globalStyle(`${controls}[data-state=expanded] ${toggleHint}`, {
  gridColumn: '2',
  justifySelf: 'end',
});

globalStyle(`${toggleButton} > svg`, {
  width: tokens['--vd-sizing-16'],
  height: tokens['--vd-sizing-16'],
});

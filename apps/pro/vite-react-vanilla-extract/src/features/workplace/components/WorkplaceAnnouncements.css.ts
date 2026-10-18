import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const announcement = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-16'],
  padding: 'var(--vd-spacing-16) var(--vd-spacing-20)',
  '@media': {
    '(max-width: 640px)': {
      flexWrap: 'wrap',
    },
  },
});

export const announcementMarker = style({
  width: '3px',
  alignSelf: 'stretch',
  background: tokens['--vd-brand-primary'],
  borderRadius: 'var(--vd-shape-radius-4, var(--vd-radius-4))',
  flex: 'none',
});

globalStyle(`${announcement} strong`, {
  fontSize: tokens['--vd-font-size-12'],
  fontWeight: tokens['--vd-font-weight-500'],
});

globalStyle(`${announcement} p`, {
  margin: 'var(--vd-spacing-4) 0 0',
  fontSize: tokens['--vd-font-size-11'],
  color: tokens['--vd-text-tertiary'],
  lineHeight: tokens['--vd-line-height-4'],
});

globalStyle(`${announcement} > span:last-child`, {
  marginInlineStart: 'auto',
  flex: 'none',
});

globalStyle(`${announcement} > span:last-child`, {
  '@media': {
    '(max-width: 640px)': {
      display: 'none',
    },
  },
});

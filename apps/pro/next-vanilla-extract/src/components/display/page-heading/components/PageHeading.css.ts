import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const heading = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-20'],
  padding: tokens['--vd-spacing-20'],
  '@media': {
    '(max-width: 640px)': {
      alignItems: 'flex-start',
      flexDirection: 'column',
      gap: tokens['--vd-spacing-12'],
      padding: tokens['--vd-spacing-16'],
    },
  },
});

export const headingSurface = style({
  minWidth: 0,
});

export const integratedHeading = style({
  borderBottom: 'var(--vd-stroke-width, var(--vd-border-width-1)) solid var(--vd-border-subtle)',
});

export const headingCopy = style({
  flex: '1',
  minWidth: 0,
  overflowWrap: 'anywhere',
});

export const headingActions = style({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: tokens['--vd-spacing-8'],
  flex: 'none',
  maxWidth: '100%',
  fontSize: tokens['--vd-font-size-12'],
  '@media': {
    '(max-width: 640px)': {
      width: '100%',
    },
  },
});

export const titleLine = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-12'],
});

globalStyle(`${heading} p`, {
  margin: 'var(--vd-spacing-8) 0 0',
  color: tokens['--vd-text-secondary'],
  fontSize: tokens['--vd-font-size-13'],
  lineHeight: 1.7,
});

globalStyle(`${titleLine} h1`, {
  margin: 0,
  fontSize: tokens['--vd-typography-ui-display-small-font-size'],
  fontWeight: tokens['--vd-typography-ui-display-small-font-weight'],
  lineHeight: tokens['--vd-typography-ui-display-small-line-height'],
  letterSpacing: '-0.6px',
});

globalStyle(`${titleLine} h1`, {
  '@media': {
    '(max-width: 640px)': {
      fontSize: tokens['--vd-font-size-24'],
      lineHeight: 1.3,
    },
  },
});

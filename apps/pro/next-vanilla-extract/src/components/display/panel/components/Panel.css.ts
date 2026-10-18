import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: tokens['--vd-spacing-8'],
});

export const panel = style({
  minWidth: 0,
});

export const panelHeading = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-16'],
  padding: tokens['--vd-spacing-20'],
  borderBottom: '1px solid var(--vd-border-subtle)',
  '@media': {
    '(max-width: 640px)': {
      alignItems: 'flex-start',
      flexDirection: 'column',
      gap: tokens['--vd-spacing-12'],
      padding: tokens['--vd-spacing-16'],
    },
  },
});

globalStyle(`${panelHeading} h2`, {
  margin: 0,
  fontSize: tokens['--vd-font-size-14'],
  fontWeight: 600,
});

globalStyle(`${panelHeading} p`, {
  margin: 'var(--vd-spacing-4) 0 0',
  fontSize: tokens['--vd-font-size-12'],
  color: tokens['--vd-text-tertiary'],
});

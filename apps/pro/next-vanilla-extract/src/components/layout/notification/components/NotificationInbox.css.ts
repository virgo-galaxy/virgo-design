import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const heading = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  marginBottom: '12px',
});

export const list = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  maxHeight: 'min(440px, 65dvh)',
  overflow: 'auto',
});

export const item = style({
  selectors: {
    '&[data-variant=text]': {
      height: 'auto',
      whiteSpace: 'normal',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '6px',
      textAlign: 'start',
      width: '100%',
      padding: '14px 6px',
      border: 0,
      background: 'transparent',
      color: tokens['--vd-text-primary'],
      cursor: 'pointer',
      borderRadius: '4px',
    },
    '&[data-variant=text]:hover': {
      background: tokens['--vd-surface-secondary'],
    },
    '&:focus-visible': {
      outline: '2px solid var(--vd-brand-primary)',
      outlineOffset: '-2px',
    },
  },
});

export const itemHeading = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '13px',
});

export const statusIcon = style({
  display: 'inline-flex',
  color: tokens['--vd-text-secondary'],
  flexShrink: 0,
});

export const task = style({
  fontSize: '13px',
  lineHeight: 1.6,
  paddingInlineStart: '24px',
});

export const meta = style({
  fontSize: '12px',
  color: tokens['--vd-text-secondary'],
  paddingInlineStart: '24px',
});

export const unavailable = style({
  fontSize: '12px',
  color: tokens['--vd-text-secondary'],
  paddingInlineStart: '24px',
});

export const empty = style({
  padding: '28px 12px',
  textAlign: 'center',
  color: tokens['--vd-text-secondary'],
});

globalStyle(`${list} li + li`, {
  borderTop: '1px solid var(--vd-border-subtle)',
});

globalStyle(`${item}[data-variant=text] [data-slot=label]`, {
  display: 'grid',
  justifyItems: 'start',
  gap: tokens['--vd-spacing-6'],
  width: '100%',
});

globalStyle(`li[data-unread] ${statusIcon}`, {
  color: tokens['--vd-brand-primary'],
});

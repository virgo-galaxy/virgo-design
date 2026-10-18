import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const sidebar = style({
  marginBlockStart: 'var(--pro-header-height)',
  borderInlineEnd: 'var(--vd-stroke-width, var(--vd-border-width-1)) solid var(--vd-border-subtle)',
  selectors: {
    '&[data-resizable]': {
      borderInlineEnd: 0,
    },
  },
});

export const sidebarBackdrop = style({
  selectors: {
    '&[data-state]': {
      position: 'absolute',
      inset: 0,
      insetBlockStart: 'var(--pro-header-height)',
      zIndex: 1,
      width: '100%',
      height: '100%',
      borderRadius: 0,
      background: 'color-mix(in srgb, var(--vd-text-primary) 4%, transparent)',
    },
    '&[data-state]:hover': {
      background: 'color-mix(in srgb, var(--vd-text-primary) 4%, transparent)',
    },
  },
});

globalStyle(`${sidebar} [data-slot=sidebar-contents]`, {
  paddingBlockStart: tokens['--vd-spacing-8'],
});

globalStyle(`${sidebar} [data-slot=sidebar-body]`, {
  scrollbarWidth: 'thin',
  paddingBlock: tokens['--vd-spacing-4'],
});

globalStyle(`${sidebar}[data-state=collapsed] [data-slot=sidebar-body]`, {
  paddingInline: tokens['--vd-spacing-4'],
});

globalStyle(`${sidebarBackdrop}[data-state] > svg`, {
  display: 'none',
});

globalStyle(`${sidebar} [data-slot=sidebar-contents]`, {
  '@media': {
    '(max-width: 900px)': {
      paddingBlockStart: tokens['--vd-spacing-4'],
    },
  },
});

globalStyle(`${sidebar} [data-slot=sidebar-contents]`, {
  '@media': {
    '(max-width: 640px)': {
      paddingBlockStart: 0,
    },
  },
});

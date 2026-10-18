import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const shortcut = style({
  selectors: {
    '&[data-variant=text]': {
      width: '100%',
      justifyContent: 'flex-start',
      height: 'auto',
      padding: tokens['--vd-spacing-8'],
      whiteSpace: 'normal',
      textAlign: 'start',
      gap: tokens['--vd-spacing-12'],
      vars: {
        '--button-foreground': tokens['--vd-text-primary'],
        '--button-background-hover': tokens['--vd-brand-subtle-hover'],
        '--button-background-active':
          'color-mix(\n    in srgb,\n    var(--vd-brand-primary) 24%,\n    var(--vd-surface-default)\n  )',
      },
    },
    '&[data-variant=text]:focus-visible': {
      outlineOffset: 'calc(-1 * var(--vd-border-width-2))',
    },
  },
});

export const shortcutCopy = style({
  display: 'grid',
  gap: tokens['--vd-spacing-4'],
});

globalStyle(`${shortcut}[data-variant=text]:hover [data-slot=leading-icon]`, {
  color: tokens['--vd-brand-link'],
});

globalStyle(`${shortcut}[data-variant=text]:hover [data-slot=trailing-icon]`, {
  color: tokens['--vd-brand-link'],
});

globalStyle(`${shortcut}[data-variant=text]:focus-visible [data-slot=leading-icon]`, {
  color: tokens['--vd-brand-link'],
});

globalStyle(`${shortcut}[data-variant=text]:focus-visible [data-slot=trailing-icon]`, {
  color: tokens['--vd-brand-link'],
});

globalStyle(`${shortcut}[data-variant=text]:hover [data-slot=leading-icon]`, {
  background: 'color-mix(in srgb, var(--vd-brand-primary) 14%, transparent)',
});

globalStyle(`${shortcut}[data-variant=text]:focus-visible [data-slot=leading-icon]`, {
  background: 'color-mix(in srgb, var(--vd-brand-primary) 14%, transparent)',
});

globalStyle(`${shortcut}[data-variant=text] [data-slot=label]`, {
  flex: '1',
  minWidth: 0,
});

globalStyle(`${shortcut}[data-variant=text] [data-slot=trailing-icon]`, {
  marginInlineStart: 'auto',
  color: tokens['--vd-icon-tertiary'],
});

globalStyle(`${shortcut}[data-variant=text] [data-slot=leading-icon]`, {
  marginInlineEnd: 0,
  width: tokens['--vd-sizing-32'],
  height: tokens['--vd-sizing-32'],
  background: tokens['--vd-surface-secondary'],
  borderRadius: 'var(--vd-shape-radius-6, var(--vd-radius-6))',
});

globalStyle(`${shortcut}[data-variant=text] [data-slot=leading-icon] svg`, {
  width: tokens['--vd-sizing-16'],
  height: tokens['--vd-sizing-16'],
});

globalStyle(`${shortcutCopy} strong`, {
  fontSize: tokens['--vd-font-size-12'],
  fontWeight: tokens['--vd-font-weight-500'],
});

globalStyle(`${shortcutCopy} > span`, {
  fontSize: tokens['--vd-font-size-10'],
  color: tokens['--vd-text-tertiary'],
  fontWeight: tokens['--vd-font-weight-400'],
});

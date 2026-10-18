import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const settingsRoot = style({
  display: 'block',
});

export const shell = style({
  height: '100dvh',
  overflow: 'hidden',
  color: tokens['--vd-text-primary'],
  background: tokens['--vd-surface-background'],
});

export const body = style({
  position: 'relative',
  overflow: 'hidden',
});

export const skipLink = style({
  position: 'fixed',
  top: tokens['--vd-spacing-8'],
  left: tokens['--vd-spacing-8'],
  padding: tokens['--vd-spacing-12'],
  zIndex: 10,
  background: tokens['--vd-surface-default'],
  color: tokens['--vd-brand-link'],
  transform: 'translateY(-200%)',
  selectors: {
    '&:focus': {
      transform: 'none',
    },
  },
});

export const recoveryControls = style({
  position: 'fixed',
  top: tokens['--vd-spacing-8'],
  right: tokens['--vd-spacing-48'],
  zIndex: 10,
  display: 'flex',
  gap: tokens['--vd-spacing-8'],
  alignItems: 'center',
  padding: tokens['--vd-spacing-4'],
  background: tokens['--vd-surface-default'],
  borderRadius: tokens['--vd-radius-8'],
  border: 'var(--vd-border-width-1) solid var(--vd-border-subtle)',
});

export const main = style({
  outline: 'none',
  background: 'color-mix(in srgb, var(--vd-surface-secondary) 35%, var(--vd-surface-background))',
  scrollbarWidth: 'thin',
  scrollPaddingBlockStart: 'var(--pro-header-height)',
});

export const content = style({
  vars: {
    '--pro-content-padding': tokens['--vd-spacing-24'],
  },
  width: '100%',
  padding: 'var(--pro-content-padding)',
  paddingBlockStart: 'calc(var(--pro-header-height) + var(--pro-content-padding))',
  selectors: {
    '&[data-layout=fill]': {
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
    },
  },
  '@media': {
    '(max-width: 900px)': {
      vars: {
        '--pro-content-padding': tokens['--vd-spacing-20'],
      },
    },
    '(max-width: 640px)': {
      vars: {
        '--pro-content-padding': tokens['--vd-spacing-16'],
      },
    },
  },
});

export const pageContent = style({
  minWidth: 0,
});

export const contextBar = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: tokens['--vd-spacing-12'],
  marginBlockEnd: tokens['--vd-spacing-24'],
});

export const breadcrumbIcon = style({
  gap: 0,
});

export const breadcrumbIconLabel = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
});

globalStyle(`${content}[data-layout=fill] ${pageContent}`, {
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
});

globalStyle(`${content}[data-layout=fill] ${pageContent} > *`, {
  flex: '1',
});

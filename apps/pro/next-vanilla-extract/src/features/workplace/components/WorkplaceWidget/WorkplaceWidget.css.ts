import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const widgetShell = style({
  vars: {
    '--pro-window-control-content': 'none',
    '--pro-window-control-size': '14px',
    '--pro-window-control-collapse-background': 'initial',
    '--pro-window-control-close-background': 'initial',
    '--pro-window-control-collapse-foreground': 'initial',
    '--pro-window-control-close-foreground': 'initial',
    '--pro-window-control-border': 'initial',
    '--pro-window-control-shadow': 'initial',
    '--pro-window-control-symbol-opacity': '1',
    '--pro-window-control-icon-size': 'initial',
  },
  border: 0,
  borderRadius: 0,
  minWidth: 0,
});

export const widgetCard = style({
  selectors: {
    '&[data-size=md]': {
      alignContent: 'start',
      vars: {
        '--card-padding': tokens['--vd-spacing-20'],
        '--card-title-font-size': tokens['--vd-font-size-14'],
        '--card-gap': tokens['--vd-spacing-20'],
      },
    },
  },
});

export const widgetDisclosure = style({
  border: 0,
  borderRadius: 0,
  minWidth: 0,
});

export const widgetPresence = style({
  vars: {
    '--collapsible-content-padding': '0',
  },
});

export const widgetBody = style({
  vars: {
    '--collapsible-content-padding': '0',
  },
});

export const widgetSpacing = style({
  paddingBlockEnd: tokens['--vd-spacing-20'],
});

export const widgetHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-8'],
});

export const widgetActions = style({
  display: 'flex',
  flex: 'none',
  gap: tokens['--vd-spacing-2'],
});

export const widgetControl = style({
  selectors: {
    '&[data-variant=text]': {
      position: 'relative',
      vars: {
        '--button-height': tokens['--vd-sizing-24'],
        '--button-foreground': tokens['--vd-icon-secondary'],
        '--button-icon-size': 'var(--pro-window-control-icon-size, var(--vd-sizing-12))',
        '--window-control-background': 'var(--pro-window-control-collapse-background, transparent)',
      },
      width: 'var(--button-height)',
      height: 'var(--button-height)',
      padding: 0,
    },
    '&[data-variant=text][data-window-action=collapse]': {
      color: 'var(--pro-window-control-collapse-foreground, var(--vd-text-primary))',
    },
    '&[data-variant=text][data-window-action=close]': {
      vars: {
        '--window-control-background': 'var(--pro-window-control-close-background, transparent)',
      },
      color: 'var(--pro-window-control-close-foreground, var(--vd-icon-secondary))',
    },
    '&[data-variant=text]::before': {
      position: 'absolute',
      width: 'var(--pro-window-control-size)',
      height: 'var(--pro-window-control-size)',
      boxSizing: 'border-box',
      border: '1px solid var(--pro-window-control-border, transparent)',
      borderRadius: tokens['--vd-radius-full'],
      background: 'var(--window-control-background)',
      boxShadow: 'var(--pro-window-control-shadow, none)',
      content: 'var(--pro-window-control-content)',
      pointerEvents: 'none',
    },
  },
});

export const widgetBodyInner = style({
  paddingBlockStart: tokens['--vd-spacing-16'],
});

globalStyle(`[data-virgo-theme='glass'] ${widgetShell}`, {
  vars: {
    '--pro-window-control-content': "''",
    '--pro-window-control-collapse-background': 'linear-gradient(#ffd85d, #ffbd2e)',
    '--pro-window-control-close-background': 'linear-gradient(#ff827c, #ff5f57)',
    '--pro-window-control-collapse-foreground': '#825500',
    '--pro-window-control-close-foreground': '#8c1813',
    '--pro-window-control-border': 'rgb(0 0 0 / 15%)',
    '--pro-window-control-shadow':
      'inset 0 1px 0 rgb(255 255 255 / 25%), 0 1px 2px rgb(0 0 0 / 12%)',
    '--pro-window-control-symbol-opacity': '0',
    '--pro-window-control-icon-size': '10px',
  },
});

globalStyle(`${widgetControl}[data-variant=text] > [data-slot=icon]`, {
  position: 'relative',
  opacity: 'var(--pro-window-control-symbol-opacity)',
});

globalStyle(`${widgetControl}[data-variant=text]:focus-visible > [data-slot=icon]`, {
  opacity: 1,
});

globalStyle(`${widgetActions}:hover ${widgetControl} > [data-slot=icon]`, {
  opacity: 1,
});

globalStyle(`${widgetActions}:focus-within ${widgetControl} > [data-slot=icon]`, {
  opacity: 1,
});

globalStyle(`${widgetBodyInner} > p`, {
  marginBlockEnd: tokens['--vd-spacing-16'],
});

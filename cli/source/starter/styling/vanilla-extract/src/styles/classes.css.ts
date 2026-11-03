import { globalStyle, style } from '@vanilla-extract/css';

export const shell = style({
  height: '100dvh',
  overflow: 'hidden',
  backgroundColor: 'var(--vd-surface-background)',
  color: 'var(--vd-text-primary)',
  vars: {
    '--pro-header-height': '64px',
  },
});

export const skipLink = style({
  position: 'fixed',
  top: 'var(--vd-spacing-8)',
  left: 'var(--vd-spacing-8)',
  zIndex: 10,
  transform: 'translateY(-200%)',
  padding: 'var(--vd-spacing-12)',
  backgroundColor: 'var(--vd-surface-default)',
  color: 'var(--vd-brand-link)',
});

export const frame = style({
  position: 'relative',
  overflow: 'hidden',
});

export const main = style({
  outline: 'none',
  background: 'color-mix(in srgb, var(--vd-surface-secondary) 35%, var(--vd-surface-background))',
  scrollbarWidth: 'thin',
  scrollPaddingBlockStart: 'var(--pro-header-height)',
});

export const mainInner = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
  width: '100%',
  padding: 'var(--pro-content-padding)',
  paddingBlockStart: 'calc(var(--pro-header-height) + var(--pro-content-padding))',
  vars: {
    '--pro-content-padding': 'var(--vd-spacing-24)',
  },
  '@media': {
    '(max-width: 900px)': {
      vars: {
        '--pro-content-padding': 'var(--vd-spacing-20)',
      },
    },
    '(max-width: 640px)': {
      vars: {
        '--pro-content-padding': 'var(--vd-spacing-16)',
      },
    },
  },
});

export const breadcrumb = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 'var(--vd-spacing-12)',
  marginBlockEnd: 'var(--vd-spacing-24)',
});

export const breadcrumbIcon = style({
  gap: '0',
});

export const visuallyHidden = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
});

export const outlet = style({
  display: 'flex',
  minWidth: '0',
  flex: 1,
  flexDirection: 'column',
});

export const navbar = style({
  position: 'absolute',
  insetBlockStart: '0',
  insetInline: '0',
  flex: 'none',
  borderBottom: 'var(--vd-stroke-width, var(--vd-border-width-1)) solid var(--vd-border-subtle)',
  zIndex: 4,
  '@media': {
    '(max-width: 640px)': {
      paddingInline: 'var(--vd-spacing-12)',
      gap: 'var(--vd-spacing-12)',
    },
  },
});

export const toolbar = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--vd-spacing-8)',
  '@media': {
    '(max-width: 640px)': {
      gap: 'var(--vd-spacing-4)',
    },
  },
});

export const brand = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--vd-spacing-8)',
  color: 'var(--vd-text-primary)',
  textDecoration: 'none',
  fontSize: 'var(--vd-font-size-16)',
  fontWeight: 'var(--vd-font-weight-600)',
  letterSpacing: '-0.5px',
});

export const brandTrigger = style({
  flex: 'none',
  width: 'var(--vd-sizing-36)',
  height: 'var(--vd-sizing-36)',
});

export const brandLink = style({
  color: 'inherit',
  textDecoration: 'none',
  '@media': {
    '(max-width: 640px)': {
      display: 'none',
    },
  },
});

export const brandTag = style({});

export const sidebar = style({
  marginBlockStart: 'var(--pro-header-height)',
  borderInlineEnd: 'var(--vd-stroke-width, var(--vd-border-width-1)) solid var(--vd-border-subtle)',
});

export const backdrop = style({});

export const sidebarControls = style({
  display: 'flex',
  boxSizing: 'border-box',
  flex: 1,
  minWidth: '0',
  minHeight: 'var(--vd-sizing-28)',
  justifyContent: 'center',
});

export const workspace = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--vd-spacing-8)',
  color: 'var(--vd-text-tertiary)',
  fontFamily: 'var(--vd-font-family-mono)',
  fontSize: 'var(--vd-font-size-10)',
  letterSpacing: '0.8px',
  whiteSpace: 'nowrap',
});

export const statusDot = style({
  flex: 'none',
});

export const sidebarTooltip = style({});

export const sidebarTrigger = style({
  flex: 'none',
  width: 'var(--vd-sizing-28)',
  minWidth: 'var(--vd-sizing-28)',
  height: 'var(--vd-sizing-28)',
});

export const navigation = style({
  padding: 'var(--vd-spacing-4) var(--vd-spacing-8)',
  fontSize: 'var(--vd-font-size-13)',
  vars: {
    '--navigation-menu-control-height': 'var(--vd-control-medium-height, var(--vd-sizing-36))',
    '--navigation-menu-radius': 'var(--vd-shape-radius-6, var(--vd-radius-6))',
    '--navigation-menu-icon-size': 'var(--vd-sizing-16)',
  },
});

export const navigationGroup = style({
  fontWeight: 600,
});

export const navigationContent = style({
  fontSize: 'var(--vd-font-size-13)',
});

export const footer = style({
  textAlign: 'center',
  marginBlockStart: 'var(--vd-spacing-24)',
  paddingBlock: 'var(--vd-spacing-16) var(--vd-spacing-4)',
  color: 'var(--vd-text-tertiary)',
  fontSize: 'var(--vd-font-size-11)',
});

export const footerBrand = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--vd-spacing-4)',
});

export const heading = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 'var(--vd-spacing-20)',
  padding: 'var(--vd-spacing-20)',
  '@media': {
    '(max-width: 640px)': {
      alignItems: 'flex-start',
      flexDirection: 'column',
      gap: 'var(--vd-spacing-12)',
      padding: 'var(--vd-spacing-16)',
    },
  },
});

export const headingBody = style({
  flex: 1,
  minWidth: '0',
  overflowWrap: 'anywhere',
});

export const headingTitleRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--vd-spacing-12)',
});

export const headingTitle = style({
  margin: '0',
  fontSize: 'var(--vd-typography-ui-display-small-font-size)',
  fontWeight: 'var(--vd-typography-ui-display-small-font-weight)',
  lineHeight: 'var(--vd-typography-ui-display-small-line-height)',
  letterSpacing: '-0.6px',
  '@media': {
    '(max-width: 640px)': {
      fontSize: 'var(--vd-font-size-24)',
      lineHeight: 1.3,
    },
  },
});

export const headingDescription = style({
  margin: 'var(--vd-spacing-8) 0 0',
  color: 'var(--vd-text-secondary)',
  fontSize: 'var(--vd-font-size-13)',
  lineHeight: 1.7,
});

export const headingActions = style({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 'var(--vd-spacing-8)',
  flex: 'none',
  maxWidth: '100%',
  fontSize: 'var(--vd-font-size-12)',
  '@media': {
    '(max-width: 640px)': {
      width: '100%',
    },
  },
});

export const headingSurface = style({
  minWidth: '0',
});

export const workplace = style({
  minWidth: '0',
  flex: 1,
});

export const errorPage = style({
  marginInline: 'auto',
  maxWidth: '64rem',
});

export const errorTitle = style({
  fontSize: '1.5rem',
  lineHeight: 'calc(2 / 1.5)',
  fontWeight: 600,
});

export const errorLink = style({
  marginTop: 'var(--vd-spacing-4)',
  display: 'inline-block',
  color: 'var(--vd-brand-link)',
  textDecoration: 'underline',
});

export const headingIntegrated = style({
  borderBottom: 'var(--vd-stroke-width, var(--vd-border-width-1)) solid var(--vd-border-subtle)',
});

globalStyle(`${skipLink}:focus`, {
  transform: 'none',
});
globalStyle(`${brand} img`, {
  display: 'block',
  flex: 'none',
  width: 'var(--vd-sizing-32)',
  height: 'auto',
});
globalStyle(`${brand}[data-scale='large']`, {
  fontSize: 'var(--vd-font-size-20)',
});
globalStyle(`${brand}[data-scale='large'] img`, {
  width: 'var(--vd-sizing-40)',
});
globalStyle(`${brandTrigger}:not([data-state='hidden']):hover`, {
  color: 'inherit',
  background: 'transparent',
});
globalStyle(`${brandTrigger}:not([data-state='hidden']):active`, {
  color: 'inherit',
  background: 'transparent',
});
globalStyle(`${brand}[data-scale='large'] ${brandTrigger}`, {
  width: 'var(--vd-sizing-44)',
  height: 'var(--vd-sizing-44)',
});
globalStyle(`${brandTag}[data-intent='brand']`, {
  borderColor: 'color-mix(in srgb, var(--vd-brand-primary) 24%, transparent)',
});
globalStyle(`${sidebar} [data-slot='sidebar-contents']`, {
  paddingTop: 'var(--vd-spacing-8)',
});
globalStyle(`${sidebar} [data-slot='sidebar-body']`, {
  scrollbarWidth: 'thin',
  paddingBlock: 'var(--vd-spacing-4)',
});
globalStyle(`${sidebar}[data-state='collapsed'] [data-slot='sidebar-body']`, {
  paddingInline: 'var(--vd-spacing-4)',
});
globalStyle(`${backdrop}[data-state]`, {
  position: 'absolute',
  inset: '0',
  insetBlockStart: 'var(--pro-header-height)',
  zIndex: 1,
  width: '100%',
  height: '100%',
  borderRadius: '0',
  background: 'color-mix(in srgb, var(--vd-text-primary) 4%, transparent)',
});
globalStyle(`${backdrop}[data-state] > svg`, {
  display: 'none',
});
globalStyle(`${backdrop}[data-state]:hover`, {
  background: 'color-mix(in srgb, var(--vd-text-primary) 4%, transparent)',
});
globalStyle(`${sidebarControls}[data-state='expanded']`, {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) var(--vd-sizing-28)',
  columnGap: 'var(--vd-spacing-8)',
  alignItems: 'center',
  paddingInline: 'var(--vd-spacing-8)',
});
globalStyle(`${sidebarControls}[data-state='expanded'] ${workspace}`, {
  gridColumn: '1',
  justifySelf: 'center',
});
globalStyle(`${sidebarControls}[data-state='expanded'] ${sidebarTooltip}`, {
  gridColumn: '2',
  justifySelf: 'end',
});
globalStyle(`${sidebarTrigger} > svg`, {
  width: 'var(--vd-sizing-16)',
  height: 'var(--vd-sizing-16)',
});
globalStyle(
  `${sidebarControls}[data-state='collapsed'][data-rail-icon-size='large'] ${sidebarTrigger} > svg`,
  {
    flex: 'none',
    width: 'var(--vd-sizing-20)',
    height: 'var(--vd-sizing-20)',
  },
);
globalStyle(`${navigation}[data-compact='true']`, {
  vars: { '--navigation-menu-control-padding': 'var(--vd-spacing-4)' },
  paddingInline: 'var(--vd-spacing-4)',
});
globalStyle(`${navigation}[data-compact='true'] [data-slot='label']`, {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
});
globalStyle(`${navigation}[data-compact='true'] [data-vd-navigation-menu-control]`, {
  justifyContent: 'center',
});
globalStyle(`${navigation} a[data-vd-navigation-menu-control][data-active='true']`, {
  color: 'var(--vd-brand-link)',
  backgroundColor: 'var(--vd-brand-subtle-hover)',
  fontWeight: 'var(--vd-font-weight-500)',
});
globalStyle(`${navigation} a[data-vd-navigation-menu-control][data-active='true']:hover`, {
  color: 'var(--vd-brand-link)',
  backgroundColor: 'var(--vd-brand-subtle-hover)',
  fontWeight: 'var(--vd-font-weight-500)',
});
globalStyle(
  `${navigation}[data-compact='true'][data-rail-icon-size='large'] [data-slot='icon'] > svg`,
  {
    flex: 'none',
    width: 'var(--vd-sizing-20)',
    height: 'var(--vd-sizing-20)',
  },
);
globalStyle(`${navigationContent} a[data-active='true']`, {
  color: 'var(--vd-brand-link)',
  backgroundColor: 'var(--vd-brand-subtle-hover)',
});
globalStyle(`${footer} a`, {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--vd-spacing-4)',
  color: 'inherit',
  textDecoration: 'none',
});
globalStyle(`${footer} a:hover`, {
  color: 'var(--vd-brand-link)',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
});
globalStyle(`${footer} a:focus-visible`, {
  outline: 'var(--vd-border-width-2) solid var(--vd-border-focus)',
  outlineOffset: 'var(--vd-spacing-4)',
  borderRadius: 'var(--vd-shape-radius-4, var(--vd-radius-4))',
});
globalStyle(`${sidebar} [data-slot='sidebar-contents']`, {
  '@media': {
    '(max-width: 900px)': {
      paddingTop: 'var(--vd-spacing-4)',
    },
  },
});
globalStyle(`${brand} > span`, {
  '@media': {
    '(max-width: 640px)': {
      display: 'none',
    },
  },
});
globalStyle(`${sidebar} [data-slot='sidebar-contents']`, {
  '@media': {
    '(max-width: 640px)': {
      paddingTop: '0',
    },
  },
});

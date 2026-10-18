import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const navigation = style({
  vars: {
    '--navigation-menu-control-height': 'var(--vd-control-medium-height, var(--vd-sizing-36))',
    '--navigation-menu-radius': 'var(--vd-shape-radius-6, var(--vd-radius-6))',
    '--navigation-menu-icon-size': tokens['--vd-sizing-16'],
  },
  padding: 'var(--vd-spacing-4) var(--vd-spacing-8)',
  fontSize: tokens['--vd-font-size-13'],
  selectors: {
    '&[data-compact=true]': {
      vars: {
        '--navigation-menu-control-padding': tokens['--vd-spacing-4'],
      },
      paddingInline: tokens['--vd-spacing-4'],
    },
  },
});

export const groupTrigger = style({});

export const subnavigation = style({
  vars: {
    '--navigation-menu-control-height': 'var(--vd-control-medium-height, var(--vd-sizing-36))',
    '--navigation-menu-radius': 'var(--vd-shape-radius-6, var(--vd-radius-6))',
  },
  fontSize: tokens['--vd-font-size-13'],
});

export const labelGroup = style({});

export const fixedGroupLabel = style({});

export const submenuLabel = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-8'],
  color: tokens['--vd-brand-link'],
  fontSize: tokens['--vd-font-size-13'],
  fontWeight: tokens['--vd-font-weight-600'],
});

export const submenuSeparator = style({
  marginBlockEnd: tokens['--vd-spacing-4'],
});

globalStyle(`${navigation} ${groupTrigger}`, {
  background: 'transparent',
  color: tokens['--vd-text-primary'],
  fontWeight: tokens['--vd-font-weight-600'],
});

globalStyle(`${navigation} ${groupTrigger}:hover`, {
  background: tokens['--vd-fill-hover'],
});

globalStyle(`${navigation} ${groupTrigger}[data-current-group=true]`, {
  color: tokens['--vd-brand-link'],
});

globalStyle(`${navigation} ${groupTrigger}[data-current-group=true]:hover`, {
  color: tokens['--vd-brand-link'],
});

globalStyle(`${navigation} ${groupTrigger}[data-current-group=true] [data-slot=icon]`, {
  color: 'inherit',
});

globalStyle(`${navigation} ${groupTrigger}[data-current-group=true] [data-slot=indicator]`, {
  color: 'inherit',
});

globalStyle(`${navigation} ${subnavigation}[data-slot=content]`, {
  marginInlineStart: 0,
  paddingInlineStart: 0,
  borderInlineStart: 0,
});

globalStyle(`${navigation} ${subnavigation}[data-slot=content] [data-vd-navigation-menu-control]`, {
  paddingInlineStart:
    'calc(var(--navigation-menu-control-padding) + var(--navigation-menu-icon-size) + var(--vd-spacing-8))',
});

globalStyle(`${navigation}[data-compact=true] [data-slot=label]`, {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
});

globalStyle(`${navigation}[data-compact=true] [data-vd-navigation-menu-control]`, {
  justifyContent: 'center',
});

globalStyle(`${navigation} a[data-vd-navigation-menu-control][data-active=true]`, {
  color: tokens['--vd-brand-link'],
  background: tokens['--vd-brand-subtle-hover'],
  fontWeight: tokens['--vd-font-weight-500'],
});

globalStyle(`${navigation} a[data-vd-navigation-menu-control][data-active=true]:hover`, {
  color: tokens['--vd-brand-link'],
  background: tokens['--vd-brand-subtle-hover'],
  fontWeight: tokens['--vd-font-weight-500'],
});

globalStyle(`${subnavigation} a[data-vd-navigation-menu-control][data-active=true]`, {
  color: tokens['--vd-brand-link'],
  background: tokens['--vd-brand-subtle-hover'],
  fontWeight: tokens['--vd-font-weight-500'],
});

globalStyle(`${subnavigation} a[data-vd-navigation-menu-control][data-active=true]:hover`, {
  color: tokens['--vd-brand-link'],
  background: tokens['--vd-brand-subtle-hover'],
  fontWeight: tokens['--vd-font-weight-500'],
});

globalStyle(`${labelGroup} > [data-slot=list]`, {
  marginBlockStart: 'var(--navigation-menu-gap)',
});

globalStyle(`${labelGroup} > [data-slot=list] [data-vd-navigation-menu-control]`, {
  paddingInlineStart:
    'calc(var(--navigation-menu-control-padding) + var(--navigation-menu-icon-size) + var(--vd-spacing-8))',
});

globalStyle(`${navigation} ${fixedGroupLabel}`, {
  boxSizing: 'border-box',
  display: 'flex',
  minHeight: 'var(--navigation-menu-control-height)',
  alignItems: 'center',
  gap: tokens['--vd-spacing-8'],
  padding: '0 var(--navigation-menu-control-padding)',
  borderRadius: 'var(--navigation-menu-radius)',
  color: tokens['--vd-text-primary'],
  font: 'inherit',
  fontWeight: tokens['--vd-font-weight-600'],
  transition:
    'color var(--vd-motion-interaction-duration, var(--vd-duration-120)) var(--vd-motion-easing-standard, var(--vd-easing-standard)), background-color var(--vd-motion-interaction-duration, var(--vd-duration-120)) var(--vd-motion-easing-standard, var(--vd-easing-standard))',
});

globalStyle(`${navigation} ${fixedGroupLabel}:hover`, {
  background: tokens['--vd-fill-hover'],
});

globalStyle(`${navigation} ${fixedGroupLabel}[data-current-group=true]`, {
  color: tokens['--vd-brand-link'],
});

globalStyle(`${navigation} ${fixedGroupLabel}[data-current-group=true] > svg`, {
  color: 'inherit',
});

globalStyle(`${navigation} ${fixedGroupLabel} > svg`, {
  flex: 'none',
  width: 'var(--navigation-menu-icon-size)',
  height: 'var(--navigation-menu-icon-size)',
  color: tokens['--vd-icon-secondary'],
});

globalStyle(`${submenuLabel} > svg`, {
  flex: 'none',
  width: tokens['--vd-sizing-16'],
  height: tokens['--vd-sizing-16'],
  color: tokens['--vd-brand-link'],
});

globalStyle(`${navigation}[data-compact=true][data-rail-icon-size=large] [data-slot=icon] > svg`, {
  flex: 'none',
  width: tokens['--vd-sizing-20'],
  height: tokens['--vd-sizing-20'],
});

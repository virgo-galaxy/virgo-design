import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const dialog = style({
  selectors: {
    '&[data-size=lg]': {
      vars: {
        '--dialog-width': '900px',
      },
      height: 'min(960px, 100dvh - var(--vd-spacing-48))',
      maxHeight: 'calc(100dvh - var(--vd-spacing-48))',
    },
  },
});

export const body = style({
  flex: '1 1 auto',
  minHeight: 0,
});

export const header = style({
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  alignItems: 'start',
});

export const heading = style({
  display: 'grid',
  gap: tokens['--vd-spacing-6'],
});

export const tab = style({
  paddingBlock: tokens['--vd-spacing-20'],
  display: 'grid',
  gap: tokens['--vd-spacing-20'],
  selectors: {
    '&[hidden]': {
      display: 'none',
    },
  },
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: tokens['--vd-spacing-16'],
  '@media': {
    '(max-width: 440px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
});

export const toggleGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: tokens['--vd-spacing-16'],
  '@media': {
    '(max-width: 440px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
});

export const toggle = style({
  display: 'flex',
  gap: tokens['--vd-spacing-16'],
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: tokens['--vd-sizing-36'],
  fontSize: tokens['--vd-font-size-12'],
});

export const hint = style({
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-12'],
  lineHeight: 1.6,
  margin: 0,
});

export const group = style({
  margin: 0,
  padding: tokens['--vd-spacing-16'],
  border: '1px solid var(--vd-border-subtle)',
  borderRadius: 'var(--vd-shape-radius-8, var(--vd-radius-8))',
});

export const checks = style({
  display: 'flex',
  gap: tokens['--vd-spacing-20'],
  flexWrap: 'wrap',
});

export const columnsLayout = style({
  display: 'grid',
  gridTemplateColumns: '260px minmax(0, 1fr)',
  gap: tokens['--vd-spacing-24'],
  alignItems: 'start',
  '@media': {
    '(max-width: 680px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
});

export const columnList = style({
  display: 'grid',
  gap: tokens['--vd-spacing-4'],
  paddingBlock: tokens['--vd-spacing-2'],
  '@media': {
    '(max-width: 440px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
});

export const columnSidebar = style({
  display: 'grid',
  gap: tokens['--vd-spacing-16'],
  minWidth: 0,
});

export const columnItem = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-8'],
  paddingInline: tokens['--vd-spacing-4'],
  border: '1px solid transparent',
  borderRadius: 'var(--vd-shape-radius-6, var(--vd-radius-6))',
  selectors: {
    '&[data-dragging=true]': {
      opacity: 0.5,
    },
    '&[data-selected=true]': {
      background: tokens['--vd-brand-subtle'],
    },
    '&[data-drop-position]::after': {
      content: '""',
      position: 'absolute',
      insetInline: 0,
      height: tokens['--vd-border-width-2'],
      background: tokens['--vd-brand-primary'],
      pointerEvents: 'none',
    },
    '&[data-drop-position=before]::after': {
      insetBlockStart: 'calc(-1 * var(--vd-spacing-2))',
    },
    '&[data-drop-position=after]::after': {
      insetBlockEnd: 'calc(-1 * var(--vd-spacing-2))',
    },
  },
});

export const dragHandle = style({
  flex: 'none',
  color: tokens['--vd-text-tertiary'],
  cursor: 'grab',
  selectors: {
    '&:active': {
      cursor: 'grabbing',
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
});

export const columnButton = style({
  flex: '1',
  minWidth: 0,
  justifyContent: 'flex-start',
  whiteSpace: 'nowrap',
  color: tokens['--vd-text-primary'],
});

export const pinButton = style({
  flex: 'none',
  color: tokens['--vd-text-tertiary'],
  selectors: {
    '&[aria-pressed=true]': {
      color: tokens['--vd-brand-link'],
    },
  },
});

export const columnDetail = style({
  display: 'grid',
  gap: tokens['--vd-spacing-16'],
  minWidth: 0,
});

export const widthSetting = style({
  display: 'grid',
  gap: tokens['--vd-spacing-8'],
  paddingBlockEnd: tokens['--vd-spacing-8'],
});

export const columnPreview = style({
  display: 'grid',
  gridTemplateRows: 'minmax(0, 1fr)',
  width: '100%',
  height: '160px',
  minWidth: 0,
  boxSizing: 'border-box',
  padding: tokens['--vd-spacing-16'],
  border: 'var(--vd-stroke-width, var(--vd-border-width-1)) solid var(--vd-border-default)',
  borderRadius: 'var(--vd-shape-radius-8, var(--vd-radius-8))',
  backgroundColor: tokens['--vd-surface-default'],
  backgroundImage:
    'linear-gradient(var(--vd-border-subtle) var(--vd-stroke-width, var(--vd-border-width-1)), transparent 1px), linear-gradient(90deg, var(--vd-border-subtle) var(--vd-stroke-width, var(--vd-border-width-1)), transparent 1px)',
  backgroundSize: 'var(--vd-spacing-24) var(--vd-spacing-24)',
});

export const widthCurrent = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) 120px',
  alignItems: 'center',
  gap: tokens['--vd-spacing-16'],
});

export const widthBounds = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-16'],
  fontSize: tokens['--vd-font-size-12'],
  color: tokens['--vd-text-secondary'],
});

export const headerSettings = style({
  display: 'grid',
  gap: tokens['--vd-spacing-12'],
});

export const controlsHeading = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-16'],
  flexWrap: 'wrap',
});

export const headerAlignment = style({
  display: 'grid',
  gap: tokens['--vd-spacing-8'],
});

export const alignmentRow = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  gap: tokens['--vd-spacing-12'],
  alignItems: 'center',
});

export const alignmentIcon = style({
  display: 'flex',
  alignItems: 'center',
});

export const layoutChoices = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: tokens['--vd-spacing-12'],
  fontSize: tokens['--vd-font-size-14'],
});

export const controlChoices = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  alignItems: 'start',
  gap: tokens['--vd-spacing-12'],
});

export const featureButton = style({
  width: '100%',
  selectors: {
    '&[aria-pressed=false]': {
      color: tokens['--vd-text-secondary'],
    },
  },
});

export const sortMenu = style({
  minWidth: '180px',
});

globalStyle(`${group} legend`, {
  paddingInline: tokens['--vd-spacing-6'],
  fontSize: tokens['--vd-font-size-12'],
});

globalStyle(`[data-selected=true] ${columnButton}`, {
  color: tokens['--vd-brand-link'],
});

globalStyle(`${columnDetail} h3`, {
  margin: 0,
  fontSize: tokens['--vd-font-size-14'],
});

globalStyle(`${widthSetting}[data-width-target=minWidth] [data-slot=thumb][data-index="0"]`, {
  background: tokens['--vd-brand-primary'],
});

globalStyle(`${widthSetting}[data-width-target=width] [data-slot=thumb][data-index="1"]`, {
  background: tokens['--vd-brand-primary'],
});

globalStyle(`${widthSetting}[data-width-target=maxWidth] [data-slot=thumb][data-index="2"]`, {
  background: tokens['--vd-brand-primary'],
});

globalStyle(`${columnPreview} > [role=region]`, {
  minHeight: 0,
});

globalStyle(`${controlsHeading} h4`, {
  margin: 0,
  fontSize: tokens['--vd-font-size-12'],
  fontWeight: tokens['--vd-font-weight-500'],
});

globalStyle(`${headerAlignment} h4`, {
  margin: 0,
  fontSize: tokens['--vd-font-size-12'],
  fontWeight: tokens['--vd-font-weight-500'],
});

globalStyle(`${layoutChoices} [data-slot=label]`, {
  fontSize: tokens['--vd-font-size-14'],
});

globalStyle(`${featureButton}.${featureButton}[aria-pressed=true]`, {
  vars: {
    '--button-background-hover': tokens['--vd-brand-subtle'],
    '--button-background-active': tokens['--vd-brand-subtle'],
    '--button-border-hover': tokens['--vd-brand-primary'],
    '--button-border-active': tokens['--vd-brand-primary'],
  },
  background: tokens['--vd-brand-subtle'],
  borderColor: tokens['--vd-brand-primary'],
  color: tokens['--vd-brand-link'],
});

globalStyle(`${featureButton} svg[data-mode=ascending] [data-slot=sort-descending]`, {
  display: 'none',
});

globalStyle(`${sortMenu} svg[data-mode=ascending] [data-slot=sort-descending]`, {
  display: 'none',
});

globalStyle(`${featureButton} svg[data-mode=descending] [data-slot=sort-ascending]`, {
  display: 'none',
});

globalStyle(`${sortMenu} svg[data-mode=descending] [data-slot=sort-ascending]`, {
  display: 'none',
});

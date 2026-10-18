import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const heatmapCard = style({
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
  vars: {
    '--usage-empty': tokens['--vd-fill-hover'],
    '--usage-1': tokens['--vd-data-sequential-2'],
    '--usage-2': tokens['--vd-data-sequential-3'],
    '--usage-3': tokens['--vd-data-sequential-4'],
    '--usage-4': tokens['--vd-data-sequential-6'],
  },
});

export const panelHeader = style({
  flexWrap: 'wrap',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: tokens['--vd-spacing-12'],
  '@media': {
    '(max-width: 640px)': {
      flexWrap: 'wrap',
    },
  },
});

export const heatmapViewport = style({
  overflowX: 'auto',
  scrollbarWidth: 'thin',
  paddingBlock: tokens['--vd-spacing-4'],
});

export const heatmapCalendar = style({
  display: 'grid',
  gridTemplateColumns: '32px minmax(0, 1fr)',
  gridTemplateRows: 'auto auto',
  gap: tokens['--vd-spacing-8'],
  minWidth: '800px',
  padding: tokens['--vd-spacing-2'],
});

export const heatmapMonths = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(var(--heatmap-weeks), minmax(0, 1fr))',
  gap: '4px',
  gridColumn: '2',
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-11'],
});

export const heatmapDays = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(var(--heatmap-weeks), minmax(0, 1fr))',
  gap: '4px',
  gridColumn: '2',
  gridTemplateRows: 'repeat(7, minmax(0, 1fr))',
});

export const heatmapWeekdays = style({
  display: 'grid',
  gridTemplateRows: 'repeat(7, minmax(0, 1fr))',
  gap: '4px',
  alignItems: 'center',
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-10'],
});

export const heatmapCell = style({
  display: 'block',
  minWidth: 0,
  aspectRatio: '1',
});

export const heatmapDay = style({
  display: 'block',
  width: '100%',
  height: '100%',
  aspectRatio: '1',
  minWidth: 0,
  padding: 0,
  border: 'var(--vd-stroke-width, 1px) solid var(--vd-border-subtle)',
  borderRadius: 'var(--vd-shape-radius-4, 3px)',
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      outline: '2px solid var(--vd-brand-primary)',
      outlineOffset: '1px',
    },
    '&:focus-visible': {
      outline: '2px solid var(--vd-brand-primary)',
      outlineOffset: '1px',
    },
    '&[data-future]': {
      opacity: 0.45,
      cursor: 'default',
    },
  },
});

export const heatmapTooltip = style({
  selectors: {
    '&[data-size]': {
      vars: {
        '--tooltip-background': 'var(--vd-chart-tooltip-surface, var(--vd-surface-elevated))',
        '--tooltip-foreground': tokens['--vd-text-primary'],
        '--vd-tooltip-backdrop-filter': 'var(--vd-chart-tooltip-backdrop-filter, none)',
        '--material-radius':
          'var(--vd-chart-tooltip-radius, var(--vd-shape-radius-8, var(--vd-radius-8)))',
      },
      minWidth: '160px',
      padding: tokens['--vd-spacing-12'],
      border:
        'var(--vd-stroke-width, 1px) solid var(--vd-chart-tooltip-border, var(--vd-border-subtle))',
      borderRadius: 'var(--material-radius)',
      boxShadow: 'var(--vd-chart-tooltip-shadow, var(--vd-elevation-2))',
      pointerEvents: 'none',
    },
  },
});

export const heatmapFooter = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-12'],
  minHeight: '36px',
  marginBlockStart: tokens['--vd-spacing-12'],
  color: tokens['--vd-text-tertiary'],
  fontSize: tokens['--vd-font-size-11'],
});

export const heatmapLegend = style({
  display: 'flex',
  flex: 'none',
  alignItems: 'center',
  gap: tokens['--vd-spacing-4'],
});

export const yearSwitch = style({
  flex: '0 0 auto',
  width: 'fit-content',
  marginInlineStart: 'auto',
});

globalStyle(`${heatmapCard} [data-level="0"]`, {
  background: 'var(--usage-empty)',
});

globalStyle(`${heatmapCard} [data-level="1"]`, {
  background: 'var(--usage-1)',
});

globalStyle(`${heatmapCard} [data-level="2"]`, {
  background: 'var(--usage-2)',
});

globalStyle(`${heatmapCard} [data-level="3"]`, {
  background: 'var(--usage-3)',
});

globalStyle(`${heatmapCard} [data-level="4"]`, {
  background: 'var(--usage-4)',
});

globalStyle(`${heatmapMonths} span`, {
  whiteSpace: 'nowrap',
});

globalStyle(`${heatmapTooltip}[data-size] time`, {
  display: 'block',
  color: tokens['--vd-text-secondary'],
  fontSize: tokens['--vd-font-size-12'],
});

globalStyle(`${heatmapTooltip}[data-size] strong`, {
  display: 'block',
  marginBlockStart: tokens['--vd-spacing-8'],
  fontSize: tokens['--vd-font-size-14'],
  fontWeight: tokens['--vd-font-weight-500'],
  fontVariantNumeric: 'tabular-nums',
});

globalStyle(`${heatmapLegend} i`, {
  width: '11px',
  height: '11px',
  border: 'var(--vd-stroke-width, 1px) solid var(--vd-border-subtle)',
  borderRadius: 'var(--vd-shape-radius-4, 2px)',
});

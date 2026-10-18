import { globalStyle, style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const calendarTrigger = style({
  position: 'relative',
  flex: 'none',
  width: '144px',
  height: '115px',
  marginBlock: '-25px',
  padding: 0,
  border: 0,
  borderRadius: 'var(--vd-shape-radius-8, var(--vd-radius-8))',
  background: 'transparent',
  cursor: 'pointer',
  selectors: {
    '&:focus-visible': {
      outline: 'var(--vd-border-width-2) solid var(--vd-border-focus)',
      outlineOffset: '4px',
    },
  },
  '@media': {
    '(max-width: 640px)': {
      width: '88px',
      height: '71px',
      marginBlock: '-12px',
    },
  },
});

export const tokenCalendarDialog = style({
  selectors: {
    '&[data-size=md]': {
      vars: {
        '--dialog-width': '880px',
        '--dialog-section-padding': tokens['--vd-spacing-24'],
      },
      '@media': {
        '(max-width: 640px)': {
          vars: {
            '--dialog-section-padding': tokens['--vd-spacing-12'],
          },
        },
      },
    },
  },
});

export const tokenCalendarHeader = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: tokens['--vd-spacing-16'],
});

export const tokenMonthSummary = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  gap: tokens['--vd-spacing-12'],
  marginBlockEnd: tokens['--vd-spacing-20'],
  color: tokens['--vd-text-secondary'],
});

export const tokenMonthCalendar = style({
  selectors: {
    '&[data-fullscreen=true][data-size]': {
      vars: {
        '--calendar-day-height': '90px',
      },
      padding: 0,
      border: 0,
      background: 'transparent',
      '@media': {
        '(max-width: 640px)': {
          vars: {
            '--calendar-day-height': '72px',
          },
        },
      },
    },
  },
});

export const tokenCalendarControls = style({
  display: 'flex',
  gap: tokens['--vd-spacing-8'],
  alignItems: 'center',
});

export const tokenCalendarMonthOptions = style({
  minWidth: '120px',
});

export const tokenCalendarUnit = style({
  display: 'block',
  marginBlockStart: tokens['--vd-spacing-2'],
  fontSize: tokens['--vd-font-size-10'],
  fontWeight: tokens['--vd-font-weight-400'],
});

export const tokenShortAmount = style({
  display: 'none',
});

export const tokenShortUnit = style({
  display: 'none',
});

export const tokenCalendarLegend = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: tokens['--vd-spacing-16'],
  marginBlockStart: tokens['--vd-spacing-16'],
  color: tokens['--vd-text-secondary'],
  fontSize: tokens['--vd-font-size-12'],
});

export const tokenFullAmount = style({});

export const tokenRecordSection = style({
  marginTop: '20px',
  borderTop: '1px solid var(--vd-border-subtle)',
  paddingTop: '16px',
});

export const tokenDemoNote = style({
  marginBottom: 0,
});

export const yearSwitch = style({
  flex: '0 0 auto',
  width: 'fit-content',
  marginInlineStart: 'auto',
});

globalStyle(`${calendarTrigger} img`, {
  display: 'block',
  width: '144px',
  height: 'auto',
  pointerEvents: 'none',
  transform: 'translateY(12px)',
  transition: 'transform 480ms cubic-bezier(0.22, 1.2, 0.36, 1)',
});

globalStyle(`${calendarTrigger}:hover img`, {
  transform: 'translateY(2px)',
});

globalStyle(`${tokenMonthSummary} strong`, {
  color: tokens['--vd-text-primary'],
  fontSize: tokens['--vd-font-size-24'],
  fontWeight: tokens['--vd-font-weight-600'],
  fontVariantNumeric: 'tabular-nums',
});

globalStyle(`${tokenMonthCalendar}[data-fullscreen=true][data-size] [data-calendar-grid]`, {
  borderSpacing: tokens['--vd-spacing-6'],
});

globalStyle(`${tokenMonthCalendar}[data-fullscreen=true][data-size] td`, {
  border: 0,
});

globalStyle(`${tokenMonthCalendar}[data-fullscreen=true][data-size] [data-calendar-date]`, {
  gap: tokens['--vd-spacing-6'],
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 'var(--vd-shape-radius-8, var(--vd-radius-8))',
  padding: 'var(--vd-spacing-8) var(--vd-spacing-4)',
});

globalStyle(
  `${tokenMonthCalendar}[data-fullscreen=true][data-size] [data-calendar-date]:has([data-token-level=normal])`,
  {
    background: tokens['--vd-status-success-subtle'],
  },
);

globalStyle(
  `${tokenMonthCalendar}[data-fullscreen=true][data-size] [data-calendar-date]:has([data-token-level=normal]) [data-token-level]`,
  {
    color: tokens['--vd-status-success-text'],
  },
);

globalStyle(
  `${tokenMonthCalendar}[data-fullscreen=true][data-size] [data-calendar-date]:has([data-token-level=high])`,
  {
    background: tokens['--vd-status-danger-subtle'],
  },
);

globalStyle(
  `${tokenMonthCalendar}[data-fullscreen=true][data-size] [data-calendar-date]:has([data-token-level=high]) [data-token-level]`,
  {
    color: tokens['--vd-status-danger-text'],
  },
);

globalStyle(
  `${tokenMonthCalendar}[data-fullscreen=true][data-size] [data-calendar-date]:has([data-token-level=zero])`,
  {
    background: tokens['--vd-fill-hover'],
  },
);

globalStyle(
  `${tokenMonthCalendar}[data-fullscreen=true][data-size] [data-calendar-date]:has([data-token-level=future])`,
  {
    background: tokens['--vd-fill-hover'],
  },
);

globalStyle(
  `${tokenMonthCalendar}[data-fullscreen=true][data-size] [data-calendar-date]:has([data-token-level=zero]) [data-token-level]`,
  {
    color: tokens['--vd-text-tertiary'],
  },
);

globalStyle(
  `${tokenMonthCalendar}[data-fullscreen=true][data-size] [data-calendar-date]:has([data-token-level=future]) [data-token-level]`,
  {
    color: tokens['--vd-text-tertiary'],
  },
);

globalStyle(`${tokenMonthCalendar}[data-fullscreen=true][data-size] [data-calendar-date-number]`, {
  fontSize: 'var(--vd-font-size-18)',
});

globalStyle(`${tokenMonthCalendar}[data-fullscreen=true][data-size] [data-calendar-date-content]`, {
  textAlign: 'center',
  fontSize: tokens['--vd-font-size-14'],
  fontVariantNumeric: 'tabular-nums',
  fontWeight: tokens['--vd-font-weight-600'],
});

globalStyle(
  `${tokenMonthCalendar}[data-fullscreen=true][data-size] td[aria-selected=true] [data-calendar-date]`,
  {
    borderColor: tokens['--vd-brand-primary'],
    color: tokens['--vd-text-primary'],
  },
);

globalStyle(`${tokenMonthCalendar}[data-fullscreen=true][data-size] [data-outside=true]`, {
  opacity: 0.4,
});

globalStyle(
  `${tokenMonthCalendar}[data-fullscreen=true][data-size][data-mode=month] [data-calendar-date][data-outside=true]`,
  {
    borderColor: 'transparent',
  },
);

globalStyle(`${tokenCalendarControls} > div`, {
  width: 'auto',
});

globalStyle(`${tokenCalendarLegend} > span`, {
  display: 'inline-flex',
  alignItems: 'center',
  gap: tokens['--vd-spacing-6'],
});

globalStyle(`${tokenCalendarLegend} > span::before`, {
  content: '""',
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: tokens['--vd-text-tertiary'],
});

globalStyle(`${tokenCalendarLegend} > [data-token-level=normal]::before`, {
  background: tokens['--vd-status-success-accent'],
});

globalStyle(`${tokenCalendarLegend} > [data-token-level=high]::before`, {
  background: tokens['--vd-status-danger-accent'],
});

globalStyle(`${calendarTrigger} img`, {
  '@media': {
    '(max-width: 640px)': {
      width: '88px',
    },
  },
});

globalStyle(`${tokenMonthSummary} strong`, {
  '@media': {
    '(max-width: 640px)': {
      fontSize: tokens['--vd-font-size-20'],
    },
  },
});

globalStyle(`${tokenMonthCalendar}[data-fullscreen=true][data-size] [data-calendar-grid]`, {
  '@media': {
    '(max-width: 640px)': {
      borderSpacing: tokens['--vd-spacing-2'],
    },
  },
});

globalStyle(`${tokenMonthCalendar}[data-fullscreen=true][data-size] [data-calendar-date-number]`, {
  '@media': {
    '(max-width: 640px)': {
      fontSize: tokens['--vd-font-size-14'],
    },
  },
});

globalStyle(`${tokenMonthCalendar}[data-fullscreen=true][data-size] [data-calendar-date-content]`, {
  '@media': {
    '(max-width: 640px)': {
      fontSize: tokens['--vd-font-size-11'],
    },
  },
});

globalStyle(`${tokenMonthCalendar}[data-fullscreen=true][data-size] ${tokenFullAmount}`, {
  '@media': {
    '(max-width: 640px)': {
      display: 'none',
    },
  },
});

globalStyle(`${tokenMonthCalendar}[data-fullscreen=true][data-size] ${tokenShortAmount}`, {
  '@media': {
    '(max-width: 640px)': {
      display: 'inline',
      whiteSpace: 'nowrap',
    },
  },
});

globalStyle(`${tokenMonthCalendar}[data-fullscreen=true][data-size] ${tokenShortUnit}`, {
  '@media': {
    '(max-width: 640px)': {
      display: 'inline',
    },
  },
});

globalStyle(`${tokenMonthCalendar}[data-fullscreen=true][data-size] ${tokenCalendarUnit}`, {
  '@media': {
    '(max-width: 640px)': {
      fontSize: tokens['--vd-font-size-10'],
      letterSpacing: '-0.2px',
      whiteSpace: 'nowrap',
    },
  },
});

globalStyle(`${calendarTrigger} img`, {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

globalStyle(`${tokenRecordSection} h3`, {
  fontSize: '13px',
  margin: '0 0 8px',
});

globalStyle(`${tokenRecordSection} p`, {
  fontSize: '12px',
  color: tokens['--vd-text-secondary'],
});

globalStyle(`${tokenRecordSection} ul`, {
  listStyle: 'none',
  margin: '12px 0',
  padding: 0,
  maxHeight: '200px',
  overflow: 'auto',
});

globalStyle(`${tokenRecordSection} li`, {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
  padding: '10px 0',
  borderBottom: '1px solid var(--vd-border-subtle)',
  fontSize: '12px',
});

globalStyle(`${tokenRecordSection} li > span:first-child`, {
  minWidth: 0,
  display: 'grid',
  gap: '4px',
});

globalStyle(`${tokenRecordSection} li > span:last-child`, {
  whiteSpace: 'nowrap',
});

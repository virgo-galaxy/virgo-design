import type { HTMLAttributes, ReactNode } from 'react';
export type CalendarMode = 'month' | 'year';
export interface CalendarHeaderRenderProps {
  month: string;
  mode: CalendarMode;
  disabled: boolean;
  minMonth: string;
  maxMonth: string;
  onMonthChange: (month: string) => void;
  onModeChange: (mode: CalendarMode) => void;
}
export interface CalendarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange' | 'children'
> {
  /** Selected civil date in YYYY-MM-DD form; empty means no selection. */
  value?: string | undefined;
  /** Initial selected civil date. */
  defaultValue?: string | undefined;
  /** Called when an enabled day is selected. */
  onValueChange?: ((value: string) => void) | undefined;
  /** Controlled displayed month in YYYY-MM form. */
  month?: string | undefined;
  /** Initial month; defaults to selected date or today. */
  defaultMonth?: string | undefined;
  /** Called for requested month navigation. */
  onMonthChange?: ((month: string) => void) | undefined;
  /** Controlled panel mode: a day grid or a grid of twelve months. */
  mode?: CalendarMode | undefined;
  /** Initial panel mode. @default 'month' */
  defaultMode?: CalendarMode | undefined;
  /** Called when the panel mode changes. */
  onModeChange?: ((mode: CalendarMode) => void) | undefined;
  /** Replace the header while retaining panel state and navigation constraints. */
  renderHeader?: ((props: CalendarHeaderRenderProps) => ReactNode) | undefined;
  /** Additional non-interactive content below each date number. */
  renderDateContent?: ((date: string) => ReactNode) | undefined;
  /** Highlight an inclusive civil-date interval without changing single-date selection. */
  highlightRange?: readonly [string, string] | undefined;
  /** Earliest selectable civil date, inclusive. */
  min?: string | undefined;
  /** Latest selectable civil date, inclusive. */
  max?: string | undefined;
  /** Additional consumer-owned unavailable dates. */
  isDateUnavailable?: ((date: string) => boolean) | undefined;
  /** Intl locale for month, weekday and date names. @default 'en-US' */
  locale?: string | undefined;
  /** First weekday, 0 (Sunday) through 6 (Saturday). @default 0 */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined;
  /** Render dates belonging to adjacent months. @default true */
  showOutsideDays?: boolean | undefined;
  /** Always render six week rows; false uses only the weeks needed by the month. @default true */
  fixedWeeks?: boolean | undefined;
  /** Disable all selection and keyboard navigation. */
  disabled?: boolean | undefined;
  /** Permit navigation while preventing selection. */
  readOnly?: boolean | undefined;
  /** Focus the enabled selected day or first available day on mount. @default false */
  autoFocus?: boolean | undefined;
  /** Decorative content for the previous-month button. */
  previousMonthContent?: ReactNode;
  /** Decorative content for the next-month button. */
  nextMonthContent?: ReactNode;
  /** Localized previous-month button label. @default 'Previous month' */
  previousMonthLabel?: string | undefined;
  /** Localized next-month button label. @default 'Next month' */
  nextMonthLabel?: string | undefined;
  /** Localized previous-year button label. @default 'Previous year' */
  previousYearLabel?: string | undefined;
  /** Localized next-year button label. @default 'Next year' */
  nextYearLabel?: string | undefined;
}

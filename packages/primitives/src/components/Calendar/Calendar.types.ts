import type { HTMLAttributes, ReactNode } from 'react';
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
}

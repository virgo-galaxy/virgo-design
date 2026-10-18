import { useLocale } from '../../locale/context/locale-context';
import { SegmentedControl } from '../SegmentedControl';
import { Select } from '../Select';
import type { CalendarHeaderRenderProps } from './Calendar.types';

import styles from './Calendar.module.scss';

export function CalendarHeader({
  month,
  mode,
  disabled,
  minMonth,
  maxMonth,
  onMonthChange,
  onModeChange,
  locale,
}: CalendarHeaderRenderProps & { locale: string }) {
  const labels = useLocale().calendar;
  const yearName = new Intl.DateTimeFormat(locale, { year: 'numeric', timeZone: 'UTC' });
  const monthName = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' });

  const year = Number(month.slice(0, 4));
  const firstYear = Math.max(1, year - 10);
  const lastYear = Math.min(9999, year + 10);
  const years = Array.from({ length: Math.max(0, lastYear - firstYear + 1) }, (_, index) =>
    String(firstYear + index).padStart(4, '0'),
  ).filter((entry) => entry >= minMonth.slice(0, 4) && entry <= maxMonth.slice(0, 4));
  const months = Array.from(
    { length: 12 },
    (_, index) => `${month.slice(0, 4)}-${String(index + 1).padStart(2, '0')}`,
  );

  return (
    <div data-calendar-controls="">
      <Select
        className={styles.selector}
        size="small"
        disabled={disabled}
        value={month.slice(0, 4)}
        onValueChange={(next) => {
          if (!next) return;

          const requested = `${next}-${month.slice(5)}`;

          onMonthChange(
            requested < minMonth ? minMonth : requested > maxMonth ? maxMonth : requested,
          );
        }}
      >
        <Select.Trigger aria-label={labels.chooseYear}>
          {yearName.format(new Date(`${month}-01T00:00:00Z`))}
        </Select.Trigger>
        <Select.Content className={styles.selectorOptions}>
          {years.map((entry) => (
            <Select.Option key={entry} value={entry}>
              {yearName.format(new Date(`${entry}-01-01T00:00:00Z`))}
            </Select.Option>
          ))}
        </Select.Content>
      </Select>
      {mode === 'month' && (
        <Select
          className={styles.selector}
          size="small"
          disabled={disabled}
          value={month}
          onValueChange={(next) => {
            if (next) onMonthChange(next);
          }}
        >
          <Select.Trigger aria-label={labels.chooseMonth}>
            {monthName.format(new Date(`${month}-01T00:00:00Z`))}
          </Select.Trigger>
          <Select.Content className={styles.selectorOptions}>
            {months.map((entry) => (
              <Select.Option
                key={entry}
                value={entry}
                disabled={entry < minMonth || entry > maxMonth}
              >
                {monthName.format(new Date(`${entry}-01T00:00:00Z`))}
              </Select.Option>
            ))}
          </Select.Content>
        </Select>
      )}
      <SegmentedControl
        size="small"
        variant="outline"
        value={mode}
        disabled={disabled}
        aria-label={labels.calendarView}
        onValueChange={(next) => {
          if (next === 'month' || next === 'year') onModeChange(next);
        }}
      >
        <SegmentedControl.Item value="month">{labels.calendarMonth}</SegmentedControl.Item>
        <SegmentedControl.Item value="year">{labels.calendarYear}</SegmentedControl.Item>
      </SegmentedControl>
    </div>
  );
}

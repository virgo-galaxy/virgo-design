import { ChevronLeftIcon, ChevronRightIcon } from '@virgo-design/icons';
import { Calendar as PrimitiveCalendar } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import { useControlLabels } from '../../shared/control-labels';
import { SegmentedControl } from '../SegmentedControl';
import { Select } from '../Select';
import styles from './Calendar.module.scss';
import type { CalendarProps } from './Calendar.types';
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  { size = 'medium', fullscreen = false, renderHeader, className, ...props },
  ref,
) {
  const labels = useControlLabels();
  const locale = props.locale ?? 'en-US';
  const yearName = new Intl.DateTimeFormat(locale, { year: 'numeric', timeZone: 'UTC' });
  const monthName = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' });
  return (
    <PrimitiveCalendar
      previousMonthLabel={labels.previousMonth}
      nextMonthLabel={labels.nextMonth}
      previousYearLabel={labels.previousYear}
      nextYearLabel={labels.nextYear}
      previousMonthContent={<ChevronLeftIcon size={16} />}
      nextMonthContent={<ChevronRightIcon size={16} />}
      {...props}
      renderHeader={
        renderHeader ??
        (fullscreen
          ? ({ month, mode, disabled, minMonth, maxMonth, onMonthChange, onModeChange }) => {
              const year = Number(month.slice(0, 4));
              const years = Array.from(
                { length: Math.max(0, Math.min(9999, year + 10) - Math.max(1, year - 10) + 1) },
                (_, index) => String(Math.max(1, year - 10) + index).padStart(4, '0'),
              );
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
                        requested < minMonth
                          ? minMonth
                          : requested > maxMonth
                            ? maxMonth
                            : requested,
                      );
                    }}
                  >
                    <Select.Trigger aria-label={labels.chooseYear}>
                      {yearName.format(new Date(`${month}-01T00:00:00Z`))}
                    </Select.Trigger>
                    <Select.Content className={styles.selectorOptions}>
                      {years
                        .filter(
                          (entry) => entry >= minMonth.slice(0, 4) && entry <= maxMonth.slice(0, 4),
                        )
                        .map((entry) => (
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
                    <SegmentedControl.Item value="month">
                      {labels.calendarMonth}
                    </SegmentedControl.Item>
                    <SegmentedControl.Item value="year">
                      {labels.calendarYear}
                    </SegmentedControl.Item>
                  </SegmentedControl>
                </div>
              );
            }
          : undefined)
      }
      ref={ref}
      data-size={size}
      data-fullscreen={fullscreen}
      className={[styles.root, className].filter(Boolean).join(' ')}
    />
  );
});

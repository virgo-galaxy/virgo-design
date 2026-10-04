import { forwardRef, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { addDays, addMonths, parseDate, today } from '../../internal/date/date-only';
import { useFieldState } from '../../internal/form/field-context';
import { useControllableState } from '../../internal/hooks/useControllableState';
import { composeRefs } from '../../internal/utils/composeRefs';
import type { CalendarProps } from './Calendar.types';
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  {
    value: controlledValue,
    defaultValue = '',
    onValueChange,
    month: controlledMonth,
    defaultMonth,
    onMonthChange,
    mode: controlledMode,
    defaultMode = 'month',
    onModeChange,
    renderHeader,
    renderDateContent,
    highlightRange,
    min,
    max,
    isDateUnavailable,
    locale = 'en-US',
    weekStartsOn = 0,
    fixedWeeks = true,
    showOutsideDays = true,
    disabled: localDisabled,
    readOnly: localReadOnly,
    autoFocus = false,
    previousMonthContent = '‹',
    nextMonthContent = '›',
    previousMonthLabel = 'Previous month',
    nextMonthLabel = 'Next month',
    previousYearLabel = 'Previous year',
    nextYearLabel = 'Next year',
    onKeyDown,
    ...props
  },
  ref,
) {
  const field = useFieldState();
  const disabled = localDisabled ?? field.disabled ?? false;
  const readOnly = localReadOnly ?? field.readOnly ?? false;
  const [value = '', setValue] = useControllableState(controlledValue, defaultValue, onValueChange);
  const [mode = 'month', setMode] = useControllableState(controlledMode, defaultMode, onModeChange);
  const initial = parseDate(value) ? value : today();
  const [rawMonth, setMonth] = useControllableState(
    controlledMonth,
    defaultMonth ?? initial.slice(0, 7),
    onMonthChange,
  );
  const month = parseDate(`${rawMonth}-01`) ? rawMonth! : initial.slice(0, 7);
  const minDate = parseDate(min) ? min! : '0001-01-01';
  const maxDate = parseDate(max) ? max! : '9999-12-31';
  const first = `${month}-01`;
  const offset = (parseDate(first)!.getUTCDay() - weekStartsOn + 7) % 7;
  const lastDay = parseDate(first)!;
  lastDay.setUTCMonth(lastDay.getUTCMonth() + 1);
  lastDay.setUTCDate(0);
  const weekCount = fixedWeeks ? 6 : Math.ceil((offset + lastDay.getUTCDate()) / 7);
  const days = Array.from({ length: weekCount * 7 }, (_, i) => addDays(first, i - offset));
  const unavailable = (date: string) =>
    Boolean(
      disabled ||
      !parseDate(date) ||
      (minDate && date < minDate) ||
      (maxDate && date > maxDate) ||
      isDateUnavailable?.(date),
    );
  const [focused, setFocused] = useState(initial);
  const rootRef = useRef<HTMLDivElement>(null);
  const shouldFocus = useRef(autoFocus);
  const headingId = useId();
  const enabled = days.filter((date) => !unavailable(date));
  const active = enabled.includes(focused)
    ? focused
    : enabled.includes(value)
      ? value
      : (enabled.find((date) => date.startsWith(month)) ?? enabled[0]);
  const months = Array.from(
    { length: 12 },
    (_, index) => `${month.slice(0, 4)}-${String(index + 1).padStart(2, '0')}`,
  );
  const monthUnavailable = (entry: string) => {
    if (
      !parseDate(`${entry}-01`) ||
      disabled ||
      entry < minDate.slice(0, 7) ||
      entry > maxDate.slice(0, 7)
    )
      return true;
    const start = `${entry}-01`;
    for (let index = 0; index < 31; index++) {
      const date = addDays(start, index);
      if (!date.startsWith(entry)) break;
      if (!unavailable(date)) return false;
    }
    return true;
  };
  const enabledMonths = mode === 'year' ? months.filter((entry) => !monthUnavailable(entry)) : [];
  const activeMonth = enabledMonths.includes(focused.slice(0, 7))
    ? focused.slice(0, 7)
    : enabledMonths.includes(month)
      ? month
      : enabledMonths[0];
  useLayoutEffect(() => {
    const current = rootRef.current?.ownerDocument.activeElement as HTMLButtonElement | null;
    if (shouldFocus.current || (current?.disabled && rootRef.current?.contains(current))) {
      rootRef.current
        ?.querySelector<HTMLButtonElement>(
          mode === 'year'
            ? `[data-calendar-month="${activeMonth}"]`
            : `[data-calendar-date="${active}"]`,
        )
        ?.focus({ preventScroll: true });
      shouldFocus.current = false;
    }
  }, [active, activeMonth, month, mode]);
  const requestMonth = (next: string) => {
    if (
      disabled ||
      !parseDate(`${next}-01`) ||
      next < minDate.slice(0, 7) ||
      next > maxDate.slice(0, 7)
    )
      return;
    setMonth(next);
    setFocused(`${next}-01`);
  };
  const navigate = (date: string, direction = 1) => {
    let next = date;
    for (let i = 0; i < 366; i++, next = addDays(next, direction)) {
      if (!parseDate(next)) return;
      if ((minDate && next < minDate) || (maxDate && next > maxDate)) return;
      if (!unavailable(next)) {
        shouldFocus.current = true;
        setFocused(next);
        setMonth(next.slice(0, 7));
        return;
      }
    }
  };
  const changeMonth = (delta: number) => {
    const next = addMonths(first, delta).slice(0, 7);
    if (!parseDate(`${next}-01`)) return;
    setMonth(next);
    setFocused(addMonths(active ?? first, delta));
  };
  const navigationStep = mode === 'year' ? 12 : 1;
  const prevMonth = addMonths(first, -navigationStep).slice(0, 7);
  const nextMonth = addMonths(first, navigationStep).slice(0, 7);
  const formatters = useMemo(
    () => ({
      month: new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }),
      monthName: new Intl.DateTimeFormat(locale, { month: 'long', timeZone: 'UTC' }),
      year: new Intl.DateTimeFormat(locale, { year: 'numeric', timeZone: 'UTC' }),
      day: new Intl.DateTimeFormat(locale, { dateStyle: 'full', timeZone: 'UTC' }),
      shortWeekday: new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' }),
      longWeekday: new Intl.DateTimeFormat(locale, { weekday: 'long', timeZone: 'UTC' }),
    }),
    [locale],
  );
  const currentDay = today();
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    parseDate(addDays('2026-10-04', (weekStartsOn + i) % 7))!,
  );
  return (
    <div
      {...props}
      ref={composeRefs(ref, rootRef)}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      data-calendar-root=""
      data-mode={mode}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (
          event.defaultPrevented ||
          disabled ||
          event.nativeEvent.isComposing ||
          event.altKey ||
          event.ctrlKey ||
          event.metaKey
        )
          return;
        const monthTarget = (event.target as HTMLElement).closest<HTMLButtonElement>(
          '[data-calendar-month]',
        );
        if (monthTarget) {
          const entry = monthTarget.dataset.calendarMonth!;
          const column = (Number(entry.slice(5)) - 1) % 3;
          const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
          const delta = {
            ArrowRight: rtl ? -1 : 1,
            ArrowLeft: rtl ? 1 : -1,
            ArrowDown: 3,
            ArrowUp: -3,
            Home: -column,
            End: 2 - column,
            PageDown: 12,
            PageUp: -12,
          }[event.key];
          if (delta === undefined) return;
          event.preventDefault();
          let next = addMonths(`${entry}-01`, delta).slice(0, 7);
          for (let index = 0; index < 120; index++) {
            if (
              !parseDate(`${next}-01`) ||
              next < minDate.slice(0, 7) ||
              next > maxDate.slice(0, 7)
            )
              return;
            if (!monthUnavailable(next)) {
              shouldFocus.current = true;
              requestMonth(next);
              return;
            }
            next = addMonths(`${next}-01`, delta < 0 ? -1 : 1).slice(0, 7);
          }
          return;
        }
        const target = (event.target as HTMLElement).closest<HTMLButtonElement>(
          '[data-calendar-date]',
        );
        if (!target) return;
        const date = target.dataset.calendarDate!;
        const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
        let next: string | undefined;
        let direction = 1;
        if (event.key === 'ArrowRight') {
          direction = rtl ? -1 : 1;
          next = addDays(date, direction);
        } else if (event.key === 'ArrowLeft') {
          direction = rtl ? 1 : -1;
          next = addDays(date, direction);
        } else if (event.key === 'ArrowDown') next = addDays(date, 7);
        else if (event.key === 'ArrowUp') {
          next = addDays(date, -7);
          direction = -1;
        } else if (event.key === 'Home')
          next = addDays(date, -((parseDate(date)!.getUTCDay() - weekStartsOn + 7) % 7));
        else if (event.key === 'End') {
          next = addDays(date, 6 - ((parseDate(date)!.getUTCDay() - weekStartsOn + 7) % 7));
          direction = -1;
        } else if (event.key === 'PageDown') next = addMonths(date, event.shiftKey ? 12 : 1);
        else if (event.key === 'PageUp') {
          next = addMonths(date, event.shiftKey ? -12 : -1);
          direction = -1;
        } else return;
        event.preventDefault();
        navigate(next, direction);
      }}
    >
      <div data-calendar-header="">
        {renderHeader ? (
          renderHeader({
            month,
            mode,
            disabled,
            minMonth: minDate.slice(0, 7),
            maxMonth: maxDate.slice(0, 7),
            onMonthChange: requestMonth,
            onModeChange: (next) => {
              if (!disabled) setMode(next);
            },
          })
        ) : (
          <>
            <button
              type="button"
              data-calendar-navigation="previous"
              aria-label={mode === 'year' ? previousYearLabel : previousMonthLabel}
              disabled={
                disabled ||
                !parseDate(`${prevMonth}-01`) ||
                Boolean(
                  minDate &&
                  (mode === 'year' ? `${prevMonth.slice(0, 4)}-12` : prevMonth) <
                    minDate.slice(0, 7),
                )
              }
              onClick={() => changeMonth(-navigationStep)}
            >
              <span aria-hidden="true">{previousMonthContent}</span>
            </button>
            <h2 aria-live="polite">
              {(mode === 'year' ? formatters.year : formatters.month).format(parseDate(first))}
            </h2>
            <button
              type="button"
              data-calendar-navigation="next"
              aria-label={mode === 'year' ? nextYearLabel : nextMonthLabel}
              disabled={
                disabled ||
                !parseDate(`${nextMonth}-01`) ||
                Boolean(
                  maxDate &&
                  (mode === 'year' ? `${nextMonth.slice(0, 4)}-01` : nextMonth) >
                    maxDate.slice(0, 7),
                )
              }
              onClick={() => changeMonth(navigationStep)}
            >
              <span aria-hidden="true">{nextMonthContent}</span>
            </button>
          </>
        )}
      </div>
      <span id={headingId} hidden>
        {(mode === 'year' ? formatters.year : formatters.month).format(parseDate(first))}
      </span>
      {mode === 'year' ? (
        <table
          role="grid"
          aria-labelledby={headingId}
          aria-readonly={readOnly || undefined}
          data-calendar-grid=""
        >
          <tbody>
            {Array.from({ length: 4 }, (_, row) => (
              <tr key={row}>
                {months.slice(row * 3, row * 3 + 3).map((entry) => (
                  <td key={entry} aria-selected={entry === month}>
                    <button
                      type="button"
                      data-calendar-month={entry}
                      aria-label={formatters.month.format(parseDate(`${entry}-01`))}
                      disabled={monthUnavailable(entry)}
                      tabIndex={entry === activeMonth ? 0 : -1}
                      onFocus={() => setFocused(`${entry}-01`)}
                      onClick={() => {
                        requestMonth(entry);
                        shouldFocus.current = true;
                        setMode('month');
                      }}
                    >
                      {formatters.monthName.format(parseDate(`${entry}-01`))}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table
          role="grid"
          aria-labelledby={headingId}
          aria-readonly={readOnly || undefined}
          data-calendar-grid=""
        >
          <thead>
            <tr>
              {weekdays.map((date, i) => (
                <th key={i} scope="col" abbr={formatters.longWeekday.format(date)}>
                  {formatters.shortWeekday.format(date)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: weekCount }, (_, row) => (
              <tr key={row}>
                {days.slice(row * 7, row * 7 + 7).map((date) =>
                  !parseDate(date) || (!showOutsideDays && !date.startsWith(month)) ? (
                    <td key={date} />
                  ) : (
                    <td
                      key={date}
                      aria-selected={
                        value === date ||
                        Boolean(
                          highlightRange?.[0] &&
                          highlightRange?.[1] &&
                          date >= highlightRange[0] &&
                          date <= highlightRange[1],
                        )
                      }
                    >
                      <button
                        type="button"
                        data-calendar-date={date}
                        data-range-endpoint={
                          (highlightRange &&
                            (date === highlightRange[0] || date === highlightRange[1])) ||
                          undefined
                        }
                        data-in-range={
                          (highlightRange &&
                            highlightRange[0] &&
                            highlightRange[1] &&
                            date > highlightRange[0] &&
                            date < highlightRange[1]) ||
                          undefined
                        }
                        data-overlay-autofocus={autoFocus && date === active ? '' : undefined}
                        data-outside={date.slice(0, 7) !== month || undefined}
                        aria-label={formatters.day.format(parseDate(date))}
                        aria-describedby={renderDateContent ? `${headingId}-${date}` : undefined}
                        aria-current={date === currentDay ? 'date' : undefined}
                        disabled={unavailable(date)}
                        tabIndex={date === active ? 0 : -1}
                        onFocus={() => setFocused(date)}
                        onClick={() => {
                          setFocused(date);
                          if (!readOnly) {
                            setValue(date);
                            setMonth(date.slice(0, 7));
                          }
                        }}
                      >
                        <span data-calendar-date-number="">{parseDate(date)!.getUTCDate()}</span>
                        {renderDateContent ? (
                          <span id={`${headingId}-${date}`} data-calendar-date-content="">
                            {renderDateContent(date)}
                          </span>
                        ) : null}
                      </button>
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
});

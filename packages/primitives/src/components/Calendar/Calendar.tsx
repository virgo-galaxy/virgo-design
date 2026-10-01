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
    min,
    max,
    isDateUnavailable,
    locale = 'en-US',
    weekStartsOn = 0,
    disabled: localDisabled,
    readOnly: localReadOnly,
    autoFocus = false,
    previousMonthContent = '‹',
    nextMonthContent = '›',
    previousMonthLabel = 'Previous month',
    nextMonthLabel = 'Next month',
    onKeyDown,
    ...props
  },
  ref,
) {
  const field = useFieldState();
  const disabled = localDisabled ?? field.disabled ?? false;
  const readOnly = localReadOnly ?? field.readOnly ?? false;
  const [value = '', setValue] = useControllableState(controlledValue, defaultValue, onValueChange);
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
  const days = Array.from({ length: 42 }, (_, i) => addDays(first, i - offset));
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
  useLayoutEffect(() => {
    const current = rootRef.current?.ownerDocument.activeElement as HTMLButtonElement | null;
    if (shouldFocus.current || (current?.disabled && rootRef.current?.contains(current))) {
      rootRef.current
        ?.querySelector<HTMLButtonElement>(`[data-calendar-date="${active}"]`)
        ?.focus({ preventScroll: true });
      shouldFocus.current = false;
    }
  }, [active, month]);
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
  const prevMonth = addMonths(first, -1).slice(0, 7);
  const nextMonth = addMonths(first, 1).slice(0, 7);
  const formatters = useMemo(
    () => ({
      month: new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }),
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
        <button
          type="button"
          data-calendar-navigation="previous"
          aria-label={previousMonthLabel}
          disabled={
            disabled ||
            !parseDate(`${prevMonth}-01`) ||
            Boolean(minDate && prevMonth < minDate.slice(0, 7))
          }
          onClick={() => changeMonth(-1)}
        >
          <span aria-hidden="true">{previousMonthContent}</span>
        </button>
        <h2 id={headingId} aria-live="polite">
          {formatters.month.format(parseDate(first))}
        </h2>
        <button
          type="button"
          data-calendar-navigation="next"
          aria-label={nextMonthLabel}
          disabled={
            disabled ||
            !parseDate(`${nextMonth}-01`) ||
            Boolean(maxDate && nextMonth > maxDate.slice(0, 7))
          }
          onClick={() => changeMonth(1)}
        >
          <span aria-hidden="true">{nextMonthContent}</span>
        </button>
      </div>
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
          {Array.from({ length: 6 }, (_, row) => (
            <tr key={row}>
              {days.slice(row * 7, row * 7 + 7).map((date) =>
                !parseDate(date) ? (
                  <td key={date} />
                ) : (
                  <td key={date} aria-selected={value === date}>
                    <button
                      type="button"
                      data-calendar-date={date}
                      data-overlay-autofocus={autoFocus && date === active ? '' : undefined}
                      data-outside={date.slice(0, 7) !== month || undefined}
                      aria-label={formatters.day.format(parseDate(date))}
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
                      {parseDate(date)!.getUTCDate()}
                    </button>
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

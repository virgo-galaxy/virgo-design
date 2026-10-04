import { createContext, forwardRef, useContext, useEffect, useId, useState } from 'react';

import { addMonths, parseDate, today } from '../../internal/date/date-only';
import { useFieldControl, useFieldState } from '../../internal/form/field-context';
import { useControllableState } from '../../internal/hooks/useControllableState';
import { Calendar } from '../Calendar';
import { Popover } from '../Popover';
import type {
  DatePickerRangeCalendarProps,
  DatePickerRangeInputProps,
  DatePickerRangeProps,
  DateRange,
} from './DatePicker.types';

const emptyRange: DateRange = ['', ''];
const RangeContext = createContext<{
  value: DateRange;
  setValue: (value: DateRange) => void;
  setOpen: (value: boolean) => void;
  focusCalendar: boolean;
  openInput: (edge: 'start' | 'end') => void;
  activeEdge: 'start' | 'end';
  setActiveEdge: (edge: 'start' | 'end') => void;
  open: boolean;
  disabled: boolean;
  readOnly: boolean;
  min?: string | undefined;
  max?: string | undefined;
  names?: readonly [string, string] | undefined;
} | null>(null);
function useRange() {
  const context = useContext(RangeContext);
  if (!context) throw new Error('DatePicker range parts require DatePicker.Range.');
  return context;
}
export const DatePickerRange = forwardRef<HTMLDivElement, DatePickerRangeProps>(function Range(
  {
    value: controlledValue,
    defaultValue = emptyRange,
    onValueChange,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    disabled: localDisabled,
    readOnly: localReadOnly,
    min,
    max,
    names,
    children,
    onClick,
    ...props
  },
  ref,
) {
  const [focusCalendar, setFocusCalendar] = useState(true);
  const [activeEdge, setActiveEdge] = useState<'start' | 'end'>('start');
  const field = useFieldState();
  const disabled = localDisabled ?? field.disabled ?? false;
  const readOnly = localReadOnly ?? field.readOnly ?? false;
  const [value = emptyRange, setValue] = useControllableState(
    controlledValue,
    defaultValue,
    onValueChange,
  );
  const [open, setOpen, resetOpen] = useControllableState(
    controlledOpen,
    defaultOpen,
    onOpenChange,
  );
  useEffect(() => {
    if (disabled || readOnly) resetOpen(false);
  }, [disabled, readOnly, resetOpen]);
  return (
    <RangeContext.Provider
      value={{
        value,
        setValue: (next) => {
          if (!disabled && !readOnly) setValue(next);
        },
        setOpen,
        focusCalendar,
        activeEdge,
        setActiveEdge,
        open: Boolean(open) && !disabled && !readOnly,
        openInput: (edge) => {
          if (disabled || readOnly) return;
          setFocusCalendar(false);
          setActiveEdge(edge);
          setOpen(true);
        },
        disabled,
        readOnly,
        min,
        max,
        names,
      }}
    >
      <Popover
        {...props}
        anchor="root"
        autoFocus={focusCalendar}
        ref={ref}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
        open={Boolean(open) && !disabled && !readOnly}
        onOpenChange={(next) => {
          if (next) {
            setFocusCalendar(true);
            setActiveEdge(parseDate(value[0]) && !value[1] ? 'end' : 'start');
          }
          setOpen(next);
        }}
        onClick={(event) => {
          onClick?.(event);
          if (
            event.defaultPrevented ||
            disabled ||
            readOnly ||
            (event.target as HTMLElement).closest('button')
          )
            return;
          setFocusCalendar(false);
          setOpen(true);
          if (!(event.target instanceof HTMLInputElement))
            event.currentTarget.querySelector<HTMLInputElement>('input')?.focus();
        }}
        disabled={disabled || readOnly}
      >
        {children}
      </Popover>
    </RangeContext.Provider>
  );
});
export const DatePickerRangeInput = forwardRef<HTMLInputElement, DatePickerRangeInputProps>(
  function RangeInput({ edge, type = 'text', onChange, onFocus, onClick, ...props }, ref) {
    const context = useRange();
    const endId = useId();
    const field = useFieldControl({ ...props, id: edge === 'end' ? undefined : props.id });
    const index = edge === 'start' ? 0 : 1;
    return (
      <input
        {...field}
        id={edge === 'end' ? (props.id ?? endId) : field.id}
        ref={ref}
        type={type}
        data-active={(context.open && context.activeEdge === edge) || undefined}
        name={context.names?.[index]}
        min={context.min}
        max={context.max}
        value={context.value[index]}
        disabled={context.disabled || field.disabled}
        readOnly={context.readOnly || field.readOnly}
        onFocus={(event) => {
          onFocus?.(event);
          if (!event.defaultPrevented) context.openInput(edge);
        }}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) context.openInput(edge);
        }}
        onChange={(event) => {
          if (event.currentTarget.readOnly) return;
          onChange?.(event);
          if (!event.defaultPrevented) {
            const next: [string, string] = [...context.value];
            next[index] = event.currentTarget.value;
            context.setValue(next);
          }
        }}
      />
    );
  },
);
export const DatePickerRangeCalendar = forwardRef<HTMLDivElement, DatePickerRangeCalendarProps>(
  function RangeCalendar(
    { month: controlledMonth, defaultMonth, onMonthChange, className, isDateUnavailable, ...props },
    ref,
  ) {
    const context = useRange();
    const initial = context.value.find((date) => parseDate(date)) ?? today();
    const [rawMonth, setMonth] = useControllableState(
      controlledMonth,
      defaultMonth ?? initial.slice(0, 7),
      onMonthChange,
    );
    const month = parseDate(`${rawMonth}-01`) ? rawMonth! : initial.slice(0, 7);
    const nextMonth = addMonths(`${month}-01`, 1).slice(0, 7);
    const [preview, setPreview] = useState('');
    const pending = Boolean(parseDate(context.value[0]) && !context.value[1]);
    const selectingEnd =
      pending || (context.activeEdge === 'end' && Boolean(parseDate(context.value[0])));
    const end = selectingEnd ? preview || context.value[1] || context.value[0] : context.value[1];
    const interval: DateRange =
      context.value[0] <= end ? [context.value[0], end] : [end, context.value[0]];
    const select = (date: string) => {
      setPreview('');
      if (!pending && !(context.activeEdge === 'end' && parseDate(context.value[0]))) {
        context.setValue([date, '']);
        context.setActiveEdge('end');
      } else {
        context.setValue(
          date < context.value[0] ? [date, context.value[0]] : [context.value[0], date],
        );
        context.setOpen(false);
      }
    };
    return (
      <div
        ref={ref}
        data-date-picker-range-calendar=""
        onPointerLeave={() => setPreview('')}
        onPointerOver={(event) => {
          const button = (event.target as HTMLElement).closest<HTMLButtonElement>(
            '[data-calendar-date]',
          );
          if (selectingEnd && button && !button.disabled) setPreview(button.dataset.calendarDate!);
        }}
      >
        {[month, nextMonth].map((entry, index) => (
          <Calendar
            {...props}
            key={index}
            className={className}
            autoFocus={index === 0 && context.focusCalendar}
            showOutsideDays={false}
            month={entry}
            value=""
            highlightRange={interval}
            min={context.min}
            max={context.max}
            disabled={context.disabled}
            readOnly={context.readOnly}
            isDateUnavailable={isDateUnavailable}
            onMonthChange={(next) =>
              setMonth(index === 0 ? next : addMonths(`${next}-01`, -1).slice(0, 7))
            }
            onValueChange={select}
          />
        ))}
      </div>
    );
  },
);

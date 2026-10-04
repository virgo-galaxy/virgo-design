import { createContext, forwardRef, useContext, useEffect } from 'react';

import { useFieldControl, useFieldState } from '../../internal/form/field-context';
import { useControllableState } from '../../internal/hooks/useControllableState';
import { Calendar } from '../Calendar';
import { Popover } from '../Popover';
import type {
  DatePickerCalendarProps,
  DatePickerContentProps,
  DatePickerInputProps,
  DatePickerProps,
  DatePickerTriggerProps,
} from './DatePicker.types';
const Context = createContext<{
  value: string;
  setValue: (value: string) => void;
  setOpen: (open: boolean) => void;
  disabled: boolean;
  readOnly: boolean;
  name?: string | undefined;
  min?: string | undefined;
  max?: string | undefined;
} | null>(null);
function usePicker() {
  const context = useContext(Context);
  if (!context) throw new Error('DatePicker parts require DatePicker.');
  return context;
}
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(function DatePicker(
  {
    value: controlledValue,
    defaultValue = '',
    onValueChange,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    name,
    min,
    max,
    disabled: localDisabled,
    readOnly: localReadOnly,
    children,
    ...props
  },
  ref,
) {
  const field = useFieldState();
  const disabled = localDisabled ?? field.disabled ?? false;
  const readOnly = localReadOnly ?? field.readOnly ?? false;
  const [value = '', setValue] = useControllableState(controlledValue, defaultValue, onValueChange);
  const [open, setOpen, resetOpen] = useControllableState(
    controlledOpen,
    defaultOpen,
    onOpenChange,
  );
  useEffect(() => {
    if (disabled || readOnly) resetOpen(false);
  }, [disabled, readOnly, resetOpen]);
  return (
    <Context.Provider
      value={{
        value,
        setValue: (next) => {
          if (!disabled && !readOnly) setValue(next);
        },
        setOpen,
        disabled,
        readOnly,
        name,
        min,
        max,
      }}
    >
      <Popover
        {...props}
        anchor="root"
        ref={ref}
        open={Boolean(open) && !disabled && !readOnly}
        onOpenChange={setOpen}
        disabled={disabled || readOnly}
      >
        {children}
      </Popover>
    </Context.Provider>
  );
});
export const DatePickerInput = forwardRef<HTMLInputElement, DatePickerInputProps>(
  function DatePickerInput({ type = 'date', onChange, ...props }, ref) {
    const context = usePicker();
    const field = useFieldControl(props);
    return (
      <input
        {...field}
        ref={ref}
        type={type}
        name={context.name}
        min={context.min}
        max={context.max}
        value={context.value}
        disabled={context.disabled || field.disabled}
        readOnly={context.readOnly || field.readOnly}
        onChange={(event) => {
          if (event.currentTarget.readOnly) return;
          onChange?.(event);
          if (!event.defaultPrevented) context.setValue(event.currentTarget.value);
        }}
      />
    );
  },
);
export const DatePickerTrigger = forwardRef<HTMLButtonElement, DatePickerTriggerProps>(
  (props, ref) => <Popover.Trigger {...props} ref={ref} />,
);
export const DatePickerContent = forwardRef<HTMLDivElement, DatePickerContentProps>(
  (props, ref) => <Popover.Content {...props} ref={ref} />,
);
export const DatePickerCalendar = forwardRef<HTMLDivElement, DatePickerCalendarProps>(
  function DatePickerCalendar(props, ref) {
    const context = usePicker();
    return (
      <Calendar
        autoFocus
        {...props}
        ref={ref}
        value={context.value}
        min={context.min}
        max={context.max}
        disabled={context.disabled}
        readOnly={context.readOnly}
        onValueChange={(value) => {
          context.setValue(value);
          context.setOpen(false);
        }}
      />
    );
  },
);

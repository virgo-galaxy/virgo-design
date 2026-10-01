import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@virgo-design/icons';
import { DatePicker as PrimitiveDatePicker } from '@virgo-design/primitives';
import { createContext, forwardRef, useContext } from 'react';

import { useControlLabels } from '../../shared/control-labels';
import calendarStyles from '../Calendar/Calendar.module.scss';
import styles from './DatePicker.module.scss';
import type {
  DatePickerCalendarProps,
  DatePickerContentProps,
  DatePickerInputProps,
  DatePickerProps,
  DatePickerTriggerProps,
} from './DatePicker.types';
const SizeContext = createContext<DatePickerProps['size']>('medium');
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(function DatePicker(
  { size = 'medium', className, ...props },
  ref,
) {
  return (
    <SizeContext.Provider value={size}>
      <PrimitiveDatePicker
        {...props}
        ref={ref}
        data-size={size}
        className={[styles.root, className].filter(Boolean).join(' ')}
      />
    </SizeContext.Provider>
  );
});
export const DatePickerInput = forwardRef<HTMLInputElement, DatePickerInputProps>(function Input(
  { className, ...props },
  ref,
) {
  const size = useContext(SizeContext);
  return (
    <PrimitiveDatePicker.Input
      {...props}
      ref={ref}
      data-size={size}
      className={[styles.input, className].filter(Boolean).join(' ')}
    />
  );
});
export const DatePickerTrigger = forwardRef<HTMLButtonElement, DatePickerTriggerProps>(
  function Trigger({ className, children, 'aria-label': label, ...props }, ref) {
    const labels = useControlLabels();
    return (
      <PrimitiveDatePicker.Trigger
        {...props}
        ref={ref}
        aria-label={label ?? labels.chooseDate}
        className={[styles.trigger, className].filter(Boolean).join(' ')}
      >
        {children ?? <CalendarIcon size={20} />}
      </PrimitiveDatePicker.Trigger>
    );
  },
);
export const DatePickerContent = forwardRef<HTMLDivElement, DatePickerContentProps>(
  function Content({ className, ...props }, ref) {
    return (
      <PrimitiveDatePicker.Content
        {...props}
        ref={ref}
        className={[styles.content, className].filter(Boolean).join(' ')}
      />
    );
  },
);
export const DatePickerCalendar = forwardRef<HTMLDivElement, DatePickerCalendarProps>(
  function Calendar({ className, ...props }, ref) {
    const size = useContext(SizeContext);
    const labels = useControlLabels();
    return (
      <PrimitiveDatePicker.Calendar
        previousMonthLabel={labels.previousMonth}
        nextMonthLabel={labels.nextMonth}
        previousMonthContent={<ChevronLeftIcon size={16} />}
        nextMonthContent={<ChevronRightIcon size={16} />}
        {...props}
        ref={ref}
        data-size={size}
        className={[calendarStyles.root, className].filter(Boolean).join(' ')}
      />
    );
  },
);

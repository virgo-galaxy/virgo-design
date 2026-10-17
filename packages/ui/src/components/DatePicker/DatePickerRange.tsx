import { ChevronLeftIcon, ChevronRightIcon } from '@virgo-design/icons';
import { DatePicker as Primitive } from '@virgo-design/primitives';
import { forwardRef, useContext } from 'react';

import { useLocale } from '../../locale/context/locale-context';
import calendarStyles from '../Calendar/Calendar.module.scss';
import { SizeContext } from './DatePicker';
import styles from './DatePicker.module.scss';
import type {
  DatePickerRangeCalendarProps,
  DatePickerRangeInputProps,
  DatePickerRangeProps,
} from './DatePicker.types';

export const DatePickerRange = forwardRef<HTMLDivElement, DatePickerRangeProps>(function Range(
  { size = 'medium', className, ...props },
  ref,
) {
  return (
    <SizeContext.Provider value={size}>
      <Primitive.Range
        {...props}
        ref={ref}
        data-size={size}
        className={[styles.range, className].filter(Boolean).join(' ')}
      />
    </SizeContext.Provider>
  );
});

export const DatePickerRangeInput = forwardRef<HTMLInputElement, DatePickerRangeInputProps>(
  function RangeInput({ className, ...props }, ref) {
    const size = useContext(SizeContext);

    return (
      <Primitive.RangeInput
        {...props}
        ref={ref}
        data-size={size}
        className={[styles.rangeInput, className].filter(Boolean).join(' ')}
      />
    );
  },
);

export const DatePickerRangeCalendar = forwardRef<HTMLDivElement, DatePickerRangeCalendarProps>(
  function RangeCalendar({ className, ...props }, ref) {
    const size = useContext(SizeContext);
    const { calendar: labels, locale } = useLocale();

    return (
      <Primitive.RangeCalendar
        previousMonthLabel={labels.previousMonth}
        nextMonthLabel={labels.nextMonth}
        previousYearLabel={labels.previousYear}
        nextYearLabel={labels.nextYear}
        previousMonthContent={<ChevronLeftIcon size={16} />}
        nextMonthContent={<ChevronRightIcon size={16} />}
        {...props}
        locale={props.locale ?? locale}
        ref={ref}
        data-size={size}
        className={[calendarStyles.root, className].filter(Boolean).join(' ')}
      />
    );
  },
);

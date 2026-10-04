import {
  DatePicker as Root,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerInput,
  DatePickerTrigger,
} from './DatePicker';
import { DatePickerRange, DatePickerRangeCalendar, DatePickerRangeInput } from './DatePickerRange';
export const DatePicker = Object.assign(Root, {
  Root,
  Range: DatePickerRange,
  RangeInput: DatePickerRangeInput,
  RangeCalendar: DatePickerRangeCalendar,
  Input: DatePickerInput,
  Trigger: DatePickerTrigger,
  Content: DatePickerContent,
  Calendar: DatePickerCalendar,
});
export type {
  DatePickerCalendarProps,
  DatePickerContentProps,
  DatePickerInputProps,
  DatePickerProps,
  DatePickerRangeCalendarProps,
  DatePickerRangeInputProps,
  DatePickerRangeProps,
  DatePickerTriggerProps,
  DateRange,
} from './DatePicker.types';

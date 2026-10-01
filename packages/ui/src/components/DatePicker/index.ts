import {
  DatePicker as Root,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerInput,
  DatePickerTrigger,
} from './DatePicker';
export const DatePicker = Object.assign(Root, {
  Root,
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
  DatePickerTriggerProps,
} from './DatePicker.types';

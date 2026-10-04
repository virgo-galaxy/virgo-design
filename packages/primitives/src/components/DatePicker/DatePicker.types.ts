import type { HTMLAttributes, InputHTMLAttributes } from 'react';

import type { CalendarProps } from '../Calendar';
import type { PopoverContentProps, PopoverTriggerProps } from '../Popover';
export interface DatePickerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> {
  /** Controlled civil date in YYYY-MM-DD form; empty means no selection. */
  value?: string | undefined;
  /** Initial selected date. */
  defaultValue?: string | undefined;
  /** Called by input edits or calendar selection. */
  onValueChange?: ((value: string) => void) | undefined;
  /** Controlled calendar popup state. */
  open?: boolean | undefined;
  /** Initial calendar popup state. @default false */
  defaultOpen?: boolean | undefined;
  /** Called when the popup is requested to open or close. */
  onOpenChange?: ((open: boolean) => void) | undefined;
  /** Selected-value form control name. */
  name?: string | undefined;
  /** Earliest selectable date, inclusive. */
  min?: string | undefined;
  /** Latest selectable date, inclusive. */
  max?: string | undefined;
  /** Disable input and popup. */
  disabled?: boolean | undefined;
  /** Keep input focusable while preventing edits and calendar selection. */
  readOnly?: boolean | undefined;
}
export interface DatePickerInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'defaultValue' | 'name' | 'min' | 'max'
> {
  /** Native date entry follows the browser locale; text entry allows application-managed YYYY-MM-DD placeholders and validation. @default 'date' */
  type?: 'date' | 'text' | undefined;
}
export type DatePickerTriggerProps = PopoverTriggerProps;
export type DatePickerContentProps = PopoverContentProps;
export type DatePickerCalendarProps = Omit<
  CalendarProps,
  'value' | 'defaultValue' | 'onValueChange' | 'min' | 'max'
>;

/** Inclusive date interval; an empty endpoint permits an open-ended or pending range. */
export type DateRange = readonly [string, string];
export interface DatePickerRangeProps extends Omit<
  DatePickerProps,
  'value' | 'defaultValue' | 'onValueChange' | 'name'
> {
  /** Controlled start and end civil dates in YYYY-MM-DD form. */
  value?: DateRange | undefined;
  /** Initial interval. @default ['', ''] */
  defaultValue?: DateRange | undefined;
  /** Called by input edits and each calendar selection; first click leaves the end empty. */
  onValueChange?: ((value: DateRange) => void) | undefined;
  /** Separate form-control names for the start and end inputs. */
  names?: readonly [string, string] | undefined;
}
export interface DatePickerRangeInputProps extends DatePickerInputProps {
  /** Text entry accepts application-managed date formats; native date entry follows the browser locale. @default 'text' */
  type?: 'date' | 'text' | undefined;
  /** Endpoint edited by this input. */
  edge: 'start' | 'end';
}
export type DatePickerRangeCalendarProps = Omit<
  DatePickerCalendarProps,
  | 'mode'
  | 'defaultMode'
  | 'onModeChange'
  | 'renderHeader'
  | 'highlightRange'
  | 'autoFocus'
  | 'showOutsideDays'
>;

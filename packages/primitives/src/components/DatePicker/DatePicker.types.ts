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
  /** Called by native date input edits or calendar selection. */
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
export type DatePickerInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'defaultValue' | 'name' | 'min' | 'max'
>;
export type DatePickerTriggerProps = PopoverTriggerProps;
export type DatePickerContentProps = PopoverContentProps;
export type DatePickerCalendarProps = Omit<
  CalendarProps,
  'value' | 'defaultValue' | 'onValueChange' | 'min' | 'max'
>;

import type {
  DatePickerProps as PrimitiveProps,
  DatePickerRangeProps as PrimitiveRangeProps,
} from '@virgo-design/primitives';

export interface DatePickerProps extends PrimitiveProps {
  /** Visual density. @default 'medium' */
  size?: 'small' | 'medium' | 'large' | undefined;
}

export interface DatePickerRangeProps extends PrimitiveRangeProps {
  /** Visual density. @default 'medium' */
  size?: 'small' | 'medium' | 'large' | undefined;
}

export type {
  DatePickerCalendarProps,
  DatePickerContentProps,
  DatePickerInputProps,
  DatePickerRangeCalendarProps,
  DatePickerRangeInputProps,
  DatePickerTriggerProps,
  DateRange,
} from '@virgo-design/primitives';

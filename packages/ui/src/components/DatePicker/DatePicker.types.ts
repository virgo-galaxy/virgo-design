import type { DatePickerProps as PrimitiveProps } from '@virgo-design/primitives';
export interface DatePickerProps extends PrimitiveProps {
  /** Visual density. @default 'medium' */
  size?: 'small' | 'medium' | 'large' | undefined;
}
export type {
  DatePickerCalendarProps,
  DatePickerContentProps,
  DatePickerInputProps,
  DatePickerTriggerProps,
} from '@virgo-design/primitives';

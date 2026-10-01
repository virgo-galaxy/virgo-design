import type { TimePickerProps as PrimitiveProps } from '@virgo-design/primitives';
export interface TimePickerProps extends PrimitiveProps {
  /** Visual density. @default 'medium' */
  size?: 'small' | 'medium' | 'large' | undefined;
}

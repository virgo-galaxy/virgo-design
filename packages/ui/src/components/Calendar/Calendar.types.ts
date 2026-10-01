import type { CalendarProps as PrimitiveProps } from '@virgo-design/primitives';
export interface CalendarProps extends PrimitiveProps {
  /** Visual density. @default 'medium' */
  size?: 'small' | 'medium' | 'large' | undefined;
}

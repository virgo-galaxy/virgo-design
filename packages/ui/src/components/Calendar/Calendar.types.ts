import type { CalendarProps as PrimitiveProps } from '@virgo-design/primitives';
export type { CalendarHeaderRenderProps, CalendarMode } from '@virgo-design/primitives';
export interface CalendarProps extends PrimitiveProps {
  /** Visual density. @default 'medium' */
  size?: 'small' | 'medium' | 'large' | undefined;
  /** Fill the container with spacious date cells and year/month controls. @default false */
  fullscreen?: boolean | undefined;
}

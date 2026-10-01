import type { SliderProps as PrimitiveProps } from '@virgo-design/primitives';
export interface SliderProps extends PrimitiveProps {
  /** Visual density. @default 'medium' */
  size?: 'small' | 'medium' | 'large' | undefined;
}

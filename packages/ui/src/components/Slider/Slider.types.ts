import type {
  SliderProps as PrimitiveProps,
  SliderRangeProps as PrimitiveRangeProps,
} from '@virgo-design/primitives';
export interface SliderProps extends PrimitiveProps {
  /** Visual density. @default 'medium' */
  size?: 'small' | 'medium' | 'large' | undefined;
}
export interface SliderRangeProps extends PrimitiveRangeProps {
  /** Visual density. @default 'medium' */
  size?: 'small' | 'medium' | 'large' | undefined;
}

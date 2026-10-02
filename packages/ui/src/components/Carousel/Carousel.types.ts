import type { CarouselProps as PrimitiveCarouselProps } from '@virgo-design/primitives';
import type { HTMLAttributes } from 'react';
export type {
  CarouselItemProps,
  CarouselState,
  CarouselTrackProps,
  CarouselViewportProps,
} from '@virgo-design/primitives';
export interface CarouselProps extends PrimitiveCarouselProps {
  /** Transition between slides. Reduced motion disables transitions. @default 'slide' */
  motion?: 'slide' | 'none';
  /** Circular previous/next controls: hidden by default, or visible on hover/focus or always. @default 'none' */
  arrows?: 'hover' | 'always' | 'none';
  /** Switch to fully accessible stacked pages below this viewport width, in pixels. */
  stackBelow?: number;
}
export interface CarouselIndicatorsProps extends HTMLAttributes<HTMLDivElement> {
  /** Dots or a segmented progress bar; both allow direct navigation. @default 'dots' */
  variant?: 'dots' | 'bar';
  /** Place the indicator in normal flow or inside the viewport at its bottom edge. @default 'outside' */
  placement?: 'outside' | 'inside';
  /** Accessible label for each navigation button, given its zero-based index. */
  getSlideLabel?: (index: number) => string;
}

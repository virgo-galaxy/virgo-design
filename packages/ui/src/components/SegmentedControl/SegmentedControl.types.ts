import type {
  RadioGroupProps as PrimitiveRadioGroupProps,
  RadioProps as PrimitiveRadioProps,
} from '@virgo-design/primitives';
import type { ReactNode } from 'react';

export type SegmentedControlVariant = 'outline' | 'solid' | 'soft';
export type SegmentedControlSize = 'mini' | 'small' | 'medium' | 'large';
export type SegmentedControlMotion = 'none' | 'slide';

export interface SegmentedControlProps extends Omit<
  PrimitiveRadioGroupProps,
  'className' | 'orientation'
> {
  /** Visual treatment of the segmented control. */
  variant?: SegmentedControlVariant;

  /** Visual density of the segmented control. */
  size?: SegmentedControlSize;

  /** Selected-indicator transition treatment. */
  motion?: SegmentedControlMotion;

  /** Consumer class applied to the segmented-control root. */
  className?: string;
}

export interface SegmentedControlItemProps extends Omit<
  PrimitiveRadioProps,
  'children' | 'className' | 'value'
> {
  /** Value represented by this segment. */
  value: string;

  /** Visible label or content for the segment. */
  children: ReactNode;
  /** Tooltip shown on pointer hover or keyboard focus; false omits it. */
  tooltip?: ReactNode | false | undefined;

  /** Consumer class applied to the segment root. */
  className?: string;
}

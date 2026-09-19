import type {
  RadioGroupProps as PrimitiveRadioGroupProps,
  RadioProps as PrimitiveRadioProps,
} from '@virgo-design/primitives';
import type { ReactNode } from 'react';

export interface RadioProps extends Omit<PrimitiveRadioProps, 'className'> {
  /** Optional visible label rendered beside the radio control. */
  children?: ReactNode;

  /** Consumer class applied to the Radio root label. */
  className?: string;
}

export interface RadioGroupProps extends Omit<PrimitiveRadioGroupProps, 'className'> {
  /** Consumer class applied to the RadioGroup root. */
  className?: string;
}

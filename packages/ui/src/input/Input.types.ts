import type { InputProps as PrimitiveInputProps } from '@virgo-design/primitives';
import type { ReactNode } from 'react';

export type InputSize = 'mini' | 'small' | 'medium' | 'large';

export interface InputProps extends Omit<PrimitiveInputProps, 'size'> {
  /**
   * Visual size of the input.
   *
   * @default 'medium'
   */
  size?: InputSize;

  /** Decorative content rendered before the text-entry control. */
  leadingIcon?: ReactNode;

  /** Decorative content rendered after the text-entry control. */
  trailingIcon?: ReactNode;

  /**
   * Applies the invalid visual treatment and sets aria-invalid when true.
   *
   * @default false
   */
  invalid?: boolean;
}

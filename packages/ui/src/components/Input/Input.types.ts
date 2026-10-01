import type { InputProps as PrimitiveInputProps } from '@virgo-design/primitives';
import type { ReactNode } from 'react';

export type InputSize = 'mini' | 'small' | 'medium' | 'large';

export interface InputProps extends Omit<PrimitiveInputProps, 'prefix' | 'size'> {
  /**
   * Visual size of the input.
   *
   * @default 'medium'
   */
  size?: InputSize;

  /** Consumer class applied to the input frame; className styles the native control. */
  rootClassName?: string;

  /** Decorative content rendered before the text-entry control. */
  prefix?: ReactNode;

  /** Decorative content rendered after the text-entry control. */
  suffix?: ReactNode;

  /**
   * Shows a clear action while the input has a value.
   *
   * @default false
   */
  clearable?: boolean;

  /** @deprecated Use prefix instead. */
  leadingIcon?: ReactNode;

  /** @deprecated Use suffix instead. */
  trailingIcon?: ReactNode;

  /**
   * Applies the invalid visual treatment and sets aria-invalid when true.
   *
   * @default false
   */
  invalid?: boolean;
}

export type InputPasswordProps = Omit<InputProps, 'type'>;

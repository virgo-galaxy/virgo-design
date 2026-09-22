import type { TextareaProps as PrimitiveTextareaProps } from '@virgo-design/primitives';

import type { InputSize } from './Input.types';

export type TextareaSize = InputSize;

export interface TextareaProps extends Omit<PrimitiveTextareaProps, 'size'> {
  /**
   * Visual density and minimum height of the textarea.
   *
   * @default 'medium'
   */
  size?: TextareaSize;

  /**
   * Applies the invalid visual treatment and sets aria-invalid when true.
   *
   * @default false
   */
  invalid?: boolean;
}

import type { InputProps as PrimitiveInputProps } from '@virgo-design/primitives';
import type { ReactNode } from 'react';

export type InputSize = 'mini' | 'small' | 'medium' | 'large';

export interface InputStepperRepeatOptions {
  /** Delay in milliseconds before a held step button starts repeating. @default 400 */
  delay?: number;
  /** Milliseconds between repeated steps, with a minimum of 16. @default 80 */
  interval?: number;
}

export interface InputProps extends Omit<PrimitiveInputProps, 'prefix' | 'size'> {
  /**
   * Visual size of the input.
   *
   * @default 'medium'
   */
  size?: InputSize;

  /** Consumer class applied to the input frame; className styles the native control. */
  rootClassName?: string;

  /** Decorative text, unit, or icon rendered before the text-entry control. */
  prefix?: ReactNode;

  /** Decorative text, unit, or icon rendered after the text-entry control. */
  suffix?: ReactNode;

  /**
   * Shows a clear action while the input has a value.
   *
   * @default false
   */
  clearable?: boolean;

  /**
   * Shows theme-aware increase/decrease buttons for type="number". Uses native min, max,
   * and step rules; ignored for other types or step="any". Button width defaults to 24px
   * and can be customized with --input-stepper-width on the frame.
   *
   * @default false
   */
  steppers?: boolean;

  /** Hold-to-repeat behavior for numeric steppers. False disables repetition; an object customizes timing. @default true */
  stepperRepeat?: boolean | InputStepperRepeatOptions;

  /** Reverses numeric arrow actions: up decreases and down increases, including held buttons and keyboard arrows. @default false */
  stepperReverse?: boolean;

  /**
   * Applies the invalid visual treatment and sets aria-invalid when true.
   *
   * @default false
   */
  invalid?: boolean;
}

export type InputPasswordProps = Omit<
  InputProps,
  'type' | 'steppers' | 'stepperRepeat' | 'stepperReverse'
>;

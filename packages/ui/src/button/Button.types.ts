import type { ButtonProps as PrimitiveButtonProps } from '@virgo-design/primitives';

export type ButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost';

export type ButtonTone = 'accent' | 'neutral' | 'danger';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends PrimitiveButtonProps {
  /**
   * Visual treatment of the button.
   *
   * @default 'solid'
   */
  variant?: ButtonVariant;

  /**
   * Semantic color tone of the button.
   *
   * @default 'accent'
   */
  tone?: ButtonTone;

  /**
   * Visual size of the button.
   *
   * @default 'md'
   */
  size?: ButtonSize;
}

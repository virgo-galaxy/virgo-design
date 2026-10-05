import type { ButtonProps as PrimitiveButtonProps } from '@virgo-design/primitives';
import type { ReactNode } from 'react';

import type { ActionGroupProps } from '../../internal/action-group/ActionGroup.types';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';

export type ButtonSize = 'mini' | 'small' | 'medium' | 'large';

export type ButtonShape = 'square' | 'circle';

interface ButtonSharedProps extends Omit<PrimitiveButtonProps, 'children'> {
  /**
   * Visual treatment of the button.
   *
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Visual size of the button.
   *
   * @default 'medium'
   */
  size?: ButtonSize;
}

export interface TextButtonProps extends ButtonSharedProps {
  /** Visible text label for the action. */
  children: ReactNode;

  /** Keeps the default text-button layout. */
  iconOnly?: false;

  /** Icon-only geometry is not available for text buttons. */
  shape?: never;

  /** Decorative content rendered before the label. */
  leadingIcon?: ReactNode;

  /** Decorative content rendered after the label. */
  trailingIcon?: ReactNode;
}

export interface IconOnlyButtonProps extends ButtonSharedProps {
  /** Renders a compact control whose child is the action icon. */
  iconOnly: true;

  /** Accessible name required because the action has no visible text label. */
  'aria-label': string;

  /** Icon rendered as the button's only visible content. */
  children: ReactNode;

  /**
   * Geometry of an icon-only button.
   *
   * @default 'square'
   */
  shape?: ButtonShape;

  leadingIcon?: never;
  trailingIcon?: never;
}

export type ButtonProps = TextButtonProps | IconOnlyButtonProps;

/** Groups related independent actions without a shared selected value. */
export interface ButtonGroupProps extends ActionGroupProps {
  /** Separate controls or connect their adjacent edges. Attached groups accept direct Button children. @default 'spaced' */
  variant?: 'spaced' | 'attached';
}

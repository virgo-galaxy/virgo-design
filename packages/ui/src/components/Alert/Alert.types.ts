import type { ButtonHTMLAttributes, HTMLAttributes, MouseEventHandler, ReactNode } from 'react';

export type AlertIntent = 'default' | 'info' | 'success' | 'warning' | 'error';
export type AlertVariant = 'soft' | 'outline';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Semantic status treatment. @default 'default' */
  intent?: AlertIntent;
  /** Surface treatment. @default 'soft' */
  variant?: AlertVariant;
  /** Overrides the status icon rendered by Alert.Icon. Use false to hide it. */
  icon?: ReactNode | false;
}

export type AlertRootProps = AlertProps;
export type AlertContentProps = HTMLAttributes<HTMLDivElement>;
export type AlertTitleProps = HTMLAttributes<HTMLDivElement>;
export type AlertDescriptionProps = HTMLAttributes<HTMLDivElement>;
export type AlertActionProps = HTMLAttributes<HTMLDivElement>;

export type AlertIconProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'>;

export interface AlertCloseProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /** Notifies the owner; Alert.Close never removes the Alert itself. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

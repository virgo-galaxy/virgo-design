import type {
  MenuCheckboxItemProps as PrimitiveCheckboxProps,
  MenuGroupProps as PrimitiveGroupProps,
  MenuItemProps as PrimitiveItemProps,
  MenuProps as PrimitiveMenuProps,
  MenuRadioItemProps as PrimitiveRadioProps,
  MenuTriggerProps as PrimitiveTriggerProps,
} from '@virgo-design/primitives';
import type { ReactNode } from 'react';

import type { ButtonSize, ButtonVariant } from '../Button';

export type { MenuContentProps, MenuRadioGroupProps } from '@virgo-design/primitives';

export interface MenuProps extends PrimitiveMenuProps {
  size?: ButtonSize;
}

export interface MenuTriggerProps extends PrimitiveTriggerProps {
  variant?: ButtonVariant;
}

export interface MenuItemVisualProps {
  icon?: ReactNode;
  /** Display only. No shortcut binding is installed. */
  shortcut?: ReactNode;
  danger?: boolean;
}

export interface MenuItemProps extends PrimitiveItemProps, MenuItemVisualProps {}

export interface MenuCheckboxItemProps extends PrimitiveCheckboxProps, MenuItemVisualProps {}

export interface MenuRadioItemProps extends PrimitiveRadioProps, MenuItemVisualProps {}

export interface MenuSubmenuTriggerProps extends PrimitiveTriggerProps {
  icon?: ReactNode;
}

export interface MenuGroupProps extends PrimitiveGroupProps {
  label?: ReactNode;
}

export type MenuSubmenuProps = PrimitiveMenuProps;

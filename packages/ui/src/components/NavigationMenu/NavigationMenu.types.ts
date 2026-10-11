import type {
  NavigationMenuContentProps as PrimitiveNavigationMenuContentProps,
  NavigationMenuGroupLabelProps as PrimitiveNavigationMenuGroupLabelProps,
  NavigationMenuGroupProps as PrimitiveNavigationMenuGroupProps,
  NavigationMenuItemProps as PrimitiveNavigationMenuItemProps,
  NavigationMenuLinkProps as PrimitiveNavigationMenuLinkProps,
  NavigationMenuListProps as PrimitiveNavigationMenuListProps,
  NavigationMenuOrientation,
  NavigationMenuProps as PrimitiveNavigationMenuProps,
  NavigationMenuTriggerProps as PrimitiveNavigationMenuTriggerProps,
} from '@virgo-design/primitives';
import type { HTMLAttributes, ReactNode } from 'react';

export type NavigationMenuVariant = 'default' | 'segmented';
export type NavigationMenuSubmenu = 'inline' | 'popover';

export interface NavigationMenuProps extends PrimitiveNavigationMenuProps {
  /** Theme Contract navigation treatment. @default 'default' */
  variant?: NavigationMenuVariant;

  /** How nested navigation content is presented. @default 'inline' */
  submenu?: NavigationMenuSubmenu;
}

export type NavigationMenuRootProps = NavigationMenuProps;
export type NavigationMenuListProps = PrimitiveNavigationMenuListProps;
export type NavigationMenuGroupProps = PrimitiveNavigationMenuGroupProps;
export type NavigationMenuGroupLabelProps = PrimitiveNavigationMenuGroupLabelProps;

export interface NavigationMenuItemProps extends PrimitiveNavigationMenuItemProps {
  /** Decorative icon shared by this item's Link or Trigger. */
  icon?: ReactNode;
}

export interface NavigationMenuLinkProps extends Omit<
  PrimitiveNavigationMenuLinkProps,
  'children'
> {
  children?: ReactNode;
}

export interface NavigationMenuTriggerProps extends Omit<
  PrimitiveNavigationMenuTriggerProps,
  'children'
> {
  children?: ReactNode;

  /** Whether to render the disclosure indicator. @default true */
  indicator?: boolean;
}

export interface NavigationMenuContentProps extends PrimitiveNavigationMenuContentProps {
  /** Show a decorative arrow pointing to the trigger in popover submenus. Ignored for inline submenus. @default false */
  arrow?: boolean;
}
export type NavigationMenuSeparatorProps = HTMLAttributes<HTMLLIElement>;
export type { NavigationMenuOrientation };

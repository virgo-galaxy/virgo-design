import type {
  NavigationMenuContentProps as PrimitiveNavigationMenuContentProps,
  NavigationMenuItemProps as PrimitiveNavigationMenuItemProps,
  NavigationMenuLinkProps as PrimitiveNavigationMenuLinkProps,
  NavigationMenuListProps as PrimitiveNavigationMenuListProps,
  NavigationMenuOrientation,
  NavigationMenuProps as PrimitiveNavigationMenuProps,
  NavigationMenuTriggerProps as PrimitiveNavigationMenuTriggerProps,
} from '@virgo-design/primitives';
import type { ReactNode } from 'react';

export type NavigationMenuVariant = 'default';
export type NavigationMenuSubmenu = 'inline' | 'popover';

export interface NavigationMenuProps extends PrimitiveNavigationMenuProps {
  /** Classic Virgo navigation treatment. @default 'default' */
  variant?: NavigationMenuVariant;

  /** How nested navigation content is presented. @default 'inline' */
  submenu?: NavigationMenuSubmenu;
}

export type NavigationMenuRootProps = NavigationMenuProps;
export type NavigationMenuListProps = PrimitiveNavigationMenuListProps;

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
}

export type NavigationMenuContentProps = PrimitiveNavigationMenuContentProps;
export type { NavigationMenuOrientation };

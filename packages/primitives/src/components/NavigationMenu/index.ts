import {
  NavigationMenuContent,
  NavigationMenuGroup,
  NavigationMenuGroupLabel,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
} from './NavigationMenu';

export const NavigationMenu = Object.assign(NavigationMenuRoot, {
  Root: NavigationMenuRoot,
  List: NavigationMenuList,
  Group: NavigationMenuGroup,
  GroupLabel: NavigationMenuGroupLabel,
  Item: NavigationMenuItem,
  Link: NavigationMenuLink,
  Trigger: NavigationMenuTrigger,
  Content: NavigationMenuContent,
});

export type {
  NavigationMenuContentProps,
  NavigationMenuGroupLabelProps,
  NavigationMenuGroupProps,
  NavigationMenuItemProps,
  NavigationMenuLinkProps,
  NavigationMenuListProps,
  NavigationMenuOrientation,
  NavigationMenuProps,
  NavigationMenuRootProps,
  NavigationMenuTriggerProps,
} from './NavigationMenu.types';

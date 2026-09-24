import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
} from './NavigationMenu';

export const NavigationMenu = Object.assign(NavigationMenuRoot, {
  Root: NavigationMenuRoot,
  List: NavigationMenuList,
  Item: NavigationMenuItem,
  Link: NavigationMenuLink,
  Trigger: NavigationMenuTrigger,
  Content: NavigationMenuContent,
});

export type {
  NavigationMenuContentProps,
  NavigationMenuItemProps,
  NavigationMenuLinkProps,
  NavigationMenuListProps,
  NavigationMenuOrientation,
  NavigationMenuProps,
  NavigationMenuRootProps,
  NavigationMenuTriggerProps,
} from './NavigationMenu.types';

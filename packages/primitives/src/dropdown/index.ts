import {
  Dropdown as Root,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from './Dropdown';

export const Dropdown = Object.assign(Root, {
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
  Separator: DropdownSeparator,
});
export type {
  DropdownContentProps,
  DropdownItemProps,
  DropdownPlacement,
  DropdownProps,
  DropdownTriggerProps,
} from './Dropdown.types';

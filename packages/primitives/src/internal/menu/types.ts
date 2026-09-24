import type { ButtonHTMLAttributes, HTMLAttributes, MouseEvent, ReactElement, Ref } from 'react';

import type { OverlayPlacement } from '../overlay/positioning';

export interface MenuRootProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}
export interface MenuTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  render?: (
    props: ButtonHTMLAttributes<HTMLButtonElement> & { ref: Ref<HTMLButtonElement> },
  ) => ReactElement;
}
export interface MenuContentProps extends HTMLAttributes<HTMLDivElement> {
  placement?: OverlayPlacement;
  offset?: number;
}
export interface MenuItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> {
  /** Cancel selection with event.preventDefault(). */
  onSelect?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Defaults to true for actions and false for checkbox/radio items. */
  closeOnSelect?: boolean;
  /** Search label for rich content. Shortcut display is excluded by UI. */
  textValue?: string;
}
export interface MenuCheckboxItemProps extends MenuItemProps {
  checked?: boolean | 'mixed';
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}
export interface MenuRadioGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}
export interface MenuRadioItemProps extends MenuItemProps {
  value: string;
}
export type MenuGroupProps = HTMLAttributes<HTMLDivElement>;
export interface ContextMenuTriggerProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  render?: (props: HTMLAttributes<HTMLDivElement> & { ref: Ref<HTMLDivElement> }) => ReactElement;
}
export interface MenubarRootProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> {
  /** Value of the open top-level menu; null closes all menus. */
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
}
export interface MenubarMenuProps extends Omit<
  MenuRootProps,
  'open' | 'defaultOpen' | 'onOpenChange'
> {
  value?: string;
}

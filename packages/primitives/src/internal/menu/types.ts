import type { ButtonHTMLAttributes, HTMLAttributes, MouseEvent, ReactElement, Ref } from 'react';

import type { OverlayPlacement } from '../overlay/positioning';

export interface MenuRootProps extends HTMLAttributes<HTMLDivElement> {
  /** Controlled menu visibility. */
  open?: boolean;
  /** Initial visibility in uncontrolled mode. */
  defaultOpen?: boolean;
  /** Called when menu visibility changes. */
  onOpenChange?: (open: boolean) => void;
  /** Disables opening the menu. */
  disabled?: boolean;
}
export interface MenuTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  render?: (
    props: ButtonHTMLAttributes<HTMLButtonElement> & { ref: Ref<HTMLButtonElement> },
  ) => ReactElement;
}
export interface MenuContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Preferred popup placement; flips and shifts to stay within the viewport. */
  placement?: OverlayPlacement;
  /** Distance in pixels between the anchor and popup. */
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
/** Target that opens a context menu on right-click or keyboard invocation. */
export interface ContextMenuTriggerProps extends HTMLAttributes<HTMLDivElement> {
  /** Disables context-menu invocation for this target. */
  disabled?: boolean;
  /** Renders a custom target that forwards the supplied props and ref. */
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

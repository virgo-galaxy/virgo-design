import type { ButtonHTMLAttributes, HTMLAttributes, ReactElement, Ref } from 'react';

export type DropdownPlacement =
  | 'bottomLeft'
  | 'bottom'
  | 'bottomRight'
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'leftTop'
  | 'left'
  | 'leftBottom'
  | 'rightTop'
  | 'right'
  | 'rightBottom';

export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  /** Pointer activation; keyboard and touch activation work in both modes. */
  trigger?: 'click' | 'hover';
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

export interface DropdownTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render a custom button that forwards all supplied props and its ref. */
  render?: (
    props: ButtonHTMLAttributes<HTMLButtonElement> & { ref: Ref<HTMLButtonElement> },
  ) => ReactElement;
}

export interface DropdownContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Preferred physical placement; flips and shifts at viewport edges. */
  placement?: DropdownPlacement;
  offset?: number;
}

export interface DropdownItemProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onSelect'
> {
  /** Supplying checked turns the item into a menuitemradio. */
  checked?: boolean;
  /** Prevent the event's default to keep the menu open. */
  onSelect?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

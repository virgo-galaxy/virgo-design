import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactElement,
  Ref,
} from 'react';

export type NavigationMenuOrientation = 'horizontal' | 'vertical';

export interface NavigationMenuProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'defaultValue' | 'onChange'
> {
  /** Direction used by arrow-key navigation. @default 'horizontal' */
  orientation?: NavigationMenuOrientation;

  /** Controlled active item value. */
  value?: string;

  /** Initially active item value for uncontrolled usage. */
  defaultValue?: string;

  /** Called when a link activates an item. */
  onValueChange?: (value: string) => void;
}

export type NavigationMenuRootProps = NavigationMenuProps;
export type NavigationMenuListProps = HTMLAttributes<HTMLUListElement>;
/** Place inside List and reference GroupLabel's id with aria-labelledby. */
export type NavigationMenuGroupProps = HTMLAttributes<HTMLDivElement>;
/** Non-interactive group heading; accepts standard div attributes and a ref. */
export type NavigationMenuGroupLabelProps = HTMLAttributes<HTMLDivElement>;

export interface NavigationMenuItemProps extends Omit<HTMLAttributes<HTMLLIElement>, 'value'> {
  /** Stable value used to coordinate this item with the root active state. */
  value: string;

  /** Prevents this item's link or disclosure trigger from being activated. */
  disabled?: boolean;

  /** Controlled expanded state for this item's nested content. */
  expanded?: boolean;

  /** Initial expanded state for uncontrolled usage. @default false */
  defaultExpanded?: boolean;

  /** Called when nested content expands or collapses. */
  onExpandedChange?: (expanded: boolean) => void;
}

export interface NavigationMenuLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Render a custom link that forwards all supplied props and its ref. */
  render?: (
    props: AnchorHTMLAttributes<HTMLAnchorElement> & { ref: Ref<HTMLAnchorElement> },
  ) => ReactElement;
}

export interface NavigationMenuTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render a custom button that forwards all supplied props and its ref. */
  render?: (
    props: ButtonHTMLAttributes<HTMLButtonElement> & { ref: Ref<HTMLButtonElement> },
  ) => ReactElement;
}

export type NavigationMenuContentProps = HTMLAttributes<HTMLUListElement>;

import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
export interface TreeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Expanded branch values. */
  expandedValues?: readonly string[] | undefined;
  /** Initial expanded branches in uncontrolled mode. */
  defaultExpandedValues?: readonly string[] | undefined;
  /** Called when a branch is expanded or collapsed. */
  onExpandedValuesChange?: ((values: readonly string[]) => void) | undefined;
  /** Selected item values; single mode retains at most one value. */
  selectedValues?: readonly string[] | undefined;
  /** Initial selected items in uncontrolled mode. */
  defaultSelectedValues?: readonly string[] | undefined;
  /** Called on explicit selection, independently of focus movement. */
  onSelectedValuesChange?: ((values: readonly string[]) => void) | undefined;
  /** Single selection, modifier-free multiple selection, or navigation only. @default 'single' */
  selectionMode?: 'single' | 'multiple' | 'none' | undefined;
  /** Disables interaction throughout this tree. */
  disabled?: boolean | undefined;
}
export interface TreeItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Unique value within this tree. */
  value: string;
  /** Identifies an expandable item containing Tree.Group. */
  branch?: boolean | undefined;
  /** Excludes the item from keyboard navigation and selection. */
  disabled?: boolean | undefined;
  /** Plain label used by typeahead for rich content. */
  textValue?: string | undefined;
}
export type TreeLabelProps = HTMLAttributes<HTMLDivElement>;
export type TreeGroupProps = HTMLAttributes<HTMLDivElement>;
export type TreeToggleProps = ButtonHTMLAttributes<HTMLButtonElement>;

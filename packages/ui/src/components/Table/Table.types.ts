import type {
  TableCellProps as PrimitiveTableCellProps,
  TableHeadProps as PrimitiveTableHeadProps,
  TableProps as PrimitiveTableProps,
  TableSortDirection,
} from '@virgo-design/primitives';
import type { HTMLAttributes, ReactNode } from 'react';

import type { ButtonSize } from '../Button/Button.types';

export type TableDensity = 'compact' | 'default' | 'comfortable';

export interface TableProps extends Omit<PrimitiveTableProps, 'border'> {
  /** Cell padding and minimum header/body row heights. Takes precedence over size. @default 'default' */
  density?: TableDensity | undefined;
  /** Legacy density alias: small = compact, medium = default, large = comfortable. Prefer density. @default 'medium' */
  size?: 'small' | 'medium' | 'large' | undefined;
  /** Border treatment. Separators divide adjacent rows without an outer edge. @default 'rows' */
  border?: 'none' | 'rows' | 'separators' | 'all' | undefined;
  /** Short vertical separators between column headings. @default true */
  headerDividers?: boolean | undefined;
  /** Enables pointer and keyboard column resizing. @default false */
  resizable?: boolean | undefined;
  /** Minimum width in pixels when resizing a column. @default 80 */
  minColumnWidth?: number | undefined;
  /** Alternating body row backgrounds. @default false */
  striped?: boolean | undefined;
  /** Highlights pointer-hovered rows. @default false */
  hoverable?: boolean | undefined;
  /** Sticks column headings inside the nearest scrolling viewport. @default false */
  stickyHeader?: boolean | undefined;
}
export interface TableHeadProps extends Omit<PrimitiveTableHeadProps, 'align'> {
  /** Trailing column controls, such as Table.Filter; kept outside the sorting button. */
  actions?: ReactNode;
  /** Makes the column heading a three-state sorting button. Data ordering is consumer-owned. */
  onSortChange?: ((direction: TableSortDirection) => void) | undefined;
  /** Logical alignment; end is useful for numeric columns. @default 'start' */
  align?: 'start' | 'center' | 'end' | undefined;
}
export interface TableCellProps extends Omit<PrimitiveTableCellProps, 'align'> {
  /** Logical alignment; end is useful for numeric columns. @default 'start' */
  align?: 'start' | 'center' | 'end' | undefined;
}
export type {
  TableCaptionProps,
  TableRowProps,
  TableSectionProps,
  TableSortButtonProps,
  TableSortDirection,
  TableViewportProps,
} from '@virgo-design/primitives';

export interface TableFilterOption {
  value: string;
  label: ReactNode;
  disabled?: boolean | undefined;
}
export interface TableFilterProps {
  /** Tooltip content. Defaults to the generic localized Filter label; false hides the hint. */
  tooltip?: ReactNode | false | undefined;
  /** Size of the Confirm and Reset action buttons. @default 'mini' */
  size?: ButtonSize | undefined;
  /** Column name used to label the filter button and popover. */
  label: string;
  /** Available checkbox choices. */
  options: readonly TableFilterOption[];
  /** Controlled applied values. An empty array means no filter. */
  value?: readonly string[] | undefined;
  /** Initial applied values when uncontrolled. @default [] */
  defaultValue?: readonly string[] | undefined;
  /** Called on Confirm or Reset; checking a box only changes the draft. */
  onValueChange?: ((value: string[]) => void) | undefined;
  /** Disables the filter trigger. @default false */
  disabled?: boolean | undefined;
  /** Consumer class applied to the filter root. */
  className?: string | undefined;
}

export type TableSelectionAction = 'all' | 'invert' | 'none';
export interface TableSelectionOption {
  /** Stable custom action identifier. */
  key: string;
  /** Menu item content. */
  label: ReactNode;
  /** Returns the next selected keys from the selectable page keys and current selection. */
  onSelect: (rowKeys: readonly string[], selectedKeys: readonly string[]) => readonly string[];
  /** Disables this action. @default false */
  disabled?: boolean | undefined;
}
export interface TableSelectionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  /** Selectable keys on the current page, in display order. Exclude disabled rows. */
  rowKeys: readonly string[];
  /** Controlled selected keys, including selections from other pages. */
  value?: readonly string[] | undefined;
  /** Initial selected keys when uncontrolled. @default [] */
  defaultValue?: readonly string[] | undefined;
  /** Called once when the checkbox or a menu action changes selection. */
  onValueChange?: ((value: string[]) => void) | undefined;
  /** Optional selection menu: true shows all, invert and none; an array orders built-in and custom actions. false or an empty array hides the arrow. @default false */
  selections?: boolean | readonly (TableSelectionAction | TableSelectionOption)[] | undefined;
  /** Accessible name of the select-page checkbox. */
  label?: string | undefined;
  /** Accessible name of the selection menu trigger. */
  menuLabel?: string | undefined;
  /** Disables the checkbox and menu. Empty rowKeys also disables them. @default false */
  disabled?: boolean | undefined;
}

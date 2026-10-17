import type {
  TableCellProps as PrimitiveTableCellProps,
  TableHeadProps as PrimitiveTableHeadProps,
  TableProps as PrimitiveTableProps,
  TableSortButtonProps as PrimitiveTableSortButtonProps,
  TableSortDirection,
} from '@virgo-design/primitives';
import type { HTMLAttributes, ReactNode } from 'react';

import type { ButtonSize } from '../Button/Button.types';

export type TableDensity = 'mini' | 'compact' | 'default' | 'comfortable';

export interface TableProps extends Omit<PrimitiveTableProps, 'border'> {
  /** Cell padding and minimum header/body row heights. @default 'default' */
  density?: TableDensity | undefined;
  /** Border treatment. Separators divide adjacent rows without an outer edge. @default 'rows' */
  border?: 'none' | 'rows' | 'separators' | 'all' | undefined;
  /** Short vertical separators between column headings. @default true */
  headerDividers?: boolean | undefined;
  /** Enables pointer and keyboard resizing for all columns. @default false */
  resizable?: boolean | undefined;
  /** Minimum width in pixels when resizing a column. @default 80 */
  minColumnWidth?: number | undefined;
  /** Maximum column width in pixels. @default Infinity */
  maxColumnWidth?: number | undefined;
  /** Controlled widths in visible column order. Kept when resizing is disabled. */
  columnWidths?: readonly number[] | undefined;
  /** Receives widths after pointer or keyboard resizing; data/column identity stays consumer-owned. */
  onColumnWidthsChange?: ((widths: number[]) => void) | undefined;
  /** Alternating body row backgrounds. @default false */
  striped?: boolean | undefined;
  /** Highlights pointer-hovered rows. @default false */
  hoverable?: boolean | undefined;
  /** Sticks column headings inside the nearest scrolling viewport. @default false */
  stickyHeader?: boolean | undefined;
}

export type TableSortMode = 'both' | 'ascending' | 'descending';
export interface TableFixedCellProps {
  /** Pins this cell to a logical edge of Table.Viewport. */
  fixed?: 'start' | 'end' | undefined;
  /** Cumulative widths of preceding pinned columns at the same edge, in pixels. @default 0 */
  stickyOffset?: number | undefined;
}

export interface TableSortButtonProps extends PrimitiveTableSortButtonProps {
  /** Both arrows and a three-state cycle, or a single arrow toggling that direction and none. @default 'both' */
  sortMode?: TableSortMode | undefined;
}

export interface TableHeaderSortControl {
  /** Shows the sorting button while retaining its mode when disabled. @default true */
  enabled?: boolean | undefined;
  /** Arrow shape and direction cycle. @default 'both' */
  mode?: TableSortMode | undefined;
  /** Controlled direction, also reflected in the heading's aria-sort. @default 'none' */
  direction?: TableSortDirection | undefined;
  /** Receives the requested direction; data ordering remains consumer-owned. */
  onDirectionChange?: ((direction: TableSortDirection) => void) | undefined;
}

export interface TableHeaderControls {
  /** Keeps the heading at the start, or aligns heading and controls as one group. @default 'separate' */
  layout?: 'separate' | 'joined' | undefined;
  /** Aligns controls in the remaining space, or the complete joined heading group. @default 'end' */
  align?: 'start' | 'center' | 'end' | undefined;
  /** Sorting control; omitted or false hides it. */
  sort?: TableHeaderSortControl | false | undefined;
  /** Filter control; the column name supplies its label. Omitted or false hides it. */
  filter?: Omit<TableFilterProps, 'label'> | false | undefined;
  /** Search control; the column name supplies its label. Omitted or false hides it. */
  search?: Omit<TableSearchProps, 'label'> | false | undefined;
}

export interface TableHeadProps
  extends TableFixedCellProps, Omit<PrimitiveTableHeadProps, 'align' | 'sortDirection'> {
  /** Optional controls in fixed order: sorting, filter, search. Their alignment is shared. */
  controls?: TableHeaderControls | undefined;
  /** Per-column minimum resize width, overriding the table default. */
  minWidth?: number | undefined;
  /** Per-column maximum resize width, overriding the table default. */
  maxWidth?: number | undefined;
  /** Heading alignment when controls is omitted; otherwise controls.align owns alignment. @default 'start' */
  align?: 'start' | 'center' | 'end' | undefined;
}

export interface TableCellProps
  extends TableFixedCellProps, Omit<PrimitiveTableCellProps, 'align'> {
  /** Logical alignment; end is useful for numeric columns. @default 'start' */
  align?: 'start' | 'center' | 'end' | undefined;
}

export type {
  TableCaptionProps,
  TableRowProps,
  TableSectionProps,
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

export interface TableSearchProps {
  /** Column name used in accessible labels. */
  label: string;
  /** Controlled applied query. */
  value?: string | undefined;
  /** Initial uncontrolled query. @default '' */
  defaultValue?: string | undefined;
  /** Called when submitting or clearing the search. */
  onValueChange?: ((value: string) => void) | undefined;
  /** Optional input placeholder. */
  placeholder?: string | undefined;
  /** Custom tooltip; false hides it. */
  tooltip?: ReactNode | false | undefined;
  /** Size of the search controls. @default 'small' */
  size?: ButtonSize | undefined;
  /** Size of the search action buttons, overriding size when provided. */
  actionSize?: ButtonSize | undefined;
  /** Disables the search trigger. @default false */
  disabled?: boolean | undefined;
}

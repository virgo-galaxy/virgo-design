import type {
  TableCellProps as PrimitiveTableCellProps,
  TableHeadProps as PrimitiveTableHeadProps,
  TableProps as PrimitiveTableProps,
  TableSortDirection,
} from '@virgo-design/primitives';
export type TableDensity = 'compact' | 'default' | 'comfortable';

export interface TableProps extends Omit<PrimitiveTableProps, 'border'> {
  /** Cell padding and minimum header/body row heights. Takes precedence over size. @default 'default' */
  density?: TableDensity | undefined;
  /** Legacy density alias: small = compact, medium = default, large = comfortable. Prefer density. @default 'medium' */
  size?: 'small' | 'medium' | 'large' | undefined;
  /** Border treatment. Separators divide adjacent rows without an outer edge. @default 'rows' */
  border?: 'none' | 'rows' | 'separators' | 'all' | undefined;
  /** Alternating body row backgrounds. @default false */
  striped?: boolean | undefined;
  /** Highlights pointer-hovered rows. @default false */
  hoverable?: boolean | undefined;
  /** Sticks column headings inside the nearest scrolling viewport. @default false */
  stickyHeader?: boolean | undefined;
}
export interface TableHeadProps extends Omit<PrimitiveTableHeadProps, 'align'> {
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

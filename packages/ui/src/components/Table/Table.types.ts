import type {
  TableCellProps as PrimitiveTableCellProps,
  TableHeadProps as PrimitiveTableHeadProps,
  TableProps as PrimitiveTableProps,
} from '@virgo-design/primitives';
export interface TableProps extends Omit<PrimitiveTableProps, 'border'> {
  /** Cell density. @default 'medium' */
  size?: 'small' | 'medium' | 'large' | undefined;
  /** Border treatment. @default 'rows' */
  border?: 'none' | 'rows' | 'all' | undefined;
  /** Alternating body row backgrounds. @default false */
  striped?: boolean | undefined;
  /** Highlights pointer-hovered rows. @default false */
  hoverable?: boolean | undefined;
  /** Sticks column headings inside the nearest scrolling viewport. @default false */
  stickyHeader?: boolean | undefined;
}
export interface TableHeadProps extends Omit<PrimitiveTableHeadProps, 'align'> {
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
  TableViewportProps,
} from '@virgo-design/primitives';

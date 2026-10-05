import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';
export type TableProps = TableHTMLAttributes<HTMLTableElement>;
export type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement>;
export type TableSectionProps = HTMLAttributes<HTMLTableSectionElement>;
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Consumer-owned selected appearance; does not add grid selection semantics. */
  selected?: boolean | undefined;
}
export type TableSortDirection = 'none' | 'ascending' | 'descending';
export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Current column sort direction, reflected in aria-sort. */
  sortDirection?: TableSortDirection | undefined;
}
export interface TableSortButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Controlled sort direction. */
  direction?: TableSortDirection | undefined;
  /** Initial uncontrolled direction. @default 'none' */
  defaultDirection?: TableSortDirection | undefined;
  /** Enabled sort directions, cycled in order before returning to none. @default ['ascending', 'descending'] */
  directions?: readonly Exclude<TableSortDirection, 'none'>[] | undefined;
  /** Requests the next enabled direction, then none. */
  onDirectionChange?: ((direction: TableSortDirection) => void) | undefined;
}
export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;
export type TableViewportProps = HTMLAttributes<HTMLDivElement>;

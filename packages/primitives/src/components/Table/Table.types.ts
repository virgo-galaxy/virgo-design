import type {
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
export type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>;
export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;
export type TableViewportProps = HTMLAttributes<HTMLDivElement>;

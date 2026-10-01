import { Table as PrimitiveTable } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import styles from './Table.module.scss';
import type {
  TableCaptionProps,
  TableCellProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
  TableSectionProps,
  TableViewportProps,
} from './Table.types';
export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  {
    size = 'medium',
    border = 'rows',
    striped = false,
    hoverable = false,
    stickyHeader = false,
    className,
    ...props
  },
  ref,
) {
  return (
    <PrimitiveTable
      {...props}
      ref={ref}
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-size={size}
      data-border={border}
      data-striped={striped || undefined}
      data-hoverable={hoverable || undefined}
      data-sticky-header={stickyHeader || undefined}
    />
  );
});
export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  function TableCaption({ className, ...props }, ref) {
    return (
      <PrimitiveTable.Caption
        {...props}
        ref={ref}
        className={[styles.caption, className].filter(Boolean).join(' ')}
      />
    );
  },
);
export const TableHeader = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  function TableHeader({ className, ...props }, ref) {
    return (
      <PrimitiveTable.Header
        {...props}
        ref={ref}
        className={[styles.header, className].filter(Boolean).join(' ')}
      />
    );
  },
);
export const TableBody = forwardRef<HTMLTableSectionElement, TableSectionProps>(function TableBody(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveTable.Body
      {...props}
      ref={ref}
      className={[styles.body, className].filter(Boolean).join(' ')}
    />
  );
});
export const TableFooter = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  function TableFooter({ className, ...props }, ref) {
    return (
      <PrimitiveTable.Footer
        {...props}
        ref={ref}
        className={[styles.footer, className].filter(Boolean).join(' ')}
      />
    );
  },
);
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveTable.Row
      {...props}
      ref={ref}
      className={[styles.row, className].filter(Boolean).join(' ')}
    />
  );
});
export const TableViewport = forwardRef<HTMLDivElement, TableViewportProps>(function TableViewport(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveTable.Viewport
      {...props}
      ref={ref}
      className={[styles.viewport, className].filter(Boolean).join(' ')}
    />
  );
});
export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  { align = 'start', className, ...props },
  ref,
) {
  return (
    <PrimitiveTable.Head
      {...props}
      ref={ref}
      data-align={align}
      className={[styles.cell, className].filter(Boolean).join(' ')}
    />
  );
});
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { align = 'start', className, ...props },
  ref,
) {
  return (
    <PrimitiveTable.Cell
      {...props}
      ref={ref}
      data-align={align}
      className={[styles.cell, className].filter(Boolean).join(' ')}
    />
  );
});

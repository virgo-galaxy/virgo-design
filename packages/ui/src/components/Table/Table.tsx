import { SortIcon } from '@virgo-design/icons';
import { Table as PrimitiveTable } from '@virgo-design/primitives';
import { forwardRef, useState } from 'react';

import { useControlLabels } from '../../shared/control-labels';
import { Tooltip } from '../Tooltip';
import styles from './Table.module.scss';
import type {
  TableCaptionProps,
  TableCellProps,
  TableDensity,
  TableHeadProps,
  TableProps,
  TableRowProps,
  TableSectionProps,
  TableSortButtonProps,
  TableViewportProps,
} from './Table.types';

const sizeDensity: Record<NonNullable<TableProps['size']>, TableDensity> = {
  small: 'compact',
  medium: 'default',
  large: 'comfortable',
};

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  {
    density,
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
      data-density={density ?? sizeDensity[size]}
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
  { align = 'start', className, children, sortDirection, onSortChange, ...props },
  ref,
) {
  return (
    <PrimitiveTable.Head
      {...props}
      ref={ref}
      data-align={align}
      sortDirection={onSortChange ? (sortDirection ?? 'none') : sortDirection}
      className={[styles.cell, className].filter(Boolean).join(' ')}
    >
      {onSortChange ? (
        <TableSortButton direction={sortDirection ?? 'none'} onDirectionChange={onSortChange}>
          {children}
        </TableSortButton>
      ) : (
        children
      )}
    </PrimitiveTable.Head>
  );
});
export const TableSortButton = forwardRef<HTMLButtonElement, TableSortButtonProps>(
  function TableSortButton(
    { direction, defaultDirection = 'none', onDirectionChange, className, children, ...props },
    ref,
  ) {
    const [localDirection, setLocalDirection] = useState(defaultDirection);
    const value = direction ?? localDirection;
    const labels = useControlLabels();
    const action =
      value === 'none'
        ? labels.sortAscending
        : value === 'ascending'
          ? labels.sortDescending
          : labels.clearSorting;
    return (
      <Tooltip closeOnClick={false}>
        <Tooltip.Trigger
          {...props}
          ref={ref}
          render={(triggerProps) => (
            <PrimitiveTable.SortButton
              {...triggerProps}
              direction={value}
              onDirectionChange={(next) => {
                if (direction === undefined) setLocalDirection(next);
                onDirectionChange?.(next);
              }}
              className={[styles.sortButton, className].filter(Boolean).join(' ')}
            >
              {children}
              <SortIcon
                className={styles.sortIndicator}
                data-slot="sort-indicator"
                size={16}
                direction={value}
                activeColor="var(--vd-brand-link)"
              />
            </PrimitiveTable.SortButton>
          )}
        />
        <Tooltip.Content size="small" arrow={false}>
          {action}
        </Tooltip.Content>
      </Tooltip>
    );
  },
);
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

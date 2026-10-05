import { forwardRef } from 'react';

import { useControllableState } from '../../internal/hooks/useControllableState';
import type {
  TableCaptionProps,
  TableCellProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
  TableSectionProps,
  TableSortButtonProps,
  TableViewportProps,
} from './Table.types';
export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(props, ref) {
  return <table {...props} ref={ref} />;
});
export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  function TableCaption(props, ref) {
    return <caption {...props} ref={ref} />;
  },
);
export const TableHeader = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  function TableHeader(props, ref) {
    return <thead {...props} ref={ref} />;
  },
);
export const TableBody = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  function TableBody(props, ref) {
    return <tbody {...props} ref={ref} />;
  },
);
export const TableFooter = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  function TableFooter(props, ref) {
    return <tfoot {...props} ref={ref} />;
  },
);
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { selected, ...props },
  ref,
) {
  return <tr {...props} ref={ref} data-selected={selected || undefined} />;
});
export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  { scope = 'col', sortDirection, 'aria-sort': ariaSort, ...props },
  ref,
) {
  return <th {...props} scope={scope} aria-sort={sortDirection ?? ariaSort} ref={ref} />;
});
export const TableSortButton = forwardRef<HTMLButtonElement, TableSortButtonProps>(
  function TableSortButton(
    {
      direction,
      defaultDirection = 'none',
      directions = ['ascending', 'descending'],
      onDirectionChange,
      onClick,
      ...props
    },
    ref,
  ) {
    const [value = 'none', setValue] = useControllableState(
      direction,
      defaultDirection,
      onDirectionChange,
    );
    return (
      <button
        {...props}
        ref={ref}
        type="button"
        data-direction={value}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) {
            const sequence = [...new Set(directions)];
            setValue(sequence[sequence.indexOf(value as 'ascending' | 'descending') + 1] ?? 'none');
          }
        }}
      />
    );
  },
);
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableCell(props, ref) {
    return <td {...props} ref={ref} />;
  },
);
export const TableViewport = forwardRef<HTMLDivElement, TableViewportProps>(
  function TableViewport(props, ref) {
    return <div role="region" tabIndex={0} {...props} ref={ref} />;
  },
);

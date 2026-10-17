import { Table as PrimitiveTable } from '@virgo-design/primitives';
import { type CSSProperties, forwardRef, type ReactNode, useState } from 'react';

import { ColumnResizeHandle, ResizeContext } from './ColumnResizeHandle';
import styles from './Table.module.scss';
import type {
  TableCaptionProps,
  TableCellProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
  TableSectionProps,
  TableSortDirection,
  TableViewportProps,
} from './Table.types';
import { TableFilter } from './TableFilter';
import { TableSearch } from './TableSearch';
import { TableSortButton } from './TableSortButton';

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  {
    density = 'default',
    border = 'rows',
    headerDividers = true,
    resizable = false,
    minColumnWidth = 80,
    maxColumnWidth = Infinity,
    columnWidths,
    onColumnWidthsChange,
    striped = false,
    hoverable = false,
    stickyHeader = false,
    className,
    children,
    style,
    ...props
  },
  ref,
) {
  const [widths, setWidths] = useState<number[] | null>(null);
  const resized = columnWidths ?? (resizable ? widths : null);
  const minimum = Math.max(24, Number.isFinite(minColumnWidth) ? minColumnWidth : 80);
  const maximum = Math.max(minimum, maxColumnWidth);
  const updateWidths = (next: number[]) => {
    if (columnWidths === undefined) setWidths(next);
    onColumnWidthsChange?.(next);
  };

  return (
    <ResizeContext.Provider
      value={{ enabled: resizable, minimum, maximum, widths: resized, setWidths: updateWidths }}
    >
      <PrimitiveTable
        {...props}
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(' ')}
        data-density={density}
        data-border={border}
        data-header-dividers={headerDividers}
        data-resizable={resizable || undefined}
        data-column-widths={resized ? true : undefined}
        data-striped={striped || undefined}
        data-hoverable={hoverable || undefined}
        data-sticky-header={stickyHeader || undefined}
        style={{
          ...style,
          ...(resized
            ? { width: resized.reduce((sum, width) => sum + width, 0), minWidth: 0 }
            : {}),
        }}
      >
        {resized ? (
          <colgroup>
            {resized.map((width, index) => (
              <col key={index} style={{ width }} />
            ))}
          </colgroup>
        ) : null}
        {children}
      </PrimitiveTable>
    </ResizeContext.Provider>
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
  {
    align = 'start',
    className,
    children,
    controls,
    minWidth,
    maxWidth,
    fixed,
    stickyOffset = 0,
    style,
    ...props
  },
  ref,
) {
  const [localDirection, setLocalDirection] = useState<TableSortDirection>('none');
  const sorting = controls?.sort && controls.sort.enabled !== false ? controls.sort : null;
  const requestedDirection = sorting?.direction ?? localDirection;
  const direction =
    sorting?.mode && sorting.mode !== 'both' && requestedDirection !== sorting.mode
      ? 'none'
      : requestedDirection;
  const hasControls = Boolean(sorting || controls?.filter || controls?.search);
  const controlCount =
    Number(Boolean(sorting)) +
    Number(Boolean(controls?.filter)) +
    Number(Boolean(controls?.search));
  const label = nodeText(children);

  return (
    <PrimitiveTable.Head
      {...props}
      ref={ref}
      data-align={align}
      data-fixed={fixed}
      style={{
        ...style,
        ...(fixed
          ? { [fixed === 'start' ? 'insetInlineStart' : 'insetInlineEnd']: stickyOffset }
          : {}),
      }}
      sortDirection={sorting ? direction : undefined}
      className={[styles.cell, className].filter(Boolean).join(' ')}
    >
      <div
        className={styles.headContent}
        data-layout={controls?.layout ?? (controls ? 'separate' : 'joined')}
        data-align={controls?.align ?? (controls ? 'end' : align)}
      >
        <span className={styles.headLabel}>{children}</span>
        {hasControls ? (
          <div
            className={styles.headControls}
            data-align={controls?.align ?? 'end'}
            style={
              {
                '--table-controls-width': `calc(${controlCount} * var(--vd-sizing-24) + ${controlCount - 1} * var(--vd-spacing-4))`,
              } as CSSProperties
            }
          >
            <div className={styles.controlsGroup} data-slot="header-controls">
              {sorting ? (
                <TableSortButton
                  aria-label={label}
                  sortMode={sorting.mode}
                  direction={direction}
                  onDirectionChange={(next) => {
                    if (sorting.direction === undefined) setLocalDirection(next);
                    sorting.onDirectionChange?.(next);
                  }}
                />
              ) : null}
              {controls?.filter ? <TableFilter {...controls.filter} label={label} /> : null}
              {controls?.search ? <TableSearch {...controls.search} label={label} /> : null}
            </div>
          </div>
        ) : null}
      </div>
      {props.scope !== 'row' && (!props.colSpan || props.colSpan === 1) ? (
        <ColumnResizeHandle label={nodeText(children)} minimum={minWidth} maximum={maxWidth} />
      ) : null}
    </PrimitiveTable.Head>
  );
});

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { align = 'start', className, fixed, stickyOffset = 0, style, children, ...props },
  ref,
) {
  return (
    <PrimitiveTable.Cell
      {...props}
      ref={ref}
      data-align={align}
      data-fixed={fixed}
      style={{
        ...style,
        ...(fixed
          ? { [fixed === 'start' ? 'insetInlineStart' : 'insetInlineEnd']: stickyOffset }
          : {}),
      }}
      className={[styles.cell, className].filter(Boolean).join(' ')}
    >
      {fixed ? <div className={styles.fixedCellContent}>{children}</div> : children}
    </PrimitiveTable.Cell>
  );
});

function nodeText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join('');
  if (node && typeof node === 'object' && 'props' in node)
    return nodeText((node.props as { children?: ReactNode }).children);
  return '';
}

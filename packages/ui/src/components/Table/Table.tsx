import { ChevronDownIcon, FilterFilledIcon, SortIcon } from '@virgo-design/icons';
import { Table as PrimitiveTable } from '@virgo-design/primitives';
import {
  createContext,
  type CSSProperties,
  forwardRef,
  type PointerEvent,
  type ReactNode,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { useControlLabels } from '../../shared/control-labels';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Dropdown } from '../Dropdown';
import { Popover } from '../Popover';
import { Tooltip } from '../Tooltip';
import { useTooltipPresentation } from '../Tooltip/TooltipContext';
import styles from './Table.module.scss';
import type {
  TableCaptionProps,
  TableCellProps,
  TableDensity,
  TableFilterProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
  TableSectionProps,
  TableSelectionAction,
  TableSelectionProps,
  TableSortButtonProps,
  TableSortDirection,
  TableViewportProps,
} from './Table.types';
import { TableSearch } from './TableSearch';
import { useColumnControlTooltip } from './use-column-control-tooltip';

const sizeDensity: Record<NonNullable<TableProps['size']>, TableDensity> = {
  mini: 'mini',
  small: 'compact',
  medium: 'default',
  large: 'comfortable',
};

type ColumnResizeContext = {
  enabled: boolean;
  minimum: number;
  maximum: number;
  widths: readonly number[] | null;
  setWidths: (widths: number[]) => void;
};
const ResizeContext = createContext<ColumnResizeContext | null>(null);

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  {
    density,
    size = 'medium',
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
        data-size={size}
        data-density={density ?? sizeDensity[size]}
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
export const TableSortButton = forwardRef<HTMLButtonElement, TableSortButtonProps>(
  function TableSortButton(
    {
      direction,
      defaultDirection = 'none',
      sortMode = 'both',
      directions,
      onDirectionChange,
      className,
      children,
      ...props
    },
    ref,
  ) {
    const [localDirection, setLocalDirection] = useState(defaultDirection);
    const indicatorRef = useRef<HTMLSpanElement>(null);
    const tooltipPresentation = useTooltipPresentation();
    const value = direction ?? localDirection;
    const labels = useControlLabels();
    const sequence =
      directions ?? (sortMode === 'both' ? (['ascending', 'descending'] as const) : [sortMode]);
    const next = sequence[sequence.indexOf(value as 'ascending' | 'descending') + 1] ?? 'none';
    const action =
      next === 'ascending'
        ? labels.sortAscending
        : next === 'descending'
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
              directions={sequence}
              onDirectionChange={(next) => {
                if (direction === undefined) setLocalDirection(next);
                onDirectionChange?.(next);
              }}
              className={[styles.sortButton, className].filter(Boolean).join(' ')}
              data-icon-only={children == null || undefined}
            >
              {children != null ? <span className={styles.sortLabel}>{children}</span> : null}
              <span ref={indicatorRef} className={styles.sortIndicatorAnchor} aria-hidden="true">
                <SortIcon
                  className={styles.sortIndicator}
                  data-slot="sort-indicator"
                  data-mode={sortMode}
                  size={16}
                  direction={value}
                  activeColor="var(--vd-brand-link)"
                />
              </span>
            </PrimitiveTable.SortButton>
          )}
        />
        <Tooltip.Content
          anchorRef={indicatorRef}
          size={tooltipPresentation.size ?? 'small'}
          arrow={tooltipPresentation.arrow ?? false}
        >
          {action}
        </Tooltip.Content>
      </Tooltip>
    );
  },
);
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

function ColumnResizeHandle({
  label,
  minimum,
  maximum,
}: {
  label: string;
  minimum?: number | undefined;
  maximum?: number | undefined;
}) {
  const context = useContext(ResizeContext);
  const labels = useControlLabels();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [measuredWidth, setMeasuredWidth] = useState(80);
  useLayoutEffect(() => {
    const head = buttonRef.current?.closest('th');
    if (head) setMeasuredWidth(Math.round(head.getBoundingClientRect().width));
  }, [context?.widths]);
  const drag = useRef<{ x: number; index: number; widths: number[]; direction: number } | null>(
    null,
  );
  if (!context?.enabled) return null;
  const min = Math.max(24, minimum ?? context.minimum);
  const max = Math.max(min, maximum ?? context.maximum);
  const capture = (button: HTMLButtonElement) => {
    const head = button.closest('th');
    const row = head?.parentElement;
    if (!head || !row || !head.closest('thead')) return null;
    const heads = Array.from(row.children) as HTMLTableCellElement[];
    if (heads.some((cell) => cell.colSpan !== 1)) return null;
    return {
      index: head.cellIndex,
      widths: heads.map((cell) => cell.getBoundingClientRect().width),
      direction: getComputedStyle(head).direction === 'rtl' ? -1 : 1,
    };
  };
  const update = (snapshot: { index: number; widths: number[] }, width: number) => {
    const widths = [...snapshot.widths];
    widths[snapshot.index] = Math.max(min, Math.min(max, width));
    context.setWidths(widths);
  };
  const finish = (event: PointerEvent<HTMLButtonElement>, cancel: boolean) => {
    if (cancel && drag.current) context.setWidths(drag.current.widths);
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  };
  return (
    <button
      type="button"
      ref={buttonRef}
      role="separator"
      aria-valuenow={measuredWidth}
      aria-orientation="vertical"
      aria-label={labels.resizeColumn.replace('{{column}}', label)}
      aria-valuemin={min}
      aria-valuemax={Number.isFinite(max) ? max : undefined}
      className={styles.resizeHandle}
      data-slot="column-resize-handle"
      onFocus={(event) => {
        const head = event.currentTarget.closest('th');
        if (head) setMeasuredWidth(Math.round(head.getBoundingClientRect().width));
      }}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        const snapshot = capture(event.currentTarget);
        if (!snapshot) return;
        event.preventDefault();
        event.currentTarget.focus();
        drag.current = { ...snapshot, x: event.clientX };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        const snapshot = drag.current;
        if (snapshot)
          update(
            snapshot,
            snapshot.widths[snapshot.index]! + (event.clientX - snapshot.x) * snapshot.direction,
          );
      }}
      onPointerUp={(event) => finish(event, false)}
      onPointerCancel={(event) => finish(event, true)}
      onLostPointerCapture={() => {
        drag.current = null;
      }}
      onKeyDown={(event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        const snapshot = capture(event.currentTarget);
        if (!snapshot) return;
        event.preventDefault();
        update(
          snapshot,
          event.key === 'Home'
            ? min
            : event.key === 'End' && Number.isFinite(max)
              ? max
              : snapshot.widths[snapshot.index]! +
                (event.key === 'ArrowRight' ? 10 : -10) * snapshot.direction,
        );
      }}
    />
  );
}

export const TableFilter = forwardRef<HTMLDivElement, TableFilterProps>(function TableFilter(
  {
    label,
    options,
    value,
    defaultValue = [],
    onValueChange,
    disabled = false,
    className,
    size = 'mini',
    tooltip,
  },
  ref,
) {
  const labels = useControlLabels();
  const [local, setLocal] = useState(defaultValue);
  const applied = value ?? local;
  const [draft, setDraft] = useState<readonly string[]>(applied);
  const [open, setOpen] = useState(false);
  const hint = useColumnControlTooltip(open, tooltip !== false);
  const accessibleLabel = labels.filterColumn.replace('{{column}}', label);
  const apply = (next: string[]) => {
    if (value === undefined) setLocal(next);
    onValueChange?.(next);
    hint.dismiss();
    setOpen(false);
  };
  return (
    <Popover
      ref={ref}
      className={className}
      disabled={disabled}
      open={open}
      onOpenChange={(next) => {
        if (next) setDraft(applied);
        hint.dismiss();
        setOpen(next);
      }}
    >
      <Tooltip {...hint.tooltipProps}>
        <Tooltip.Trigger
          {...hint.triggerProps}
          aria-label={accessibleLabel}
          render={(tooltipProps) => (
            <Popover.Trigger
              {...tooltipProps}
              render={(props) => (
                <button
                  {...props}
                  className={styles.filterButton}
                  data-active={applied.length > 0 || undefined}
                  data-slot="column-filter-trigger"
                >
                  <FilterFilledIcon size={16} />
                </button>
              )}
            />
          )}
        />
        <Tooltip.Content>{tooltip ?? labels.filter}</Tooltip.Content>
      </Tooltip>
      <Popover.Content
        placement="bottomEnd"
        offset={6}
        aria-label={accessibleLabel}
        className={styles.filterPanel}
      >
        <div className={styles.filterOptions}>
          {options.map((option) => (
            <Checkbox
              key={option.value}
              className={styles.filterOption!}
              checked={draft.includes(option.value)}
              disabled={option.disabled}
              onChange={(event) =>
                setDraft((previous) =>
                  event.target.checked
                    ? [...previous, option.value]
                    : previous.filter((entry) => entry !== option.value),
                )
              }
            >
              {option.label}
            </Checkbox>
          ))}
        </div>
        <Button.Group layout="custom" className={styles.filterActions}>
          <Button
            type="button"
            size={size}
            variant="text"
            disabled={!draft.length && !applied.length}
            onClick={() => apply([])}
          >
            {labels.resetFilter}
          </Button>
          <Button type="button" size={size} onClick={() => apply([...draft])}>
            {labels.confirmFilter}
          </Button>
        </Button.Group>
      </Popover.Content>
    </Popover>
  );
});

const defaultSelectionActions: readonly TableSelectionAction[] = ['all', 'invert', 'none'];

export const TableSelection = forwardRef<HTMLDivElement, TableSelectionProps>(
  function TableSelection(
    {
      rowKeys,
      value,
      defaultValue = [],
      onValueChange,
      selections = false,
      label,
      menuLabel,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) {
    const labels = useControlLabels();
    const [local, setLocal] = useState(defaultValue);
    const selected = value ?? local;
    const selectedSet = new Set(selected);
    const pageSet = new Set(rowKeys);
    const count = rowKeys.filter((key) => selectedSet.has(key)).length;
    const unavailable = disabled || rowKeys.length === 0;
    const actions = selections === true ? defaultSelectionActions : selections || [];
    const apply = (next: readonly string[]) => {
      const unique = [...new Set(next)];
      if (value === undefined) setLocal(unique);
      onValueChange?.(unique);
    };
    const selectPage = (checked: boolean) =>
      apply(checked ? [...selected, ...rowKeys] : selected.filter((key) => !pageSet.has(key)));
    const runAction = (action: TableSelectionAction) => {
      if (action === 'all') selectPage(true);
      else if (action === 'none') apply([]);
      else
        apply([
          ...selected.filter((key) => !pageSet.has(key)),
          ...rowKeys.filter((key) => !selectedSet.has(key)),
        ]);
    };
    const actionLabels = {
      all: labels.selectAllRows,
      invert: labels.invertPageSelection,
      none: labels.clearAllSelection,
    };
    return (
      <div {...props} ref={ref} className={[styles.selection, className].filter(Boolean).join(' ')}>
        <Checkbox
          aria-label={label ?? labels.selectPageRows}
          checked={rowKeys.length > 0 && count === rowKeys.length}
          indeterminate={count > 0 && count < rowKeys.length}
          disabled={unavailable}
          onChange={(event) => selectPage(event.target.checked)}
        />
        {actions.length > 0 ? (
          <Dropdown trigger="hover" size="medium" disabled={unavailable}>
            <Dropdown.Trigger
              iconOnly
              variant="text"
              aria-label={menuLabel ?? labels.selectionActions}
              className={styles.selectionMenuTrigger}
              data-slot="selection-menu-trigger"
            >
              <ChevronDownIcon size={12} />
            </Dropdown.Trigger>
            <Dropdown.Content
              placement="bottomLeft"
              offset={4}
              aria-label={menuLabel ?? labels.selectionActions}
            >
              {actions.map((action) =>
                typeof action === 'string' ? (
                  <Dropdown.Item key={action} onSelect={() => runAction(action)}>
                    {actionLabels[action]}
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item
                    key={action.key}
                    disabled={action.disabled}
                    onSelect={() => apply(action.onSelect(rowKeys, selected))}
                  >
                    {action.label}
                  </Dropdown.Item>
                ),
              )}
            </Dropdown.Content>
          </Dropdown>
        ) : null}
      </div>
    );
  },
);

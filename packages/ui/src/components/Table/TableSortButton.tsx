import { SortIcon } from '@virgo-design/icons';
import { Table as PrimitiveTable } from '@virgo-design/primitives';
import { forwardRef, useRef, useState } from 'react';

import { useLocale } from '../../locale/context/locale-context';
import { Tooltip } from '../Tooltip';
import { useTooltipPresentation } from '../Tooltip/TooltipContext';
import type { TableSortButtonProps } from './Table.types';

import styles from './Table.module.scss';

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
    const labels = useLocale().table;
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

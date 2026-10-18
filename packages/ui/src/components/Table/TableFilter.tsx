import { FilterFilledIcon } from '@virgo-design/icons';
import { forwardRef, useState } from 'react';

import { useLocale } from '../../locale/context/locale-context';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Popover } from '../Popover';
import { Tooltip } from '../Tooltip';
import type { TableFilterProps } from './Table.types';
import { useColumnControlTooltip } from './use-column-control-tooltip';

import styles from './Table.module.scss';

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
  const labels = useLocale().table;
  const [local, setLocal] = useState(defaultValue);
  const applied = value ?? local;
  const [draft, setDraft] = useState<readonly string[]>(applied);
  const [open, setOpen] = useState(false);
  const hint = useColumnControlTooltip(open, tooltip !== false);
  const accessibleLabel = labels.filterColumn(label);

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

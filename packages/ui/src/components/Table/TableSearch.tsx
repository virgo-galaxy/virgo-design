import { SearchIcon } from '@virgo-design/icons';
import { useState } from 'react';

import { useLocale } from '../../locale/context/locale-context';
import { Button } from '../Button';
import { Input } from '../Input';
import { Popover } from '../Popover';
import { Tooltip } from '../Tooltip';
import styles from './Table.module.scss';
import type { TableSearchProps } from './Table.types';
import { useColumnControlTooltip } from './use-column-control-tooltip';

export function TableSearch({
  label,
  value,
  defaultValue = '',
  onValueChange,
  placeholder,
  tooltip,
  size = 'small',
  actionSize = size,
  disabled = false,
}: TableSearchProps) {
  const labels = useLocale().table;
  const [local, setLocal] = useState(defaultValue);
  const applied = value ?? local;
  const [draft, setDraft] = useState(applied);
  const [open, setOpen] = useState(false);
  const hint = useColumnControlTooltip(open, tooltip !== false);
  const accessibleLabel = labels.searchColumn(label);

  const apply = (next: string) => {
    if (value === undefined) setLocal(next);
    onValueChange?.(next);
    hint.dismiss();
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      disabled={disabled}
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
                  data-active={Boolean(applied) || undefined}
                  data-slot="column-search-trigger"
                >
                  <SearchIcon size={16} />
                </button>
              )}
            />
          )}
        />
        <Tooltip.Content>{tooltip ?? labels.search}</Tooltip.Content>
      </Tooltip>
      <Popover.Content
        placement="bottomEnd"
        aria-label={accessibleLabel}
        className={styles.searchPanel}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            apply(draft.trim());
          }}
        >
          <Input
            size={size === 'mini' ? 'mini' : size}
            aria-label={accessibleLabel}
            placeholder={placeholder}
            value={draft}
            clearable
            onChange={(event) => setDraft(event.target.value)}
          />
          <Button.Group layout="custom" className={styles.filterActions}>
            <Button
              size={actionSize}
              variant="text"
              disabled={!draft && !applied}
              onClick={() => apply('')}
            >
              {labels.resetFilter}
            </Button>
            <Button size={actionSize} type="submit">
              {labels.search}
            </Button>
          </Button.Group>
        </form>
      </Popover.Content>
    </Popover>
  );
}

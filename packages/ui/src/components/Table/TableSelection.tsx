import { ChevronDownIcon } from '@virgo-design/icons';
import { forwardRef, useState } from 'react';

import { useLocale } from '../../locale/context/locale-context';
import { Checkbox } from '../Checkbox';
import { Dropdown } from '../Dropdown';
import type { TableSelectionAction, TableSelectionProps } from './Table.types';

import styles from './Table.module.scss';

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
    const labels = useLocale().table;
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

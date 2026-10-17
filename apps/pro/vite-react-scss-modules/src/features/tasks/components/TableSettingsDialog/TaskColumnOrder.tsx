import { MoveIcon, PinFilledIcon, PinIcon, UnpinIcon } from '@virgo-design/icons';
import { Button, Checkbox, Dropdown } from '@virgo-design/ui';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  isLeadingTaskColumn,
  moveTaskColumn,
  pinTaskColumns,
  type TaskColumnKey,
  type TaskTableSettings,
} from '../../model/table-settings';
import { taskColumnLabelName } from '../../presentation/column-label';
import styles from './TableSettingsDialog.module.scss';

export function TaskColumnOrder({
  settings,
  columnKey,
  onSelect,
  onChange,
}: {
  settings: TaskTableSettings;
  columnKey: TaskColumnKey;
  onSelect: (key: TaskColumnKey) => void;
  onChange: (settings: TaskTableSettings) => void;
}) {
  const { t } = useTranslation();
  const [draggedColumn, setDraggedColumn] = useState<TaskColumnKey | null>(null);
  const [dropTarget, setDropTarget] = useState<{
    key: TaskColumnKey;
    edge: 'before' | 'after';
    index: number;
  } | null>(null);

  const dragImageRef = useRef<HTMLElement | null>(null);

  useEffect(
    () => () => {
      dragImageRef.current?.remove();
    },
    [],
  );

  const clearDragImage = () => {
    dragImageRef.current?.remove();
    dragImageRef.current = null;
  };

  const moveColumn = (key: TaskColumnKey, to: number) =>
    onChange({ ...settings, columns: moveTaskColumn(settings.columns, key, to) });

  const visibleDataCount = settings.columns.filter(
    (entry) => entry.visible && !isLeadingTaskColumn(entry.key) && entry.key !== 'actions',
  ).length;

  const setColumnVisible = (key: TaskColumnKey, visible: boolean) =>
    onChange({
      ...settings,
      ...(key === 'selection'
        ? { selection: visible }
        : key === 'rowNumber'
          ? { showId: visible }
          : {}),
      columns: settings.columns.map((entry) => (entry.key === key ? { ...entry, visible } : entry)),
    });

  return (
    <div className={styles.columnSidebar}>
      <div
        className={styles.columnList}
        role="list"
        aria-label={t('tasks.settings.columnOrder')}
        onDragOver={(event) => {
          if (!draggedColumn) return;

          event.preventDefault();
          event.dataTransfer.dropEffect = 'move';

          const rows = Array.from(event.currentTarget.children);
          const hit = rows.findIndex((row) => event.clientY < row.getBoundingClientRect().bottom);
          const index = hit === -1 ? rows.length - 1 : hit;
          const rect = rows[index]!.getBoundingClientRect();
          const edge = event.clientY < rect.top + rect.height / 2 ? 'before' : 'after';
          const from = settings.columns.findIndex((item) => item.key === draggedColumn);
          const boundary = index + (edge === 'after' ? 1 : 0);
          const destination = boundary - (from < boundary ? 1 : 0);

          setDropTarget(
            destination < 2 || destination === from
              ? null
              : { key: settings.columns[index]!.key, edge, index: destination },
          );
        }}
        onDrop={(event) => {
          event.preventDefault();

          if (draggedColumn && dropTarget) moveColumn(draggedColumn, dropTarget.index);

          setDraggedColumn(null);
          setDropTarget(null);
          clearDragImage();
        }}
        onDragLeave={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();

          if (
            !event.currentTarget.contains(event.relatedTarget as Node | null) &&
            (event.clientX < rect.left ||
              event.clientX > rect.right ||
              event.clientY < rect.top ||
              event.clientY > rect.bottom)
          ) {
            setDropTarget(null);
          }
        }}
      >
        {settings.columns.map((entry, index) => (
          <div
            key={entry.key}
            role="listitem"
            className={styles.columnItem}
            data-selected={entry.key === columnKey}
            data-dragging={entry.key === draggedColumn || undefined}
            data-drop-position={dropTarget?.key === entry.key ? dropTarget.edge : undefined}
          >
            <Button
              iconOnly
              size="medium"
              variant="text"
              className={styles.dragHandle}
              aria-label={t('tasks.settings.dragColumn', {
                column: t(`tasks.${taskColumnLabelName(entry.key)}`),
              })}
              disabled={isLeadingTaskColumn(entry.key)}
              draggable={!isLeadingTaskColumn(entry.key)}
              onDragStart={(event) => {
                if (isLeadingTaskColumn(entry.key)) {
                  event.preventDefault();

                  return;
                }

                clearDragImage();
                setDropTarget(null);

                const row = event.currentTarget.closest('[role="listitem"]') as HTMLElement;
                const image = row.cloneNode(true) as HTMLElement;
                const rect = row.getBoundingClientRect();
                const rowStyle = getComputedStyle(row);
                const dialog = row.closest('[role="dialog"]')!;

                image.setAttribute('aria-hidden', 'true');
                image.removeAttribute('data-dragging');
                image.removeAttribute('data-drop-position');
                image.inert = true;
                image.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'));

                Object.assign(image.style, {
                  position: 'fixed',
                  left: '-10000px',
                  top: '0',
                  width: `${rect.width}px`,
                  height: `${rect.height}px`,
                  font: rowStyle.font,
                  backgroundColor: getComputedStyle(dialog).backgroundColor,
                  backgroundImage: `linear-gradient(${rowStyle.backgroundColor}, ${rowStyle.backgroundColor})`,
                  boxSizing: 'border-box',
                  pointerEvents: 'none',
                  borderRadius: '0',
                  borderColor: 'transparent',
                  boxShadow: 'none',
                  opacity: '1',
                });

                document.body.append(image);
                dragImageRef.current = image;
                event.dataTransfer.setDragImage(
                  image,
                  event.clientX - rect.left,
                  event.clientY - rect.top,
                );

                setDraggedColumn(entry.key);
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData('text/plain', entry.key);
              }}
              onDragEnd={() => {
                setDraggedColumn(null);
                setDropTarget(null);

                clearDragImage();
              }}
              onKeyDown={(event) => {
                if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;

                event.preventDefault();
                moveColumn(entry.key, index + (event.key === 'ArrowUp' ? -1 : 1));
              }}
            >
              <MoveIcon size={20} />
            </Button>
            <Checkbox
              aria-label={t('tasks.settings.columnVisibility', {
                column: t(`tasks.${taskColumnLabelName(entry.key)}`),
              })}
              checked={
                entry.visible &&
                (entry.key !== 'selection' || settings.selection) &&
                (entry.key !== 'rowNumber' || settings.showId)
              }
              disabled={
                entry.visible &&
                !isLeadingTaskColumn(entry.key) &&
                entry.key !== 'actions' &&
                visibleDataCount === 1
              }
              onChange={(event) => setColumnVisible(entry.key, event.target.checked)}
            />
            <Button
              variant="text"
              size="medium"
              className={styles.columnButton}
              aria-pressed={entry.key === columnKey}
              onClick={() => {
                onSelect(entry.key);
              }}
            >
              {t(`tasks.${taskColumnLabelName(entry.key)}`)}
            </Button>
            <Dropdown size="medium">
              <Dropdown.Trigger
                iconOnly
                indicator={false}
                aria-label={t('tasks.settings.pinColumn', {
                  column: t(`tasks.${taskColumnLabelName(entry.key)}`),
                })}
                render={(buttonProps) => (
                  <Button
                    {...buttonProps}
                    iconOnly
                    variant="text"
                    size="medium"
                    className={styles.pinButton}
                    aria-label={t('tasks.settings.pinColumn', {
                      column: t(`tasks.${taskColumnLabelName(entry.key)}`),
                    })}
                    aria-pressed={
                      settings.pinnedColumns.start === entry.key ||
                      settings.pinnedColumns.end === entry.key
                    }
                  >
                    {settings.pinnedColumns.start === entry.key ||
                    settings.pinnedColumns.end === entry.key ? (
                      <PinFilledIcon size={20} />
                    ) : (
                      <PinIcon size={20} />
                    )}
                  </Button>
                )}
              />
              <Dropdown.Content placement="bottomRight" offset={4}>
                <Dropdown.Item
                  icon={<PinIcon size={20} />}
                  checked={settings.pinnedColumns.start === entry.key}
                  onSelect={() => onChange(pinTaskColumns(settings, entry.key, 'start'))}
                >
                  {t('tasks.settings.pinStart')}
                </Dropdown.Item>
                <Dropdown.Item
                  icon={<PinIcon size={20} />}
                  checked={settings.pinnedColumns.end === entry.key}
                  onSelect={() => onChange(pinTaskColumns(settings, entry.key, 'end'))}
                >
                  {t('tasks.settings.pinEnd')}
                </Dropdown.Item>
                <Dropdown.Item
                  icon={<UnpinIcon size={20} />}
                  disabled={
                    settings.pinnedColumns.start !== entry.key &&
                    settings.pinnedColumns.end !== entry.key
                  }
                  onSelect={() => onChange(pinTaskColumns(settings, entry.key, null))}
                >
                  {t('tasks.settings.unpin')}
                </Dropdown.Item>
              </Dropdown.Content>
            </Dropdown>
          </div>
        ))}
      </div>
      <p className={styles.hint}>{t('tasks.settings.columnListHint')}</p>
    </div>
  );
}

import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  CloseIcon,
  FilterFilledIcon,
  MoveIcon,
  PinFilledIcon,
  PinIcon,
  SearchIcon,
  SortIcon,
  UnpinIcon,
} from '@virgo-design/icons';
import {
  Button,
  Checkbox,
  Dialog,
  Dropdown,
  Field,
  Input,
  Radio,
  SegmentedControl,
  Select,
  Slider,
  Switch,
  Tabs,
} from '@virgo-design/ui';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  defaultTableSettings,
  isLeadingTaskColumn,
  moveTaskColumn,
  pinTaskColumns,
  type TaskColumnKey,
  type TaskColumnSettings,
  type TaskTableSettings,
} from '../../config/table-settings';
import type { tasksEnUS } from '../../locales/en-US';
import type { Task } from '../../model/task';
import { taskColumnLabelName } from '../../presentation/column-label';
import styles from './TableSettingsDialog.module.scss';
import { TaskColumnPreview } from './TaskColumnPreview';

function AlignmentChoices({
  label,
  value,
  labels,
  onChange,
}: {
  label: string;
  value: 'start' | 'center' | 'end';
  labels: readonly [string, string, string];
  onChange: (value: 'start' | 'center' | 'end') => void;
}) {
  return (
    <SegmentedControl
      aria-label={label}
      size="medium"
      motion="slide"
      value={value}
      onValueChange={(next) => onChange(next as typeof value)}
    >
      {(['start', 'center', 'end'] as const).map((alignment, index) => {
        const Icon = [AlignLeftIcon, AlignCenterIcon, AlignRightIcon][index]!;
        return (
          <SegmentedControl.Item
            key={alignment}
            value={alignment}
            aria-label={labels[index]}
            tooltip={labels[index]}
          >
            <span className={styles.alignmentIcon}>
              <Icon size={20} />
            </span>
          </SegmentedControl.Item>
        );
      })}
    </SegmentedControl>
  );
}

function Choice({
  label,
  value,
  choices,
  onChange,
}: {
  label: string;
  value: string;
  choices: readonly [string, string][];
  onChange: (value: string) => void;
}) {
  return (
    <Field>
      <Field.Label>{label}</Field.Label>
      <Select size="medium" value={value} onValueChange={onChange}>
        <Select.Trigger />
        <Select.Content>
          {choices.map(([key, text]) => (
            <Select.Option key={key} value={key}>
              {text}
            </Select.Option>
          ))}
        </Select.Content>
      </Select>
    </Field>
  );
}
function NumberSetting({
  label,
  value,
  min = 1,
  max = 3000,
  onChange,
  className,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  className?: string | undefined;
}) {
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);
  const commit = () => {
    const next = Number(draft);
    if (draft && Number.isFinite(next)) {
      const clamped = Math.max(min, Math.min(max, Math.round(next)));
      setDraft(String(clamped));
      onChange(clamped);
    } else setDraft(String(value));
  };
  return (
    <Field className={className}>
      <Field.Label>{label}</Field.Label>
      <Input
        size="medium"
        type="number"
        min={min}
        max={max}
        step={1}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            event.currentTarget.blur();
          }
        }}
      />
    </Field>
  );
}
function Toggle({
  label,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className={styles.toggle}>
      <span>{label}</span>
      <Switch
        aria-label={label}
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
    </div>
  );
}
export function TableSettingsDialog({
  settings,
  onChange,
  onClose,
  restoreFocus,
  storageAvailable = true,
  previewTasks,
}: {
  settings: TaskTableSettings;
  onChange: (settings: TaskTableSettings) => void;
  onClose: () => void;
  restoreFocus: () => void;
  storageAvailable?: boolean;
  previewTasks: readonly Task[];
}) {
  const { t } = useTranslation();
  const [columnKey, setColumnKey] = useState<TaskColumnKey>('title');
  const [sortMenuColumn, setSortMenuColumn] = useState<TaskColumnKey | null>(null);
  const [widthTarget, setWidthTarget] = useState<'minWidth' | 'width' | 'maxWidth'>('width');
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
  const column = settings.columns.find((entry) => entry.key === columnKey)!;
  const text = (key: keyof typeof tasksEnUS.settings) => t(`tasks.settings.${key}`);
  const set = <K extends keyof TaskTableSettings>(key: K, value: TaskTableSettings[K]) =>
    onChange({
      ...settings,
      [key]: value,
      ...((key === 'selection' || key === 'showId') && value === true
        ? {
            columns: settings.columns.map((entry) =>
              entry.key === (key === 'showId' ? 'rowNumber' : 'selection')
                ? { ...entry, visible: true }
                : entry,
            ),
          }
        : {}),
    });
  const updateColumn = (patch: Partial<TaskColumnSettings>) => {
    const next = { ...column, ...patch };
    next.minWidth = Math.max(24, next.minWidth);
    next.maxWidth = Math.max(next.minWidth, next.maxWidth);
    next.width = Math.max(next.minWidth, Math.min(next.maxWidth, next.width));
    set(
      'columns',
      settings.columns.map((entry) => (entry.key === columnKey ? next : entry)),
    );
  };
  const updateControls = (patch: Partial<TaskColumnSettings['controls']>) =>
    updateColumn({ controls: { ...column.controls, ...patch } });
  const moveColumn = (key: TaskColumnKey, to: number) =>
    set('columns', moveTaskColumn(settings.columns, key, to));
  const columnIsData = !isLeadingTaskColumn(column.key) && column.key !== 'actions';
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
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          size="lg"
          className={styles.dialog}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            restoreFocus();
          }}
        >
          <Dialog.Header className={styles.header}>
            <div className={styles.heading}>
              <Dialog.Title>{t('tasks.tableSettings')}</Dialog.Title>
              <Dialog.Description>
                {text(storageAvailable ? 'description' : 'sessionOnly')}
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label={t('tasks.close')}
              render={(buttonProps) => (
                <Button
                  {...buttonProps}
                  aria-label={t('tasks.close')}
                  variant="text"
                  size="medium"
                  iconOnly
                >
                  <CloseIcon size={20} />
                </Button>
              )}
            />
          </Dialog.Header>
          <Dialog.Body className={styles.body}>
            <Tabs defaultValue="appearance">
              <Tabs.List aria-label={t('tasks.tableSettings')}>
                <Tabs.Tab value="appearance">{text('appearance')}</Tabs.Tab>
                <Tabs.Tab value="interaction">{text('interaction')}</Tabs.Tab>
                <Tabs.Tab value="columns">{text('columns')}</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="appearance" className={styles.tab!}>
                <div className={styles.grid}>
                  <Choice
                    label={text('size')}
                    value={settings.size}
                    choices={(['mini', 'small', 'medium', 'large'] as const).map((key) => [
                      key,
                      text(key),
                    ])}
                    onChange={(value) => set('size', value as TaskTableSettings['size'])}
                  />
                  <Choice
                    label={text('widthMode')}
                    value={settings.widthMode}
                    choices={[
                      ['fill', text('fill')],
                      ['content', text('content')],
                    ]}
                    onChange={(value) => set('widthMode', value as TaskTableSettings['widthMode'])}
                  />
                  <Choice
                    label={text('border')}
                    value={settings.border}
                    choices={(['none', 'rows', 'all'] as const).map((key) => [key, text(key)])}
                    onChange={(value) => set('border', value as TaskTableSettings['border'])}
                  />
                  <NumberSetting
                    label={text('viewportHeight')}
                    value={settings.viewportHeight}
                    min={160}
                    max={1200}
                    onChange={(value) => set('viewportHeight', value)}
                  />
                </div>
                <div className={styles.toggleGrid}>
                  {(
                    [
                      'showHeader',
                      'headerDividers',
                      'striped',
                      'hoverable',
                      'stickyHeader',
                    ] as const
                  ).map((key) => (
                    <Toggle
                      key={key}
                      label={text(key)}
                      checked={settings[key]}
                      onChange={(value) => set(key, value)}
                    />
                  ))}
                </div>
                <p className={styles.hint}>{text('sizeHint')}</p>
              </Tabs.Panel>
              <Tabs.Panel value="interaction" className={styles.tab!}>
                <div className={styles.toggleGrid}>
                  {(
                    [
                      'selection',
                      'showId',
                      'selectionMenu',
                      'resizable',
                      'reorderColumns',
                      'pagination',
                      'showTotal',
                      'showSizeChanger',
                      'showQuickJumper',
                    ] as const
                  ).map((key) => (
                    <Toggle
                      key={key}
                      label={text(key)}
                      checked={settings[key]}
                      onChange={(value) => set(key, value)}
                    />
                  ))}
                </div>
                <fieldset className={styles.group}>
                  <legend>{text('selectionActions')}</legend>
                  <div className={styles.checks}>
                    {(['all', 'invert', 'none', 'odd', 'even'] as const).map((action) => (
                      <Checkbox
                        key={action}
                        checked={settings.selectionActions.includes(action)}
                        onChange={(event) =>
                          set(
                            'selectionActions',
                            event.target.checked
                              ? [...settings.selectionActions, action]
                              : settings.selectionActions.filter((entry) => entry !== action),
                          )
                        }
                      >
                        {text(`selection${action}`)}
                      </Checkbox>
                    ))}
                  </div>
                </fieldset>
                <div className={styles.grid}>
                  <Field>
                    <Field.Label>{text('paginationAlign')}</Field.Label>
                    <div>
                      <AlignmentChoices
                        label={text('paginationAlign')}
                        value={
                          settings.paginationAlign === 'left'
                            ? 'start'
                            : settings.paginationAlign === 'right'
                              ? 'end'
                              : 'center'
                        }
                        labels={[text('alignLeft'), text('alignCenter'), text('alignRight')]}
                        onChange={(value) =>
                          set(
                            'paginationAlign',
                            value === 'start' ? 'left' : value === 'end' ? 'right' : 'center',
                          )
                        }
                      />
                    </div>
                  </Field>
                </div>
                <fieldset className={styles.group}>
                  <legend>{text('pageSizes')}</legend>
                  <div className={styles.checks}>
                    {[10, 20, 50, 100].map((value) => (
                      <Checkbox
                        key={value}
                        checked={settings.pageSizeOptions.includes(value)}
                        onChange={(event) =>
                          set(
                            'pageSizeOptions',
                            event.target.checked
                              ? [...settings.pageSizeOptions, value].sort((a, b) => a - b)
                              : settings.pageSizeOptions.filter((entry) => entry !== value),
                          )
                        }
                      >
                        {value}
                      </Checkbox>
                    ))}
                  </div>
                </fieldset>
              </Tabs.Panel>
              <Tabs.Panel value="columns" className={styles.tab!}>
                <div className={styles.columnsLayout}>
                  <div className={styles.columnSidebar}>
                    <div
                      className={styles.columnList}
                      role="list"
                      aria-label={text('columnOrder')}
                      onDragOver={(event) => {
                        if (!draggedColumn) return;
                        event.preventDefault();
                        event.dataTransfer.dropEffect = 'move';
                        const rows = Array.from(event.currentTarget.children);
                        const hit = rows.findIndex(
                          (row) => event.clientY < row.getBoundingClientRect().bottom,
                        );
                        const index = hit === -1 ? rows.length - 1 : hit;
                        const rect = rows[index]!.getBoundingClientRect();
                        const edge =
                          event.clientY < rect.top + rect.height / 2 ? 'before' : 'after';
                        const from = settings.columns.findIndex(
                          (item) => item.key === draggedColumn,
                        );
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
                        if (draggedColumn && dropTarget)
                          moveColumn(draggedColumn, dropTarget.index);
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
                          data-drop-position={
                            dropTarget?.key === entry.key ? dropTarget.edge : undefined
                          }
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
                              const row = event.currentTarget.closest(
                                '[role="listitem"]',
                              ) as HTMLElement;
                              const image = row.cloneNode(true) as HTMLElement;
                              const rect = row.getBoundingClientRect();
                              const rowStyle = getComputedStyle(row);
                              const dialog = row.closest('[role="dialog"]')!;
                              image.setAttribute('aria-hidden', 'true');
                              image.removeAttribute('data-dragging');
                              image.removeAttribute('data-drop-position');
                              image.inert = true;
                              image
                                .querySelectorAll('[id]')
                                .forEach((element) => element.removeAttribute('id'));
                              Object.assign(image.style, {
                                position: 'fixed',
                                left: '-10000px',
                                top: '0',
                                width: `${rect.width}px`,
                                height: `${rect.height}px`,
                                font: rowStyle.font,
                                // Composite the row tint over an opaque surface, including in dark mode.
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
                              setColumnKey(entry.key);
                              setWidthTarget('width');
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
                                onSelect={() =>
                                  onChange(pinTaskColumns(settings, entry.key, 'start'))
                                }
                              >
                                {text('pinStart')}
                              </Dropdown.Item>
                              <Dropdown.Item
                                icon={<PinIcon size={20} />}
                                checked={settings.pinnedColumns.end === entry.key}
                                onSelect={() =>
                                  onChange(pinTaskColumns(settings, entry.key, 'end'))
                                }
                              >
                                {text('pinEnd')}
                              </Dropdown.Item>
                              <Dropdown.Item
                                icon={<UnpinIcon size={20} />}
                                disabled={
                                  settings.pinnedColumns.start !== entry.key &&
                                  settings.pinnedColumns.end !== entry.key
                                }
                                onSelect={() => onChange(pinTaskColumns(settings, entry.key, null))}
                              >
                                {text('unpin')}
                              </Dropdown.Item>
                            </Dropdown.Content>
                          </Dropdown>
                        </div>
                      ))}
                    </div>
                    <p className={styles.hint}>{text('columnListHint')}</p>
                  </div>
                  <section
                    key={columnKey}
                    className={styles.columnDetail}
                    aria-label={t(`tasks.${taskColumnLabelName(columnKey)}`)}
                  >
                    <h3>{t(`tasks.${taskColumnLabelName(columnKey)}`)}</h3>
                    <div className={styles.columnPreview}>
                      <TaskColumnPreview
                        key={columnKey}
                        column={column}
                        settings={settings}
                        tasks={previewTasks}
                        onWidthChange={(width) => updateColumn({ width })}
                      />
                    </div>
                    <div className={styles.widthSetting} data-width-target={widthTarget}>
                      <NumberSetting
                        key={widthTarget}
                        className={styles.widthCurrent}
                        label={text(widthTarget === 'width' ? 'columnWidth' : widthTarget)}
                        value={Math.round(column[widthTarget])}
                        min={
                          widthTarget === 'minWidth'
                            ? 24
                            : widthTarget === 'width'
                              ? column.minWidth
                              : column.width
                        }
                        max={
                          widthTarget === 'maxWidth'
                            ? 3000
                            : widthTarget === 'width'
                              ? column.maxWidth
                              : column.width
                        }
                        onChange={(value) => updateColumn({ [widthTarget]: value })}
                      />
                      <Slider.Range
                        aria-label={text('columnWidth')}
                        value={[column.minWidth, column.width, column.maxWidth]}
                        min={24}
                        max={3000}
                        thumbLabels={[text('minWidth'), text('columnWidth'), text('maxWidth')]}
                        getValueText={(value) => `${value} px`}
                        onThumbFocus={(index) =>
                          setWidthTarget((['minWidth', 'width', 'maxWidth'] as const)[index]!)
                        }
                        onValueChange={(values) =>
                          updateColumn({
                            minWidth: values[0]!,
                            width: values[1]!,
                            maxWidth: values[2]!,
                          })
                        }
                      />
                      <div className={styles.widthBounds}>
                        <span>
                          {text('minWidth')}: {column.minWidth}
                        </span>
                        <span>
                          {text('maxWidth')}: {column.maxWidth}
                        </span>
                      </div>
                    </div>
                    {columnIsData ? (
                      <div
                        className={styles.headerSettings}
                        role="group"
                        aria-label={text('headerControls')}
                      >
                        <div className={styles.controlsHeading}>
                          <h4>{text('headerControls')}</h4>
                        </div>
                        <Button.Group layout="custom" className={styles.controlChoices}>
                          <Dropdown
                            size="medium"
                            open={sortMenuColumn === columnKey && column.controls.sort.enabled}
                            onOpenChange={(open) => {
                              setSortMenuColumn(open ? columnKey : null);
                              if (open && !column.controls.sort.enabled) {
                                updateControls({
                                  sort: { ...column.controls.sort, enabled: true },
                                });
                              }
                            }}
                          >
                            <Dropdown.Trigger
                              aria-pressed={column.controls.sort.enabled}
                              onClick={(event) => {
                                event.preventDefault();
                                const enabled = !column.controls.sort.enabled;
                                setSortMenuColumn(enabled ? columnKey : null);
                                updateControls({
                                  sort: {
                                    ...column.controls.sort,
                                    enabled,
                                  },
                                });
                              }}
                              render={(buttonProps) => (
                                <Button
                                  {...buttonProps}
                                  size="medium"
                                  variant="outline"
                                  className={styles.featureButton}
                                  leadingIcon={
                                    <SortIcon size={20} data-mode={column.controls.sort.mode} />
                                  }
                                >
                                  {text('sorting')}
                                </Button>
                              )}
                            />
                            <Dropdown.Content
                              placement="bottomLeft"
                              offset={4}
                              aria-label={text('arrowStyle')}
                              className={styles.sortMenu}
                            >
                              {(['both', 'ascending', 'descending'] as const).map((mode) => (
                                <Dropdown.Item
                                  key={mode}
                                  checked={column.controls.sort.mode === mode}
                                  icon={<SortIcon size={20} data-mode={mode} />}
                                  onSelect={() =>
                                    updateControls({
                                      sort: { ...column.controls.sort, mode },
                                    })
                                  }
                                >
                                  {text(mode)}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Content>
                          </Dropdown>
                          <Button
                            size="medium"
                            variant="outline"
                            className={styles.featureButton}
                            aria-pressed={column.controls.filter}
                            leadingIcon={<FilterFilledIcon size={20} />}
                            onClick={() => updateControls({ filter: !column.controls.filter })}
                          >
                            {text('filter')}
                          </Button>
                          <Button
                            size="medium"
                            variant="outline"
                            className={styles.featureButton}
                            aria-pressed={column.controls.search}
                            leadingIcon={<SearchIcon size={20} />}
                            onClick={() => updateControls({ search: !column.controls.search })}
                          >
                            {text('search')}
                          </Button>
                        </Button.Group>
                      </div>
                    ) : null}
                    <div
                      className={styles.headerAlignment}
                      role="group"
                      aria-label={text('headerAlign')}
                    >
                      <h4>{text('headerAlign')}</h4>
                      <div className={styles.alignmentRow}>
                        <Radio.Group
                          aria-label={text('headerLayout')}
                          orientation="horizontal"
                          className={styles.layoutChoices!}
                          value={column.controls.layout}
                          onValueChange={(layout) =>
                            updateControls({ layout: layout as typeof column.controls.layout })
                          }
                        >
                          <Radio value="separate">{text('titleSeparate')}</Radio>
                          <Radio value="joined">{text('titleJoined')}</Radio>
                        </Radio.Group>
                        <AlignmentChoices
                          label={text('headerAlign')}
                          value={column.controls.align}
                          labels={[text('alignLeft'), text('alignCenter'), text('alignRight')]}
                          onChange={(align) => updateControls({ align })}
                        />
                      </div>
                    </div>
                    <p className={styles.hint}>{text('columnHint')}</p>
                  </section>
                </div>
              </Tabs.Panel>
            </Tabs>
          </Dialog.Body>
          <Button.Group layout="custom" render={(groupProps) => <Dialog.Footer {...groupProps} />}>
            <Button
              size="medium"
              variant="outline"
              onClick={() => onChange(defaultTableSettings())}
            >
              {text('reset')}
            </Button>
            <Dialog.Close size="medium">{text('done')}</Dialog.Close>
          </Button.Group>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

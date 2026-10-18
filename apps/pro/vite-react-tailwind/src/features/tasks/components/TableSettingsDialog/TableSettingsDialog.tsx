import { CloseIcon } from '@virgo-design/icons';
import { Button, Checkbox, Dialog, Field, Tabs } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { tasksEnUS } from '../../locales/en-US';
import {
  defaultTableSettings,
  type TaskColumnKey,
  type TaskTableSettings,
} from '../../model/table-settings';
import type { Task } from '../../model/task';
import { AlignmentChoices, Choice, NumberSetting, Toggle } from './TableSettingsFields';
import { TaskColumnEditor } from './TaskColumnEditor';
import { TaskColumnOrder } from './TaskColumnOrder';

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
          className="data-[size=lg]:[--dialog-width:900px] data-[size=lg]:[height:min(960px,_100dvh_-_var(--vd-spacing-48))] data-[size=lg]:[max-height:calc(100dvh_-_var(--vd-spacing-48))]"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            restoreFocus();
          }}
        >
          <Dialog.Header className="[grid-template-columns:minmax(0,_1fr)_auto] [align-items:start]">
            <div className="grid gap-6">
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
          <Dialog.Body className="[flex:1_1_auto] min-h-0">
            <Tabs defaultValue="appearance">
              <Tabs.List aria-label={t('tasks.tableSettings')}>
                <Tabs.Tab value="appearance">{text('appearance')}</Tabs.Tab>
                <Tabs.Tab value="interaction">{text('interaction')}</Tabs.Tab>
                <Tabs.Tab value="columns">{text('columns')}</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="appearance" className="py-20 grid gap-20 [&[hidden]]:hidden">
                <div className="grid grid-cols-2 gap-16 viewport-max-440:grid-cols-1">
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
                <div className="grid grid-cols-2 gap-16 viewport-max-440:grid-cols-1">
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
                <p className="text-text-tertiary [font-size:var(--vd-font-size-12)] [line-height:1.6] m-0">
                  {text('sizeHint')}
                </p>
              </Tabs.Panel>
              <Tabs.Panel value="interaction" className="py-20 grid gap-20 [&[hidden]]:hidden">
                <div className="grid grid-cols-2 gap-16 viewport-max-440:grid-cols-1">
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
                <fieldset
                  className={[
                    '[border:1px_solid_var(--vd-border-subtle)] [border-radius:var(--vd-shape-radius-8,_var(--vd-radius-8))]',
                    '[&_legend]:px-6 [&_legend]:text-(length:--vd-font-size-12)',
                    'm-0 p-16',
                  ].join(' ')}
                >
                  <legend>{text('selectionActions')}</legend>
                  <div className="flex gap-20 flex-wrap">
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
                <div className="grid grid-cols-2 gap-16 viewport-max-440:grid-cols-1">
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
                <fieldset
                  className={[
                    '[border:1px_solid_var(--vd-border-subtle)] [border-radius:var(--vd-shape-radius-8,_var(--vd-radius-8))]',
                    '[&_legend]:px-6 [&_legend]:text-(length:--vd-font-size-12)',
                    'm-0 p-16',
                  ].join(' ')}
                >
                  <legend>{text('pageSizes')}</legend>
                  <div className="flex gap-20 flex-wrap">
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
              <Tabs.Panel value="columns" className="py-20 grid gap-20 [&[hidden]]:hidden">
                <div className="viewport-max-680:grid-cols-1 grid [grid-template-columns:260px_minmax(0,_1fr)] gap-24 [align-items:start]">
                  <TaskColumnOrder
                    settings={settings}
                    columnKey={columnKey}
                    onSelect={setColumnKey}
                    onChange={onChange}
                  />
                  <TaskColumnEditor
                    key={columnKey}
                    settings={settings}
                    columnKey={columnKey}
                    previewTasks={previewTasks}
                    onChange={onChange}
                  />
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

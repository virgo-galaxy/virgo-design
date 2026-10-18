import { FilterFilledIcon, SearchIcon, SortIcon } from '@virgo-design/icons';
import { Button, Dropdown, Radio, Slider } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { tasksEnUS } from '../../locales/en-US';
import {
  isLeadingTaskColumn,
  type TaskColumnKey,
  type TaskColumnSettings,
  type TaskTableSettings,
} from '../../model/table-settings';
import type { Task } from '../../model/task';
import { taskColumnLabelName } from '../../presentation/column-label';
import { AlignmentChoices, NumberSetting } from './TableSettingsFields';
import { TaskColumnPreview } from './TaskColumnPreview';

export function TaskColumnEditor({
  settings,
  columnKey,
  previewTasks,
  onChange,
}: {
  settings: TaskTableSettings;
  columnKey: TaskColumnKey;
  previewTasks: readonly Task[];
  onChange: (settings: TaskTableSettings) => void;
}) {
  const { t } = useTranslation();
  const text = (key: keyof typeof tasksEnUS.settings) => t(`tasks.settings.${key}`);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [widthTarget, setWidthTarget] = useState<'minWidth' | 'width' | 'maxWidth'>('width');

  const column = settings.columns.find((entry) => entry.key === columnKey)!;
  const columnIsData = !isLeadingTaskColumn(column.key) && column.key !== 'actions';

  const updateColumn = (patch: Partial<TaskColumnSettings>) => {
    const next = { ...column, ...patch };
    next.minWidth = Math.max(24, next.minWidth);
    next.maxWidth = Math.max(next.minWidth, next.maxWidth);
    next.width = Math.max(next.minWidth, Math.min(next.maxWidth, next.width));

    onChange({
      ...settings,
      columns: settings.columns.map((entry) => (entry.key === columnKey ? next : entry)),
    });
  };

  const updateControls = (patch: Partial<TaskColumnSettings['controls']>) =>
    updateColumn({ controls: { ...column.controls, ...patch } });

  return (
    <section
      className="[&_h3]:m-0 [&_h3]:text-(length:--vd-font-size-14) grid gap-16 min-w-0"
      aria-label={t(`tasks.${taskColumnLabelName(columnKey)}`)}
    >
      <h3>{t(`tasks.${taskColumnLabelName(columnKey)}`)}</h3>
      <div
        className={[
          '[border:var(--vd-stroke-width,_var(--vd-border-width-1))_solid_var(--vd-border-default)]',
          '[border-radius:var(--vd-shape-radius-8,_var(--vd-radius-8))] [background-color:var(--vd-surface-default)]',
          '[background-image:linear-gradient(_var(--vd-border-subtle)_var(--vd-stroke-width,_var(--vd-border-width-1)),_transparent_1px_),_linear-gradient(_90deg,_var(--vd-border-subtle)_var(--vd-stroke-width,_var(--vd-border-width-1)),_transparent_1px_)]',
          '[background-size:var(--vd-spacing-24)_var(--vd-spacing-24)]',
          "[&_>_[role='region']]:min-h-0",
          'grid [grid-template-rows:minmax(0,_1fr)] w-full [height:160px] min-w-0 [box-sizing:border-box] p-16',
        ].join(' ')}
      >
        <TaskColumnPreview
          column={column}
          settings={settings}
          tasks={previewTasks}
          onWidthChange={(width) => updateColumn({ width })}
        />
      </div>
      <div
        className={[
          "[&[data-width-target='minWidth']_[data-slot='thumb'][data-index='0']]:bg-brand-primary",
          "[&[data-width-target='width']_[data-slot='thumb'][data-index='1']]:bg-brand-primary",
          "[&[data-width-target='maxWidth']_[data-slot='thumb'][data-index='2']]:bg-brand-primary",
          'grid gap-8 [padding-block-end:var(--vd-spacing-8)]',
        ].join(' ')}
        data-width-target={widthTarget}
      >
        <NumberSetting
          key={widthTarget}
          className="grid [grid-template-columns:minmax(0,_1fr)_120px] items-center gap-16"
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
        <div className="flex justify-between gap-16 [font-size:var(--vd-font-size-12)] text-text-secondary">
          <span>
            {text('minWidth')}: {column.minWidth}
          </span>
          <span>
            {text('maxWidth')}: {column.maxWidth}
          </span>
        </div>
      </div>
      {columnIsData ? (
        <div className="grid gap-12" role="group" aria-label={text('headerControls')}>
          <div className="[&_h4]:m-0 [&_h4]:text-(length:--vd-font-size-12) [&_h4]:[font-weight:var(--vd-font-weight-500)] flex items-center justify-between gap-16 flex-wrap">
            <h4>{text('headerControls')}</h4>
          </div>
          <Button.Group layout="custom" className="grid grid-cols-3 [align-items:start] gap-12">
            <Dropdown
              size="medium"
              open={sortMenuOpen && column.controls.sort.enabled}
              onOpenChange={(open) => {
                setSortMenuOpen(open);

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
                  setSortMenuOpen(enabled);
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
                    className={[
                      'w-full',
                      "[&[aria-pressed='false']]:text-text-secondary [&&[aria-pressed='true']]:[--button-background-hover:var(--vd-brand-subtle)]",
                      "[&&[aria-pressed='true']]:[--button-background-active:var(--vd-brand-subtle)]",
                      "[&&[aria-pressed='true']]:[--button-border-hover:var(--vd-brand-primary)]",
                      "[&&[aria-pressed='true']]:[--button-border-active:var(--vd-brand-primary)] [&&[aria-pressed='true']]:bg-brand-subtle",
                      "[&&[aria-pressed='true']]:border-brand-primary [&&[aria-pressed='true']]:text-brand-link",
                      "[&_svg[data-mode='ascending']_[data-slot='sort-descending']]:hidden [&_svg[data-mode='descending']_[data-slot='sort-ascending']]:hidden",
                    ].join(' ')}
                    leadingIcon={<SortIcon size={20} data-mode={column.controls.sort.mode} />}
                  >
                    {text('sorting')}
                  </Button>
                )}
              />
              <Dropdown.Content
                placement="bottomLeft"
                offset={4}
                aria-label={text('arrowStyle')}
                className="[min-width:180px] [&_svg[data-mode='ascending']_[data-slot='sort-descending']]:hidden [&_svg[data-mode='descending']_[data-slot='sort-ascending']]:hidden"
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
              className={[
                'w-full',
                "[&[aria-pressed='false']]:text-text-secondary [&&[aria-pressed='true']]:[--button-background-hover:var(--vd-brand-subtle)]",
                "[&&[aria-pressed='true']]:[--button-background-active:var(--vd-brand-subtle)]",
                "[&&[aria-pressed='true']]:[--button-border-hover:var(--vd-brand-primary)]",
                "[&&[aria-pressed='true']]:[--button-border-active:var(--vd-brand-primary)] [&&[aria-pressed='true']]:bg-brand-subtle",
                "[&&[aria-pressed='true']]:border-brand-primary [&&[aria-pressed='true']]:text-brand-link",
                "[&_svg[data-mode='ascending']_[data-slot='sort-descending']]:hidden [&_svg[data-mode='descending']_[data-slot='sort-ascending']]:hidden",
              ].join(' ')}
              aria-pressed={column.controls.filter}
              leadingIcon={<FilterFilledIcon size={20} />}
              onClick={() => updateControls({ filter: !column.controls.filter })}
            >
              {text('filter')}
            </Button>
            <Button
              size="medium"
              variant="outline"
              className={[
                'w-full',
                "[&[aria-pressed='false']]:text-text-secondary [&&[aria-pressed='true']]:[--button-background-hover:var(--vd-brand-subtle)]",
                "[&&[aria-pressed='true']]:[--button-background-active:var(--vd-brand-subtle)]",
                "[&&[aria-pressed='true']]:[--button-border-hover:var(--vd-brand-primary)]",
                "[&&[aria-pressed='true']]:[--button-border-active:var(--vd-brand-primary)] [&&[aria-pressed='true']]:bg-brand-subtle",
                "[&&[aria-pressed='true']]:border-brand-primary [&&[aria-pressed='true']]:text-brand-link",
                "[&_svg[data-mode='ascending']_[data-slot='sort-descending']]:hidden [&_svg[data-mode='descending']_[data-slot='sort-ascending']]:hidden",
              ].join(' ')}
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
        className="[&_h4]:m-0 [&_h4]:text-(length:--vd-font-size-12) [&_h4]:[font-weight:var(--vd-font-weight-500)] grid gap-8"
        role="group"
        aria-label={text('headerAlign')}
      >
        <h4>{text('headerAlign')}</h4>
        <div className="grid [grid-template-columns:minmax(0,_1fr)_auto] gap-12 items-center">
          <Radio.Group
            aria-label={text('headerLayout')}
            orientation="horizontal"
            className="flex flex-wrap gap-12 text-(length:--vd-font-size-14) [&_[data-slot='label']]:text-(length:--vd-font-size-14)"
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
      <p className="text-text-tertiary [font-size:var(--vd-font-size-12)] [line-height:1.6] m-0">
        {text('columnHint')}
      </p>
    </section>
  );
}

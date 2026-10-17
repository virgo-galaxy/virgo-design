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
import styles from './TableSettingsDialog.module.scss';
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
      className={styles.columnDetail}
      aria-label={t(`tasks.${taskColumnLabelName(columnKey)}`)}
    >
      <h3>{t(`tasks.${taskColumnLabelName(columnKey)}`)}</h3>
      <div className={styles.columnPreview}>
        <TaskColumnPreview
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
        <div className={styles.headerSettings} role="group" aria-label={text('headerControls')}>
          <div className={styles.controlsHeading}>
            <h4>{text('headerControls')}</h4>
          </div>
          <Button.Group layout="custom" className={styles.controlChoices}>
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
                    className={styles.featureButton}
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
      <div className={styles.headerAlignment} role="group" aria-label={text('headerAlign')}>
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
  );
}

import { CircleCheckIcon, SearchIcon } from '@virgo-design/icons';
import {
  Button,
  Empty,
  Pagination,
  Table,
  type TableDensity,
  type TableSelectionOption,
} from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCurrentUser } from '@/features/auth';
import { moduleFilterKey, projectName, useTaskCatalog } from '@/features/catalog';
import { canCreateTask } from '@/lib/auth/permissions';
import { businessLabel } from '@/lib/formatting/business-labels';

import type { TaskSort } from '../../model/sort';
import {
  isLeadingTaskColumn,
  moveTaskColumn,
  type TaskColumnKey,
  type TaskDataColumn,
  taskPinnedCells,
  type TaskTableSettings,
  visibleColumns,
} from '../../model/table-settings';
import { taskPriorities, taskStatuses } from '../../model/task';
import { taskColumnLabelName } from '../../presentation/column-label';
import { taskStatusLabelNames } from '../../presentation/task-presentation';
import { TaskTableBody, type TaskTableBodyProps } from './TaskTableBody';

import * as styles from './TaskTable.css';

const densityByControlSize = {
  mini: 'mini',
  small: 'compact',
  medium: 'default',
  large: 'comfortable',
} as const satisfies Record<TaskTableSettings['size'], TableDensity>;

interface Props extends TaskTableBodyProps {
  onSettingsChange: (settings: TaskTableSettings) => void;
  columnFilters: Partial<Record<TaskDataColumn, string[]>>;
  onColumnFilterChange: (key: TaskDataColumn, values: string[]) => void;
  columnSearch: Partial<Record<TaskDataColumn, string>>;
  onColumnSearchChange: (key: TaskDataColumn, value: string) => void;
  assigneeFilter: readonly string[];
  onAssigneeFilterChange: (values: string[]) => void;
  sort: TaskSort | null;
  onSortChange: (sort: TaskSort) => void;
  matchingTotal: number;
  onPageChange: (page: number, pageSize: number) => void;
  filtered: boolean;
  onReset: () => void;
  onCreate: () => void;
}

export function TaskTable({
  presentation = 'table',
  settings,
  onSettingsChange,
  columnFilters,
  onColumnFilterChange,
  columnSearch,
  onColumnSearchChange,
  selection,
  selectionDisabled = false,
  onSelectionChange,
  sort,
  onSortChange,
  assigneeFilter,
  onAssigneeFilterChange,
  tasks,
  matchingTotal,
  page,
  pageSize,
  onPageChange,
  filtered,
  onOpen,
  onEdit,
  onReset,
  onCreate,
}: Props) {
  const { metadata, projects } = useTaskCatalog();
  const { members: taskAssignees, projects: taskProjects } = metadata;
  const { t, i18n } = useTranslation();
  const [draggedColumn, setDraggedColumn] = useState<TaskColumnKey | null>(null);

  const columns = visibleColumns(settings);
  const pinnedCells = taskPinnedCells(settings);
  const user = useCurrentUser();
  const canCreate = canCreateTask(user);

  const selections = settings.selectionActions.map((action) => {
    if (action === 'all' || action === 'invert' || action === 'none') return action;

    return {
      key: action,
      label: t(action === 'odd' ? 'tasks.selectOddRows' : 'tasks.selectEvenRows'),
      onSelect: (keys: readonly string[], selected: readonly string[]) => [
        ...selected.filter((key) => !keys.includes(key)),
        ...keys.filter((_, index) => index % 2 === (action === 'odd' ? 0 : 1)),
      ],
    } satisfies TableSelectionOption;
  });

  const moveColumn = (from: TaskColumnKey, to: TaskColumnKey) =>
    onSettingsChange({
      ...settings,
      columns: moveTaskColumn(
        settings.columns,
        from,
        settings.columns.findIndex((column) => column.key === to),
      ),
    });

  const filterOptions = (key: TaskDataColumn) => {
    if (key === 'status')
      return taskStatuses.map((value) => ({
        value,
        label: t(`tasks.statusLabels.${taskStatusLabelNames[value]}`),
      }));

    if (key === 'priority')
      return taskPriorities.map((value) => ({ value, label: t(`tasks.priorityLabels.${value}`) }));

    if (key === 'module')
      return projects.flatMap((project) =>
        project.modules.map((module) => ({
          value: moduleFilterKey(project.id, module.id),
          label:
            businessLabel(module.name, i18n.language) +
            ' · ' +
            businessLabel(project.name, i18n.language),
        })),
      );

    if (key === 'assignee')
      return taskAssignees.map((member) => ({
        value: member.id,
        label: businessLabel(member.name, i18n.language),
      }));

    return (key === 'project' ? taskProjects : (metadata.columnFilterOptions?.[key] ?? [])).map(
      (value) => ({
        value,
        label:
          businessLabel(key === 'project' ? projectName(value, projects) : value, i18n.language) ||
          t('tasks.noDueDate'),
      }),
    );
  };

  return (
    <>
      <Table.Viewport
        aria-label={t(
          presentation === 'column-preview' ? 'tasks.settings.preview' : 'tasks.taskList',
        )}
        className={styles.tableViewport}
        style={{
          ...(settings.stickyHeader ? { maxHeight: settings.viewportHeight } : {}),
          ...(presentation === 'column-preview' ? { marginInline: 0 } : {}),
        }}
      >
        <Table
          aria-label={presentation === 'column-preview' ? t('tasks.settings.preview') : undefined}
          resizable={settings.resizable}
          density={densityByControlSize[settings.size]}
          border={settings.border}
          striped={settings.striped}
          hoverable={settings.hoverable}
          headerDividers={settings.headerDividers}
          stickyHeader={settings.stickyHeader}
          columnWidths={columns.map((column) => column.width)}
          onColumnWidthsChange={(widths) =>
            onSettingsChange({
              ...settings,
              columns: settings.columns.map((column) => {
                const index = columns.findIndex((entry) => entry.key === column.key);

                return index === -1 ? column : { ...column, width: widths[index]! };
              }),
            })
          }
          data-pro-task-table=""
          className={styles.table}
        >
          <Table.Caption className={styles.srOnly}>
            {t('tasks.workspaceTasksStatusPriorityProjectAssigneeEstimatedHoursCreation')}
          </Table.Caption>
          {settings.showHeader ? (
            <Table.Header>
              <Table.Row>
                {columns.map((column) => {
                  const label = t(`tasks.${taskColumnLabelName(column.key)}`);
                  const dataColumn =
                    !isLeadingTaskColumn(column.key) && column.key !== 'actions'
                      ? column.key
                      : null;

                  return (
                    <Table.Head
                      key={column.key}
                      data-column-key={column.key}
                      {...pinnedCells.get(column.key)}
                      minWidth={column.minWidth}
                      maxWidth={column.maxWidth}
                      draggable={settings.reorderColumns && !isLeadingTaskColumn(column.key)}
                      onDragStart={(event) => {
                        if (
                          isLeadingTaskColumn(column.key) ||
                          (event.target as HTMLElement).closest(
                            '[data-slot="column-resize-handle"]',
                          )
                        ) {
                          event.preventDefault();

                          return;
                        }

                        setDraggedColumn(column.key);
                        event.dataTransfer.setData('application/x-virgo-column', column.key);
                      }}
                      onDragOver={(event) => {
                        if (
                          settings.reorderColumns &&
                          draggedColumn &&
                          !isLeadingTaskColumn(column.key)
                        )
                          event.preventDefault();
                      }}
                      onDrop={(event) => {
                        if (
                          settings.reorderColumns &&
                          draggedColumn &&
                          !isLeadingTaskColumn(column.key)
                        ) {
                          event.preventDefault();
                          moveColumn(draggedColumn, column.key);
                          setDraggedColumn(null);
                        }
                      }}
                      onDragEnd={() => setDraggedColumn(null)}
                      controls={
                        dataColumn
                          ? {
                              layout: column.controls.layout,
                              align: column.controls.align,
                              sort: {
                                enabled: column.controls.sort.enabled,
                                mode: column.controls.sort.mode,
                                direction: sort?.column === dataColumn ? sort.direction : 'none',
                                onDirectionChange: (direction) =>
                                  onSortChange({ column: dataColumn, direction }),
                              },
                              filter: column.controls.filter
                                ? {
                                    size: 'small',
                                    options: filterOptions(dataColumn),
                                    value:
                                      dataColumn === 'assignee'
                                        ? assigneeFilter
                                        : (columnFilters[dataColumn] ?? []),
                                    onValueChange: (values) =>
                                      dataColumn === 'assignee'
                                        ? onAssigneeFilterChange(values)
                                        : onColumnFilterChange(dataColumn, values),
                                  }
                                : false,
                              search: column.controls.search
                                ? {
                                    size: settings.size,
                                    actionSize: 'small',
                                    value: columnSearch[dataColumn] ?? '',
                                    onValueChange: (value) =>
                                      onColumnSearchChange(dataColumn, value),
                                  }
                                : false,
                            }
                          : { layout: column.controls.layout, align: column.controls.align }
                      }
                    >
                      {column.key === 'selection' ? (
                        <Table.Selection
                          label={t('tasks.selectPage')}
                          rowKeys={tasks.map((task) => task.id)}
                          value={selection}
                          disabled={selectionDisabled}
                          onValueChange={onSelectionChange}
                          selections={settings.selectionMenu ? selections : false}
                        />
                      ) : (
                        label
                      )}
                    </Table.Head>
                  );
                })}
              </Table.Row>
            </Table.Header>
          ) : null}
          <TaskTableBody
            presentation={presentation}
            settings={settings}
            selection={selection}
            selectionDisabled={selectionDisabled}
            onSelectionChange={onSelectionChange}
            tasks={tasks}
            page={page}
            pageSize={pageSize}
            onOpen={onOpen}
            onEdit={onEdit}
          />
        </Table>
      </Table.Viewport>
      {tasks.length === 0 && presentation === 'table' ? (
        <Empty size="md">
          <Empty.Icon>{filtered ? <SearchIcon /> : <CircleCheckIcon />}</Empty.Icon>
          <Empty.Title>
            {filtered ? t('tasks.noTasksMatchYourFilters') : t('tasks.yourTaskQueueIsClear')}
          </Empty.Title>
          <Empty.Description>
            {filtered
              ? t('tasks.tryAnotherSearchOrResetTheFiltersToSee')
              : t('tasks.createATaskToPlanTheNextPieceOf')}
          </Empty.Description>
          <Empty.Action>
            {filtered || canCreate ? (
              <Button
                variant="outline"
                size={settings.size}
                onClick={filtered ? onReset : onCreate}
              >
                {filtered ? t('tasks.resetFilters') : t('tasks.newTask2')}
              </Button>
            ) : null}
          </Empty.Action>
        </Empty>
      ) : null}
      {settings.pagination ? (
        <div data-pro-task-footer="" className={styles.tableFooter}>
          <Pagination
            size={settings.size}
            aria-label={t('tasks.taskPages')}
            total={matchingTotal}
            page={page}
            pageSize={pageSize}
            onChange={onPageChange}
            align={settings.paginationAlign}
            showTotal={settings.showTotal}
            selectedCount={settings.selection ? selection.length : 0}
            showSizeChanger={settings.showSizeChanger}
            showQuickJumper={settings.showQuickJumper}
            pageSizeOptions={settings.pageSizeOptions}
            className={styles.pagination}
          />
        </div>
      ) : null}
    </>
  );
}

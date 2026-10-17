import { CircleCheckIcon, EditIcon, FileTextIcon, SearchIcon } from '@virgo-design/icons';
import {
  Avatar,
  Button,
  Checkbox,
  Empty,
  Pagination,
  Table,
  type TableDensity,
  type TableSelectionOption,
  Tag,
} from '@virgo-design/ui';
import { type ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CopyableText } from '@/components/copyable-text/CopyableText';
import { useCurrentUser } from '@/features/auth';
import { moduleFilterKey, moduleName, projectName, useTaskCatalog } from '@/features/catalog';
import { canCreateTask, canEditTask } from '@/lib/auth/permissions';
import { businessLabel } from '@/lib/demo/labels';
import { formatDueDate } from '@/lib/formatting/format-due-date';

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
import { isOverdue, type Task, taskPriorities, taskStatuses } from '../../model/task';
import { taskColumnLabelName } from '../../presentation/column-label';
import {
  taskPriorityIntent,
  taskStatusIntent,
  taskStatusLabelNames,
} from '../../presentation/task-presentation';
import { TaskAssigneeCard } from '../TaskAssigneeCard/TaskAssigneeCard';
import styles from './TaskTable.module.scss';

const densityByControlSize = {
  mini: 'mini',
  small: 'compact',
  medium: 'default',
  large: 'comfortable',
} as const satisfies Record<TaskTableSettings['size'], TableDensity>;

interface Props {
  presentation?: 'table' | 'column-preview';
  settings: TaskTableSettings;
  onSettingsChange: (settings: TaskTableSettings) => void;
  columnFilters: Partial<Record<TaskDataColumn, string[]>>;
  onColumnFilterChange: (key: TaskDataColumn, values: string[]) => void;
  columnSearch: Partial<Record<TaskDataColumn, string>>;
  onColumnSearchChange: (key: TaskDataColumn, value: string) => void;
  selection: readonly string[];
  selectionDisabled?: boolean;
  onSelectionChange: (values: string[]) => void;
  assigneeFilter: readonly string[];
  onAssigneeFilterChange: (values: string[]) => void;
  sort: TaskSort | null;
  onSortChange: (sort: TaskSort) => void;
  tasks: Task[];
  matchingTotal: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number, pageSize: number) => void;
  filtered: boolean;
  onOpen: (task: Task, opener: HTMLButtonElement) => void;
  onEdit: (task: Task, opener: HTMLButtonElement) => void;
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
  const {
    members: taskAssignees,
    projects: taskProjects,
    referenceDate: taskReferenceDate,
  } = metadata;
  const { t, i18n } = useTranslation();
  const [draggedColumn, setDraggedColumn] = useState<TaskColumnKey | null>(null);

  const columns = visibleColumns(settings);
  const pinnedCells = taskPinnedCells(settings);
  const user = useCurrentUser();
  const canCreate = canCreateTask(user);

  const createdAtFormatter = new Intl.DateTimeFormat(i18n.language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: 'UTC',
  });

  const compact = settings.size === 'small' || settings.size === 'mini';
  const tagSize = compact ? 'sm' : settings.size === 'large' ? 'lg' : 'md';

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

  const cellContent = (task: Task, key: TaskColumnKey, index: number): ReactNode => {
    const assignee = taskAssignees.find((member) => member.id === task.assignee);

    switch (key) {
      case 'selection':
        return (
          <Checkbox
            aria-label={t('tasks.selectTask', { id: task.id })}
            checked={selection.includes(task.id)}
            disabled={selectionDisabled}
            onChange={(event) =>
              onSelectionChange(
                event.target.checked
                  ? [...selection, task.id]
                  : selection.filter((id) => id !== task.id),
              )
            }
          />
        );
      case 'rowNumber':
        return <span className={styles.estimateHours}>{(page - 1) * pageSize + index + 1}</span>;
      case 'title':
        return (
          <div className={styles.taskIdentity}>
            <CopyableText value={task.id} className={styles.taskId} />
            <CopyableText
              value={businessLabel(task.title, i18n.language)}
              data-pro-task-title=""
              className={styles.taskTitle}
            />
          </div>
        );
      case 'status':
        return (
          <Tag size={tagSize} intent={taskStatusIntent[task.status]}>
            {t(`tasks.statusLabels.${taskStatusLabelNames[task.status]}`)}
          </Tag>
        );
      case 'priority':
        return (
          <Tag size={tagSize} intent={taskPriorityIntent[task.priority]} variant="outline">
            {t(`tasks.priorityLabels.${task.priority}`)}
          </Tag>
        );
      case 'project':
        return (
          <span className={styles.projectName}>
            {businessLabel(projectName(task.project, projects), i18n.language)}
          </span>
        );
      case 'module':
        return (
          <span className={styles.projectName}>
            {businessLabel(moduleName(task.project, task.module, projects), i18n.language)}
          </span>
        );
      case 'assignee':
        return assignee && presentation === 'table' ? (
          <TaskAssigneeCard member={assignee} size={tagSize} />
        ) : (
          <div className={styles.person}>
            <Avatar
              src={assignee?.avatarUrl ?? ''}
              size={tagSize}
              fallback={assignee?.initials ?? '?'}
              className={styles.avatar}
            />
            <span>{assignee?.name ?? t('tasks.unknownMember')}</span>
          </div>
        );
      case 'estimateHours':
        return <span className={styles.estimateHours}>{task.estimateHours}</span>;
      case 'completedAt':
        return task.completedAt ? (
          <time className={styles.createdAt} dateTime={task.completedAt}>
            {createdAtFormatter.format(new Date(task.completedAt))}
          </time>
        ) : (
          <span>—</span>
        );
      case 'createdAt':
        return (
          <time className={styles.createdAt} dateTime={task.createdAt}>
            {createdAtFormatter.format(new Date(task.createdAt))}
          </time>
        );
      case 'dueDate':
        return (
          <div className={styles.dueDate} data-overdue={isOverdue(task, taskReferenceDate)}>
            {task.dueDate ? (
              <time dateTime={task.dueDate}>{formatDueDate(task.dueDate, i18n.language)}</time>
            ) : (
              <span>{t('tasks.noDueDate')}</span>
            )}
            {isOverdue(task, taskReferenceDate) ? (
              <span className={styles.overdueLabel}>{t('tasks.overdue')}</span>
            ) : null}
          </div>
        );
      case 'actions':
        return (
          <Button.Group layout="custom" className={styles.rowActions}>
            {canEditTask(user, task) ? (
              <Button
                size={settings.size}
                variant="text"
                leadingIcon={<EditIcon />}
                onClick={(event) => onEdit(task, event.currentTarget)}
              >
                {t('tasks.edit')}
              </Button>
            ) : null}
            <Button
              size={settings.size}
              variant="text"
              leadingIcon={<FileTextIcon />}
              onClick={(event) => onOpen(task, event.currentTarget)}
            >
              {t('tasks.details')}
            </Button>
          </Button.Group>
        );
    }
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
          <Table.Body>
            {tasks.map((task, index) => (
              <Table.Row
                key={task.id}
                data-task-id={task.id}
                selected={settings.selection && selection.includes(task.id)}
              >
                {columns.map((column) => (
                  <Table.Cell
                    key={column.key}
                    data-column-key={column.key}
                    align={column.align}
                    {...pinnedCells.get(column.key)}
                  >
                    {cellContent(task, column.key, index)}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
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

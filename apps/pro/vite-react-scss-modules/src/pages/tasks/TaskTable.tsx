import { CircleCheckIcon, EditIcon, FileTextIcon, SearchIcon } from '@virgo-design/icons';
import { Avatar, Button, Checkbox, Empty, Pagination, Table, Tag } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { useProData } from '@/application/pro-data-context';
import { CopyableText } from '@/components/copyable-text';
import { isOverdue, type Task } from '@/data/tasks';
import type { TaskSort, TaskSortColumn } from '@/data/tasks.sort';
import { formatDueDate } from '@/data/workplace';
import { usePaginationLabels } from '@/pages/shared/use-pagination-labels';
import { getTaskPriorityLabel, getTaskStatusLabel } from '@/pages/tasks/task-presentation';

import { taskLabelStyles, taskPriorityIntent, taskStatusIntent } from './task-presentation';
import styles from './TasksPage.module.scss';

export function TaskTable({
  selection,
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
  selectedId,
  onOpen,
  onEdit,
  onReset,
  onCreate,
}: {
  selection: readonly string[];
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
  selectedId: string | undefined;
  onOpen: (task: Task, opener: HTMLButtonElement) => void;
  onEdit: (task: Task, opener: HTMLButtonElement) => void;
  onReset: () => void;
  onCreate: () => void;
}) {
  const { taskAssignees, taskReferenceDate } = useProData();

  const { t, i18n } = useTranslation();
  const paginationLabels = usePaginationLabels();
  const createdAtFormatter = new Intl.DateTimeFormat(i18n.language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: 'UTC',
  });
  const columns: Array<{ key: string; label: string; sortColumn?: TaskSortColumn; align?: 'end' }> =
    [
      { key: 'title', label: t('tasks.task') },
      { key: 'status', label: t('tasks.status') },
      { key: 'priority', label: t('tasks.priority') },
      { key: 'project', label: t('tasks.project') },
      { key: 'assignee', label: t('tasks.assignee') },
      {
        key: 'estimateHours',
        label: t('tasks.estimateH'),
        sortColumn: 'estimateHours',
        align: 'end',
      },
      { key: 'createdAt', label: t('tasks.createdAt'), sortColumn: 'createdAt' },
      { key: 'dueDate', label: t('tasks.dueDate'), sortColumn: 'dueDate', align: 'end' },
    ];
  return (
    <>
      <Table.Viewport aria-label={t('tasks.taskList')} className={styles.tableViewport}>
        <Table resizable density="default" border="rows" hoverable className={styles.table}>
          <Table.Caption className={styles.srOnly}>
            {t('tasks.workspaceTasksStatusPriorityProjectAssigneeEstimatedHoursCreation')}
          </Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.Head className={styles.selectionCell}>
                <Table.Selection
                  label={t('tasks.selectPage')}
                  rowKeys={tasks.map((task) => task.id)}
                  value={selection}
                  onValueChange={onSelectionChange}
                  selections={[
                    'all',
                    'invert',
                    'none',
                    {
                      key: 'odd',
                      label: t('tasks.selectOddRows'),
                      onSelect: (keys, selected) => [
                        ...selected.filter((key) => !keys.includes(key)),
                        ...keys.filter((_, index) => index % 2 === 0),
                      ],
                    },
                    {
                      key: 'even',
                      label: t('tasks.selectEvenRows'),
                      onSelect: (keys, selected) => [
                        ...selected.filter((key) => !keys.includes(key)),
                        ...keys.filter((_, index) => index % 2 === 1),
                      ],
                    },
                  ]}
                />
              </Table.Head>
              {columns.map(({ key, label, sortColumn, align }) => (
                <Table.Head
                  key={key}
                  actions={
                    key === 'assignee' ? (
                      <Table.Filter
                        size="medium"
                        label={label}
                        options={taskAssignees.map((member) => ({
                          value: member.id,
                          label: member.name,
                        }))}
                        value={assigneeFilter}
                        onValueChange={onAssigneeFilterChange}
                      />
                    ) : undefined
                  }
                  align={align ?? 'start'}
                  sortDirection={
                    sortColumn ? (sort?.column === sortColumn ? sort.direction : 'none') : undefined
                  }
                  onSortChange={
                    sortColumn
                      ? (direction) => onSortChange({ column: sortColumn, direction })
                      : undefined
                  }
                >
                  {label}
                </Table.Head>
              ))}
              <Table.Head className={styles.operationsCell}>{t('tasks.actions')}</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tasks.map((task) => {
              const assignee = taskAssignees.find((member) => member.id === task.assignee);
              const overdue = isOverdue(task, taskReferenceDate);
              return (
                <Table.Row
                  key={task.id}
                  selected={selection.includes(task.id) || selectedId === task.id}
                >
                  <Table.Cell className={styles.selectionCell}>
                    <Checkbox
                      aria-label={t('tasks.selectTask', { id: task.id })}
                      checked={selection.includes(task.id)}
                      onChange={(event) =>
                        onSelectionChange(
                          event.target.checked
                            ? [...selection, task.id]
                            : selection.filter((id) => id !== task.id),
                        )
                      }
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <div className={styles.taskIdentity}>
                      <CopyableText value={task.id} className={styles.taskId} />
                      <CopyableText value={task.title} className={styles.taskTitle} />
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <Tag
                      size="md"
                      intent={taskStatusIntent[task.status]}
                      className={taskLabelStyles.tag}
                    >
                      {getTaskStatusLabel(t, task.status)}
                    </Tag>
                  </Table.Cell>
                  <Table.Cell>
                    <Tag
                      size="md"
                      intent={taskPriorityIntent[task.priority]}
                      className={taskLabelStyles.tag}
                      variant="outline"
                    >
                      {getTaskPriorityLabel(t, task.priority)}
                    </Tag>
                  </Table.Cell>
                  <Table.Cell>
                    <span className={styles.projectName}>{task.project}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <div className={styles.person}>
                      <Avatar
                        size="md"
                        fallback={assignee?.initials ?? '?'}
                        className={styles.avatar}
                      />
                      <span>{assignee?.name ?? t('tasks.unknownMember')}</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell align="end">
                    <span className={styles.estimateHours}>{task.estimateHours}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <time className={styles.createdAt} dateTime={task.createdAt}>
                      {createdAtFormatter.format(new Date(task.createdAt))}
                    </time>
                  </Table.Cell>
                  <Table.Cell align="end">
                    <div className={styles.dueDate} data-overdue={overdue}>
                      {task.dueDate ? (
                        <time dateTime={task.dueDate}>
                          {formatDueDate(task.dueDate, i18n.language)}
                        </time>
                      ) : (
                        <span>{t('tasks.noDueDate')}</span>
                      )}
                      {overdue ? (
                        <span className={styles.overdueLabel}>{t('tasks.overdue')}</span>
                      ) : null}
                    </div>
                  </Table.Cell>
                  <Table.Cell className={styles.operationsCell}>
                    <div className={styles.rowActions}>
                      <Button
                        size="medium"
                        variant="text"
                        leadingIcon={<EditIcon />}
                        onClick={(event) => onEdit(task, event.currentTarget)}
                      >
                        {t('tasks.edit')}
                      </Button>
                      <Button
                        size="medium"
                        variant="text"
                        leadingIcon={<FileTextIcon />}
                        onClick={(event) => onOpen(task, event.currentTarget)}
                      >
                        {t('tasks.details')}
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Table.Viewport>
      {tasks.length === 0 ? (
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
            <Button variant="outline" size="medium" onClick={filtered ? onReset : onCreate}>
              {filtered ? t('tasks.resetFilters') : t('tasks.newTask2')}
            </Button>
          </Empty.Action>
        </Empty>
      ) : null}
      <div className={styles.tableFooter}>
        <Pagination
          size="medium"
          labels={paginationLabels}
          aria-label={t('tasks.taskPages')}
          total={matchingTotal}
          page={page}
          pageSize={pageSize}
          onChange={onPageChange}
          align="right"
          showTotal
          selectedCount={selection.length}
          showSizeChanger
          pageSizeOptions={[10, 20, 50]}
          className={styles.pagination}
        />
      </div>
    </>
  );
}

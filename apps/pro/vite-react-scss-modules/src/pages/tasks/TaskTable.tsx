import { CircleCheckIcon, SearchIcon } from '@virgo-design/icons';
import { Avatar, Button, Empty, Pagination, Table, Tag } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { useProData } from '@/application/pro-data-context';
import { isOverdue, type Task } from '@/data/tasks';
import type { TaskSort, TaskSortColumn } from '@/data/tasks.sort';
import { formatDueDate } from '@/data/workplace';
import { usePaginationLabels } from '@/pages/shared/use-pagination-labels';
import { getTaskPriorityLabel, getTaskStatusLabel } from '@/pages/tasks/task-presentation';

import { taskPriorityIntent, taskStatusIntent } from './task-presentation';
import styles from './TasksPage.module.scss';

export function TaskTable({
  sort,
  onSortChange,
  tasks,
  total,
  matchingTotal,
  page,
  pageSize,
  range,
  onPageChange,
  filtered,
  selectedId,
  onOpen,
  onReset,
  onCreate,
}: {
  sort: TaskSort | null;
  onSortChange: (sort: TaskSort) => void;
  tasks: Task[];
  total: number;
  matchingTotal: number;
  page: number;
  pageSize: number;
  range: readonly [number, number];
  onPageChange: (page: number, pageSize: number) => void;
  filtered: boolean;
  selectedId: string | undefined;
  onOpen: (task: Task, opener: HTMLButtonElement) => void;
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
        <Table density="default" border="separators" hoverable className={styles.table}>
          <Table.Caption className={styles.srOnly}>
            {t('tasks.workspaceTasksStatusPriorityProjectAssigneeEstimatedHoursCreation')}
          </Table.Caption>
          <Table.Header>
            <Table.Row>
              {columns.map(({ key, label, sortColumn, align }) => (
                <Table.Head
                  key={key}
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
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tasks.map((task) => {
              const assignee = taskAssignees.find((member) => member.id === task.assignee);
              const overdue = isOverdue(task, taskReferenceDate);
              return (
                <Table.Row key={task.id} selected={selectedId === task.id}>
                  <Table.Cell>
                    <div className={styles.taskIdentity}>
                      <span className={styles.taskId}>{task.id}</span>
                      <Button
                        variant="text"
                        size="small"
                        className={styles.taskLink}
                        aria-label={t('tasks.openTaskValueValue', { v0: task.id, v1: task.title })}
                        onClick={(event) => onOpen(task, event.currentTarget)}
                      >
                        {task.title}
                      </Button>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <Tag size="sm" intent={taskStatusIntent[task.status]}>
                      {getTaskStatusLabel(t, task.status)}
                    </Tag>
                  </Table.Cell>
                  <Table.Cell>
                    <Tag size="sm" intent={taskPriorityIntent[task.priority]} variant="outline">
                      {getTaskPriorityLabel(t, task.priority)}
                    </Tag>
                  </Table.Cell>
                  <Table.Cell>
                    <span className={styles.projectName}>{task.project}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <div className={styles.person}>
                      <Avatar
                        size="sm"
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
            <Button variant="outline" size="small" onClick={filtered ? onReset : onCreate}>
              {filtered ? t('tasks.resetFilters') : t('tasks.newTask2')}
            </Button>
          </Empty.Action>
        </Empty>
      ) : null}
      <div className={styles.tableFooter}>
        <div className={styles.tableSummary}>
          <span aria-live="polite">
            {t('tasks.showingValueValueOfValueTasksValue', {
              v0: range[0],
              v1: range[1],
              v2: matchingTotal,
              v3: filtered ? t('tasks.workspaceCount', { count: total }) : '',
            })}
          </span>
        </div>
        <Pagination
          labels={paginationLabels}
          aria-label={t('tasks.taskPages')}
          total={matchingTotal}
          page={page}
          pageSize={pageSize}
          onChange={onPageChange}
          align="right"
          showSizeChanger
          pageSizeOptions={[10, 20, 50]}
          className={styles.pagination}
        />
      </div>
    </>
  );
}

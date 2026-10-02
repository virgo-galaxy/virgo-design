import { CircleCheckIcon, SearchIcon } from '@virgo-design/icons';
import { Avatar, Button, Empty, Pagination, Table, Tag } from '@virgo-design/ui';

import { isOverdue, type Task } from '@/data/tasks';
import { taskAssignees, taskReferenceDate } from '@/data/tasks.seed';
import type { TaskSort, TaskSortColumn } from '@/data/tasks.sort';
import { formatDueDate } from '@/data/workplace';

import { taskPriorityIntent, taskStatusIntent } from './task-presentation';
import styles from './TasksPage.module.scss';

const columns: Array<{ key: string; label: string; sortColumn?: TaskSortColumn; align?: 'end' }> = [
  { key: 'title', label: 'Task' },
  { key: 'status', label: 'Status' },
  { key: 'priority', label: 'Priority' },
  { key: 'project', label: 'Project' },
  { key: 'assignee', label: 'Assignee' },
  { key: 'estimateHours', label: 'Estimate (h)', sortColumn: 'estimateHours', align: 'end' },
  { key: 'createdAt', label: 'Created at', sortColumn: 'createdAt' },
  { key: 'dueDate', label: 'Due date', sortColumn: 'dueDate', align: 'end' },
];
const createdAtFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

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
  return (
    <>
      <Table.Viewport aria-label="Task list" className={styles.tableViewport}>
        <Table density="default" border="separators" hoverable className={styles.table}>
          <Table.Caption className={styles.srOnly}>
            Workspace tasks, status, priority, project, assignee, estimated hours, creation time and
            due date
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
                        aria-label={`Open task ${task.id}: ${task.title}`}
                        onClick={(event) => onOpen(task, event.currentTarget)}
                      >
                        {task.title}
                      </Button>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <Tag size="sm" intent={taskStatusIntent[task.status]}>
                      {task.status}
                    </Tag>
                  </Table.Cell>
                  <Table.Cell>
                    <Tag size="sm" intent={taskPriorityIntent[task.priority]} variant="outline">
                      {task.priority}
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
                      <span>{assignee?.name ?? 'Unknown member'}</span>
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
                        <time dateTime={task.dueDate}>{formatDueDate(task.dueDate)}</time>
                      ) : (
                        <span>No due date</span>
                      )}
                      {overdue ? <span className={styles.overdueLabel}>Overdue</span> : null}
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
            {filtered ? 'No tasks match your filters' : 'Your task queue is clear'}
          </Empty.Title>
          <Empty.Description>
            {filtered
              ? 'Try another search or reset the filters to see the whole workspace.'
              : 'Create a task to plan the next piece of work.'}
          </Empty.Description>
          <Empty.Action>
            <Button variant="outline" size="small" onClick={filtered ? onReset : onCreate}>
              {filtered ? 'Reset filters' : 'New Task'}
            </Button>
          </Empty.Action>
        </Empty>
      ) : null}
      <div className={styles.tableFooter}>
        <div className={styles.tableSummary}>
          <span aria-live="polite">
            Showing {range[0]}–{range[1]} of {matchingTotal} tasks
            {filtered ? ` · ${total} in workspace` : ''}
          </span>
        </div>
        <Pagination
          aria-label="Task pages"
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

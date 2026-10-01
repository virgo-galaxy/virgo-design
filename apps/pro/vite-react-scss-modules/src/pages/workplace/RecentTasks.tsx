import { ArrowRightIcon, SearchIcon } from '@virgo-design/icons';
import { Avatar, Button, Card, Input, Table, Tag, type TagIntent } from '@virgo-design/ui';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { formatDueDate, recentTasks, type TaskStatus } from '@/data/workplace';

import styles from './WorkplacePage.module.scss';

const statusIntent: Record<TaskStatus, TagIntent> = {
  'In progress': 'brand',
  'In review': 'warning',
  Blocked: 'danger',
  Done: 'success',
};

export function RecentTasks() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const normalizedQuery = query.trim().toLowerCase();
  const tasks = recentTasks.filter((task) =>
    [task.title, task.id, task.project, task.status, task.priority, task.assignee.name].some(
      (value) => value.toLowerCase().includes(normalizedQuery),
    ),
  );

  return (
    <Card variant="outlined" className={styles.tasksCard}>
      <Card.Header className={styles.panelHeader}>
        <div>
          <Card.Title as="h2">On the radar</Card.Title>
          <Card.Description>Recent tasks across your workspace.</Card.Description>
        </div>
        <Button
          variant="text"
          size="small"
          trailingIcon={<ArrowRightIcon />}
          onClick={() => navigate('/work/tasks')}
        >
          All tasks
        </Button>
      </Card.Header>
      <div className={styles.taskToolbar}>
        <Input
          aria-label="Filter recent tasks"
          placeholder="Filter tasks, projects, people…"
          prefix={<SearchIcon />}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          clearable
          size="small"
          rootClassName={styles.taskSearch!}
        />
        <span aria-live="polite" className={styles.taskCount}>
          {tasks.length} of {recentTasks.length} tasks
        </span>
      </div>
      <Card.Body>
        <Table.Viewport aria-label="Recent workspace tasks" className={styles.tableViewport}>
          <Table size="small" border="separators" hoverable className={styles.taskTable}>
            <Table.Caption className={styles.srOnly}>
              Recent tasks: task, project, status, priority, assignee and due date
            </Table.Caption>
            <Table.Header>
              <Table.Row>
                <Table.Head>Task</Table.Head>
                <Table.Head>Project</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head>Priority</Table.Head>
                <Table.Head>Assignee</Table.Head>
                <Table.Head align="end">Due date</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tasks.map((task) => (
                <Table.Row key={task.id}>
                  <Table.Cell>
                    <div className={styles.taskName}>
                      <span>{task.title}</span>
                      <span className={styles.taskId}>{task.id}</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <span className={styles.projectName}>{task.project}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Tag intent={statusIntent[task.status]} size="sm">
                      {task.status}
                    </Tag>
                  </Table.Cell>
                  <Table.Cell>
                    <span className={styles.priority} data-priority={task.priority}>
                      <i />
                      {task.priority}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Avatar
                      size="sm"
                      fallback={task.assignee.initials}
                      title={task.assignee.name}
                      aria-label={task.assignee.name}
                      className={styles.assignee}
                    />
                  </Table.Cell>
                  <Table.Cell align="end">
                    <time dateTime={task.due} className={styles.dueDate}>
                      {formatDueDate(task.due)}
                    </time>
                  </Table.Cell>
                </Table.Row>
              ))}
              {tasks.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={6}>
                    <div className={styles.emptyTasks}>
                      No tasks match “{query}”.
                      <Button variant="text" size="small" onClick={() => setQuery('')}>
                        Clear filter
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ) : null}
            </Table.Body>
          </Table>
        </Table.Viewport>
      </Card.Body>
      <Card.Footer className={styles.taskFooter}>
        <span>A workspace snapshot · October 1</span>
        <Avatar.Group aria-label="Contributors">
          <Avatar fallback="AC" size="sm" title="Ava Chen" />
          <Avatar fallback="LP" size="sm" title="Leo Park" />
          <Avatar fallback="NW" size="sm" title="Nina Wu" />
          <Avatar fallback="EM" size="sm" title="Eli Morgan" />
        </Avatar.Group>
      </Card.Footer>
    </Card>
  );
}

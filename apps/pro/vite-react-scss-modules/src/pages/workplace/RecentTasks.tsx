import { ArrowRightIcon, SearchIcon } from '@virgo-design/icons';
import { Avatar, Button, Card, Input, Table, Tag } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { useProData } from '@/application/pro-data-context';
import { formatDueDate } from '@/data/workplace';
import {
  getTaskPriorityLabel,
  getTaskStatusLabel,
  taskStatusIntent,
} from '@/pages/tasks/task-presentation';

import styles from './WorkplacePage.module.scss';

export function RecentTasks() {
  const { recentTasks, snapshot } = useProData();

  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const normalizedQuery = query.trim().toLowerCase();
  const tasks = recentTasks.filter((task) =>
    [
      task.title,
      task.id,
      task.project,
      getTaskStatusLabel(t, task.status),
      getTaskPriorityLabel(t, task.priority),
      task.assignee.name,
    ].some((value) => value.toLowerCase().includes(normalizedQuery)),
  );

  return (
    <Card variant="outlined" className={styles.tasksCard}>
      <Card.Header className={styles.panelHeader}>
        <div>
          <Card.Title as="h2">{t('workplace.onTheRadar')}</Card.Title>
          <Card.Description>{t('workplace.recentTasksAcrossYourWorkspace')}</Card.Description>
        </div>
        <Button
          variant="text"
          size="small"
          trailingIcon={<ArrowRightIcon />}
          onClick={() => navigate('/work/tasks')}
        >
          {t('workplace.allTasks')}
        </Button>
      </Card.Header>
      <div className={styles.taskToolbar}>
        <Input
          aria-label={t('workplace.filterRecentTasks')}
          placeholder={t('workplace.filterTasksProjectsPeople')}
          prefix={<SearchIcon />}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          clearable
          size="small"
          rootClassName={styles.taskSearch!}
        />
        <span aria-live="polite" className={styles.taskCount}>
          {t('workplace.valueOfValueTasks', { v0: tasks.length, v1: recentTasks.length })}
        </span>
      </div>
      <Card.Body>
        <Table.Viewport
          aria-label={t('workplace.recentWorkspaceTasks')}
          className={styles.tableViewport}
        >
          <Table density="compact" border="separators" hoverable className={styles.taskTable}>
            <Table.Caption className={styles.srOnly}>
              {t('workplace.recentTasksTaskProjectStatusPriorityAssigneeAndDue')}
            </Table.Caption>
            <Table.Header>
              <Table.Row>
                <Table.Head>{t('workplace.task')}</Table.Head>
                <Table.Head>{t('workplace.project')}</Table.Head>
                <Table.Head>{t('workplace.status')}</Table.Head>
                <Table.Head>{t('workplace.priority')}</Table.Head>
                <Table.Head>{t('workplace.assignee')}</Table.Head>
                <Table.Head align="end">{t('workplace.dueDate')}</Table.Head>
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
                    <Tag intent={taskStatusIntent[task.status]} size="sm">
                      {getTaskStatusLabel(t, task.status)}
                    </Tag>
                  </Table.Cell>
                  <Table.Cell>
                    <span className={styles.priority} data-priority={task.priority}>
                      <i />
                      {getTaskPriorityLabel(t, task.priority)}
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
                      {task.due ? formatDueDate(task.due, i18n.language) : '—'}
                    </time>
                  </Table.Cell>
                </Table.Row>
              ))}
              {tasks.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={6}>
                    <div className={styles.emptyTasks}>
                      {t('workplace.noTasksMatchValue', { v0: query })}
                      <Button variant="text" size="small" onClick={() => setQuery('')}>
                        {t('workplace.clearFilter')}
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
        <span>
          {t('workplace.aWorkspaceSnapshotOctober1', {
            date: formatDueDate(snapshot.date, i18n.language),
          })}
        </span>
        <Avatar.Group aria-label={t('workplace.contributors')}>
          <Avatar fallback="AC" size="sm" title={t('workplace.avaChen')} />
          <Avatar fallback="LP" size="sm" title={t('workplace.leoPark')} />
          <Avatar fallback="NW" size="sm" title={t('workplace.ninaWu')} />
          <Avatar fallback="EM" size="sm" title={t('workplace.eliMorgan')} />
        </Avatar.Group>
      </Card.Footer>
    </Card>
  );
}

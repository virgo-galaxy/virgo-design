import { ArrowRightIcon } from '@virgo-design/icons';
import { Button, Card, Tag } from '@virgo-design/ui';
import type { Ref } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { projectName, useTaskCatalog } from '@/features/catalog';
import { getTaskStatusLabel, taskStatusIntent } from '@/features/tasks';
import { businessLabel } from '@/lib/demo/labels';
import { formatDueDate } from '@/lib/format-due-date';
import { routePath } from '@/routing';

import styles from './RecentTasks.module.scss';
import { useWorkplaceData } from './workplace-context';

export function RecentTasks({ allTasksRef }: { allTasksRef: Ref<HTMLButtonElement> }) {
  const { recentTasks, snapshot } = useWorkplaceData();
  const tasks = recentTasks.slice(0, 5);
  const { projects } = useTaskCatalog();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <Card variant="outlined" className={styles.tasksCard}>
      <Card.Header className={styles.panelHeader}>
        <div>
          <Card.Title as="h2">{t('workplace.onTheRadar')}</Card.Title>
          <Card.Description>{t('workplace.recentTasksAcrossYourWorkspace')}</Card.Description>
        </div>
        <Button
          ref={allTasksRef}
          variant="text"
          size="medium"
          trailingIcon={<ArrowRightIcon />}
          onClick={() => navigate(routePath('tasks'))}
        >
          {t('workplace.allTasks')}
        </Button>
      </Card.Header>
      <Card.Body>
        <div className={styles.compactTaskHeading} aria-hidden="true">
          <span>{t('workplace.task')}</span>
          <span>{t('workplace.status')}</span>
          <span className={styles.compactTaskDateHeading}>{t('workplace.dueDate')}</span>
        </div>
        <ul className={styles.compactTasks} aria-label={t('workplace.recentWorkspaceTasks')}>
          {tasks.map((task) => (
            <li key={task.id} className={styles.compactTask}>
              <div className={styles.compactTaskIdentity}>
                <strong title={businessLabel(task.title, i18n.language)}>
                  {businessLabel(task.title, i18n.language)}
                </strong>
                <span
                  title={`${businessLabel(projectName(task.project, projects), i18n.language)} · ${businessLabel(task.assignee.name, i18n.language)}`}
                >
                  {businessLabel(projectName(task.project, projects), i18n.language)} ·{' '}
                  {businessLabel(task.assignee.name, i18n.language)}
                </span>
              </div>
              <div className={styles.compactTaskStatus}>
                <Tag intent={taskStatusIntent[task.status]} size="md">
                  {getTaskStatusLabel(t, task.status)}
                </Tag>
              </div>
              <div className={styles.compactTaskDue}>
                {task.due ? (
                  <time dateTime={task.due}>{formatDueDate(task.due, i18n.language)}</time>
                ) : (
                  <span>{t('workplace.noDueDate')}</span>
                )}
              </div>
            </li>
          ))}
          {tasks.length === 0 ? (
            <li className={styles.emptyTasks}>{t('workplace.noRecentTasks')}</li>
          ) : null}
        </ul>
      </Card.Body>
      <Card.Footer className={styles.taskFooter}>
        <span>
          {t('workplace.aWorkspaceSnapshotOctober1', {
            date: formatDueDate(snapshot.date, i18n.language),
          })}
        </span>
      </Card.Footer>
    </Card>
  );
}

import { ArrowRightIcon } from '@virgo-design/icons';
import { Button, Card, Tag } from '@virgo-design/ui';
import type { Ref } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import type { TaskDto } from '@/api/tasks/types';
import { ResourceContent } from '@/components/resource-content/ResourceContent';
import { CatalogBoundary, projectName, useTaskCatalog } from '@/features/catalog';
import { taskStatusIntent, taskStatusLabelNames, useTaskQuery } from '@/features/tasks';
import { businessLabel } from '@/lib/demo/labels';
import { formatDueDate } from '@/lib/formatting/format-due-date';
import { routePath } from '@/routes';

import styles from './RecentTasks.module.scss';

function RecentTasksView({
  allTasksRef,
  tasks,
}: {
  allTasksRef: Ref<HTMLButtonElement>;
  tasks: TaskDto[];
}) {
  const { projects, metadata } = useTaskCatalog();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const memberName = (id: string) =>
    metadata.members.find((member) => member.id === id)?.name ?? id;

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
          onClick={() => navigate(routePath('work.tasks'))}
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
                  title={`${businessLabel(projectName(task.project, projects), i18n.language)} · ${businessLabel(memberName(task.assignee), i18n.language)}`}
                >
                  {businessLabel(projectName(task.project, projects), i18n.language)} ·{' '}
                  {businessLabel(memberName(task.assignee), i18n.language)}
                </span>
              </div>
              <div className={styles.compactTaskStatus}>
                <Tag intent={taskStatusIntent[task.status]} size="md">
                  {t(`tasks.statusLabels.${taskStatusLabelNames[task.status]}`)}
                </Tag>
              </div>
              <div className={styles.compactTaskDue}>
                {task.dueDate ? (
                  <time dateTime={task.dueDate}>{formatDueDate(task.dueDate, i18n.language)}</time>
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
            date: formatDueDate(metadata.referenceDate, i18n.language),
          })}
        </span>
      </Card.Footer>
    </Card>
  );
}

export function RecentTasks({ allTasksRef }: { allTasksRef: Ref<HTMLButtonElement> }) {
  const resource = useTaskQuery({ pageSize: 5 });

  return (
    <ResourceContent resource={resource}>
      {(data) => (
        <CatalogBoundary>
          <RecentTasksView tasks={data.items} allTasksRef={allTasksRef} />
        </CatalogBoundary>
      )}
    </ResourceContent>
  );
}

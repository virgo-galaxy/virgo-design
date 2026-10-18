import { Tag } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import type { ProjectDto } from '@/api/projects/types';
import { Panel } from '@/components/display/panel';
import { ResourceContent } from '@/components/feedback/resource-content';
import {
  taskDetailsPath,
  taskPriorityIntent,
  taskStatusIntent,
  taskStatusLabelNames,
} from '@/features/tasks';
import { businessLabel } from '@/lib/formatting/business-labels';
import { formatDueDate } from '@/lib/formatting/format-due-date';
import { AppLink } from '@/routes/navigation';

import type { useProjectResources } from '../../hooks/use-project-resources';
import { projectDetailPath, projectTasksPath } from '../../routes/navigation';

import styles from './ProjectTaskPanel.module.scss';
import shared from '@/styles/product-layout.module.scss';

export function ProjectTaskPanel({
  project,
  resource,
}: {
  project: ProjectDto;
  resource: ReturnType<typeof useProjectResources>['tasks'];
}) {
  const { t, i18n } = useTranslation();

  return (
    <Panel
      title={t('projectDetails.linkedTasks')}
      description={t('projectDetails.liveRecordsFromTheSharedTaskRegister')}
      actions={
        <AppLink className={shared.link} href={projectTasksPath(project)}>
          {t('projectDetails.openTaskRegister')}
        </AppLink>
      }
    >
      <ResourceContent resource={resource}>
        {(data) => (
          <>
            <ul className={styles.taskList}>
              {data.items.map((task) => (
                <li key={task.id}>
                  <div>
                    <span className={shared.mono}>{task.id}</span>
                    <AppLink
                      className={styles.taskButton}
                      href={taskDetailsPath(task.id, projectDetailPath(project))}
                    >
                      {businessLabel(task.title, i18n.language)}
                    </AppLink>
                    <span className={shared.caption}>
                      {t('projectDetails.valueHEstimateValue', {
                        v0: task.estimateHours,
                        v1: task.dueDate
                          ? t('projectDetails.dueValue', {
                              v0: formatDueDate(task.dueDate, i18n.language),
                            })
                          : t('projectDetails.unscheduled'),
                      })}
                    </span>
                  </div>
                  <div className={styles.taskTags}>
                    <Tag size="md" intent={taskStatusIntent[task.status]}>
                      {t(`tasks.statusLabels.${taskStatusLabelNames[task.status]}`)}
                    </Tag>
                    <Tag size="md" intent={taskPriorityIntent[task.priority]} variant="outline">
                      {t(`tasks.priorityLabels.${task.priority}`)}
                    </Tag>
                  </div>
                </li>
              ))}
            </ul>
            {!data.total ? (
              <p className={shared.body}>{t('projectDetails.noTasksAreLinkedToThisProject')}</p>
            ) : null}
            <div className={shared.footer}>
              <span role="status">
                {t('projects.taskPreview', {
                  count: Math.min(data.total, 8),
                  total: data.total,
                })}
              </span>
              <AppLink className={shared.link} href={projectTasksPath(project)}>
                {t('projects.viewTasks')}
              </AppLink>
            </div>
          </>
        )}
      </ResourceContent>
    </Panel>
  );
}

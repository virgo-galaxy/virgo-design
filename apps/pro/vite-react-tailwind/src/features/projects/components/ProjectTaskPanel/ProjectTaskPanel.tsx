import { Tag } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

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

import type { useProjectResources } from '../../hooks/use-project-resources';
import { projectDetailPath, projectTasksPath } from '../../routes/navigation';

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
        <Link
          className={[
            'text-brand-link no-underline',
            'hover:underline hover:[text-underline-offset:3px] focus-visible:[outline:2px_solid_var(--vd-brand-link)]',
            'focus-visible:[outline-offset:4px] focus-visible:[border-radius:2px]',
          ].join(' ')}
          to={projectTasksPath(project)}
        >
          {t('projectDetails.openTaskRegister')}
        </Link>
      }
    >
      <ResourceContent resource={resource}>
        {(data) => (
          <>
            <ul
              className={[
                '[&_li]:flex [&_li]:items-center [&_li]:justify-between [&_li]:gap-20 [&_li]:[padding:var(--vd-spacing-16)_0]',
                '[&_li_+_li]:[border-top:1px_solid_var(--vd-border-subtle)] [&_li_>_div:first-child]:grid [&_li_>_div:first-child]:[justify-items:start]',
                '[&_li_>_div:first-child]:gap-6',
                'viewport-max-640:[padding:0_var(--vd-spacing-16)] viewport-max-640:[&_li]:flex-wrap viewport-max-640:[&_li]:gap-12',
                'm-0 [padding:0_var(--vd-spacing-20)] [list-style:none]',
              ].join(' ')}
            >
              {data.items.map((task) => (
                <li key={task.id}>
                  <div>
                    <span className="[font-family:var(--vd-font-family-mono)] [font-size:var(--vd-font-size-11)] text-text-tertiary">
                      {task.id}
                    </span>
                    <Link
                      className={[
                        'text-text-primary no-underline [--button-foreground:var(--vd-text-primary)] p-0 [height:auto] whitespace-normal text-start',
                        'text-(length:--vd-font-size-12)',
                        'hover:text-brand-link hover:underline',
                      ].join(' ')}
                      to={taskDetailsPath(task.id, projectDetailPath(project))}
                    >
                      {businessLabel(task.title, i18n.language)}
                    </Link>
                    <span className="text-text-tertiary [font-size:var(--vd-font-size-11)]">
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
                  <div className="viewport-max-640:flex-row flex flex-col [align-items:end] gap-6 [flex-shrink:0]">
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
              <p className="viewport-max-640:p-16 p-20">
                {t('projectDetails.noTasksAreLinkedToThisProject')}
              </p>
            ) : null}
            <div
              className={[
                '[border-top:1px_solid_var(--vd-border-subtle)]',
                'viewport-max-640:p-16',
                'flex items-center justify-between gap-12 flex-wrap [padding:var(--vd-spacing-16)_var(--vd-spacing-20)]',
                '[font-size:var(--vd-font-size-11)] text-text-tertiary',
              ].join(' ')}
            >
              <span role="status">
                {t('projects.taskPreview', {
                  count: Math.min(data.total, 8),
                  total: data.total,
                })}
              </span>
              <Link
                className={[
                  'text-brand-link no-underline',
                  'hover:underline hover:[text-underline-offset:3px] focus-visible:[outline:2px_solid_var(--vd-brand-link)]',
                  'focus-visible:[outline-offset:4px] focus-visible:[border-radius:2px]',
                ].join(' ')}
                to={projectTasksPath(project)}
              >
                {t('projects.viewTasks')}
              </Link>
            </div>
          </>
        )}
      </ResourceContent>
    </Panel>
  );
}

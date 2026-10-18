import { ArrowRightIcon } from '@virgo-design/icons';
import { Button, Card, Tag } from '@virgo-design/ui';
import type { Ref } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import type { TaskDto } from '@/api/tasks/types';
import { ResourceContent } from '@/components/feedback/resource-content';
import { CatalogBoundary, projectName, useTaskCatalog } from '@/features/catalog';
import { taskStatusIntent, taskStatusLabelNames, useTaskQuery } from '@/features/tasks';
import { businessLabel } from '@/lib/formatting/business-labels';
import { formatDueDate } from '@/lib/formatting/format-due-date';
import { routePath } from '@/routes';

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
    <Card
      variant="outlined"
      className={[
        'data-[size=md]:[align-content:start] data-[size=md]:[--card-padding:var(--vd-spacing-20)]',
        'data-[size=md]:[--card-title-font-size:var(--vd-font-size-14)] data-[size=md]:[--card-gap:var(--vd-spacing-20)]',
        '[container-type:inline-size] [container-name:recent-tasks] [--card-gap:var(--vd-spacing-16)]',
      ].join(' ')}
    >
      <Card.Header className="flex-wrap flex justify-between items-start gap-12 viewport-max-640:flex-wrap">
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
        <div
          className={[
            'grid [grid-template-columns:minmax(0,_1fr)_96px_80px] gap-x-12 items-center pb-8',
            '[border-bottom:var(--vd-stroke-width,_var(--vd-border-width-1))_solid_var(--vd-border-subtle)] text-text-tertiary',
            'text-(length:--vd-font-size-11)',
            'recent-tasks-max-380:[grid-template-columns:minmax(0,_1fr)_auto] recent-tasks-max-380:gap-y-4',
          ].join(' ')}
          aria-hidden="true"
        >
          <span>{t('workplace.task')}</span>
          <span>{t('workplace.status')}</span>
          <span className="recent-tasks-max-380:hidden">{t('workplace.dueDate')}</span>
        </div>
        <ul className="[list-style:none] p-0 m-0" aria-label={t('workplace.recentWorkspaceTasks')}>
          {tasks.map((task) => (
            <li
              key={task.id}
              className={[
                'grid [grid-template-columns:minmax(0,_1fr)_96px_80px] gap-x-12 items-center py-12',
                '[border-bottom:var(--vd-stroke-width,_var(--vd-border-width-1))_solid_var(--vd-border-subtle)]',
                'last:[border:0]',
                'recent-tasks-max-380:[grid-template-columns:minmax(0,_1fr)_auto] recent-tasks-max-380:gap-y-4',
              ].join(' ')}
            >
              <div
                className={[
                  '[&_strong]:overflow-hidden [&_strong]:text-ellipsis [&_span]:overflow-hidden [&_span]:text-ellipsis',
                  '[&_span]:whitespace-nowrap [&_strong]:whitespace-normal [&_strong]:[display:-webkit-box] [&_strong]:[-webkit-box-orient:vertical]',
                  '[&_strong]:[-webkit-line-clamp:2] [&_strong]:text-(length:--vd-font-size-12) [&_strong]:[font-weight:var(--vd-font-weight-500)]',
                  '[&_span]:text-(length:--vd-font-size-11) [&_span]:text-text-tertiary',
                  'recent-tasks-max-380:[grid-row:1_/_span_2]',
                  'grid gap-4 min-w-0',
                ].join(' ')}
              >
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
              <div className="recent-tasks-max-380:[grid-column:2] recent-tasks-max-380:[justify-self:end] [justify-self:start]">
                <Tag intent={taskStatusIntent[task.status]} size="md">
                  {t(`tasks.statusLabels.${taskStatusLabelNames[task.status]}`)}
                </Tag>
              </div>
              <div className="recent-tasks-max-380:[grid-column:2] recent-tasks-max-380:[justify-self:end] whitespace-nowrap text-text-tertiary [font-size:var(--vd-font-size-11)]">
                {task.dueDate ? (
                  <time dateTime={task.dueDate}>{formatDueDate(task.dueDate, i18n.language)}</time>
                ) : (
                  <span>{t('workplace.noDueDate')}</span>
                )}
              </div>
            </li>
          ))}
          {tasks.length === 0 ? (
            <li className="py-24 text-text-secondary [font-size:var(--vd-font-size-12)]">
              {t('workplace.noRecentTasks')}
            </li>
          ) : null}
        </ul>
      </Card.Body>
      <Card.Footer
        className={[
          'text-text-tertiary text-(length:--vd-font-size-11)',
          '[border-top:var(--vd-stroke-width,_var(--vd-border-width-1))_solid_var(--vd-border-subtle)] pt-12 justify-between',
          '[&_>_span]:[flex:1_1_160px] [&_>_span]:min-w-0 [&_>_button]:flex-none [&_>_button]:ms-auto',
        ].join(' ')}
      >
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

import { Pagination, Surface, Tag } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { NoResults } from '@/components/feedback/no-results';
import { RemoteState } from '@/components/feedback/remote-state';
import {
  CatalogBoundary,
  moduleName,
  Person,
  projectName,
  useTaskCatalog,
} from '@/features/catalog';
import { businessLabel } from '@/lib/formatting/business-labels';
import { formatDueDate } from '@/lib/formatting/format-due-date';
import { routePath, routeWithQuery } from '@/routes';
import { AppLink, useQueryParams } from '@/routes/navigation';

import { TaskCardFilters } from '../components/TaskCardFilters';
import { TaskViews } from '../components/TaskViews';
import { taskPageView } from '../data/queries';
import { useTaskQuery } from '../hooks/use-task-query';
import { queryFromParams } from '../model/query-params';
import {
  taskPriorityIntent,
  taskStatusIntent,
  taskStatusLabelNames,
} from '../presentation/task-presentation';
import { taskDetailsPath } from '../routes/navigation';

function TaskCardsContent() {
  const { t, i18n } = useTranslation();
  const { projects } = useTaskCatalog();
  const [params, setParams] = useQueryParams();

  const filters = queryFromParams(params);
  const requestedPage = Number(params.get('page'));
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const resource = useTaskQuery({ ...filters, pageNum: page, pageSize: 12 });
  const view = resource.data ? taskPageView(resource.data) : null;
  const returnTo = routeWithQuery(routePath('work.task-cards'), params);

  const change = (key: string, value: string | string[]) => {
    setParams(
      (current) => {
        const next = new URLSearchParams(current);
        next.delete(key);

        for (const item of Array.isArray(value) ? value : [value])
          if (item && item !== 'all') next.append(key, item);

        if (key !== 'page') next.delete('page');

        return next;
      },
      { replace: true },
    );
  };

  const reset = () => {
    setParams({}, { replace: true });
  };

  return (
    <TaskViews view="cards">
      <div className="grid [gap:20px] min-w-0" aria-busy={resource.loading}>
        <h1 className="[border:0] absolute [width:1px] [height:1px] p-0 [margin:-1px] overflow-hidden [clip:rect(0,_0,_0,_0)] whitespace-nowrap">
          {t('app.tasks')}
        </h1>
        <Surface border="default" radius={12} className="[padding:20px]">
          <TaskCardFilters
            key={filters.search}
            filters={filters}
            onChange={change}
            onReset={reset}
          />
        </Surface>
        <Surface
          border="default"
          radius={12}
          className={[
            'grid [gap:20px] [padding:20px] min-w-0 [background:var(--vd-overlay-background,_#fff)]',
            '[box-shadow:var(--vd-panel-shadow,_0_4px_18px_color-mix(in_srgb,_var(--vd-text-primary)_5%,_transparent)_)]',
            "[[data-theme='dark']_&]:bg-surface-elevated",
          ].join(' ')}
        >
          {resource.error || !view ? (
            <RemoteState loading={resource.loading} error={resource.error} retry={resource.retry} />
          ) : view.tasks.length ? (
            <>
              <div
                className={[
                  'viewport-max-2199:grid-cols-4 viewport-max-1599:grid-cols-3 viewport-max-1199:grid-cols-2 viewport-max-640:[grid-template-columns:1fr]',
                  'grid [grid-template-columns:repeat(6,_minmax(0,_1fr))] [gap:20px]',
                ].join(' ')}
              >
                {view.tasks.map((task) => (
                  <Surface
                    key={task.id}
                    border="default"
                    radius={12}
                    className={[
                      'flex flex-col [padding:20px] [gap:12px] min-w-0',
                      '[transition:transform_var(--vd-motion-state-duration,_var(--vd-duration-180))_var(--vd-motion-easing-standard,_var(--vd-easing-standard)),_box-shadow_var(--vd-motion-state-duration,_var(--vd-duration-180))_var(--vd-motion-easing-standard,_var(--vd-easing-standard))]',
                      '[&:is(:hover,_:focus-within)]:[transform:translateY(-2px)]',
                      '[&:is(:hover,_:focus-within)]:[box-shadow:var(--vd-panel-shadow,_0_6px_18px_color-mix(in_srgb,_var(--vd-text-primary)_10%,_transparent)_)]',
                      'motion-reduce:[transition:none] motion-reduce:[&:is(:hover,_:focus-within)]:[transform:none]',
                    ].join(' ')}
                  >
                    <div className="flex items-center justify-between [gap:12px]">
                      <span className="[font:11px_var(--vd-font-family-mono)] text-text-tertiary">
                        {task.id}
                      </span>
                      <Tag intent={taskStatusIntent[task.status]}>
                        {t(`tasks.statusLabels.${taskStatusLabelNames[task.status]}`)}
                      </Tag>
                    </div>
                    <AppLink
                      className="[font-size:15px] font-[600] leading-[1.6] text-text-primary no-underline hover:text-brand-primary"
                      href={taskDetailsPath(task.id, returnTo)}
                    >
                      {businessLabel(task.title, i18n.language)}
                    </AppLink>
                    <p className="m-0 [font-size:13px] leading-[1.7] text-text-secondary">
                      {businessLabel(projectName(task.project, projects), i18n.language)} ·{' '}
                      {businessLabel(
                        moduleName(task.project, task.module, projects),
                        i18n.language,
                      )}
                    </p>
                    <p className="m-0 [font-size:13px] leading-[1.7] text-text-secondary [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden [min-height:44px]">
                      {businessLabel(task.description, i18n.language) || '—'}
                    </p>
                    <div className="flex items-center justify-between [gap:12px] mt-auto [font-size:12px] text-text-secondary flex-wrap">
                      <Tag variant="outline" intent={taskPriorityIntent[task.priority]}>
                        {t(`tasks.priorityLabels.${task.priority}`)}
                      </Tag>
                      <span>
                        {t('tasks.dueDate')} ·{' '}
                        {task.dueDate
                          ? formatDueDate(task.dueDate, i18n.language)
                          : t('tasks.noDueDate')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between [gap:12px] [padding-top:12px] [border-top:1px_solid_var(--vd-border-subtle)] [font-size:12px] text-text-secondary">
                      <Person id={task.assignee} />
                      <span>{task.estimateHours} h</span>
                    </div>
                  </Surface>
                ))}
              </div>
              <Pagination
                total={resource.data!.total}
                page={view.page}
                pageSize={12}
                showTotal
                align="right"
                onChange={(next) => change('page', String(next))}
              />
            </>
          ) : (
            <NoResults title={t('tasks.noTasksMatchYourFilters')} onReset={reset} />
          )}
        </Surface>
      </div>
    </TaskViews>
  );
}

export function TaskCardsView() {
  return (
    <CatalogBoundary>
      <TaskCardsContent />
    </CatalogBoundary>
  );
}

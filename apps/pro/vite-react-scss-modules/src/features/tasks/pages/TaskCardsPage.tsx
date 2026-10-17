import { Pagination, Surface, Tag } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router';

import { NoResults } from '@/components/page/NoResults';
import { CatalogBoundary, moduleName, Person, projectName, useTaskCatalog } from '@/features/catalog';
import { businessLabel } from '@/lib/demo/labels';
import { formatDueDate } from '@/lib/formatting/format-due-date';
import { routePath, routeWithQuery } from '@/routes';
import { RemoteState } from '@/shared/async/RemoteState';

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
import styles from '../styles/TaskCards.module.scss';

function TaskCardsPageView() {
  const { t, i18n } = useTranslation();
  const { projects } = useTaskCatalog();
  const [params, setParams] = useSearchParams();

  const filters = queryFromParams(params);
  const requestedPage = Number(params.get('page'));
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const resource = useTaskQuery({ ...filters, pageNum: page, pageSize: 12 });
  const view = resource.data ? taskPageView(resource.data) : null;
  const returnTo = routeWithQuery(routePath('task-cards'), params);

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
      <div className={styles.page} aria-busy={resource.loading}>
        <h1 className={styles.srOnly}>{t('app.tasks')}</h1>
        <Surface border="default" radius={12} className={styles.filters}>
          <TaskCardFilters
            key={filters.search}
            filters={filters}
            onChange={change}
            onReset={reset}
          />
        </Surface>
        <Surface border="default" radius={12} className={styles.panel}>
          {resource.error || !view ? (
            <RemoteState loading={resource.loading} error={resource.error} retry={resource.retry} />
          ) : view.tasks.length ? (
            <>
              <div className={styles.cards}>
                {view.tasks.map((task) => (
                  <Surface key={task.id} border="default" radius={12} className={styles.card}>
                    <div className={styles.cardHeader}>
                      <span className={styles.id}>{task.id}</span>
                      <Tag intent={taskStatusIntent[task.status]}>
                        {t(`tasks.statusLabels.${taskStatusLabelNames[task.status]}`)}
                      </Tag>
                    </div>
                    <Link className={styles.title} to={taskDetailsPath(task.id, returnTo)}>
                      {businessLabel(task.title, i18n.language)}
                    </Link>
                    <p className={styles.context}>
                      {businessLabel(projectName(task.project, projects), i18n.language)} ·{' '}
                      {businessLabel(
                        moduleName(task.project, task.module, projects),
                        i18n.language,
                      )}
                    </p>
                    <p className={styles.description}>
                      {businessLabel(task.description, i18n.language) || '—'}
                    </p>
                    <div className={styles.schedule}>
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
                    <div className={styles.footer}>
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

export function TaskCardsPage() {

  return (
    <CatalogBoundary>
      <TaskCardsPageView />
    </CatalogBoundary>
  );
}

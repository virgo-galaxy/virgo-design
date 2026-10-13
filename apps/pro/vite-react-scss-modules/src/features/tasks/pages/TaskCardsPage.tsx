import { SearchIcon } from '@virgo-design/icons';
import { Button, Field, Form, Input, Pagination, Surface, Tag } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { MultiFilterSelect } from '@/components/filters/MultiFilterSelect';
import { NoResults } from '@/components/page/NoResults';
import { Person } from '@/features/catalog';
import { CatalogBoundary, moduleName, projectName, useTaskCatalog } from '@/features/catalog';
import { usePaginationLabels } from '@/i18n/use-pagination-labels';
import { businessLabel } from '@/lib/demo/labels';
import { formatDueDate } from '@/lib/format-due-date';
import { routePath, routeWithQuery } from '@/routing';
import { RemoteState } from '@/shared/async/RemoteState';

import { TaskViews } from '../components/TaskViews';
import { taskPageView } from '../data/queries';
import { useTaskQuery } from '../hooks/use-task-query';
import { useTaskSearchParams } from '../hooks/use-task-search-params';
import { queryFromParams } from '../model/query-params';
import { filterValues, taskStatuses } from '../model/task';
import { taskDetailsPath } from '../navigation';
import {
  taskPriorityIntent,
  taskStatusIntent,
  taskStatusLabelNames,
} from '../presentation/task-presentation';
import styles from './TaskCardsPage.module.scss';

function TaskCardsPageView() {
  const { t, i18n } = useTranslation();
  const { projects, metadata } = useTaskCatalog();
  const { projects: taskProjects } = metadata;
  const [params, setParams] = useTaskSearchParams();
  const [search, setSearch] = useState(params.get('search') ?? '');
  const filters = queryFromParams(params);
  const requestedPage = Number(params.get('page'));
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const resource = useTaskQuery({ ...filters, pageNum: page, pageSize: 12 });
  const labels = usePaginationLabels();
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
    setSearch('');
    setParams({}, { replace: true });
  };
  return (
    <TaskViews view="cards" overview={resource.data?.overview} loading={!resource.data}>
      <div className={styles.page} aria-busy={resource.loading}>
        <h1 className={styles.srOnly}>{t('app.tasks')}</h1>
        <Surface border="default" radius={12} className={styles.filters}>
          <Form
            className={styles.filterForm}
            onSubmit={(event) => {
              event.preventDefault();
              change('search', search.trim());
            }}
          >
            <Field>
              <Field.Label>{t('tasks.searchTasks')}</Field.Label>
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t('tasks.searchTasksIdsDescriptionsOrPeople')}
              />
            </Field>
            <MultiFilterSelect
              label={t('tasks.status')}
              value={filterValues(filters.status)}
              placeholder={t('tasks.allStatuses')}
              onChange={(value) => change('status', value)}
              options={[
                ...taskStatuses.map((status) => ({
                  value: status,
                  label: t(`tasks.statusLabels.${taskStatusLabelNames[status]}`),
                })),
              ]}
            />
            <MultiFilterSelect
              label={t('tasks.project')}
              value={filterValues(filters.project)}
              placeholder={t('tasks.allProjects')}
              onChange={(value) => change('project', value)}
              options={[
                ...taskProjects.map((project) => ({
                  value: project,
                  label: businessLabel(projectName(project, projects), i18n.language),
                })),
              ]}
            />
            <Button.Group>
              <Button type="button" variant="outline" onClick={reset}>
                {t('tasks.resetQuery')}
              </Button>
              <Button type="submit" leadingIcon={<SearchIcon />}>
                {t('tasks.applyQuery')}
              </Button>
            </Button.Group>
          </Form>
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
                labels={labels}
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

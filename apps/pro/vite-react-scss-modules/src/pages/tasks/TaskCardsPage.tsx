import { SearchIcon } from '@virgo-design/icons';
import { Button, Field, Form, Input, Pagination, Surface, Tag } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { CatalogBoundary } from '@/application/CatalogBoundary';
import { useTaskCatalog } from '@/application/pro-data-context';
import { RemoteState } from '@/application/RemoteState';
import { taskPageView } from '@/application/task-queries';
import { useTaskQuery } from '@/application/use-task-query';
import { Person } from '@/components/person/Person';
import { queryFromParams } from '@/data/data-query';
import { moduleName, projectName } from '@/data/task-catalog';
import { filterValues, taskStatuses } from '@/data/tasks';
import { formatDueDate } from '@/data/workplace';
import { businessLabel } from '@/lib/demo/labels';
import { MultiFilterSelect, NoResults } from '@/pages/shared/ProPage';
import { usePaginationLabels } from '@/pages/shared/use-pagination-labels';

import { taskDetailsPath } from './task-navigation';
import {
  getTaskPriorityLabel,
  getTaskStatusLabel,
  taskPriorityIntent,
  taskStatusIntent,
} from './task-presentation';
import styles from './TaskCardsPage.module.scss';
import { TaskViews } from './TaskViews';
import { useTaskSearchParams } from './use-task-search-params';

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
  const returnTo = `/work/task-cards${params.size ? '?' + params.toString() : ''}`;
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
                  label: getTaskStatusLabel(t, status),
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
                        {getTaskStatusLabel(t, task.status)}
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
                        {getTaskPriorityLabel(t, task.priority)}
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

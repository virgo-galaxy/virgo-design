import { DownloadIcon, PlusIcon, SettingsIcon, TrashIcon } from '@virgo-design/icons';
import { Button, Surface, Toast, Toolbar, Tooltip } from '@virgo-design/ui';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { useCurrentUser } from '@/features/auth';
import { CatalogBoundary, moduleName, projectName, useTaskCatalog } from '@/features/catalog';
import { canCreateTask, isAdmin } from '@/lib/auth/permissions';
import { businessLabel } from '@/lib/demo/labels';
import { routePath, routeWithQuery } from '@/routing';
import { MutationFeedback } from '@/shared/async/MutationFeedback';
import { RemoteState } from '@/shared/async/RemoteState';
import { useMutation } from '@/shared/async/use-mutation';

import { TableSettingsDialog } from '../components/TableSettingsDialog';
import taskActions from '../components/TaskActions.module.scss';
import { TaskDeleteDialog } from '../components/TaskDeleteDialog';
import { TaskFilters } from '../components/TaskFilters';
import { TaskTable } from '../components/TaskTable';
import { TaskViews } from '../components/TaskViews';
import {
  defaultTaskPageSize,
  normalizeTaskPins,
  taskColumnKeys,
  type TaskDataColumn,
  type TaskTableSettings,
  visibleColumns,
} from '../config/table-settings';
import { useTaskOperations } from '../data/operations';
import { getAllTasks, taskPageView } from '../data/queries';
import { useTaskTableSettings } from '../hooks/use-table-settings';
import { useTaskQuery } from '../hooks/use-task-query';
import { useTaskSearchParams } from '../hooks/use-task-search-params';
import { createTasksCsv } from '../model/export';
import { emptyTaskQuery, queryFromParams, queryParams } from '../model/query-params';
import { type TaskSort } from '../model/sort';
import { filterValues, hasTaskFilters, type Task } from '../model/task';
import { taskCreatePath, taskDetailsPath, taskEditPath } from '../navigation';
import { taskStatusLabelNames } from '../presentation/task-presentation';
import styles from './TasksPage.module.scss';

function readTaskListJson<T>(
  value: string | null,
  fallback: T,
  validate: (value: Record<string, unknown>) => boolean,
): T {
  try {
    const parsed: unknown = value ? JSON.parse(value) : null;
    return parsed &&
      typeof parsed === 'object' &&
      !Array.isArray(parsed) &&
      validate(parsed as Record<string, unknown>)
      ? (parsed as T)
      : fallback;
  } catch {
    return fallback;
  }
}
function TasksPageView() {
  const { projects, metadata } = useTaskCatalog();
  const { members: taskAssignees } = metadata;
  const { removeTasks } = useTaskOperations();

  const { t, i18n } = useTranslation();
  const mutation = useMutation();
  const navigate = useNavigate();
  const [params, setParams] = useTaskSearchParams();
  const linkedTask = params.get('task');
  const filters = queryFromParams(params);
  const currentParams = useRef(params);
  currentParams.current = params;
  const updateParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(currentParams.current);
    if (value) next.set(key, value);
    else next.delete(key);
    currentParams.current = next;
    setParams(next, { replace: true });
  };
  const [selection, setSelection] = useState<string[]>([]);
  const requestedPage = Number(params.get('page'));
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const setPage = (value: number) => updateParam('page', value === 1 ? null : String(value));
  const pageSize = [10, 20, 50, 100].includes(Number(params.get('pageSize')))
    ? Number(params.get('pageSize'))
    : defaultTaskPageSize;
  const setPageSize = (value: number) => updateParam('pageSize', String(value));
  const {
    settings: tableSettings,
    setSettings: setTableSettings,
    storageAvailable,
  } = useTaskTableSettings(isAdmin(useCurrentUser()));
  const user = useCurrentUser();
  const canManage = canCreateTask(user);
  const admin = isAdmin(user);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLButtonElement>(null);
  const columnFilters = readTaskListJson<Partial<Record<TaskDataColumn, string[]>>>(
    params.get('columnFilters'),
    {},
    (value) =>
      Object.entries(value).every(
        ([key, items]) =>
          taskColumnKeys.includes(key as TaskDataColumn) &&
          !['selection', 'rowNumber', 'actions'].includes(key) &&
          Array.isArray(items) &&
          items.every((item) => typeof item === 'string'),
      ),
  );
  const columnSearch = readTaskListJson<Partial<Record<TaskDataColumn, string>>>(
    params.get('columnSearch'),
    {},
    (value) =>
      Object.entries(value).every(
        ([key, item]) =>
          taskColumnKeys.includes(key as TaskDataColumn) &&
          !['selection', 'rowNumber', 'actions'].includes(key) &&
          typeof item === 'string',
      ),
  );
  const sort = readTaskListJson<TaskSort | null>(
    params.get('sort'),
    null,
    (value) =>
      taskColumnKeys.includes(value.column as TaskDataColumn) &&
      !['selection', 'rowNumber', 'actions'].includes(String(value.column)) &&
      ['none', 'ascending', 'descending'].includes(String(value.direction)),
  );
  const setColumnFilters = (
    change:
      | Partial<Record<TaskDataColumn, string[]>>
      | ((
          current: Partial<Record<TaskDataColumn, string[]>>,
        ) => Partial<Record<TaskDataColumn, string[]>>),
  ) =>
    updateParam(
      'columnFilters',
      JSON.stringify(typeof change === 'function' ? change(columnFilters) : change),
    );
  const setColumnSearch = (
    change:
      | Partial<Record<TaskDataColumn, string>>
      | ((
          current: Partial<Record<TaskDataColumn, string>>,
        ) => Partial<Record<TaskDataColumn, string>>),
  ) =>
    updateParam(
      'columnSearch',
      JSON.stringify(typeof change === 'function' ? change(columnSearch) : change),
    );
  const setSort = (value: TaskSort | null) =>
    updateParam('sort', value ? JSON.stringify(value) : null);
  const returnTo = routeWithQuery(routePath('tasks'), params);
  const [deleteIds, setDeleteIds] = useState<readonly string[] | null>(null);
  const [deletionFeedback, setDeletionFeedback] = useState<{ id: number; count: number } | null>(
    null,
  );
  const exportRef = useRef<HTMLButtonElement>(null);
  const feedbackId = useRef(0);
  useEffect(() => {
    if (params.get('view') === 'cards') {
      const next = new URLSearchParams(params);
      next.delete('view');
      navigate(routeWithQuery(routePath('task-cards'), next), { replace: true });
    }
  }, [params, navigate]);
  useEffect(() => {
    if (linkedTask) {
      const next = new URLSearchParams(params);
      next.delete('task');
      navigate(taskDetailsPath(linkedTask, routeWithQuery(routePath('tasks'), next)), {
        replace: true,
      });
    }
  }, [linkedTask, params, navigate]);
  const query = {
    ...filters,
    pageNum: page,
    pageSize: tableSettings.pagination ? pageSize : 100,
    ...(Object.values(columnFilters).some((values) => values.length)
      ? { columnFilters: JSON.stringify(columnFilters) }
      : {}),
    ...(Object.values(columnSearch).some((value) => value.trim())
      ? { columnSearch: JSON.stringify(columnSearch) }
      : {}),
    ...(sort && sort.direction !== 'none'
      ? { sortBy: sort.column, sortDirection: sort.direction }
      : {}),
  };
  const resource = useTaskQuery(query, !tableSettings.pagination);
  const visibleTasks = resource.data?.items ?? [];
  const pageView = resource.data
    ? taskPageView(resource.data)
    : { tasks: [], page: 1, range: [0, 0] as [number, number] };
  const matchingTotal = resource.data?.total ?? 0;
  const changeFilters = (next: typeof filters) => {
    const result = new URLSearchParams(currentParams.current);
    for (const key of Object.keys(emptyTaskQuery)) result.delete(key);
    for (const [key, value] of queryParams(next)) result.append(key, value);
    result.delete('page');
    currentParams.current = result;
    setParams(result, { replace: true });
    setSelection([]);
  };
  const filtered =
    Object.values(columnFilters).some((values) => values.length) ||
    Object.values(columnSearch).some((value) => value.trim()) ||
    hasTaskFilters(filters) ||
    Boolean(
      filters.createdFrom ||
      filters.createdTo ||
      filters.minimumHours ||
      filterValues(filters.due).length,
    );
  const changeTableSettings = (value: TaskTableSettings) => {
    const next = normalizeTaskPins(value);
    const sortColumn = next.columns.find((column) => column.key === sort?.column);
    if (
      sort &&
      (!sortColumn?.visible ||
        !sortColumn.controls.sort.enabled ||
        (sortColumn.controls.sort.mode !== 'both' &&
          sortColumn.controls.sort.mode !== sort.direction))
    )
      setSort(null);
    if (!next.selection) setSelection([]);
    setColumnFilters((current) =>
      Object.fromEntries(
        Object.entries(current).filter(([key]) =>
          next.columns.some(
            (column) => column.key === key && column.visible && column.controls.filter,
          ),
        ),
      ),
    );
    setColumnSearch((current) =>
      Object.fromEntries(
        Object.entries(current).filter(([key]) =>
          next.columns.some(
            (column) => column.key === key && column.visible && column.controls.search,
          ),
        ),
      ),
    );
    if (next.pagination !== tableSettings.pagination) setPage(1);
    setTableSettings(next);
  };
  const resetFilters = () => {
    setColumnFilters({});
    setColumnSearch({});
    changeFilters(emptyTaskQuery);
  };
  const tableWidth = visibleColumns(tableSettings).reduce(
    (total, column) => total + column.width,
    0,
  );
  const openCreate = () => navigate(taskCreatePath(returnTo));
  const openTask = (task: Task, _button: HTMLButtonElement, kind: 'edit' | 'details' = 'details') =>
    navigate(
      kind === 'edit' ? taskEditPath(task.id, returnTo) : taskDetailsPath(task.id, returnTo),
    );

  return (
    <Toast.Provider>
      <TaskViews view="table" overview={resource.data?.overview} loading={!resource.data}>
        <div className={styles.tasksPage}>
          <h1 className={styles.srOnly}>{t('app.tasks')}</h1>

          <Surface border="default" radius={12}>
            <TaskFilters
              key={queryParams(filters).toString()}
              filters={filters}
              onApply={changeFilters}
              onReset={resetFilters}
            />
          </Surface>
          <Surface
            border="default"
            radius={12}
            className={styles.listPanel}
            data-table-size={tableSettings.size}
            data-width-mode={tableSettings.widthMode}
            style={
              tableSettings.widthMode === 'content'
                ? {
                    width: `min(100%, calc(${tableWidth}px + 2 * var(--vd-spacing-20) + 2 * var(--vd-border-width-1)))`,
                  }
                : undefined
            }
            aria-busy={resource.loading}
          >
            <MutationFeedback pending={mutation.pending} error={mutation.error} />
            <Toolbar layout="custom" aria-label={t('tasks.toolbar')} className={styles.listActions}>
              {canManage ? (
                <Button size={tableSettings.size} leadingIcon={<PlusIcon />} onClick={openCreate}>
                  {t('tasks.newTask2')}
                </Button>
              ) : (
                <span className={styles.roleTitle}>{t('tasks.workspace.myTasks')}</span>
              )}
              <div className={styles.viewControls}>
                <Button.Group layout="custom" className={styles.bulkActions}>
                  {canManage ? (
                    <Button
                      size={tableSettings.size}
                      className={taskActions.deleteButton}
                      leadingIcon={<TrashIcon />}
                      disabled={selection.length === 0 || mutation.pending}
                      onClick={() => setDeleteIds([...selection])}
                    >
                      {t('tasks.deleteSelected')}
                    </Button>
                  ) : null}
                  <Button
                    ref={exportRef}
                    size={tableSettings.size}
                    variant="outline"
                    leadingIcon={<DownloadIcon />}
                    disabled={visibleTasks.length === 0}
                    onClick={() => {
                      void mutation.run(async () => {
                        const matching = await getAllTasks(query);
                        const rows = selection.length
                          ? matching.filter((task) => selection.includes(task.id))
                          : matching;
                        const url = URL.createObjectURL(
                          new Blob(
                            [
                              createTasksCsv(rows, taskAssignees, {
                                status: (code) =>
                                  t(`tasks.statusLabels.${taskStatusLabelNames[code]}`),
                                priority: (code) => t(`tasks.priorityLabels.${code}`),
                                text: (value: string) => businessLabel(value, i18n.language),
                                project: (id: string) =>
                                  businessLabel(projectName(id, projects), i18n.language),
                                module: (projectId: string, id: string) =>
                                  businessLabel(moduleName(projectId, id, projects), i18n.language),
                              }),
                            ],
                            {
                              type: 'text/csv;charset=utf-8',
                            },
                          ),
                        );
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'virgo-tasks.csv';
                        document.body.append(link);
                        link.click();
                        link.remove();
                        setTimeout(() => URL.revokeObjectURL(url), 0);
                      });
                    }}
                  >
                    {t('tasks.export')}
                  </Button>
                  {admin ? (
                    <Tooltip>
                      <Tooltip.Trigger
                        ref={settingsRef}
                        onClick={() => setSettingsOpen(true)}
                        aria-label={t('tasks.tableSettings')}
                        render={(props) => (
                          <Button
                            {...props}
                            iconOnly
                            size={tableSettings.size}
                            variant="outline"
                            aria-label={t('tasks.tableSettings')}
                          >
                            <SettingsIcon />
                          </Button>
                        )}
                      />
                      <Tooltip.Content placement="top">{t('tasks.tableSettings')}</Tooltip.Content>
                    </Tooltip>
                  ) : null}
                </Button.Group>
              </div>
            </Toolbar>
            {resource.error || !resource.data ? (
              <RemoteState
                loading={resource.loading}
                error={resource.error}
                retry={resource.retry}
              />
            ) : (
              <TaskTable
                settings={tableSettings}
                onSettingsChange={changeTableSettings}
                columnFilters={columnFilters}
                onColumnFilterChange={(key, values) => {
                  setColumnFilters((current) => ({ ...current, [key]: values }));
                  setPage(1);
                  setSelection([]);
                }}
                columnSearch={columnSearch}
                onColumnSearchChange={(key, value) => {
                  setColumnSearch((current) => ({ ...current, [key]: value }));
                  setPage(1);
                  setSelection([]);
                }}
                selection={selection}
                onSelectionChange={setSelection}
                assigneeFilter={filterValues(filters.assignee)}
                onAssigneeFilterChange={(assignee) => changeFilters({ ...filters, assignee })}
                sort={sort}
                onSortChange={(next) => {
                  setSort(next.direction === 'none' ? null : next);
                  setPage(1);
                }}
                tasks={pageView.tasks}
                matchingTotal={matchingTotal}
                page={pageView.page}
                pageSize={resource.data?.pageSize ?? pageSize}
                onPageChange={(nextPage, nextPageSize) => {
                  setPage(nextPage);
                  setPageSize(nextPageSize);
                }}
                filtered={filtered}
                onOpen={openTask}
                onEdit={(task, button) => openTask(task, button, 'edit')}
                onReset={resetFilters}
                onCreate={openCreate}
              />
            )}
          </Surface>
        </div>
      </TaskViews>
      {admin && settingsOpen ? (
        <TableSettingsDialog
          settings={tableSettings}
          previewTasks={visibleTasks}
          onChange={changeTableSettings}
          storageAvailable={storageAvailable}
          onClose={() => setSettingsOpen(false)}
          restoreFocus={() => settingsRef.current?.focus()}
        />
      ) : null}
      {deleteIds ? (
        <TaskDeleteDialog
          ids={deleteIds}
          onClose={() => setDeleteIds(null)}
          restoreFocus={() => exportRef.current?.focus()}
          onDelete={async (ids) => {
            const deletedIds = await removeTasks(ids);
            setSelection((current) => current.filter((id) => !deletedIds.includes(id)));
            setDeletionFeedback({ id: ++feedbackId.current, count: deletedIds.length });
          }}
        />
      ) : null}
      {deletionFeedback ? (
        <Toast.Root
          key={deletionFeedback.id}
          appearance="compact"
          intent="success"
          duration={6000}
          onOpenChange={(open) => {
            if (!open)
              setDeletionFeedback((current) =>
                current?.id === deletionFeedback.id ? null : current,
              );
          }}
        >
          <Toast.Title>{t('tasks.tasksDeleted', { count: deletionFeedback.count })}</Toast.Title>
        </Toast.Root>
      ) : null}
      <Toast.Viewport placement="top-center" aria-label={t('tasks.taskFeedback')} />
    </Toast.Provider>
  );
}

export function TasksPage() {
  return (
    <CatalogBoundary>
      <TasksPageView />
    </CatalogBoundary>
  );
}

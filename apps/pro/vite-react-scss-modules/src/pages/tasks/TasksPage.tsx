import { DownloadIcon, PlusIcon, SettingsIcon, TrashIcon } from '@virgo-design/icons';
import { Button, Surface, Toast, Toolbar, Tooltip } from '@virgo-design/ui';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { CatalogBoundary } from '@/application/CatalogBoundary';
import { MutationFeedback } from '@/application/MutationFeedback';
import { useTaskOperations } from '@/application/pro-data-context';
import { useTaskCatalog } from '@/application/pro-data-context';
import { RemoteState } from '@/application/RemoteState';
import { useCurrentUser } from '@/application/session-context';
import { getAllTasks, taskPageView } from '@/application/task-queries';
import { useMutation } from '@/application/use-mutation';
import { useTaskQuery } from '@/application/use-task-query';
import { emptyDataQuery, queryFromParams, queryParams } from '@/data/data-query';
import { moduleName, projectName } from '@/data/task-catalog';
import { filterValues, hasTaskFilters, type Task } from '@/data/tasks';
import { createTasksCsv } from '@/data/tasks.export';
import { type TaskSort } from '@/data/tasks.sort';
import { canCreateTask, isAdmin } from '@/lib/auth/permissions';
import { businessLabel } from '@/lib/demo/labels';
import { getTaskExportLabels } from '@/pages/tasks/task-presentation';

import {
  defaultTaskPageSize,
  normalizeTaskPins,
  taskColumnKeys,
  type TaskDataColumn,
  type TaskTableSettings,
  visibleColumns,
} from './table-settings';
import { TableSettingsDialog } from './TableSettingsDialog';
import { taskDetailsPath } from './task-navigation';
import { TaskDeleteDialog } from './TaskDeleteDialog';
import { TaskFilters } from './TaskFilters';
import styles from './TasksPage.module.scss';
import { TaskTable } from './TaskTable';
import { TaskViews } from './TaskViews';
import pageStyles from './TaskWorkspace.module.scss';
import { useTaskTableSettings } from './use-table-settings';
import { useTaskSearchParams } from './use-task-search-params';

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
  const returnTo = `/work/tasks${params.toString() ? '?' + params.toString() : ''}`;
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
      navigate(`/work/task-cards${next.size ? '?' + next.toString() : ''}`, { replace: true });
    }
  }, [params, navigate]);
  useEffect(() => {
    if (linkedTask) {
      const next = new URLSearchParams(params);
      next.delete('task');
      navigate(
        taskDetailsPath(linkedTask, `/work/tasks${next.size ? '?' + next.toString() : ''}`),
        { replace: true },
      );
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
    for (const key of Object.keys(emptyDataQuery)) result.delete(key);
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
    changeFilters(emptyDataQuery);
  };
  const tableWidth = visibleColumns(tableSettings).reduce(
    (total, column) => total + column.width,
    0,
  );
  const openCreate = () => navigate(`/work/tasks/new?returnTo=${encodeURIComponent(returnTo)}`);
  const openTask = (task: Task, _button: HTMLButtonElement, kind: 'edit' | 'details' = 'details') =>
    navigate(
      kind === 'edit'
        ? `/work/tasks/${encodeURIComponent(task.id)}/edit?returnTo=${encodeURIComponent(returnTo)}`
        : taskDetailsPath(task.id, returnTo),
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
                <span className={pageStyles.roleTitle}>{t('tasks.workspace.myTasks')}</span>
              )}
              <div className={pageStyles.viewControls}>
                <Button.Group layout="custom" className={styles.bulkActions}>
                  {canManage ? (
                    <Button
                      size={tableSettings.size}
                      className={styles.deleteButton}
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
                                ...getTaskExportLabels(t),
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
                selectedId={undefined}
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

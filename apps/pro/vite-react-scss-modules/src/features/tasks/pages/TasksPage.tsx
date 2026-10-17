import { DownloadIcon, PlusIcon, SettingsIcon, TrashIcon } from '@virgo-design/icons';
import { Button, Surface, Toast, Toolbar, Tooltip } from '@virgo-design/ui';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { useCurrentUser } from '@/features/auth';
import { CatalogBoundary, moduleName, projectName, useTaskCatalog } from '@/features/catalog';
import { canCreateTask, isAdmin } from '@/lib/auth/permissions';
import { downloadCsv } from '@/lib/browser/download';
import { businessLabel } from '@/lib/demo/labels';
import { routePath, routeWithQuery } from '@/routes';
import { MutationFeedback } from '@/shared/async/MutationFeedback';
import { RemoteState } from '@/shared/async/RemoteState';
import { useMutation } from '@/shared/async/use-mutation';

import { TableSettingsDialog } from '../components/TableSettingsDialog/TableSettingsDialog';
import { TaskDeleteDialog } from '../components/TaskDeleteDialog';
import { TaskFilters } from '../components/TaskFilters/TaskFilters';
import { TaskTable } from '../components/TaskTable/TaskTable';
import { TaskViews } from '../components/TaskViews';
import {
  normalizeTaskPins,
  type TaskTableSettings,
  visibleColumns,
} from '../config/table-settings';
import { useTaskOperations } from '../data/operations';
import { getAllTasks, taskPageView } from '../data/queries';
import { useTaskTableSettings } from '../hooks/use-table-settings';
import { useTaskQuery } from '../hooks/use-task-query';
import { useTaskTableQuery } from '../hooks/use-task-table-query';
import { createTasksCsv } from '../model/export';
import { queryParams, type TaskQuery } from '../model/query-params';
import { filterValues, type Task } from '../model/task';
import { taskStatusLabelNames } from '../presentation/task-presentation';
import { taskCreatePath, taskDetailsPath, taskEditPath } from '../routes/navigation';
import taskActions from '../styles/TaskActions.module.scss';
import styles from './TasksPage.module.scss';

function TasksPageView() {
  const { projects, metadata } = useTaskCatalog();
  const { members: taskAssignees } = metadata;
  const { removeTasks } = useTaskOperations();

  const { t, i18n } = useTranslation();
  const mutation = useMutation();
  const navigate = useNavigate();
  const user = useCurrentUser();
  const {
    settings: tableSettings,
    setSettings: setTableSettings,
    storageAvailable,
  } = useTaskTableSettings(isAdmin(user));
  const canManage = canCreateTask(user);
  const admin = isAdmin(user);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLButtonElement>(null);
  const tableQuery = useTaskTableQuery(tableSettings);
  const { params, filters, columnFilters, columnSearch, sort, pageSize, query, filtered } =
    tableQuery;
  // Selection spans pages of one matching set, never a different set restored through browser history.
  const selectionKey = JSON.stringify([filters, columnFilters, columnSearch]);
  const [selected, setSelected] = useState({ key: selectionKey, ids: [] as string[] });
  const selection = selected.key === selectionKey ? selected.ids : [];
  const setSelection = (change: string[] | ((current: string[]) => string[])) =>
    setSelected((previous) => ({
      key: selectionKey,
      ids:
        typeof change === 'function'
          ? change(previous.key === selectionKey ? previous.ids : [])
          : change,
    }));
  const linkedTask = params.get('task');
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
  const resource = useTaskQuery(query, tableSettings.pagination ? 'page' : 'collection');
  const visibleTasks = resource.data?.items ?? [];
  const pageView = resource.data
    ? taskPageView(resource.data)
    : { tasks: [], page: 1, range: [0, 0] as [number, number] };
  const matchingTotal = resource.data?.total ?? 0;
  const changeFilters = (next: TaskQuery) => {
    tableQuery.changeFilters(next);
    setSelection([]);
  };
  const changeTableSettings = (value: TaskTableSettings) => {
    const next = normalizeTaskPins(value);
    tableQuery.reconcileSettings(next);
    if (!next.selection) setSelection([]);
    setTableSettings(next);
  };
  const resetFilters = () => {
    tableQuery.resetFilters();
    setSelection([]);
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
      <TaskViews view="table">
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
                      disabled={selection.length === 0 || resource.loading || mutation.pending}
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
                        downloadCsv(
                          createTasksCsv(rows, taskAssignees, {
                            status: (code) => t(`tasks.statusLabels.${taskStatusLabelNames[code]}`),
                            priority: (code) => t(`tasks.priorityLabels.${code}`),
                            text: (value: string) => businessLabel(value, i18n.language),
                            project: (id: string) =>
                              businessLabel(projectName(id, projects), i18n.language),
                            module: (projectId: string, id: string) =>
                              businessLabel(moduleName(projectId, id, projects), i18n.language),
                          }),
                          'virgo-tasks.csv',
                        );
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
                  tableQuery.changeColumnFilter(key, values);
                  setSelection([]);
                }}
                columnSearch={columnSearch}
                onColumnSearchChange={(key, value) => {
                  tableQuery.changeColumnSearch(key, value);
                  setSelection([]);
                }}
                selection={selection}
                selectionDisabled={resource.loading}
                onSelectionChange={setSelection}
                assigneeFilter={filterValues(filters.assignee)}
                onAssigneeFilterChange={(assignee) => changeFilters({ ...filters, assignee })}
                sort={sort}
                onSortChange={tableQuery.changeSort}
                tasks={pageView.tasks}
                matchingTotal={matchingTotal}
                page={pageView.page}
                pageSize={resource.data?.pageSize ?? pageSize}
                onPageChange={tableQuery.changePage}
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

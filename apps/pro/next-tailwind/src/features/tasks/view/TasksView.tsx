import { DownloadIcon, PlusIcon, SettingsIcon, TrashIcon } from '@virgo-design/icons';
import { Button, Surface, Toast, Toolbar, Tooltip } from '@virgo-design/ui';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MutationFeedback } from '@/components/feedback/mutation-feedback';
import { RemoteState } from '@/components/feedback/remote-state';
import { useCurrentUser } from '@/features/auth';
import { CatalogBoundary, moduleName, projectName, useTaskCatalog } from '@/features/catalog';
import { useMutation } from '@/hooks/async/use-mutation';
import { canCreateTask, isAdmin } from '@/lib/auth/permissions';
import { downloadCsv } from '@/lib/browser/download';
import { businessLabel } from '@/lib/formatting/business-labels';
import { routePath, routeWithQuery } from '@/routes';
import { useAppNavigation } from '@/routes/navigation';

import { TableSettingsDialog } from '../components/TableSettingsDialog/TableSettingsDialog';
import { TaskDeleteDialog } from '../components/TaskDeleteDialog';
import { TaskFilters } from '../components/TaskFilters/TaskFilters';
import { TaskTable } from '../components/TaskTable/TaskTable';
import { TaskViews } from '../components/TaskViews';
import { getAllTasks, taskPageView } from '../data/queries';
import { useTaskOperations } from '../hooks/use-task-operations';
import { useTaskQuery } from '../hooks/use-task-query';
import { useTaskTableQuery } from '../hooks/use-task-table-query';
import { createTasksCsv } from '../model/export';
import { queryParams, type TaskQuery } from '../model/query-params';
import { normalizeTaskPins, type TaskTableSettings, visibleColumns } from '../model/table-settings';
import { filterValues, type Task } from '../model/task';
import { taskStatusLabelNames } from '../presentation/task-presentation';
import { taskCreatePath, taskDetailsPath, taskEditPath } from '../routes/navigation';
import { useTaskTableSettings } from '../store';

function TasksContent() {
  const { projects, metadata } = useTaskCatalog();
  const { members: taskAssignees } = metadata;
  const { removeTasks } = useTaskOperations();

  const { t, i18n } = useTranslation();
  const mutation = useMutation();
  const navigate = useAppNavigation();
  const user = useCurrentUser();
  const {
    settings: tableSettings,
    setSettings: setTableSettings,
    storageAvailable,
  } = useTaskTableSettings();

  const canManage = canCreateTask(user);
  const admin = isAdmin(user);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLButtonElement>(null);

  const tableQuery = useTaskTableQuery(tableSettings);
  const { params, filters, columnFilters, columnSearch, sort, pageSize, query, filtered } =
    tableQuery;

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

  const returnTo = routeWithQuery(routePath('work.tasks'), params);
  const [deleteIds, setDeleteIds] = useState<readonly string[] | null>(null);
  const [deletionFeedback, setDeletionFeedback] = useState<{ id: number; count: number } | null>(
    null,
  );
  const exportRef = useRef<HTMLButtonElement>(null);
  const feedbackId = useRef(0);

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
        <div className="grid gap-20">
          <h1 className="absolute [width:1px] [height:1px] p-0 [margin:-1px] overflow-hidden [clip-path:inset(50%)] whitespace-nowrap">
            {t('app.tasks')}
          </h1>

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
            className={[
              'pro-tasks-view-list-panel [--task-panel-background:var(--vd-overlay-background,_#fff)] [justify-self:start] w-full min-w-0',
              'overflow-visible [background:var(--task-panel-background)]',
              '[box-shadow:var(--vd-panel-shadow,_0_4px_18px_color-mix(in_srgb,_var(--vd-text-primary)_5%,_transparent)_)]',
              '[&_[data-pro-task-table]]:[--table-body-background:var(--vd-table-body-background,_var(--task-panel-background))]',
              '[&_[data-pro-task-table]]:[--table-row-hover-background:var(--vd-table-hover-background,_color-mix(in_srgb,_var(--vd-brand-primary)_3%,_var(--table-body-background))_)]',
              "[&_[data-pro-task-table][data-hoverable='true']_tbody_>_tr[data-task-id]]:[transition:box-shadow_var(--vd-motion-state-duration,_var(--vd-duration-180))_var(--vd-motion-easing-standard,_var(--vd-easing-standard))]",
              "[&_[data-pro-task-table][data-hoverable='true']_tbody_>_tr[data-task-id]:is(:hover,_:focus-within)]:[box-shadow:var(--vd-panel-shadow,_0_3px_10px_color-mix(in_srgb,_var(--vd-text-primary)_9%,_transparent)_)]",
              "[[data-theme='dark']_&]:[--task-panel-background:var(--vd-surface-elevated)]",
              "motion-reduce:[&_[data-pro-task-table][data-hoverable='true']_tbody_>_tr[data-task-id]]:[transition:none]",
              '[&_[data-pro-task-table]]:min-w-0',
              'data-[table-size=mini]:[--task-table-font-size:var(--vd-font-size-11)]',
              'data-[table-size=small]:[--task-table-font-size:var(--vd-font-size-12)]',
              'data-[table-size=medium]:[--task-table-font-size:var(--vd-font-size-12)]',
              'data-[table-size=large]:[--task-table-font-size:var(--vd-font-size-14)]',
              '[&_[data-pro-task-table]]:[font-size:var(--task-table-font-size)] [&_[data-pro-task-title]]:[font-size:var(--task-table-font-size)]',
              "[&[data-table-size='mini']_[data-pro-task-footer]]:py-8 [&[data-table-size='small']_[data-pro-task-footer]]:py-12",
              "[&[data-table-size='large']_[data-pro-task-footer]]:py-20",
            ].join(' ')}
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
            <Toolbar
              layout="custom"
              aria-label={t('tasks.toolbar')}
              className={[
                'flex flex-wrap items-center justify-between gap-16 [padding:var(--vd-spacing-16)_var(--vd-spacing-20)]',
                'viewport-max-640:p-16',
                "[.pro-tasks-view-list-panel[data-table-size='mini']_&]:py-8 [.pro-tasks-view-list-panel[data-table-size='small']_&]:py-12",
                "[.pro-tasks-view-list-panel[data-table-size='large']_&]:py-20",
              ].join(' ')}
            >
              {canManage ? (
                <Button size={tableSettings.size} leadingIcon={<PlusIcon />} onClick={openCreate}>
                  {t('tasks.newTask2')}
                </Button>
              ) : (
                <span className="[font-size:14px] [font-weight:600]">
                  {t('tasks.workspace.myTasks')}
                </span>
              )}
              <div className="viewport-max-600:flex-wrap flex [gap:12px] items-center">
                <Button.Group
                  layout="custom"
                  className="flex flex-wrap items-center justify-end gap-12 ms-auto"
                >
                  {canManage ? (
                    <Button
                      size={tableSettings.size}
                      className={[
                        'data-[variant=primary]:[--button-background:var(--vd-status-danger-solid)]',
                        'data-[variant=primary]:[--button-background-hover:color-mix(in_srgb,_var(--vd-status-danger-solid)_90%,_black)]',
                        'data-[variant=primary]:[--button-background-active:color-mix(in_srgb,_var(--vd-status-danger-solid)_80%,_black)]',
                        'data-[variant=primary]:[--button-foreground:var(--vd-status-danger-on-solid)]',
                      ].join(' ')}
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

export function TasksView() {
  return (
    <CatalogBoundary>
      <TasksContent />
    </CatalogBoundary>
  );
}

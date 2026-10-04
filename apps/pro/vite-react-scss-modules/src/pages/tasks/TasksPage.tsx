import { DownloadIcon, PlusIcon, TrashIcon } from '@virgo-design/icons';
import { Button, Surface, Toast } from '@virgo-design/ui';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';

import { getTask } from '@/api/tasks';
import { MutationFeedback } from '@/application/MutationFeedback';
import { useProData } from '@/application/pro-data-context';
import { RemoteState } from '@/application/RemoteState';
import { getAllTasks, taskPageView } from '@/application/task-queries';
import { useMutation } from '@/application/use-mutation';
import { useTaskQuery } from '@/application/use-task-query';
import calendarClockArtwork from '@/assets/illustrations/calendar-clock.svg';
import documentStackArtwork from '@/assets/illustrations/document-stack.svg';
import playCircleArtwork from '@/assets/illustrations/play-circle.svg';
import shieldCheckArtwork from '@/assets/illustrations/shield-check.svg';
import { emptyDataQuery, matchesDataQuery, queryFromParams, queryParams } from '@/data/data-query';
import {
  filterValues,
  hasTaskFilters,
  type Task,
  type TaskDispatch,
  type TaskDraft,
  type TaskState,
} from '@/data/tasks';
import { createTasksCsv } from '@/data/tasks.export';
import { type TaskSort } from '@/data/tasks.sort';
import { WorkOverview } from '@/pages/shared/WorkOverview';
import { getTaskExportLabels, getTaskStatusLabel } from '@/pages/tasks/task-presentation';

import { TaskDeleteDialog } from './TaskDeleteDialog';
import { TaskDetailsDialog } from './TaskDetailsDialog';
import { TaskDialog } from './TaskDialog';
import { TaskFilters } from './TaskFilters';
import styles from './TasksPage.module.scss';
import { TaskTable } from './TaskTable';

type Editor = { kind: 'create' } | { kind: 'edit' | 'details'; id: string };
interface Feedback {
  id: number;
  kind: 'created' | 'updated' | 'moved';
  draft: Task;
  hidden: boolean;
}

export function TasksPage({ state, dispatch }: { state: TaskState; dispatch: TaskDispatch }) {
  const { taskAssignees, taskReferenceDate, removeTasks } = useProData();

  const { t } = useTranslation();
  const mutation = useMutation();
  const [detail, setDetail] = useState<Task | undefined>();
  const [params] = useSearchParams();
  const [filters, setFilters] = useState(() => queryFromParams(params));
  const [selection, setSelection] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState<TaskSort | null>(null);
  const [editor, setEditor] = useState<Editor | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [deleteIds, setDeleteIds] = useState<readonly string[] | null>(null);
  const [deletionFeedback, setDeletionFeedback] = useState<{ id: number; count: number } | null>(
    null,
  );
  const exportRef = useRef<HTMLButtonElement>(null);
  const feedbackId = useRef(0);
  const newTaskRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const matches = (task: Task) => matchesDataQuery(task, filters, taskAssignees, taskReferenceDate);
  const tasks = state.tasks;
  const query = {
    ...filters,
    page,
    pageSize,
    ...(sort && sort.direction !== 'none'
      ? { sortBy: sort.column, sortDirection: sort.direction }
      : {}),
  };
  const resource = useTaskQuery(query);
  const visibleTasks = resource.data?.items ?? [];
  const overview = resource.data?.overview ?? { total: 0, inProgress: 0, dueSoon: 0, completed: 0 };
  const pageView = resource.data
    ? taskPageView(resource.data)
    : { tasks: [], page: 1, range: [0, 0] as [number, number] };
  const matchingTotal = resource.data?.total ?? 0;
  const changeFilters = (next: typeof filters) => {
    setFilters(next);
    setPage(1);
    setSelection([]);
  };
  const selectedTask =
    editor && editor.kind !== 'create'
      ? detail?.id === editor.id
        ? detail
        : tasks.find((task) => task.id === editor.id)
      : undefined;
  const filtered =
    hasTaskFilters(filters) ||
    Boolean(
      filters.createdFrom ||
      filters.createdTo ||
      filters.minimumHours ||
      filterValues(filters.due).length,
    );
  const notify = (kind: Feedback['kind'], draft: Task) => {
    const hidden = !matches(draft);
    setFeedback({
      id: ++feedbackId.current,
      kind,
      draft,
      hidden,
    });
  };
  const openCreate = () => {
    opener.current = newTaskRef.current;
    setEditor({ kind: 'create' });
  };
  const openTask = (
    task: Task,
    button: HTMLButtonElement,
    kind: 'edit' | 'details' = 'details',
  ) => {
    opener.current = button;
    void mutation.run(async () => {
      const loaded = await getTask(task.id);
      setDetail(loaded);
      setEditor({ kind, id: task.id });
    });
  };
  const save = async (draft: TaskDraft) => {
    if (selectedTask) {
      const saved = await dispatch({ type: 'edit', id: selectedTask.id, draft });
      setDetail(saved);
      notify('updated', saved);
    } else {
      const saved = await dispatch({ type: 'create', draft });
      if (matchesDataQuery(saved, filters, taskAssignees, taskReferenceDate)) setPage(1);
      notify('created', saved);
      setEditor(null);
    }
  };

  return (
    <Toast.Provider>
      <div className={styles.tasksPage}>
        <h1 className={styles.srOnly}>{t('app.tasks')}</h1>
        <WorkOverview
          loading={!resource.data}
          items={[
            {
              label: t('tasks.totalTasks'),
              value: overview.total,
              note: t('tasks.workspaceTotals'),
              artwork: documentStackArtwork,
            },
            {
              label: t('tasks.inProgress'),
              value: overview.inProgress,
              note: t('tasks.activeWork'),
              artwork: playCircleArtwork,
            },
            {
              label: t('tasks.dueSoon'),
              value: overview.dueSoon,
              note: t('tasks.next7Days'),
              artwork: calendarClockArtwork,
            },
            {
              label: t('tasks.completed'),
              value: overview.completed,
              note: t('tasks.deliveredWork'),
              artwork: shieldCheckArtwork,
            },
          ]}
        />
        <Surface
          border="default"
          radius={12}
          className={styles.listPanel}
          aria-busy={resource.loading}
        >
          <MutationFeedback pending={mutation.pending} error={mutation.error} />
          <TaskFilters
            key={queryParams(filters).toString()}
            filters={filters}
            onApply={changeFilters}
            onReset={() => changeFilters(emptyDataQuery)}
          />
          <div className={styles.listActions}>
            <Button ref={newTaskRef} size="medium" leadingIcon={<PlusIcon />} onClick={openCreate}>
              {t('tasks.newTask2')}
            </Button>
            <div className={styles.bulkActions}>
              <Button
                size="medium"
                className={styles.deleteButton}
                leadingIcon={<TrashIcon />}
                disabled={selection.length === 0 || mutation.pending}
                onClick={() => setDeleteIds([...selection])}
              >
                {t('tasks.deleteSelected')}
              </Button>
              <Button
                ref={exportRef}
                size="medium"
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
                      new Blob([createTasksCsv(rows, taskAssignees, getTaskExportLabels(t))], {
                        type: 'text/csv;charset=utf-8',
                      }),
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
            </div>
          </div>
          {resource.error || !resource.data ? (
            <RemoteState loading={resource.loading} error={resource.error} retry={resource.retry} />
          ) : (
            <TaskTable
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
              pageSize={pageSize}
              onPageChange={(nextPage, nextPageSize) => {
                setPage(nextPage);
                setPageSize(nextPageSize);
              }}
              filtered={filtered}
              selectedId={selectedTask?.id}
              onOpen={openTask}
              onEdit={(task, button) => openTask(task, button, 'edit')}
              onReset={() => changeFilters(emptyDataQuery)}
              onCreate={openCreate}
            />
          )}
        </Surface>
      </div>
      {editor?.kind === 'details' && selectedTask ? (
        <TaskDetailsDialog
          task={selectedTask}
          onEdit={() => setEditor({ kind: 'edit', id: selectedTask.id })}
          onClose={() => setEditor(null)}
          restoreFocus={() => opener.current?.focus()}
        />
      ) : editor ? (
        <TaskDialog
          key={editor.kind !== 'create' ? editor.id : 'create'}
          task={selectedTask}
          hiddenByFilters={Boolean(selectedTask && !matches(selectedTask))}
          onSave={save}
          onStatusChange={async (status) => {
            if (!selectedTask) return;
            const saved = await dispatch({ type: 'status', id: selectedTask.id, status });
            setDetail(saved);
            notify('moved', { ...selectedTask, status });
          }}
          onClose={() => setEditor(null)}
          restoreFocus={() => {
            const target = opener.current?.isConnected ? opener.current : newTaskRef.current;
            target?.focus();
          }}
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
      {feedback ? (
        <Toast.Root
          key={feedback.id}
          intent="success"
          duration={6000}
          onOpenChange={(open) => {
            if (!open) setFeedback((current) => (current?.id === feedback.id ? null : current));
          }}
        >
          <Toast.Title>
            {feedback.kind === 'created'
              ? t('tasks.taskCreated')
              : feedback.kind === 'updated'
                ? t('tasks.taskUpdated')
                : t('tasks.movedTo', { status: getTaskStatusLabel(t, feedback.draft.status) })}
          </Toast.Title>
          <Toast.Description>
            {feedback.hidden
              ? t('tasks.valueIsSavedButDoesNotMatchYourCurrent', { v0: feedback.draft.id })
              : `${feedback.draft.id} · ${feedback.draft.title}`}
          </Toast.Description>
          {feedback.hidden ? (
            <Toast.Action onClick={() => changeFilters(emptyDataQuery)}>
              {t('tasks.showAllTasks')}
            </Toast.Action>
          ) : null}
          <Toast.Close aria-label={t('tasks.dismissTaskFeedback')} />
        </Toast.Root>
      ) : null}
    </Toast.Provider>
  );
}

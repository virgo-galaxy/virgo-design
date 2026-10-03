import { DownloadIcon, PlusIcon } from '@virgo-design/icons';
import { Button, Statistic, Surface, Toast } from '@virgo-design/ui';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getTask } from '@/api/tasks';
import { MutationFeedback } from '@/application/MutationFeedback';
import { useProData } from '@/application/pro-data-context';
import { RemoteState } from '@/application/RemoteState';
import { getAllTasks, taskPageView } from '@/application/task-queries';
import { useMutation } from '@/application/use-mutation';
import { useTaskQuery } from '@/application/use-task-query';
import {
  emptyTaskFilters,
  hasTaskFilters,
  matchesTask,
  type Task,
  type TaskDispatch,
  type TaskDraft,
  type TaskState,
} from '@/data/tasks';
import { createTasksCsv } from '@/data/tasks.export';
import { type TaskSort } from '@/data/tasks.sort';
import { getTaskExportLabels, getTaskStatusLabel } from '@/pages/tasks/task-presentation';

import { TaskDialog } from './TaskDialog';
import { TaskFilters } from './TaskFilters';
import styles from './TasksPage.module.scss';
import { TaskTable } from './TaskTable';

type Editor = { kind: 'create' } | { kind: 'edit'; id: string };
interface Feedback {
  id: number;
  kind: 'created' | 'updated' | 'moved';
  draft: TaskDraft & { id: string };
  hidden: boolean;
}

export function TasksPage({ state, dispatch }: { state: TaskState; dispatch: TaskDispatch }) {
  const { taskAssignees } = useProData();

  const { t } = useTranslation();
  const mutation = useMutation();
  const [detail, setDetail] = useState<Task | undefined>();
  const [filters, setFilters] = useState(emptyTaskFilters);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState<TaskSort | null>(null);
  const [editor, setEditor] = useState<Editor | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const feedbackId = useRef(0);
  const newTaskRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const assigneeName = (id: string) => taskAssignees.find((member) => member.id === id)?.name ?? '';
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
  };
  const selectedTask =
    editor?.kind === 'edit'
      ? detail?.id === editor.id
        ? detail
        : tasks.find((task) => task.id === editor.id)
      : undefined;
  const filtered = hasTaskFilters(filters);
  const notify = (kind: Feedback['kind'], draft: TaskDraft & { id: string }) => {
    const hidden = !matchesTask(draft, filters, assigneeName(draft.assignee));
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
  const openTask = (task: Task, button: HTMLButtonElement) => {
    opener.current = button;
    void mutation.run(async () => {
      const loaded = await getTask(task.id);
      setDetail(loaded);
      setEditor({ kind: 'edit', id: task.id });
    });
  };
  const save = async (draft: TaskDraft) => {
    if (selectedTask) {
      const saved = await dispatch({ type: 'edit', id: selectedTask.id, draft });
      setDetail(saved);
      notify('updated', saved);
    } else {
      const saved = await dispatch({ type: 'create', draft });
      if (matchesTask(draft, filters, assigneeName(draft.assignee))) setPage(1);
      notify('created', saved);
      setEditor(null);
    }
  };

  return (
    <Toast.Provider>
      <div className={styles.tasksPage}>
        <h1 className={styles.srOnly}>{t('app.tasks')}</h1>
        <Surface border="default" radius={8} className={styles.overview}>
          <div className={styles.metricGrid}>
            <Statistic label={t('tasks.totalTasks')} value={overview.total} />
            <Statistic label={t('tasks.inProgress')} value={overview.inProgress} />
            <Statistic
              label={t('tasks.dueSoon')}
              value={overview.dueSoon}
              description={t('tasks.next7Days')}
            />
            <Statistic label={t('tasks.completed')} value={overview.completed} />
          </div>
          <span className={styles.overviewNote}>{t('tasks.workspaceTotals')}</span>
        </Surface>
        <Surface
          border="default"
          radius={12}
          className={styles.listPanel}
          aria-busy={resource.loading}
        >
          <MutationFeedback pending={mutation.pending} error={mutation.error} />
          <TaskFilters
            filters={filters}
            onChange={changeFilters}
            onReset={() => changeFilters(emptyTaskFilters)}
            count={matchingTotal}
          />
          <div className={styles.listActions}>
            <Button ref={newTaskRef} size="small" leadingIcon={<PlusIcon />} onClick={openCreate}>
              {t('tasks.newTask2')}
            </Button>
            <Button
              size="small"
              variant="outline"
              leadingIcon={<DownloadIcon />}
              disabled={visibleTasks.length === 0}
              onClick={() => {
                void mutation.run(async () => {
                  const rows = await getAllTasks(query);
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
              {t('tasks.download')}
            </Button>
          </div>
          {resource.error || !resource.data ? (
            <RemoteState loading={resource.loading} error={resource.error} retry={resource.retry} />
          ) : (
            <TaskTable
              sort={sort}
              onSortChange={(next) => {
                setSort(next.direction === 'none' ? null : next);
                setPage(1);
              }}
              tasks={pageView.tasks}
              total={overview.total}
              matchingTotal={matchingTotal}
              page={pageView.page}
              pageSize={pageSize}
              range={pageView.range}
              onPageChange={(nextPage, nextPageSize) => {
                setPage(nextPage);
                setPageSize(nextPageSize);
              }}
              filtered={filtered}
              selectedId={selectedTask?.id}
              onOpen={openTask}
              onReset={() => changeFilters(emptyTaskFilters)}
              onCreate={openCreate}
            />
          )}
        </Surface>
      </div>
      {editor ? (
        <TaskDialog
          key={editor.kind === 'edit' ? editor.id : 'create'}
          task={selectedTask}
          hiddenByFilters={Boolean(
            selectedTask &&
            !matchesTask(selectedTask, filters, assigneeName(selectedTask.assignee)),
          )}
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
      <Toast.Viewport placement="bottom-end" aria-label={t('tasks.taskFeedback')} />
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
            <Toast.Action onClick={() => changeFilters(emptyTaskFilters)}>
              {t('tasks.showAllTasks')}
            </Toast.Action>
          ) : null}
          <Toast.Close aria-label={t('tasks.dismissTaskFeedback')} />
        </Toast.Root>
      ) : null}
    </Toast.Provider>
  );
}

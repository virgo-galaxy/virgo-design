import { DownloadIcon, PlusIcon } from '@virgo-design/icons';
import { Button, Surface, Toast } from '@virgo-design/ui';
import { type Dispatch, useRef, useState } from 'react';

import {
  emptyTaskFilters,
  hasTaskFilters,
  matchesTask,
  paginateTasks,
  type Task,
  type TaskAction,
  type TaskDraft,
  taskOverview,
  type TaskState,
} from '@/data/tasks';
import { createTasksCsv } from '@/data/tasks.export';
import { taskAssignees, taskReferenceDate, withTaskEstimates } from '@/data/tasks.seed';
import { sortTasks, type TaskSort } from '@/data/tasks.sort';

import { TaskDialog } from './TaskDialog';
import { TaskFilters } from './TaskFilters';
import styles from './TasksPage.module.scss';
import { TaskTable } from './TaskTable';

type Editor = { kind: 'create' } | { kind: 'edit'; id: string };
interface Feedback {
  id: number;
  title: string;
  description: string;
  hidden: boolean;
}

export function TasksPage({
  state,
  dispatch,
}: {
  state: TaskState;
  dispatch: Dispatch<TaskAction>;
}) {
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
  const tasks = withTaskEstimates(state.tasks);
  const visibleTasks = sortTasks(
    tasks.filter((task) => matchesTask(task, filters, assigneeName(task.assignee))),
    sort,
  );
  const overview = taskOverview(tasks, taskReferenceDate);
  const pageView = paginateTasks(visibleTasks, page, pageSize);
  // Persist a reduced range so later mutations cannot revive an obsolete page.
  if (page !== pageView.page) setPage(pageView.page);
  const changeFilters = (next: typeof filters) => {
    setFilters(next);
    setPage(1);
  };
  const selectedTask =
    editor?.kind === 'edit' ? tasks.find((task) => task.id === editor.id) : undefined;
  const filtered = hasTaskFilters(filters);
  const notify = (title: string, draft: TaskDraft & { id: string }) => {
    const hidden = !matchesTask(draft, filters, assigneeName(draft.assignee));
    setFeedback({
      id: ++feedbackId.current,
      title,
      description: hidden
        ? `${draft.id} is saved, but does not match your current filters.`
        : `${draft.id} · ${draft.title}`,
      hidden,
    });
  };
  const openCreate = () => {
    opener.current = newTaskRef.current;
    setEditor({ kind: 'create' });
  };
  const openTask = (task: Task, button: HTMLButtonElement) => {
    opener.current = button;
    setEditor({ kind: 'edit', id: task.id });
  };
  const save = (draft: TaskDraft) => {
    if (selectedTask) {
      dispatch({ type: 'edit', id: selectedTask.id, draft });
      notify('Task updated', { ...draft, id: selectedTask.id });
    } else {
      dispatch({ type: 'create', draft, createdAt: new Date().toISOString() });
      if (matchesTask(draft, filters, assigneeName(draft.assignee))) setPage(1);
      notify('Task created', { ...draft, id: `VD-${state.nextId}` });
      setEditor(null);
    }
  };

  return (
    <Toast.Provider>
      <div className={styles.tasksPage}>
        <Surface border="default" radius={8} className={styles.overview}>
          <dl>
            <div>
              <dt>Total tasks</dt>
              <dd>{overview.total}</dd>
            </div>
            <div>
              <dt>In progress</dt>
              <dd>{overview.inProgress}</dd>
            </div>
            <div>
              <dt>Due soon</dt>
              <dd>
                {overview.dueSoon}
                <span>next 7 days</span>
              </dd>
            </div>
            <div>
              <dt>Completed</dt>
              <dd>{overview.completed}</dd>
            </div>
          </dl>
          <span className={styles.overviewNote}>Workspace totals</span>
        </Surface>
        <Surface border="default" radius={12} className={styles.listPanel}>
          <TaskFilters
            filters={filters}
            onChange={changeFilters}
            onReset={() => changeFilters(emptyTaskFilters)}
            count={visibleTasks.length}
          />
          <div className={styles.listActions}>
            <Button ref={newTaskRef} size="small" leadingIcon={<PlusIcon />} onClick={openCreate}>
              New Task
            </Button>
            <Button
              size="small"
              variant="outline"
              leadingIcon={<DownloadIcon />}
              disabled={visibleTasks.length === 0}
              onClick={() => {
                const url = URL.createObjectURL(
                  new Blob([createTasksCsv(visibleTasks)], { type: 'text/csv;charset=utf-8' }),
                );
                const link = document.createElement('a');
                link.href = url;
                link.download = 'virgo-tasks.csv';
                document.body.append(link);
                link.click();
                link.remove();
                setTimeout(() => URL.revokeObjectURL(url), 0);
              }}
            >
              Download
            </Button>
          </div>
          <TaskTable
            sort={sort}
            onSortChange={(next) => {
              setSort(next.direction === 'none' ? null : next);
              setPage(1);
            }}
            tasks={pageView.tasks}
            total={state.tasks.length}
            matchingTotal={visibleTasks.length}
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
          onStatusChange={(status) => {
            if (!selectedTask) return;
            dispatch({ type: 'status', id: selectedTask.id, status });
            notify(`Moved to ${status}`, { ...selectedTask, status });
          }}
          onClose={() => setEditor(null)}
          restoreFocus={() => {
            const target = opener.current?.isConnected ? opener.current : newTaskRef.current;
            target?.focus();
          }}
        />
      ) : null}
      <Toast.Viewport placement="bottom-end" aria-label="Task feedback" />
      {feedback ? (
        <Toast.Root
          key={feedback.id}
          intent="success"
          duration={6000}
          onOpenChange={(open) => {
            if (!open) setFeedback((current) => (current?.id === feedback.id ? null : current));
          }}
        >
          <Toast.Title>{feedback.title}</Toast.Title>
          <Toast.Description>{feedback.description}</Toast.Description>
          {feedback.hidden ? (
            <Toast.Action onClick={() => changeFilters(emptyTaskFilters)}>
              Show all tasks
            </Toast.Action>
          ) : null}
          <Toast.Close aria-label="Dismiss task feedback" />
        </Toast.Root>
      ) : null}
    </Toast.Provider>
  );
}

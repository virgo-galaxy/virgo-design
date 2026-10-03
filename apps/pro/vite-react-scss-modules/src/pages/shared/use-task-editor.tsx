import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getTask } from '@/api/tasks';
import { MutationFeedback } from '@/application/MutationFeedback';
import { useMutation } from '@/application/use-mutation';
import type { Task, TaskDispatch, TaskState } from '@/data/tasks';
import { getTaskStatusLabel } from '@/pages/tasks/task-presentation';
import { TaskDialog } from '@/pages/tasks/TaskDialog';

export function useTaskEditor(
  state: TaskState,
  dispatch: TaskDispatch,
  matches: (task: Task) => boolean = () => true,
) {
  const { t } = useTranslation();
  const [id, setId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ id: string; status?: Task['status'] } | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [detail, setDetail] = useState<Task | null>(null);
  const mutation = useMutation();
  const task = detail?.id === id ? detail : state.tasks.find((item) => item.id === id);
  return {
    feedback: feedback
      ? feedback.status
        ? t('shared.taskMoved', { id: feedback.id, status: getTaskStatusLabel(t, feedback.status) })
        : t('shared.taskSaved', { id: feedback.id })
      : '',
    open: (item: Task, button: HTMLButtonElement) => {
      opener.current = button;
      void mutation.run(async () => {
        const loaded = await getTask(item.id);
        setDetail(loaded);
        setId(item.id);
      });
    },
    editor: (
      <>
        {' '}
        <MutationFeedback pending={mutation.pending} error={mutation.error} />
        {task && id ? (
          <TaskDialog
            key={task.id}
            task={task}
            hiddenByFilters={!matches(task)}
            onSave={async (draft) => {
              const saved = await dispatch({ type: 'edit', id: task.id, draft });
              setDetail(saved);
              setFeedback({ id: task.id });
            }}
            onStatusChange={async (status) => {
              const saved = await dispatch({ type: 'status', id: task.id, status });
              setDetail(saved);
              setFeedback({ id: task.id, status });
            }}
            onClose={() => setId(null)}
            restoreFocus={() => {
              (opener.current?.isConnected
                ? opener.current
                : document.getElementById('pro-main')
              )?.focus();
            }}
          />
        ) : null}
      </>
    ),
  };
}

import { type Dispatch, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { Task, TaskAction, TaskState } from '@/data/tasks';
import { getTaskStatusLabel } from '@/pages/tasks/task-presentation';
import { TaskDialog } from '@/pages/tasks/TaskDialog';

export function useTaskEditor(
  state: TaskState,
  dispatch: Dispatch<TaskAction>,
  matches: (task: Task) => boolean = () => true,
) {
  const { t } = useTranslation();
  const [id, setId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ id: string; status?: Task['status'] } | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const task = state.tasks.find((item) => item.id === id);
  return {
    feedback: feedback
      ? feedback.status
        ? t('shared.taskMoved', { id: feedback.id, status: getTaskStatusLabel(t, feedback.status) })
        : t('shared.taskSaved', { id: feedback.id })
      : '',
    open: (item: Task, button: HTMLButtonElement) => {
      opener.current = button;
      setId(item.id);
    },
    editor: task ? (
      <TaskDialog
        key={task.id}
        task={task}
        hiddenByFilters={!matches(task)}
        onSave={(draft) => {
          dispatch({ type: 'edit', id: task.id, draft });
          setFeedback({ id: task.id });
        }}
        onStatusChange={(status) => {
          dispatch({ type: 'status', id: task.id, status });
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
    ) : null,
  };
}

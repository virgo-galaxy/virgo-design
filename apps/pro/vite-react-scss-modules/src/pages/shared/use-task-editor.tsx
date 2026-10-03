import { type Dispatch, useRef, useState } from 'react';

import type { Task, TaskAction, TaskState } from '@/data/tasks';
import { TaskDialog } from '@/pages/tasks/TaskDialog';

export function useTaskEditor(
  state: TaskState,
  dispatch: Dispatch<TaskAction>,
  matches: (task: Task) => boolean = () => true,
) {
  const [id, setId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const opener = useRef<HTMLButtonElement | null>(null);
  const task = state.tasks.find((item) => item.id === id);
  return {
    feedback,
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
          setFeedback(`${task.id} saved. Changes are shared across the workspace.`);
        }}
        onStatusChange={(status) => {
          dispatch({ type: 'status', id: task.id, status });
          setFeedback(`${task.id} moved to ${status}.`);
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

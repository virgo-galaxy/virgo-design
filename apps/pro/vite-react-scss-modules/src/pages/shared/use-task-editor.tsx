import { useLocation, useNavigate } from 'react-router';

import type { Task, TaskDispatch, TaskState } from '@/data/tasks';
import { taskDetailsPath } from '@/pages/tasks/task-navigation';
export function useTaskEditor(
  state: TaskState,
  dispatch: TaskDispatch,
  matches?: (task: Task) => boolean,
) {
  void state;
  void dispatch;
  void matches;
  const navigate = useNavigate();
  const location = useLocation();
  return {
    feedback: '',
    editor: null,
    open: (task: Task, button: HTMLButtonElement) => {
      void button;
      navigate(taskDetailsPath(task.id, location.pathname + location.search));
    },
  };
}

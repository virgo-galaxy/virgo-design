// Test-only legacy state transitions for existing pure presentation assertions.
import {
  normalizeTaskDraft,
  type Task,
  type TaskAction,
  type TaskDraft,
  type TaskState,
} from '@/data/tasks';
import { createMockTaskId } from '@/mock/fixtures/task-id';
type LegacyTaskState = TaskState & { nextId: number };
type LegacyTaskAction =
  Exclude<TaskAction, { type: 'create' }> | { type: 'create'; draft: TaskDraft; createdAt: string };
export function tasksReducer(state: LegacyTaskState, action: LegacyTaskAction): LegacyTaskState {
  if (action.type === 'create') {
    const task: Task = {
      ...normalizeTaskDraft(action.draft),
      id: createMockTaskId(state.nextId),
      createdAt: action.createdAt,
    };
    return { tasks: [task, ...state.tasks], nextId: state.nextId + 1 };
  }
  return {
    ...state,
    tasks: state.tasks.map((task) =>
      task.id !== action.id
        ? task
        : action.type === 'edit'
          ? { ...task, ...normalizeTaskDraft(action.draft) }
          : { ...task, status: action.status },
    ),
  };
}

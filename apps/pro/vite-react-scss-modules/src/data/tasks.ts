export const taskStatuses = ['Backlog', 'Todo', 'In Progress', 'In Review', 'Done'] as const;
export const taskPriorities = ['Low', 'Medium', 'High', 'Urgent'] as const;
export type TaskStatus = (typeof taskStatuses)[number];
export type TaskPriority = (typeof taskPriorities)[number];

export interface TaskDraft {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  project: string;
  assignee: string;
  dueDate: string;
  estimateHours: number;
}

export interface Task extends TaskDraft {
  id: string;
  createdAt: string;
}

export interface TaskFilters {
  search: string;
  status: TaskStatus | 'all';
  priority: TaskPriority | 'all';
  project: string;
  assignee: string;
}

export interface TaskState {
  tasks: Task[];
  nextId: number;
}
export type TaskAction =
  | { type: 'create'; draft: TaskDraft; createdAt: string }
  | { type: 'edit'; id: string; draft: TaskDraft }
  | { type: 'status'; id: string; status: TaskStatus };
export type TaskErrors = Partial<Record<keyof TaskDraft, string>>;

export const emptyTaskFilters: TaskFilters = {
  search: '',
  status: 'all',
  priority: 'all',
  project: 'all',
  assignee: 'all',
};
export const emptyTaskDraft: TaskDraft = {
  title: '',
  description: '',
  status: 'Todo',
  priority: 'Medium',
  project: '',
  assignee: '',
  dueDate: '',
  estimateHours: 0,
};

export function isTaskStatus(value: string): value is TaskStatus {
  return taskStatuses.some((status) => status === value);
}
export function isTaskPriority(value: string): value is TaskPriority {
  return taskPriorities.some((priority) => priority === value);
}

export function normalizeTaskDraft(draft: TaskDraft): TaskDraft {
  return { ...draft, title: draft.title.trim(), description: draft.description.trim() };
}

export function taskDraft(task: Task): TaskDraft {
  return {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    project: task.project,
    assignee: task.assignee,
    dueDate: task.dueDate,
    estimateHours: task.estimateHours,
  };
}

export function draftHasChanges(draft: TaskDraft, baseline: TaskDraft) {
  return (Object.keys(baseline) as Array<keyof TaskDraft>).some(
    (key) => draft[key] !== baseline[key],
  );
}

export function validateTask(
  draft: TaskDraft,
  projects: readonly string[],
  assigneeIds: readonly string[],
): TaskErrors {
  const errors: TaskErrors = {};
  if (!draft.title.trim()) errors.title = 'Enter a task title.';
  else if (draft.title.trim().length > 120) errors.title = 'Keep the title within 120 characters.';
  if (draft.description.length > 2000)
    errors.description = 'Keep the description within 2,000 characters.';
  if (!isTaskStatus(draft.status)) errors.status = 'Choose a valid status.';
  if (!isTaskPriority(draft.priority)) errors.priority = 'Choose a valid priority.';
  if (!projects.includes(draft.project)) errors.project = 'Choose a project.';
  if (!assigneeIds.includes(draft.assignee)) errors.assignee = 'Choose an assignee.';
  if (
    !Number.isInteger(draft.estimateHours) ||
    draft.estimateHours < 0 ||
    draft.estimateHours > 999
  )
    errors.estimateHours = 'Enter whole hours between 0 and 999.';
  if (draft.dueDate) {
    const date = new Date(`${draft.dueDate}T00:00:00Z`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(draft.dueDate) ||
      Number.isNaN(date.getTime()) ||
      date.toISOString().slice(0, 10) !== draft.dueDate
    )
      errors.dueDate = 'Enter a valid due date.';
  }
  return errors;
}

export function tasksReducer(state: TaskState, action: TaskAction): TaskState {
  if (action.type === 'create') {
    const task: Task = {
      ...normalizeTaskDraft(action.draft),
      id: `VD-${state.nextId}`,
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

export function matchesTask(
  task: TaskDraft & { id?: string },
  filters: TaskFilters,
  assigneeName: string,
) {
  const query = filters.search.trim().toLowerCase();
  const text = [task.id ?? '', task.title, task.description, task.project, assigneeName]
    .join(' ')
    .toLowerCase();
  return (
    (!query || text.includes(query)) &&
    (filters.status === 'all' || task.status === filters.status) &&
    (filters.priority === 'all' || task.priority === filters.priority) &&
    (filters.project === 'all' || task.project === filters.project) &&
    (filters.assignee === 'all' || task.assignee === filters.assignee)
  );
}

export function hasTaskFilters(filters: TaskFilters) {
  return (
    filters.search.trim() !== '' ||
    filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.project !== 'all' ||
    filters.assignee !== 'all'
  );
}

export function isOverdue(task: Task, today: string) {
  return task.status !== 'Done' && task.dueDate !== '' && task.dueDate < today;
}

export function taskOverview(tasks: readonly Task[], today: string) {
  const cutoff = new Date(`${today}T00:00:00Z`);
  cutoff.setUTCDate(cutoff.getUTCDate() + 7);
  const weekEnd = cutoff.toISOString().slice(0, 10);
  return {
    total: tasks.length,
    inProgress: tasks.filter((task) => task.status === 'In Progress').length,
    dueSoon: tasks.filter(
      (task) => task.status !== 'Done' && task.dueDate >= today && task.dueDate <= weekEnd,
    ).length,
    completed: tasks.filter((task) => task.status === 'Done').length,
  };
}

export function nextTaskStatus(status: TaskStatus): TaskStatus | undefined {
  return taskStatuses[taskStatuses.indexOf(status) + 1];
}

export function paginateTasks(tasks: Task[], requestedPage: number, pageSize: number) {
  const pageCount = Math.max(1, Math.ceil(tasks.length / pageSize));
  const page = Math.max(1, Math.min(requestedPage, pageCount));
  const start = (page - 1) * pageSize;
  const items = tasks.slice(start, start + pageSize);
  return {
    tasks: items,
    page,
    pageCount,
    range: [items.length ? start + 1 : 0, start + items.length] as const,
  };
}

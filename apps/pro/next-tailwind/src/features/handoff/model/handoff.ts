import type { ProjectDto as Project } from '@/api/projects/types';
import type { TaskDto as Task } from '@/api/tasks/types';
import type {
  HandoffRequest,
  HandoffValidationCode,
  WorkflowReceiptDto,
} from '@/api/workflows/types';

export type HandoffDraft = HandoffRequest;

export const initialHandoff: HandoffDraft = {
  title: 'Release handoff',
  projectId: 'online-store',
  date: '',
  time: '10:00',
  taskIds: [],
  audience: 'team',
  notes: '',
  confirmed: false,
};

export interface ScopeGroup {
  id: 'scope-review' | 'scope-open' | 'scope-done';
  title: string;
  tasks: Task[];
}

export function scopeGroups(
  projectId: string,
  tasks: readonly Task[],
  projects: readonly Project[],
): ScopeGroup[] {
  const project = projects.find((item) => item.id === projectId);
  const groups: ScopeGroup[] = [
    {
      id: 'scope-review',
      title: 'Awaiting acceptance',
      tasks: tasks.filter((task) => task.project === project?.id && task.status === 'in_review'),
    },
    {
      id: 'scope-open',
      title: 'Work in motion',
      tasks: tasks.filter(
        (task) =>
          task.project === project?.id && task.status !== 'done' && task.status !== 'in_review',
      ),
    },
    {
      id: 'scope-done',
      title: 'Delivered work',
      tasks: tasks.filter((task) => task.project === project?.id && task.status === 'done'),
    },
  ];

  return groups.filter((group) => group.tasks.length > 0);
}

export function scopeTreeValues(ids: readonly string[], groups: readonly ScopeGroup[]) {
  const leaves = groups
    .flatMap((group) => group.tasks.map((task) => task.id))
    .filter((id) => ids.includes(id));

  return [
    ...leaves,
    ...groups
      .filter((group) => group.tasks.every((task) => leaves.includes(task.id)))
      .map((group) => group.id),
  ];
}

export function reconcileScope(
  ids: readonly string[],
  next: readonly string[],
  groups: readonly ScopeGroup[],
) {
  const previous = scopeTreeValues(ids, groups);
  const changedGroup = groups.find(
    (group) => previous.includes(group.id) !== next.includes(group.id),
  );
  const validIds = groups.flatMap((group) => group.tasks.map((task) => task.id));

  if (changedGroup) {
    const groupIds = changedGroup.tasks.map((task) => task.id);

    return next.includes(changedGroup.id)
      ? [...new Set([...ids.filter((id) => validIds.includes(id)), ...groupIds])]
      : ids.filter((id) => validIds.includes(id) && !groupIds.includes(id));
  }

  return next.filter((id) => validIds.includes(id));
}

function validDate(value: string) {
  const date = new Date(`${value}T00:00:00Z`);

  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}

export function validateHandoff(
  draft: HandoffDraft,
  tasks: readonly Task[],
  throughStep: number,
  projects: readonly Project[],
) {
  const errors: Partial<Record<keyof HandoffDraft, HandoffValidationCode>> = {};
  const project = projects.find((item) => item.id === draft.projectId);

  if (!draft.title.trim() || draft.title.trim().length > 100) errors.title = 'titleInvalid';
  if (!project) errors.projectId = 'projectInvalid';
  if (!validDate(draft.date) || draft.date < (project?.start ?? '')) errors.date = 'dateInvalid';
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(draft.time)) errors.time = 'timeInvalid';

  if (throughStep >= 1) {
    if (
      !draft.taskIds.length ||
      draft.taskIds.some(
        (id) => !tasks.some((task) => task.id === id && task.project === project?.id),
      )
    )
      errors.taskIds = 'scopeRequired';

    if (draft.notes.length > 1500) errors.notes = 'notesTooLong';
    if (draft.audience !== 'team' && draft.audience !== 'external')
      errors.audience = 'audienceInvalid';
  }

  if (throughStep >= 2 && !draft.confirmed) errors.confirmed = 'confirmationRequired';

  return errors;
}

export type WorkflowReceipt = WorkflowReceiptDto;

export function handoffFromReceipt(receipt: WorkflowReceipt): HandoffDraft {
  return {
    ...initialHandoff,
    title: receipt.handoffTitle ?? initialHandoff.title,
    projectId: receipt.projectId,
    date: receipt.schedule?.slice(0, 10) ?? initialHandoff.date,
    time: receipt.schedule?.slice(11, 16) ?? initialHandoff.time,
    taskIds: [...receipt.taskIds],
    audience: receipt.audience,
    notes: receipt.notes ?? '',
    confirmed: false,
  };
}

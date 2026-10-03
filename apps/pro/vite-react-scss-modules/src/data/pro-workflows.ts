import { projects } from './projects';
import { normalizeTaskDraft, type Task, type TaskDraft, validateTask } from './tasks';
import { taskAssignees, taskProjects } from './tasks.seed';

export interface WorkRequest extends TaskDraft {
  acceptanceConfirmed: boolean;
}
export const initialWorkRequest: WorkRequest = {
  title: '',
  description: '',
  project: 'Workspace',
  assignee: '',
  status: 'Todo',
  priority: 'Medium',
  dueDate: '',
  estimateHours: 8,
  acceptanceConfirmed: false,
};
export function validateWorkRequest(draft: WorkRequest) {
  return {
    ...validateTask(
      draft,
      taskProjects,
      taskAssignees.map((person) => person.id),
    ),
    ...(!draft.acceptanceConfirmed
      ? { acceptanceConfirmed: 'Confirm that the brief is ready for the assignee.' }
      : {}),
  };
}
export function workRequestTask(draft: WorkRequest): TaskDraft {
  // Only public task fields enter the shared register.
  return normalizeTaskDraft({
    title: draft.title,
    description: draft.description,
    project: draft.project,
    assignee: draft.assignee,
    status: draft.status,
    priority: draft.priority,
    dueDate: draft.dueDate,
    estimateHours: draft.estimateHours,
  });
}

export interface HandoffDraft {
  title: string;
  projectId: string;
  date: string;
  time: string;
  taskIds: string[];
  audience: 'team' | 'external';
  notes: string;
  confirmed: boolean;
}
export const initialHandoff: HandoffDraft = {
  title: 'October release handoff',
  projectId: 'workspace',
  date: '2026-10-06',
  time: '10:00',
  taskIds: [],
  audience: 'team',
  notes: '',
  confirmed: false,
};
export interface ScopeGroup {
  id: string;
  title: string;
  tasks: Task[];
}
export function scopeGroups(projectId: string, tasks: readonly Task[]): ScopeGroup[] {
  const project = projects.find((item) => item.id === projectId);
  return [
    {
      id: 'scope-review',
      title: 'Awaiting acceptance',
      tasks: tasks.filter((task) => task.project === project?.name && task.status === 'In Review'),
    },
    {
      id: 'scope-open',
      title: 'Work in motion',
      tasks: tasks.filter(
        (task) =>
          task.project === project?.name && task.status !== 'Done' && task.status !== 'In Review',
      ),
    },
    {
      id: 'scope-done',
      title: 'Delivered work',
      tasks: tasks.filter((task) => task.project === project?.name && task.status === 'Done'),
    },
  ].filter((group) => group.tasks.length > 0);
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
export function validateHandoff(draft: HandoffDraft, tasks: readonly Task[], throughStep: number) {
  const errors: Partial<Record<keyof HandoffDraft, string>> = {};
  const project = projects.find((item) => item.id === draft.projectId);
  if (!draft.title.trim() || draft.title.trim().length > 100)
    errors.title = 'Enter a handoff title within 100 characters.';
  if (!project) errors.projectId = 'Choose an existing project.';
  if (!validDate(draft.date) || draft.date < '2026-10-03')
    errors.date = 'Choose a date on or after October 3, 2026.';
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(draft.time)) errors.time = 'Choose a valid handoff time.';
  if (throughStep >= 1) {
    if (
      !draft.taskIds.length ||
      draft.taskIds.some(
        (id) => !tasks.some((task) => task.id === id && task.project === project?.name),
      )
    )
      errors.taskIds = 'Select at least one current task from this project.';
    if (draft.notes.length > 1500) errors.notes = 'Keep handoff notes within 1,500 characters.';
    if (draft.audience !== 'team' && draft.audience !== 'external')
      errors.audience = 'Choose an audience.';
  }
  if (throughStep >= 2 && !draft.confirmed)
    errors.confirmed = 'Confirm the scope and handoff details before preparing the packet.';
  return errors;
}
export interface WorkflowReceipt {
  outcome: 'success' | 'error';
  kind: 'task' | 'handoff';
  reference: string;
  title: string;
  description: string;
  projectId: string;
  taskIds: string[];
  recordedAt: string;
  requester: string;
  audience: 'team' | 'external';
  handoffTitle?: string;
  schedule?: string;
  notes?: string;
}
export const sampleSuccess: WorkflowReceipt = {
  outcome: 'success',
  kind: 'task',
  reference: 'RCP-125',
  title: 'Keyboard audit completed',
  description:
    'The keyboard audit is recorded as delivered. Its findings are ready for the Design system acceptance review.',
  projectId: 'design-system',
  taskIds: ['VD-125'],
  recordedAt: '2026-10-01T09:36:00+08:00',
  requester: 'Eli Morgan',
  audience: 'team',
};
export const sampleError: WorkflowReceipt = {
  outcome: 'error',
  kind: 'handoff',
  reference: 'HOF-100',
  title: 'External handoff restricted',
  description:
    'Workspace release material is limited to the team while export permissions are being reviewed.',
  projectId: 'workspace',
  taskIds: ['VD-128', 'VD-126'],
  recordedAt: '2026-10-03T10:00:00+08:00',
  requester: 'Mystic',
  audience: 'external',
  handoffTitle: 'October release handoff',
  schedule: '2026-10-06T10:00:00+08:00',
  notes:
    'Review workspace navigation and resolve export permission states before the October checkpoint.',
};
export function prepareHandoff(
  draft: HandoffDraft,
  tasks: readonly Task[],
  reference: string,
  requester: string,
  recordedAt: string,
): WorkflowReceipt | null {
  if (Object.keys(validateHandoff(draft, tasks, 2)).length) return null;
  const restricted = draft.projectId === 'workspace' && draft.audience === 'external';
  return {
    outcome: restricted ? 'error' : 'success',
    kind: 'handoff',
    reference,
    title: restricted ? 'External handoff restricted' : 'Handoff packet prepared',
    description: restricted
      ? 'Workspace release material is limited to the team while export permissions are being reviewed. Your draft is kept for correction.'
      : 'Your project scope and acceptance notes are ready for the handoff. Review the packet with your team at the scheduled checkpoint.',
    projectId: draft.projectId,
    taskIds: [...draft.taskIds],
    recordedAt,
    requester,
    audience: draft.audience,
    handoffTitle: draft.title.trim(),
    schedule: `${draft.date}T${draft.time}:00+08:00`,
    notes: draft.notes.trim(),
  };
}

export interface ProfileState {
  name: string;
  headline: string;
  bio: string;
  avatarColor: string;
  avatarImage: string;
  focusProject: string;
  digest: boolean;
  digestTime: string;
  reviewReminders: boolean;
  compactActivity: boolean;
}
export const initialProfile: ProfileState = {
  name: 'Mystic',
  headline: 'Product & design · Workspace owner',
  bio: 'Building a calmer place for teams to do focused work. Keeping the product language clear, consistent and useful.',
  avatarColor: '#1664f9',
  avatarImage: '',
  focusProject: 'workspace',
  digest: true,
  digestTime: '09:00',
  reviewReminders: true,
  compactActivity: false,
};
export function validateProfile(profile: ProfileState) {
  const errors: Partial<Record<keyof ProfileState, string>> = {};
  if (!profile.name.trim() || profile.name.trim().length > 60)
    errors.name = 'Use a display name within 60 characters.';
  if (profile.headline.length > 100) errors.headline = 'Keep your headline within 100 characters.';
  if (profile.bio.length > 600) errors.bio = 'Keep your introduction within 600 characters.';
  if (!/^#[\da-f]{6}$/i.test(profile.avatarColor))
    errors.avatarColor = 'Choose a six-digit hex color.';
  if (!projects.some((project) => project.id === profile.focusProject))
    errors.focusProject = 'Choose a focus project.';
  if (profile.digest && !/^([01]\d|2[0-3]):[0-5]\d$/.test(profile.digestTime))
    errors.digestTime = 'Choose a valid digest time.';
  return errors;
}
export function profileInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (
    (parts.length === 1
      ? parts[0]!.slice(0, 2)
      : parts
          .slice(0, 2)
          .map((part) => part[0])
          .join('')
    ).toUpperCase() || 'MY'
  );
}
export function avatarForeground(color: string) {
  if (!/^#[\da-f]{6}$/i.test(color)) return '#ffffff';
  const rgb = [1, 3, 5].map((offset) => {
    const channel = parseInt(color.slice(offset, offset + 2), 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return rgb[0]! * 0.2126 + rgb[1]! * 0.7152 + rgb[2]! * 0.0722 > 0.179 ? '#000000' : '#ffffff';
}

export function avatarFileError(file: { type: string; size: number }) {
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type))
    return 'Choose a PNG, JPEG or WebP image.';
  if (file.size > 2 * 1024 * 1024) return 'Choose an image smaller than 2 MB.';
  return '';
}

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

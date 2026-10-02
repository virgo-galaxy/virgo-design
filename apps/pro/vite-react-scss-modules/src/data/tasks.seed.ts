import type { Task, TaskState } from './tasks';
import { members } from './workplace';

// Parity fixture v1: fixed reference date, IDs, ownership and copy. No UI imports.
export const taskReferenceDate = '2026-10-02';
export const taskProjects = ['Workspace', 'Design system', 'Onboarding', 'Discovery'] as const;
export const taskAssignees = members;
export const initialTaskState: TaskState = {
  nextId: 139,
  tasks: [
    {
      id: 'VD-138',
      title: 'Align release readiness with support',
      description:
        'Bring product and support together for the October release. Capture known limitations and the escalation owner for each item.',
      status: 'Todo',
      priority: 'Urgent',
      project: 'Workspace',
      assignee: 'nina',
      dueDate: '2026-10-02',
      createdAt: '2026-10-01T03:20:00Z',
      estimateHours: 4,
    },
    {
      id: 'VD-137',
      title: 'Document search ranking signals',
      description:
        'Describe how recency, exact matches and project membership influence ranking. Include three examples that support can reproduce.',
      status: 'In Progress',
      priority: 'High',
      project: 'Discovery',
      assignee: 'leo',
      dueDate: '2026-10-07',
      createdAt: '2026-09-30T06:30:00Z',
      estimateHours: 12,
    },
    {
      id: 'VD-136',
      title: 'Review first-week activation funnel',
      description:
        'Compare invitation acceptance and first meaningful action. Identify where the welcome sequence loses people before proposing copy changes.',
      status: 'Backlog',
      priority: 'Medium',
      project: 'Onboarding',
      assignee: 'ava',
      dueDate: '2026-10-12',
      createdAt: '2026-09-30T02:10:00Z',
      estimateHours: 8,
    },
    {
      id: 'VD-135',
      title: 'Audit dense form keyboard order',
      description:
        'Verify tab order in compact forms, including validation errors and overlay controls. Record the expected focus destination after closing each panel.',
      status: 'In Review',
      priority: 'High',
      project: 'Design system',
      assignee: 'eli',
      dueDate: '2026-10-03',
      createdAt: '2026-09-29T08:15:00Z',
      estimateHours: 6,
    },
    {
      id: 'VD-134',
      title: 'Define saved-view naming conventions',
      description:
        'Establish concise names that distinguish personal views from team views. Test the conventions against a busy project with twelve saved views.',
      status: 'Backlog',
      priority: 'Low',
      project: 'Workspace',
      assignee: 'leo',
      dueDate: '',
      createdAt: '2026-09-29T03:40:00Z',
      estimateHours: 3,
    },
    {
      id: 'VD-133',
      title: 'Publish control density guidelines',
      description:
        'Document when compact controls are appropriate and which labels must remain visible. Include a table toolbar and a right-side editor example.',
      status: 'Done',
      priority: 'Medium',
      project: 'Design system',
      assignee: 'nina',
      dueDate: '2026-09-30',
      createdAt: '2026-09-28T07:20:00Z',
      estimateHours: 5,
    },
    {
      id: 'VD-132',
      title: 'Prepare invitation expiry copy',
      description:
        'Make expired invitation messages actionable without exposing workspace details. Include a clear route back to the invitation owner.',
      status: 'Todo',
      priority: 'Low',
      project: 'Onboarding',
      assignee: 'eli',
      dueDate: '2026-10-09',
      createdAt: '2026-09-28T02:05:00Z',
      estimateHours: 2,
    },
    {
      id: 'VD-131',
      title: 'Reduce duplicate search suggestions',
      description:
        'Merge duplicate suggestions from recent items and project results. Preserve the most useful contextual subtitle when an item appears in both sources.',
      status: 'In Progress',
      priority: 'Medium',
      project: 'Discovery',
      assignee: 'ava',
      dueDate: '2026-10-08',
      createdAt: '2026-09-27T06:20:00Z',
      estimateHours: 10,
    },
    {
      id: 'VD-130',
      title: 'Check sidebar compact-mode labels',
      description:
        'Verify accessible names and active navigation in compact mode. Confirm that restoring the sidebar preserves the selected destination.',
      status: 'Done',
      priority: 'High',
      project: 'Workspace',
      assignee: 'nina',
      dueDate: '2026-09-29',
      createdAt: '2026-09-27T01:15:00Z',
      estimateHours: 1,
    },
    {
      id: 'VD-129',
      title: 'Resolve member handoff checklist',
      description:
        'Agree on the checklist used when a task changes owner. Highlight the acceptance notes the new assignee needs before starting.',
      status: 'Todo',
      priority: 'Medium',
      project: 'Workspace',
      assignee: 'eli',
      dueDate: '2026-10-01',
      createdAt: '2026-09-26T07:25:00Z',
      estimateHours: 4,
    },
    {
      id: 'VD-128',
      title: 'Review workspace navigation',
      description:
        'Review the hierarchy and naming of workspace destinations. Check deep links, back navigation and whether every destination has a clear active state.',
      status: 'In Review',
      priority: 'High',
      project: 'Workspace',
      assignee: 'ava',
      dueDate: '2026-10-02',
      createdAt: '2026-09-26T04:30:00Z',
      estimateHours: 16,
    },
    {
      id: 'VD-127',
      title: 'Map onboarding touchpoints',
      description:
        'Map the moments between an invitation and a first completed task. Assign a single owner to each touchpoint and remove redundant prompts.',
      status: 'In Progress',
      priority: 'Medium',
      project: 'Onboarding',
      assignee: 'leo',
      dueDate: '2026-10-03',
      createdAt: '2026-09-25T07:00:00Z',
      estimateHours: 6,
    },
    {
      id: 'VD-126',
      title: 'Resolve export permission states',
      description:
        'Clarify the product copy for restricted exports and review the permitted paths. The design decision is ready; implementation can now proceed.',
      status: 'Todo',
      priority: 'High',
      project: 'Workspace',
      assignee: 'nina',
      dueDate: '2026-10-04',
      createdAt: '2026-09-25T03:50:00Z',
      estimateHours: 8,
    },
    {
      id: 'VD-125',
      title: 'Ship keyboard navigation audit',
      description:
        'Complete the keyboard pass across navigation, tables and nested panels. Link each finding to the control and the expected behavior.',
      status: 'Done',
      priority: 'Medium',
      project: 'Design system',
      assignee: 'eli',
      dueDate: '2026-10-01',
      createdAt: '2026-09-24T08:10:00Z',
      estimateHours: 12,
    },
    {
      id: 'VD-124',
      title: 'Refine search empty states',
      description:
        'Distinguish an empty workspace from a search with no matches. Keep recovery actions short and preserve the query while results are empty.',
      status: 'In Progress',
      priority: 'Low',
      project: 'Discovery',
      assignee: 'ava',
      dueDate: '2026-10-05',
      createdAt: '2026-09-24T02:20:00Z',
      estimateHours: 2,
    },
    {
      id: 'VD-123',
      title: 'Validate release acceptance criteria',
      description:
        'Confirm that focus behavior, appearance switching and error feedback meet release criteria. Bring unresolved findings to the team checkpoint.',
      status: 'In Review',
      priority: 'High',
      project: 'Design system',
      assignee: 'leo',
      dueDate: '2026-10-06',
      createdAt: '2026-09-23T06:00:00Z',
      estimateHours: 24,
    },
  ],
};

/** Backfill the new estimate field in an already-open demo session without resetting edits. */
export function withTaskEstimates(
  tasks: readonly (Omit<Task, 'estimateHours'> & { estimateHours?: number | undefined })[],
): Task[] {
  return tasks.map((task) => ({
    ...task,
    estimateHours:
      task.estimateHours ??
      initialTaskState.tasks.find((sample) => sample.id === task.id)?.estimateHours ??
      0,
  }));
}

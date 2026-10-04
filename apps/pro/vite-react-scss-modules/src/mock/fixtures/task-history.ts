import type { MemberDto, TaskDto, TaskPriorityDto, TaskStatusDto } from '@/api/tasks';

import { createMockTaskId } from './task-id';

const subjects = [
  [
    'Workspace permissions',
    'Saved views',
    'Team invitations',
    'Release checklist',
    'Activity feed',
    'Task handoffs',
    'Notification preferences',
    'Workspace settings',
    'Bulk actions',
    'Export access',
  ],
  [
    'Form validation',
    'Keyboard navigation',
    'Table density',
    'Dialog focus',
    'Color contrast',
    'Icon labeling',
    'Loading feedback',
    'Responsive layouts',
    'Theme switching',
    'Screen reader announcements',
  ],
  [
    'Welcome checklist',
    'Invitation recovery',
    'First project setup',
    'Account preferences',
    'Team introduction',
    'Activation reminders',
    'Getting started guide',
    'Import walkthrough',
    'Profile completion',
    'Trial feedback',
  ],
  [
    'Search suggestions',
    'Result grouping',
    'Recent searches',
    'Project filters',
    'Query highlighting',
    'Empty results',
    'Search shortcuts',
    'Content indexing',
    'Result previews',
    'Saved searches',
  ],
];
const phases = [
  [
    'Review requirements',
    'Record edge cases and agree on the acceptance criteria with the project lead.',
  ],
  [
    'Prepare interaction design',
    'Describe the main flow, recovery actions and keyboard behavior before implementation.',
  ],
  [
    'Implement behavior',
    'Complete the agreed behavior and connect the relevant data and permission states.',
  ],
  [
    'Verify accessibility',
    'Check focus order, readable labels and announcements with keyboard and assistive technology.',
  ],
  [
    'Resolve review feedback',
    'Reproduce review findings, apply the changes and attach notes for the next acceptance pass.',
  ],
  [
    'Publish acceptance notes',
    'Document verified behavior, remaining limitations and the owner for follow-up work.',
  ],
] as const;
const statuses: TaskStatusDto[] = [
  'backlog',
  'todo',
  'in_progress',
  'in_review',
  'done',
  'done',
  'todo',
  'in_progress',
];
const priorities: TaskPriorityDto[] = ['low', 'medium', 'medium', 'high', 'high', 'urgent'];
const estimates = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 40];
const day = 86_400_000;

// Fixed history keeps reloads reproducible while giving every filter and page real records.
export function createTaskHistory(
  projects: readonly string[],
  members: readonly MemberDto[],
): TaskDto[] {
  return Array.from({ length: 240 }, (_, index) => {
    const projectIndex = index % projects.length;
    const subject = subjects[projectIndex]![Math.floor(index / projects.length) % 10]!;
    const phase = phases[Math.floor(index / 40)]!;
    const variation = index * 7 + Math.floor(index / projects.length);
    const created =
      Date.UTC(2026, 8, 22, 2 + (index % 8), index % 60) - Math.floor(index / 3) * day;
    const due = Math.max(created + day, Date.UTC(2026, 9, 2) + (-18 + (variation % 50)) * day);
    return {
      id: createMockTaskId(139 + index),
      title: `${subject}: ${phase[0]}`,
      description: `${phase[1]} Scope: ${subject.toLowerCase()} in ${projects[projectIndex]}. Include reproducible examples and a clear handoff to the next owner.`,
      project: projects[projectIndex]!,
      assignee: members[(Math.floor(index / projects.length) + projectIndex) % members.length]!.id,
      status: statuses[variation % statuses.length]!,
      priority: priorities[(variation + Math.floor(index / 10)) % priorities.length]!,
      estimateHours: estimates[(variation + projectIndex) % estimates.length]!,
      createdAt: new Date(created).toISOString(),
      dueDate: index % 11 === 0 ? '' : new Date(due).toISOString().slice(0, 10),
    };
  });
}

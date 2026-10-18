import 'server-only';

import type { TaskDto, TaskStatusDto } from '@/api/tasks/types';

import { demoDate } from './dates';
import { createProjects } from './projects';
import { createDemoTaskId } from './task-id';
import { teamAssignments, type TeamJob } from './team';

export const taskHistoryCount = 240;

const moduleCounts = [
  [12, 10, 11, 12, 12, 11],
  [9, 9, 10, 8, 9, 9],
  [10, 10, 10, 10, 10, 10],
  [10, 10, 10, 10, 9, 9],
];

const stateCounts = [
  [23, 18, 13, 9, 5],
  [18, 14, 11, 7, 4],
  [20, 16, 12, 8, 4],
  [19, 16, 12, 8, 3],
];

const statuses: TaskStatusDto[] = ['done', 'backlog', 'todo', 'in_progress', 'in_review'];

const actions: { job: TeamJob; title: string; hours: number; acceptance: string }[] = [
  {
    job: 'manager',
    title: 'Plan delivery',
    hours: 3,
    acceptance: 'Confirm scope, ownership and the release checkpoint.',
  },
  {
    job: 'product',
    title: 'Define requirements',
    hours: 4,
    acceptance: 'Document the user journey, business rules and acceptance examples.',
  },
  {
    job: 'design',
    title: 'Design screens and interactions',
    hours: 6,
    acceptance: 'Provide responsive screens with loading, empty and error states.',
  },
  {
    job: 'frontend',
    title: 'Build the main screen',
    hours: 12,
    acceptance: 'Connect the main screen to its API and support keyboard navigation.',
  },
  {
    job: 'backend',
    title: 'Implement the main API',
    hours: 12,
    acceptance: 'Validate inputs and return the documented success and error responses.',
  },
  {
    job: 'frontend',
    title: 'Handle validation and recovery',
    hours: 6,
    acceptance: 'Keep user input on failure and offer a clear retry action.',
  },
  {
    job: 'backend',
    title: 'Enforce business rules',
    hours: 8,
    acceptance: 'Cover duplicate requests, invalid transitions and boundary conditions.',
  },
  {
    job: 'qa',
    title: 'Test the complete user journey',
    hours: 6,
    acceptance: 'Verify the successful journey across screens and APIs.',
  },
  {
    job: 'qa',
    title: 'Verify errors and accessibility',
    hours: 4,
    acceptance: 'Check keyboard access, readable errors and failure recovery.',
  },
  {
    job: 'operations',
    title: 'Configure deployment and monitoring',
    hours: 4,
    acceptance: 'Prepare the staging configuration, health checks and rollback notes.',
  },
  {
    job: 'backend',
    title: 'Optimize queries and response times',
    hours: 6,
    acceptance: 'Measure the main queries and verify indexes and paginated responses.',
  },
  {
    job: 'frontend',
    title: 'Polish mobile and dense layouts',
    hours: 4,
    acceptance: 'Verify small screens, long labels and the dense table layout.',
  },
];

const day = 86_400_000;

const stableIds = [
  '49e7996a-311b',
  'abb01fb9-ab2f',
  '0d78a608-2543',
  '6f412c57-9f57',
  'd109b2a6-196b',
  '32d238f5-9380',
  '949abf44-0d94',
  'f6634593-87a8',
  '582bcbe2-01bc',
  'b9f45231-7bd0',
  '1bbcd880-f5e5',
  '7d855ecf-6ff9',
  'df4de51e-ea0d',
  '41166b6d-6421',
  'a2def1bc-de36',
  '04a7780b-584a',
  '667ffe5a-d25e',
];

export function createTaskHistory(through = demoDate()): TaskDto[] {
  const hoursByMember = new Map<string, number>();
  const activeByMember = new Map<string, number>();
  const result: TaskDto[] = [];

  createProjects(through).forEach((project, projectIndex) => {
    const counts = stateCounts[projectIndex]!;
    const total = moduleCounts[projectIndex]!.reduce((sum, count) => sum + count, 0);
    let ordinal = 0;

    project.modules.forEach((module, moduleIndex) => {
      actions.slice(0, moduleCounts[projectIndex]![moduleIndex]).forEach((action) => {
        const position = (ordinal * 37 + counts[0]! + counts[1]!) % total;
        let remaining = position;
        const status =
          statuses[
            counts.findIndex((count) => {
              remaining -= count;
              return remaining < 0;
            })
          ]!;

        const candidates = teamAssignments.filter(
          (person) => person.job === action.job && person.projects.includes(projectIndex),
        );
        candidates.sort(
          (a, b) =>
            (status === 'in_progress'
              ? (activeByMember.get(a.id) ?? 0) - (activeByMember.get(b.id) ?? 0)
              : 0) || (hoursByMember.get(a.id) ?? 0) - (hoursByMember.get(b.id) ?? 0),
        );

        const assignee = candidates[0]!.id;
        hoursByMember.set(assignee, (hoursByMember.get(assignee) ?? 0) + action.hours);
        if (status === 'in_progress')
          activeByMember.set(assignee, (activeByMember.get(assignee) ?? 0) + 1);

        const index = result.length;
        const projectStart = Date.parse(`${project.start}T02:00:00Z`);
        const reference = Date.parse(`${through}T00:00:00Z`);
        const span = reference - projectStart;
        const historyPosition = (ordinal * 19 + moduleIndex * 7) % total;
        const recent = status === 'done' && ordinal % 3 === 0;
        const completed = recent
          ? reference - (1 + (ordinal % 13)) * day
          : projectStart + Math.floor(((historyPosition + 1) / (total + 1)) * (span - 10 * day));
        const created =
          index === 0
            ? Date.parse(`${demoDate(-4, through)}T03:20:00Z`)
            : status === 'done'
              ? Math.max(projectStart, completed - (3 + (ordinal % 12)) * day)
              : projectStart + Math.floor((historyPosition / total) * (span - 5 * day));

        result.push({
          id: stableIds[index] ?? createDemoTaskId(index + 139),
          title: `${module.name}: ${action.title}`,
          description: `${action.acceptance} Scope: ${module.name} in ${project.name}. The project manager confirms delivery after submission.`,
          project: project.id,
          module: module.id,
          assignee,
          status,
          priority:
            index === 0 ? 'urgent' : (['high', 'medium', 'low', 'urgent'] as const)[index % 4]!,
          estimateHours: action.hours,
          createdAt: new Date(
            status === 'done' ? Math.min(created, completed - 3 * day) : created,
          ).toISOString(),
          completedAt: status === 'done' ? new Date(completed).toISOString() : null,
          dueDate:
            status === 'backlog' && index % 3 === 0
              ? ''
              : new Date(
                  status === 'done'
                    ? completed
                    : Date.parse(`${demoDate(-3 + (index % 27), through)}T00:00:00Z`),
                )
                  .toISOString()
                  .slice(0, 10),
        });

        ordinal++;
      });
    });
  });

  return result;
}

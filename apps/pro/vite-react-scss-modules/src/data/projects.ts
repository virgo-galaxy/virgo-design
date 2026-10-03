import type { ActivityDto } from '@/api/analytics';
import type { MemberDto } from '@/api/tasks';

import { isOverdue, type Task } from './tasks';

export interface Project {
  id: string;
  name: string;
  code: string;
  owner: string;
  health: 'On track' | 'At risk' | 'Planning';
  summary: string;
  objective: string;
  start: string;
  due: string;
  color: number;
  milestones: Array<{ title: string; date: string; note: string }>;
}

// The four focus areas already used by Tasks and Workplace, with project-level context.
export function projectSummary(
  project: Project,
  tasks: readonly Task[],
  members: readonly MemberDto[],
  taskReferenceDate: string,
) {
  const related = tasks.filter((task) => task.project === project.name);
  const completed = related.filter((task) => task.status === 'done').length;
  const open = related.length - completed;
  return {
    tasks: related,
    total: related.length,
    completed,
    open,
    progress: related.length ? Math.round((completed / related.length) * 100) : 0,
    hours: related.reduce((sum, task) => sum + task.estimateHours, 0),
    overdue: related.filter((task) => isOverdue(task, taskReferenceDate)).length,
    review: related.filter((task) => task.status === 'in_review').length,
    members: members.filter(
      (member) =>
        member.id === project.owner || related.some((task) => task.assignee === member.id),
    ),
  };
}

export function projectActivity(project: Project, activity: readonly ActivityDto[]) {
  return activity.filter((event) => event.project === project.name);
}

export function projectDetailPath(project: Project) {
  return `/data/detail?project=${project.id}`;
}
export function projectQueryPath(project: Project) {
  return `/data/search-table?project=${encodeURIComponent(project.name)}`;
}

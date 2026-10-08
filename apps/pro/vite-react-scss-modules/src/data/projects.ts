import type { ActivityDto } from '@/api/analytics';
import type { MemberDto } from '@/api/tasks';
import { businessLabel } from '@/lib/demo/labels';

import { isOverdue, type Task } from './tasks';

export type Project = import('@/api/projects/contract').ProjectDto;

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
    members: members.filter((member) => project.memberIds.includes(member.id)),
  };
}

export function projectActivity(project: Project, activity: readonly ActivityDto[]) {
  return activity.filter((event) => event.project === project.name);
}

export function projectDetailPath(project: Project) {
  return `/work/projects/${encodeURIComponent(project.id)}`;
}
export function projectTasksPath(project: Project) {
  return `/work/tasks?project=${encodeURIComponent(project.name)}`;
}

export function filterProjects(
  projects: readonly Project[],
  members: readonly MemberDto[],
  filters: { search: string; health: readonly string[]; leads: readonly string[] },
) {
  const query = filters.search.trim().toLowerCase();
  return projects.filter(
    (project) =>
      (!filters.health.length || filters.health.includes(project.health)) &&
      (!filters.leads.length || filters.leads.includes(project.owner)) &&
      [
        project.name,
        project.code,
        project.summary,
        members.find((member) => member.id === project.owner)?.name ?? '',
      ]
        .flatMap((text) => [text, businessLabel(text, 'zh-CN')])
        .join(' ')
        .toLowerCase()
        .includes(query),
  );
}

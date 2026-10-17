import type { MemberDto } from '@/api/tasks';
import { businessLabel } from '@/lib/demo/labels';

export type Project = import('@/contracts/projects').ProjectDto;

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

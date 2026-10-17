import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

import { legacyProjectIds, type ProjectDto } from '@/api/projects';
import { moduleFilterKey, useTaskCatalog } from '@/features/catalog';
import { isRecord } from '@/lib/validation/is-record';

/** Preserve bookmarked name-based queries from the previous demonstration contract. */
export function canonicalTaskParams(params: URLSearchParams, projects: readonly ProjectDto[]) {
  const next = new URLSearchParams(params);
  const projectId = (value: string) =>
    legacyProjectIds[value] ?? projects.find((project) => project.name === value)?.id ?? value;
  const replace = (key: string, values: string[]) => {
    next.delete(key);
    values.forEach((value) => next.append(key, value));
  };
  replace('project', params.getAll('project').map(projectId));
  const modules = (values: string[], scope: string[] = []) =>
    values.flatMap((value) => {
      if (value.startsWith('[') || value === 'all') return [value];
      const matches = projects
        .filter((project) => !scope.length || scope.includes(project.id))
        .filter((project) => project.modules.some((module) => module.id === value));
      return matches.length
        ? matches.map((project) => moduleFilterKey(project.id, value))
        : [value];
    });
  replace('module', modules(params.getAll('module'), next.getAll('project')));
  try {
    const encoded = params.get('columnFilters');
    const columns: unknown = JSON.parse(encoded ?? 'null');
    if (isRecord(columns)) {
      if (
        Array.isArray(columns.project) &&
        columns.project.every((value) => typeof value === 'string')
      )
        columns.project = columns.project.map(projectId);
      if (
        Array.isArray(columns.module) &&
        columns.module.every((value) => typeof value === 'string')
      )
        columns.module = modules(columns.module);
      const json = JSON.stringify(columns);
      if (json !== encoded) next.set('columnFilters', json);
    }
  } catch {
    /* Existing query validation handles malformed column conditions. */
  }
  return next;
}
export function useTaskSearchParams() {
  const { projects } = useTaskCatalog();
  const [params, setParams] = useSearchParams();
  const canonical = canonicalTaskParams(params, projects);
  const currentKey = params.toString();
  const canonicalKey = canonical.toString();
  useEffect(() => {
    if (currentKey !== canonicalKey)
      setParams(new URLSearchParams(canonicalKey), { replace: true });
  }, [currentKey, canonicalKey, setParams]);
  return [canonical, setParams] as const;
}

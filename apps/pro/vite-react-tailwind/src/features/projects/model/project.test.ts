import { describe, expect, it } from 'vitest';

import { projects } from '@/mock/fixtures/projects';
import { taskAssignees } from '@/mock/fixtures/tasks';

import { projectDetailPath, projectTasksPath } from '../routes/navigation';
import { filterProjects } from './project';

describe('project presentation', () => {
  it('uses stable IDs in links independently of display names', () => {
    const renamed = { ...projects[1]!, name: 'A renamed project' };
    expect(projectDetailPath(renamed)).toBe('/work/projects/booking-system');
    expect(
      new URL(projectTasksPath(renamed), 'https://example.test').searchParams.get('project'),
    ).toBe('booking-system');
  });
  it('combines bilingual search, health and actual project leads', () => {
    expect(
      filterProjects(projects, taskAssignees, { search: '网上商城', health: [], leads: [] }).map(
        (project) => project.id,
      ),
    ).toEqual(['online-store']);
    expect(
      filterProjects(projects, taskAssignees, {
        search: 'Anika',
        health: ['At risk'],
        leads: ['ava'],
      }).map((project) => project.id),
    ).toEqual(['online-store']);
    expect(
      filterProjects(projects, taskAssignees, { search: '', health: ['Planning'], leads: ['ava'] }),
    ).toEqual([]);
    expect(
      filterProjects(projects, taskAssignees, { search: 'PRJ-02', health: [], leads: ['leo'] }).map(
        (project) => project.id,
      ),
    ).toEqual(['booking-system']);
  });
});

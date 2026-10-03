import { describe, expect, it } from 'vitest';

import {
  projectActivity,
  projectDetailPath,
  projectQueryPath,
  projects,
  projectSummary,
} from './projects';
import { taskDraft, tasksReducer } from './tasks';
import { initialTaskState, taskProjects } from './tasks.seed';

describe('shared project register', () => {
  it('covers the same focus areas and assigns each task to exactly one project', () => {
    expect(projects.map((project) => project.name)).toEqual(taskProjects);
    const summaries = projects.map((project) => projectSummary(project, initialTaskState.tasks));
    expect(summaries.reduce((sum, summary) => sum + summary.total, 0)).toBe(16);
    expect(summaries.reduce((sum, summary) => sum + summary.completed, 0)).toBe(3);
    expect(summaries.reduce((sum, summary) => sum + summary.hours, 0)).toBe(123);
  });
  it('updates completion and overdue work from saved shared status', () => {
    const project = projects[0]!;
    const before = projectSummary(project, initialTaskState.tasks);
    expect(before).toMatchObject({ total: 6, completed: 1, progress: 17, overdue: 1 });
    const next = tasksReducer(initialTaskState, { type: 'status', id: 'VD-129', status: 'Done' });
    expect(projectSummary(project, next.tasks)).toMatchObject({
      total: 6,
      completed: 2,
      progress: 33,
      overdue: 0,
    });
    expect(before.completed).toBe(1);
  });
  it('moves related work and estimates between projects without duplicating records', () => {
    const task = initialTaskState.tasks.find((item) => item.id === 'VD-138')!;
    const moved = tasksReducer(initialTaskState, {
      type: 'edit',
      id: task.id,
      draft: { ...taskDraft(task), project: 'Discovery', estimateHours: 9 },
    });
    expect(projectSummary(projects[0]!, moved.tasks)).toMatchObject({ total: 5, hours: 32 });
    expect(projectSummary(projects[3]!, moved.tasks)).toMatchObject({ total: 4, hours: 33 });
    expect(projectSummary(projects[3]!, moved.tasks).members.map((member) => member.id)).toContain(
      'nina',
    );
  });
  it('has safe zero-task progress and retains the project lead', () => {
    expect(projectSummary(projects[0]!, [])).toMatchObject({
      total: 0,
      progress: 0,
      open: 0,
      hours: 0,
    });
    expect(projectSummary(projects[0]!, []).members.map((member) => member.id)).toEqual(['ava']);
  });
  it('deep links to an identified project and scopes historical activity correctly', () => {
    expect(projectDetailPath(projects[1]!)).toBe('/data/detail?project=design-system');
    expect(
      new URL(projectQueryPath(projects[1]!), 'https://example.test').searchParams.get('project'),
    ).toBe('Design system');
    expect(projectActivity(projects[0]!).every((event) => event.project === 'Workspace')).toBe(
      true,
    );
    expect(projectActivity(projects[3]!)).toEqual([]);
  });
});

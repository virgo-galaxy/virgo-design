import { describe, expect, it } from 'vitest';

import { projects } from '@/mock/fixtures/projects';
import { taskAssignees, taskReferenceDate } from '@/mock/fixtures/tasks';
import { initialTaskState, taskProjects } from '@/mock/fixtures/tasks';
import { activity } from '@/mock/fixtures/workplace';
import { tasksReducer } from '@/test/task-state.test-helper';

import {
  filterProjects,
  projectActivity,
  projectDetailPath,
  projectSummary,
  projectTasksPath,
} from './projects';
import { taskDraft } from './tasks';

describe('shared project register', () => {
  it('covers the same focus areas and assigns each task to exactly one project', () => {
    expect(projects.map((project) => project.name)).toEqual(taskProjects);
    const summaries = projects.map((project) =>
      projectSummary(project, initialTaskState.tasks, taskAssignees, taskReferenceDate),
    );
    expect(summaries.reduce((sum, summary) => sum + summary.total, 0)).toBe(
      initialTaskState.tasks.length,
    );
    expect(summaries.reduce((sum, summary) => sum + summary.completed, 0)).toBe(
      initialTaskState.tasks.filter((task) => task.status === 'done').length,
    );
    expect(summaries.reduce((sum, summary) => sum + summary.hours, 0)).toBe(
      initialTaskState.tasks.reduce((sum, task) => sum + task.estimateHours, 0),
    );
  });
  it('updates completion and overdue work from saved shared status', () => {
    const project = projects[0]!;
    const before = projectSummary(
      project,
      initialTaskState.tasks,
      taskAssignees,
      taskReferenceDate,
    );
    expect(before.overdue).toBeGreaterThan(0);
    const next = tasksReducer(initialTaskState, {
      type: 'status',
      id: initialTaskState.tasks.find(
        (task) =>
          task.project === project.name &&
          task.status !== 'done' &&
          task.dueDate &&
          task.dueDate < taskReferenceDate,
      )!.id,
      status: 'done',
    });
    expect(projectSummary(project, next.tasks, taskAssignees, taskReferenceDate)).toMatchObject({
      total: before.total,
      completed: before.completed + 1,
      progress: Math.round(((before.completed + 1) / before.total) * 100),
      overdue: before.overdue - 1,
    });
    expect(before.completed).toBe(
      initialTaskState.tasks.filter(
        (task) => task.project === project.name && task.status === 'done',
      ).length,
    );
  });
  it('moves related work and estimates between projects without duplicating records', () => {
    const task = initialTaskState.tasks.find((item) => item.id === '49e7996a-311b')!;
    const workspaceBefore = projectSummary(
      projects[0]!,
      initialTaskState.tasks,
      taskAssignees,
      taskReferenceDate,
    );
    const discoveryBefore = projectSummary(
      projects[3]!,
      initialTaskState.tasks,
      taskAssignees,
      taskReferenceDate,
    );
    const moved = tasksReducer(initialTaskState, {
      type: 'edit',
      id: task.id,
      draft: {
        ...taskDraft(task),
        project: 'Inventory System',
        module: 'inventory-system-1',
        estimateHours: 9,
      },
    });
    expect(
      projectSummary(projects[0]!, moved.tasks, taskAssignees, taskReferenceDate),
    ).toMatchObject({
      total: workspaceBefore.total - 1,
      hours: workspaceBefore.hours - task.estimateHours,
    });
    expect(
      projectSummary(projects[3]!, moved.tasks, taskAssignees, taskReferenceDate),
    ).toMatchObject({ total: discoveryBefore.total + 1, hours: discoveryBefore.hours + 9 });
    expect(
      projectSummary(projects[3]!, moved.tasks, taskAssignees, taskReferenceDate).members.map(
        (member) => member.id,
      ),
    ).toContain('nina');
  });
  it('has safe zero-task progress and retains the project lead', () => {
    expect(projectSummary(projects[0]!, [], taskAssignees, taskReferenceDate)).toMatchObject({
      total: 0,
      progress: 0,
      open: 0,
      hours: 0,
    });
    expect(
      projectSummary(projects[0]!, [], taskAssignees, taskReferenceDate).members.map(
        (member) => member.id,
      ),
    ).toEqual(projects[0]!.memberIds);
  });
  it('deep links to an identified project and scopes historical activity correctly', () => {
    expect(projectDetailPath(projects[1]!)).toBe('/work/projects/booking-system');
    expect(
      new URL(projectTasksPath(projects[1]!), 'https://example.test').searchParams.get('project'),
    ).toBe('Booking System');
    expect(
      projectActivity(projects[0]!, activity).every((event) => event.project === 'Online Store'),
    ).toBe(true);
    expect(projectActivity(projects[3]!, activity)).toEqual([]);
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

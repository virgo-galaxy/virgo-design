import { describe, expect, it } from 'vitest';

import { createMockTaskId } from '@/mock/fixtures/task-id';
import {
  initialTaskState,
  taskAssignees,
  taskProjects,
  taskReferenceDate,
} from '@/mock/fixtures/tasks';

import {
  draftHasChanges,
  emptyTaskDraft,
  isOverdue,
  type Task,
  type TaskDraft,
  taskDraft,
  validateTask,
} from './task';

const draft: TaskDraft = {
  title: 'Review keyboard paths',
  description: 'Check nested panels and return focus.',
  status: 'todo',
  priority: 'high',
  project: 'online-store',
  module: 'online-store-1',
  assignee: 'ava',
  dueDate: '2026-10-05',
  estimateHours: 4,
};
const task: Task = {
  ...draft,
  id: createMockTaskId(initialTaskState.nextId),
  createdAt: '2026-10-02T08:00:00Z',
  completedAt: null,
};
const errors = (value: TaskDraft) =>
  validateTask(
    value,
    taskProjects,
    taskAssignees.map((member) => member.id),
  );

describe('validation and dates', () => {
  it('requires a title and valid ownership while allowing optional description/date', () => {
    expect(errors(emptyTaskDraft)).toEqual({
      title: 'titleRequired',
      project: 'projectRequired',
      module: 'moduleRequired',
      assignee: 'assigneeRequired',
    });
    expect(
      errors({ ...draft, title: '  ', project: 'unknown', assignee: 'unknown' }),
    ).toHaveProperty('title');
    expect(errors({ ...draft, description: '', dueDate: '' })).toEqual({});
    expect(
      errors({ ...draft, title: 'x'.repeat(121), description: 'x'.repeat(2001) }),
    ).toMatchObject({ title: expect.any(String), description: expect.any(String) });
    expect(errors({ ...draft, title: 'x'.repeat(120), description: 'x'.repeat(2000) })).toEqual({});
  });

  it.each(['2026-02-29', '2026-02-30', '2026-13-01', 'not-a-date', '2026-1-2'])(
    'rejects invalid civil dates: %s',
    (dueDate) => {
      expect(errors({ ...draft, dueDate })).toHaveProperty('dueDate');
    },
  );

  it('accepts leap days and detects changes across all editable fields', () => {
    expect(errors({ ...draft, dueDate: '2028-02-29' })).toEqual({});
    expect(taskDraft(task)).toEqual(draft);
    expect(draftHasChanges(draft, taskDraft(task))).toBe(false);
    expect(draftHasChanges({ ...draft, description: 'Changed' }, taskDraft(task))).toBe(true);
    expect(draftHasChanges({ ...draft, dueDate: '' }, taskDraft(task))).toBe(true);
  });

  it('recognizes overdue open work and excludes completed or unscheduled tasks', () => {
    expect(isOverdue({ ...task, dueDate: '2026-10-01' }, taskReferenceDate)).toBe(true);
    expect(isOverdue({ ...task, status: 'done', dueDate: '2026-10-01' }, taskReferenceDate)).toBe(
      false,
    );
    expect(isOverdue({ ...task, dueDate: '' }, taskReferenceDate)).toBe(false);
  });
});

it.each([-1, 1000, 1.5, NaN, Infinity])('rejects invalid estimated hours %s', (estimateHours) => {
  expect(errors({ ...draft, estimateHours })).toHaveProperty('estimateHours');
});
it.each([0, 1, 999])('accepts whole estimated hours %s', (estimateHours) => {
  expect(errors({ ...draft, estimateHours })).toEqual({});
});

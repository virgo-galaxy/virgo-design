import { describe, expect, it } from 'vitest';

import { initialProfile } from '@/mock/fixtures/profile';
import { projects } from '@/mock/fixtures/projects';
import { createMockTaskId } from '@/mock/fixtures/task-id';
import { taskAssignees, taskProjects } from '@/mock/fixtures/tasks';
import { initialTaskState } from '@/mock/fixtures/tasks';
import { sampleError } from '@/mock/fixtures/workflows';
import { tasksReducer } from '@/test/task-state.test-helper';

import { handoffFromReceipt } from './pro-workflows';
import {
  avatarFileError,
  avatarForeground,
  initialHandoff,
  initialWorkRequest,
  profileInitials,
  reconcileScope,
  scopeGroups,
  scopeTreeValues,
  validateHandoff,
  validateProfile,
  validateWorkRequest,
  workRequestTask,
} from './pro-workflows';

const tasks = initialTaskState.tasks;
const completeHandoff = {
  ...initialHandoff,
  title: '  Workspace acceptance checkpoint  ',
  taskIds: ['1bbcd880-f5e5', 'df4de51e-ea0d'],
  notes: '  Check navigation and export permissions.  ',
  confirmed: true,
};

describe('work request entering the shared register', () => {
  it('requires an owner and a ready brief in addition to existing task validation', () => {
    expect(validateWorkRequest(initialWorkRequest, taskProjects, taskAssignees)).toHaveProperty(
      'assignee',
    );
    expect(validateWorkRequest(initialWorkRequest, taskProjects, taskAssignees)).toHaveProperty(
      'acceptanceConfirmed',
    );
    expect(
      validateWorkRequest(
        {
          ...initialWorkRequest,
          title: 'Review scope',
          assignee: 'ava',
          acceptanceConfirmed: true,
        },
        taskProjects,
        taskAssignees,
      ),
    ).toEqual({});
  });
  it('normalizes the brief and excludes workflow-only metadata from task storage', () => {
    const draft = {
      ...initialWorkRequest,
      title: '  Review scope  ',
      description: '  Notes  ',
      assignee: 'ava',
      acceptanceConfirmed: true,
    };
    const stored = tasksReducer(initialTaskState, {
      type: 'create',
      draft: workRequestTask(draft),
      createdAt: '2026-10-03T00:00:00Z',
    });
    expect(stored.tasks[0]).toMatchObject({
      id: createMockTaskId(initialTaskState.nextId),
      title: 'Review scope',
      description: 'Notes',
      project: 'Workspace',
      assignee: 'ava',
      status: 'todo',
    });
    expect(stored.tasks[0]).not.toHaveProperty('acceptanceConfirmed');
    expect(initialTaskState.tasks).toHaveLength(256);
  });
});

describe('handoff scope and stage validation', () => {
  it('validates only the scope needed to advance, then requires final confirmation', () => {
    expect(validateHandoff(initialHandoff, tasks, 0, projects)).toEqual({});
    expect(validateHandoff(initialHandoff, tasks, 1, projects)).toHaveProperty('taskIds');
    expect(
      validateHandoff({ ...completeHandoff, confirmed: false }, tasks, 2, projects),
    ).toHaveProperty('confirmed');
    expect(validateHandoff(completeHandoff, tasks, 2, projects)).toEqual({});
  });
  it.each(['2026-10-02', '2026-02-30', 'not-a-date'])(
    'rejects invalid or past handoff date %s',
    (date) => {
      expect(validateHandoff({ ...completeHandoff, date }, tasks, 2, projects)).toHaveProperty(
        'date',
      );
    },
  );

  it('selects a complete branch, deselects one leaf, and clears the branch without touching other work', () => {
    const groups = scopeGroups('workspace', tasks, projects);
    const group = groups[0]!;
    const ids = group.tasks.map((task) => task.id);
    expect(reconcileScope([], [group.id], groups)).toEqual(ids);
    const values = scopeTreeValues(ids, groups);
    expect(values).toContain(group.id);
    expect(
      reconcileScope(
        ids,
        values.filter((id) => id !== ids[0]),
        groups,
      ),
    ).toEqual(ids.slice(1));
    const other = groups[1]!.tasks[0]!.id;
    expect(
      reconcileScope(
        [...ids, other],
        scopeTreeValues([...ids, other], groups).filter((id) => id !== group.id),
        groups,
      ),
    ).toEqual([other]);
  });
  it('filters invalid scope ids and does not fabricate groups for an empty project', () => {
    expect(scopeGroups('missing', tasks, projects)).toEqual([]);
    const groups = scopeGroups('workspace', tasks, projects);
    expect(scopeTreeValues(['missing', '1bbcd880-f5e5'], groups)).not.toContain('missing');
    expect(reconcileScope([], ['missing', '1bbcd880-f5e5'], groups)).toEqual(['1bbcd880-f5e5']);
  });
});

describe('handoff result and recovery', () => {
  it('restores server receipt fields for review without confirming the handoff', () => {
    expect(handoffFromReceipt(sampleError)).toMatchObject({
      projectId: 'workspace',
      taskIds: ['1bbcd880-f5e5', 'df4de51e-ea0d'],
      audience: 'external',
      confirmed: false,
    });
  });
});

describe('profile identity and photo constraints', () => {
  it('validates identity, color, project and enabled digest time', () => {
    expect(validateProfile(initialProfile, projects)).toEqual({});
    expect(
      validateProfile(
        {
          ...initialProfile,
          name: ' ',
          avatarColor: 'red',
          focusProject: 'missing',
          digestTime: '25:00',
        },
        projects,
      ),
    ).toMatchObject({
      name: expect.any(String),
      avatarColor: expect.any(String),
      focusProject: expect.any(String),
      digestTime: expect.any(String),
    });
    expect(validateProfile({ ...initialProfile, digest: false, digestTime: '' }, projects)).toEqual(
      {},
    );
  });
  it('keeps initials legible for a single name, multiple words and an empty name', () => {
    expect(profileInitials('Mystic')).toBe('MY');
    expect(profileInitials('  Ava Thompson ')).toBe('AT');
    expect(profileInitials(' ')).toBe('MY');
    expect(avatarForeground('#ffffff')).toBe('#000000');
    expect(avatarForeground('#000000')).toBe('#ffffff');
    expect(avatarForeground('#1664f9')).toBe('#ffffff');
  });
  it('accepts supported images and rejects unsupported or oversized files', () => {
    expect(avatarFileError({ type: 'image/png', size: 1024 })).toBe('');
    expect(avatarFileError({ type: 'image/svg+xml', size: 1024 })).toBe('unsupportedFile');
    expect(avatarFileError({ type: 'image/jpeg', size: 2 * 1024 * 1024 + 1 })).toBe('fileTooLarge');
  });
});

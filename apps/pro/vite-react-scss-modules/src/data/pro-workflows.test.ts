import { describe, expect, it } from 'vitest';

import {
  avatarFileError,
  avatarForeground,
  handoffFromReceipt,
  initialHandoff,
  initialProfile,
  initialWorkRequest,
  prepareHandoff,
  profileInitials,
  reconcileScope,
  scopeGroups,
  scopeTreeValues,
  validateHandoff,
  validateProfile,
  validateWorkRequest,
  workRequestTask,
} from './pro-workflows';
import { taskDraft, tasksReducer } from './tasks';
import { initialTaskState } from './tasks.seed';

const tasks = initialTaskState.tasks;
const completeHandoff = {
  ...initialHandoff,
  title: '  Workspace acceptance checkpoint  ',
  taskIds: ['VD-128', 'VD-126'],
  notes: '  Check navigation and export permissions.  ',
  confirmed: true,
};

describe('work request entering the shared register', () => {
  it('requires an owner and a ready brief in addition to existing task validation', () => {
    expect(validateWorkRequest(initialWorkRequest)).toHaveProperty('assignee');
    expect(validateWorkRequest(initialWorkRequest)).toHaveProperty('acceptanceConfirmed');
    expect(
      validateWorkRequest({
        ...initialWorkRequest,
        title: 'Review scope',
        assignee: 'ava',
        acceptanceConfirmed: true,
      }),
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
      id: 'VD-139',
      title: 'Review scope',
      description: 'Notes',
      project: 'Workspace',
      assignee: 'ava',
      status: 'Todo',
    });
    expect(stored.tasks[0]).not.toHaveProperty('acceptanceConfirmed');
    expect(initialTaskState.tasks).toHaveLength(16);
  });
});

describe('handoff scope and stage validation', () => {
  it('validates only the scope needed to advance, then requires final confirmation', () => {
    expect(validateHandoff(initialHandoff, tasks, 0)).toEqual({});
    expect(validateHandoff(initialHandoff, tasks, 1)).toHaveProperty('taskIds');
    expect(validateHandoff({ ...completeHandoff, confirmed: false }, tasks, 2)).toHaveProperty(
      'confirmed',
    );
    expect(validateHandoff(completeHandoff, tasks, 2)).toEqual({});
  });
  it.each(['2026-10-02', '2026-02-30', 'not-a-date'])(
    'rejects invalid or past handoff date %s',
    (date) => {
      expect(validateHandoff({ ...completeHandoff, date }, tasks, 2)).toHaveProperty('date');
    },
  );
  it('rejects invalid time, missing project and stale scope after a task moves', () => {
    expect(
      validateHandoff({ ...completeHandoff, time: '24:60', projectId: 'missing' }, tasks, 2),
    ).toMatchObject({
      time: expect.any(String),
      projectId: expect.any(String),
      taskIds: expect.any(String),
    });
    const task = tasks.find((item) => item.id === 'VD-128')!;
    const moved = tasksReducer(initialTaskState, {
      type: 'edit',
      id: task.id,
      draft: { ...taskDraft(task), project: 'Discovery' },
    });
    expect(validateHandoff(completeHandoff, moved.tasks, 2)).toHaveProperty('taskIds');
    expect(
      prepareHandoff(completeHandoff, moved.tasks, 'HOF-101', 'Mystic', '2026-10-03T00:00:00Z'),
    ).toBeNull();
  });
  it('selects a complete branch, deselects one leaf, and clears the branch without touching other work', () => {
    const groups = scopeGroups('workspace', tasks);
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
    expect(scopeGroups('missing', tasks)).toEqual([]);
    const groups = scopeGroups('workspace', tasks);
    expect(scopeTreeValues(['missing', 'VD-128'], groups)).not.toContain('missing');
    expect(reconcileScope([], ['missing', 'VD-128'], groups)).toEqual(['VD-128']);
  });
});

describe('handoff result and recovery', () => {
  it('retains the failed external draft including custom title and immutable scope', () => {
    const draft = { ...completeHandoff, audience: 'external' as const };
    const receipt = prepareHandoff(draft, tasks, 'HOF-101', 'Mystic', '2026-10-03T00:00:00Z')!;
    expect(receipt).toMatchObject({
      outcome: 'error',
      projectId: 'workspace',
      audience: 'external',
      handoffTitle: 'Workspace acceptance checkpoint',
      schedule: '2026-10-06T10:00:00+08:00',
    });
    const recovered = handoffFromReceipt(receipt);
    expect(recovered).toMatchObject({
      title: 'Workspace acceptance checkpoint',
      taskIds: ['VD-128', 'VD-126'],
      notes: 'Check navigation and export permissions.',
      confirmed: false,
    });
    recovered.taskIds.push('VD-129');
    expect(receipt.taskIds).toEqual(['VD-128', 'VD-126']);
    expect(draft.taskIds).toEqual(['VD-128', 'VD-126']);
  });
  it('prepares the same scope for the team and permits external handoff for other projects', () => {
    expect(
      prepareHandoff(completeHandoff, tasks, 'HOF-102', 'Mystic', '2026-10-03T00:00:00Z')?.outcome,
    ).toBe('success');
    const other = tasks.find((task) => task.project === 'Discovery')!;
    expect(
      prepareHandoff(
        { ...completeHandoff, projectId: 'discovery', taskIds: [other.id], audience: 'external' },
        tasks,
        'HOF-103',
        'Mystic',
        '2026-10-03T00:00:00Z',
      )?.outcome,
    ).toBe('success');
  });
});

describe('profile identity and photo constraints', () => {
  it('validates identity, color, project and enabled digest time', () => {
    expect(validateProfile(initialProfile)).toEqual({});
    expect(
      validateProfile({
        ...initialProfile,
        name: ' ',
        avatarColor: 'red',
        focusProject: 'missing',
        digestTime: '25:00',
      }),
    ).toMatchObject({
      name: expect.any(String),
      avatarColor: expect.any(String),
      focusProject: expect.any(String),
      digestTime: expect.any(String),
    });
    expect(validateProfile({ ...initialProfile, digest: false, digestTime: '' })).toEqual({});
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

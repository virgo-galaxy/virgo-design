import { describe, expect, it } from 'vitest';

import { initialProfile } from '@/mock/fixtures/profile';
import { projects } from '@/mock/fixtures/projects';
import { initialTaskState } from '@/mock/fixtures/tasks';
import { sampleError } from '@/mock/fixtures/workflows';

import { handoffFromReceipt } from './pro-workflows';
import {
  avatarFileError,
  avatarForeground,
  initialHandoff,
  profileInitials,
  reconcileScope,
  scopeGroups,
  scopeTreeValues,
  validateHandoff,
  validateProfile,
} from './pro-workflows';

const tasks = initialTaskState.tasks;
const completeHandoff = {
  ...initialHandoff,
  title: '  Workspace acceptance checkpoint  ',
  taskIds: ['1bbcd880-f5e5', 'df4de51e-ea0d'],
  notes: '  Check navigation and export permissions.  ',
  confirmed: true,
};

describe('handoff scope and stage validation', () => {
  it('validates only the scope needed to advance, then requires final confirmation', () => {
    expect(validateHandoff(initialHandoff, tasks, 0, projects)).toEqual({});
    expect(validateHandoff(initialHandoff, tasks, 1, projects)).toHaveProperty('taskIds');
    expect(
      validateHandoff({ ...completeHandoff, confirmed: false }, tasks, 2, projects),
    ).toHaveProperty('confirmed');
    expect(validateHandoff(completeHandoff, tasks, 2, projects)).toEqual({});
  });
  it.each(['2025-06-01', '2026-02-30', 'not-a-date'])(
    'rejects invalid or past handoff date %s',
    (date) => {
      expect(validateHandoff({ ...completeHandoff, date }, tasks, 2, projects)).toHaveProperty(
        'date',
      );
    },
  );

  it('selects a complete branch, deselects one leaf, and clears the branch without touching other work', () => {
    const groups = scopeGroups('online-store', tasks, projects);
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
    const groups = scopeGroups('online-store', tasks, projects);
    expect(scopeTreeValues(['missing', '1bbcd880-f5e5'], groups)).not.toContain('missing');
    expect(reconcileScope([], ['missing', '1bbcd880-f5e5'], groups)).toEqual(['1bbcd880-f5e5']);
  });
});

describe('handoff result and recovery', () => {
  it('restores server receipt fields for review without confirming the handoff', () => {
    expect(handoffFromReceipt(sampleError)).toMatchObject({
      projectId: 'online-store',
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
    expect(profileInitials('Example')).toBe('EX');
    expect(profileInitials('  Ava Thompson ')).toBe('AT');
    expect(profileInitials(' ')).toBe('EX');
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

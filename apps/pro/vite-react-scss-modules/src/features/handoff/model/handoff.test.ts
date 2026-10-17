import { describe, expect, it } from 'vitest';

import { projects } from '@/mock/fixtures/projects';
import { initialTaskState } from '@/mock/fixtures/tasks';
import { sampleError } from '@/mock/fixtures/workflows';

import { handoffFromReceipt, initialHandoff } from './handoff';
import { reconcileScope, scopeGroups, scopeTreeValues, validateHandoff } from './handoff';

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

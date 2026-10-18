import 'server-only';

import { demoDate } from '../fixtures/dates';
import { initialProfile } from '../fixtures/profile';
import { createTaskHistory } from '../fixtures/task-history';
import { initialTaskState } from '../fixtures/tasks';
import { createWorkflowSamples } from '../fixtures/workflows';
import type { DemoState } from '../model/state';
import { seedNotifications, seedTaskRecords } from '../model/task-records';
import { demoAreas, getDemoContext, getDemoSandbox } from '../runtime/context';
import { refreshDemoTimeline } from './refresh-timeline';

function seed(): DemoState {
  const tasks = createTaskHistory(),
    records = seedTaskRecords(tasks);
  return structuredClone({
    ...initialTaskState,
    tasks,
    profile: initialProfile,
    profiles: {},
    workflows: createWorkflowSamples(),
    sequence: 101,
    records,
    notifications: seedNotifications(tasks, records),
  });
}

export function getDemoState(): DemoState {
  const sandbox = getDemoSandbox();
  sandbox.state ??= seed();
  const today = demoDate();
  if (sandbox.timelineDate !== today) {
    sandbox.state = refreshDemoTimeline(sandbox.state, today);
    sandbox.timelineDate = today;
  }
  return sandbox.state;
}

export function updateDemoState(update: (previous: DemoState) => DemoState) {
  const previous = getDemoState(),
    next = update(structuredClone(previous));
  const { changes } = getDemoContext();
  const changed = (...keys: (keyof DemoState)[]) =>
    keys.some((key) => JSON.stringify(previous[key]) !== JSON.stringify(next[key]));
  if (changed('tasks', 'records')) changes.add('tasks');
  if (changed('profile', 'profiles')) changes.add('profile');
  if (changed('workflows')) changes.add('workflows');
  if (changed('notifications')) changes.add('notifications');
  getDemoSandbox().state = next;
  return next;
}

export function resetDemoState() {
  const sandbox = getDemoSandbox();
  sandbox.state = seed();
  sandbox.timelineDate = '';
  sandbox.snapshots.clear();
  for (const area of demoAreas) getDemoContext().changes.add(area);
}

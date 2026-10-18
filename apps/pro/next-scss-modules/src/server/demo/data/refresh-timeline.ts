import 'server-only';

import { createTaskHistory } from '../fixtures/task-history';
import { createWorkflowSamples } from '../fixtures/workflows';
import type { DemoState } from '../model/state';
import {
  isDemoUsageRecord,
  seedNotifications,
  seedTaskRecords,
  seedUsageRecords,
} from '../model/task-records';

export function refreshDemoTimeline(state: DemoState, today: string): DemoState {
  const templates = createTaskHistory(today);
  const existingIds = new Set(state.tasks.map((task) => task.id));
  const editedIds = new Set(
    state.records.filter((record) => !record.id.startsWith('seed-')).map((record) => record.taskId),
  );
  const untouched = templates.filter((task) => existingIds.has(task.id) && !editedIds.has(task.id));
  const replacements = new Map(untouched.map((task) => [task.id, task]));
  const records = seedTaskRecords(untouched, today);

  const previousNotifications = new Map(state.notifications.map((item) => [item.id, item]));
  const notifications = seedNotifications(untouched, records, today).map((item) => {
    const previous = previousNotifications.get(item.id);

    return previous && previous.readAt !== previous.createdAt
      ? { ...item, readAt: previous.readAt }
      : item;
  });
  const replacedNotifications = new Set(notifications.map((item) => item.id));
  const samples = createWorkflowSamples(today);

  return {
    ...state,
    tasks: state.tasks.map((task) => replacements.get(task.id) ?? task),
    records: [
      ...state.records.filter(
        (record) =>
          !isDemoUsageRecord(record) &&
          !(record.id.startsWith('seed-') && replacements.has(record.taskId)),
      ),
      ...records,
      ...seedUsageRecords(templates, today),
    ],
    notifications: [
      ...state.notifications.filter((item) => !replacedNotifications.has(item.id)),
      ...notifications,
    ],
    workflows: {
      success:
        state.workflows.success.reference === samples.success.reference
          ? samples.success
          : state.workflows.success,
      error:
        state.workflows.error.reference === samples.error.reference
          ? samples.error
          : state.workflows.error,
    },
  };
}

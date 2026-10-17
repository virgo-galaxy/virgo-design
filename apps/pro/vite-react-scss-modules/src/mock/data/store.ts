import type { TaskRecordDto } from '@/api/analytics/types';
import { localStorageAccess } from '@/lib/storage';
import { isRecord } from '@/lib/validation/is-record';

import { initialProfile } from '../fixtures/profile';
import { projects } from '../fixtures/projects';
import { initialTaskState } from '../fixtures/tasks';
import { sampleError, sampleSuccess } from '../fixtures/workflows';
import type { DemoState } from '../model/state';
import {
  recordKinds,
  seedNotifications,
  seedTaskRecords,
  validRecordPerson,
} from '../model/task-records';

export const demoStorageKey = 'virgo-pro.demo-data.v1';

function seed(): DemoState {
  const records = seedTaskRecords(initialTaskState.tasks);

  return structuredClone({
    ...initialTaskState,
    profile: initialProfile,
    profiles: {},
    workflows: { success: sampleSuccess, error: sampleError },
    sequence: 101,
    records,
    notifications: seedNotifications(initialTaskState.tasks, records),
  });
}

let state: DemoState | undefined;

function validSavedState(value: unknown): value is DemoState {
  if (
    !isRecord(value) ||
    !Array.isArray(value.tasks) ||
    !Number.isInteger(value.nextId) ||
    Number(value.nextId) < 1000 ||
    !Number.isInteger(value.sequence) ||
    !isRecord(value.profile) ||
    !isRecord(value.workflows)
  )
    return false;

  const initial = seed();
  const profile = value.profile;
  const workflows = value.workflows;

  if (
    !isRecord(value.profiles) ||
    Object.values(value.profiles).some(
      (entry) =>
        !isRecord(entry) ||
        Object.entries(initial.profile).some(([key, field]) => typeof entry[key] !== typeof field),
    )
  )
    return false;

  if (
    Object.entries(initial.profile).some(([key, entry]) => typeof profile[key] !== typeof entry) ||
    !projects.some((project) => project.id === profile.focusProject)
  )
    return false;

  if (
    !['success', 'error'].every(
      (key) =>
        isRecord(workflows[key]) &&
        Array.isArray(workflows[key].taskIds) &&
        typeof workflows[key].reference === 'string',
    )
  )
    return false;

  const ids = new Set<string>();

  return value.tasks.every((task: unknown) => {
    if (!isRecord(task) || typeof task.id !== 'string' || ids.has(task.id)) return false;

    ids.add(task.id);
    const project = projects.find((entry) => entry.id === task.project);

    return (
      ['title', 'description', 'module', 'assignee', 'createdAt', 'dueDate'].every(
        (key) => typeof task[key] === 'string',
      ) &&
      ['backlog', 'todo', 'in_progress', 'in_review', 'done'].includes(String(task.status)) &&
      ['low', 'medium', 'high', 'urgent'].includes(String(task.priority)) &&
      project?.modules.some((module) => module.id === task.module) &&
      (task.assignee === '' || project?.memberIds.includes(String(task.assignee))) &&
      Number.isInteger(task.estimateHours) &&
      Number(task.estimateHours) >= 0 &&
      Number(task.estimateHours) <= 999 &&
      typeof task.createdAt === 'string' &&
      Number.isFinite(Date.parse(task.createdAt)) &&
      (task.completedAt === null ||
        (typeof task.completedAt === 'string' && Number.isFinite(Date.parse(task.completedAt))))
    );
  });
}

export function getDemoState(): DemoState {
  if (!state) {
    state = seed();

    try {
      const saved: unknown = JSON.parse(localStorageAccess.get(demoStorageKey).value ?? 'null');

      if (
        isRecord(saved) &&
        saved.version === 3 &&
        validSavedState(saved.state) &&
        validHistory(saved.state)
      )
        state = saved.state;
    } catch {}
  }

  return state;
}

export function updateDemoState(update: (previous: DemoState) => DemoState) {
  const next = update(structuredClone(getDemoState()));
  localStorageAccess.set(demoStorageKey, JSON.stringify({ version: 3, state: next }));
  state = next;

  return next;
}

export function resetDemoState() {
  state = seed();
  localStorageAccess.remove(demoStorageKey);
}

export function unloadDemoState() {
  state = undefined;
}

function validHistory(value: DemoState): boolean {
  const records: unknown = value.records;
  const notifications: unknown = value.notifications;

  return (
    Array.isArray(records) &&
    Array.isArray(notifications) &&
    new Set(records.map((record) => record.id)).size === records.length &&
    records.every(
      (record: unknown) =>
        isRecord(record) &&
        typeof record.id === 'string' &&
        ['taskId', 'taskTitle', 'project', 'module', 'userId'].every(
          (key) => typeof record[key] === 'string',
        ) &&
        validRecordPerson(String(record.userId)) &&
        recordKinds.includes(record.kind as TaskRecordDto['kind']) &&
        typeof record.recordedAt === 'string' &&
        Number.isFinite(Date.parse(record.recordedAt)) &&
        ['inputTokens', 'outputTokens'].every(
          (key) => Number.isSafeInteger(record[key]) && Number(record[key]) >= 0,
        ),
    ) &&
    new Set(notifications.map((item) => item.id)).size === notifications.length &&
    notifications.every(
      (item: unknown) =>
        isRecord(item) &&
        typeof item.id === 'string' &&
        validRecordPerson(String(item.recipientId)) &&
        (item.actorId === 'system' || validRecordPerson(String(item.actorId))) &&
        [...recordKinds, 'ready', 'welcome'].includes(String(item.kind)) &&
        (item.taskId === null || typeof item.taskId === 'string') &&
        typeof item.taskTitle === 'string' &&
        typeof item.project === 'string' &&
        typeof item.createdAt === 'string' &&
        Number.isFinite(Date.parse(item.createdAt)) &&
        (item.readAt === null ||
          (typeof item.readAt === 'string' && Number.isFinite(Date.parse(item.readAt)))),
    )
  );
}

if (typeof window !== 'undefined')
  window.addEventListener('storage', (event) => {
    if (event.key === demoStorageKey) state = undefined;
  });

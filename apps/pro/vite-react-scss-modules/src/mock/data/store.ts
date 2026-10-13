import type { TaskRecordDto } from '@/api/analytics';
import { legacyProjectIds } from '@/api/projects';
import type { TaskDto } from '@/api/tasks';
import { isRecord } from '@/lib/http';
import { localStorageAccess } from '@/lib/storage';

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
    value.profiles !== undefined &&
    (!isRecord(value.profiles) ||
      Object.values(value.profiles).some(
        (entry) =>
          !isRecord(entry) ||
          Object.entries(initial.profile).some(
            ([key, field]) => typeof entry[key] !== typeof field,
          ),
      ))
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
      if (isRecord(saved) && isRecord(saved.state) && [1, 2].includes(Number(saved.version))) {
        const names = new Map([
          ...projects.map((project) => [project.name, project.id] as const),
          ...Object.entries(legacyProjectIds),
        ]);
        for (const key of ['tasks', 'records', 'notifications']) {
          const entries = saved.state[key];
          if (Array.isArray(entries))
            for (const entry of entries)
              if (isRecord(entry) && typeof entry.project === 'string')
                entry.project = names.get(entry.project) ?? entry.project;
        }
      }
      if (
        isRecord(saved) &&
        [1, 2, 3].includes(Number(saved.version)) &&
        validSavedState(saved.state)
      ) {
        if (saved.version === 1) {
          const tasks = migrateSeedDates(saved.state.tasks);
          const migratedRecords = seedTaskRecords(tasks);
          state = {
            ...saved.state,
            tasks,
            records: migratedRecords,
            notifications: seedNotifications(tasks, migratedRecords),
          };
        } else if (validHistory(saved.state)) {
          const savedState = saved.state;
          const tasks = migrateSeedDates(savedState.tasks);
          const changed = tasks.some((task, index) => task !== savedState.tasks[index]);
          if (changed || !saved.state.records.some((record) => record.kind === 'assisted')) {
            const oldIds = new Set(
              saved.state.records
                .filter((record) => record.id.startsWith('seed-'))
                .map((record) => record.taskId),
            );
            const seedTasks = initialTaskState.tasks.filter((task) => oldIds.has(task.id));
            const seedRecords = seedTaskRecords(seedTasks);
            const seedNotices = seedNotifications(seedTasks, seedRecords).map((item) => ({
              ...item,
              readAt:
                savedState.notifications.find((old) => old.id === item.id)?.readAt ?? item.readAt,
            }));
            state = {
              ...saved.state,
              tasks,
              records: [
                ...seedRecords,
                ...saved.state.records.filter((record) => !record.id.startsWith('seed-')),
              ],
              notifications: [
                ...seedNotices,
                ...saved.state.notifications.filter(
                  (item) => !item.id.startsWith('notice-seed-') && item.id !== 'welcome-admin',
                ),
              ],
            };
          } else state = saved.state;
        }
      }
    } catch {
      // A restricted browser or damaged snapshot still permits an in-memory demo.
    }
  }
  return state;
}
export function updateDemoState(update: (previous: DemoState) => DemoState) {
  const next = update(structuredClone(getDemoState()));
  try {
    localStorageAccess.set(demoStorageKey, JSON.stringify({ version: 3, state: next }));
  } catch {
    // Continue the demo when browser storage is unavailable.
  }
  state = next;
  return next;
}
export function resetDemoState() {
  state = seed();
  try {
    localStorageAccess.remove(demoStorageKey);
  } catch {
    /* Storage can be unavailable. */
  }
}
// Used by reload/persistence tests; does not erase the saved snapshot.
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

function migrateSeedDates(tasks: TaskDto[]): TaskDto[] {
  return tasks.map((task) => {
    const index = initialTaskState.tasks.findIndex((seed) => seed.id === task.id);
    if (index < 0) return task;
    const fresh = initialTaskState.tasks[index]!;
    const day = 86400000;
    const legacyCreated =
      index === 0
        ? Date.UTC(2026, 9, 1, 3, 20)
        : Date.UTC(2026, 8, 30 - Math.floor(index / 10), 2 + (index % 8), index % 60);
    const legacyCompleted = Date.UTC(2026, 8, 18 + (index % 14), 9 + (index % 7));
    const oldCreated = new Date(
      fresh.status === 'done' ? Math.min(legacyCreated, legacyCompleted - 3 * day) : legacyCreated,
    ).toISOString();
    const oldCompleted = fresh.status === 'done' ? new Date(legacyCompleted).toISOString() : null;
    const oldDue =
      fresh.status === 'backlog' && index % 3 === 0
        ? ''
        : new Date(fresh.status === 'done' ? legacyCompleted : Date.UTC(2026, 9, 2 + (index % 27)))
            .toISOString()
            .slice(0, 10);
    const createdAt = task.createdAt === oldCreated ? fresh.createdAt : task.createdAt;
    const completedAt =
      oldCompleted !== null && task.completedAt === oldCompleted
        ? fresh.completedAt
        : task.completedAt;
    const dueDate = task.dueDate === oldDue ? fresh.dueDate : task.dueDate;
    return createdAt === task.createdAt &&
      completedAt === task.completedAt &&
      dueDate === task.dueDate
      ? task
      : { ...task, createdAt, completedAt, dueDate };
  });
}

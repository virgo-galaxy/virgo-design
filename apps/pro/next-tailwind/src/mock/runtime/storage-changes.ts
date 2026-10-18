import { isRecord } from '@/lib/validation/is-record';

function state(raw: string | null) {
  try {
    const record: unknown = JSON.parse(raw ?? 'null');

    return isRecord(record) ? record : null;
  } catch {
    return null;
  }
}

export function demoStorageChanges(oldValue: string | null, newValue: string | null) {
  const oldState = state(oldValue),
    next = state(newValue);

  const changed = (...keys: string[]) =>
    !oldState ||
    !next ||
    keys.some((key) => JSON.stringify(oldState[key]) !== JSON.stringify(next[key]));

  return {
    tasks: changed('tasks', 'records'),
    catalog: changed('projects'),
    profile: changed('profile', 'profiles'),
    workflows: changed('workflows'),
    notifications: changed('notifications'),
  };
}

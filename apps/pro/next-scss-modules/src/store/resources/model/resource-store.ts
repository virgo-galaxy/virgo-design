import { createStore } from 'zustand/vanilla';

export interface ResourceChanges {
  tasks: boolean;
  catalog: boolean;
  profile: boolean;
  workflows: boolean;
  notifications: boolean;
}

export type ResourceName = keyof ResourceChanges;
export type ResourceSubscriber = (listener: (changes: ResourceChanges) => void) => () => void;

export interface ResourceState {
  revisions: Record<ResourceName, number>;
  invalidate: (changes: Partial<ResourceChanges>) => void;
}

export function createResourceStore() {
  return createStore<ResourceState>()((set) => ({
    revisions: { tasks: 0, catalog: 0, profile: 0, workflows: 0, notifications: 0 },
    invalidate: (changes) =>
      set(({ revisions }) => ({
        revisions: {
          tasks: revisions.tasks + (changes.tasks ? 1 : 0),
          catalog: revisions.catalog + (changes.tasks || changes.catalog ? 1 : 0),
          profile: revisions.profile + (changes.profile ? 1 : 0),
          workflows: revisions.workflows + (changes.workflows ? 1 : 0),
          notifications: revisions.notifications + (changes.tasks || changes.notifications ? 1 : 0),
        },
      })),
  }));
}

export type ResourceStore = ReturnType<typeof createResourceStore>;

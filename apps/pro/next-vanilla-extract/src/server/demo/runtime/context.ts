import 'server-only';

import { AsyncLocalStorage } from 'node:async_hooks';

import type { TaskListDto } from '@/api/tasks/types';

import type { DemoState } from '../model/state';

export type DemoArea = 'tasks' | 'catalog' | 'profile' | 'workflows' | 'notifications';

export const demoAreas: readonly DemoArea[] = [
  'tasks',
  'catalog',
  'profile',
  'workflows',
  'notifications',
];

export interface DemoSandbox {
  state: DemoState | undefined;
  timelineDate: string;
  tokens: Map<string, { userId: string; expiresAt: string }>;
  snapshots: Map<string, { owner: string; expiresAt: number; data: TaskListDto }>;
  touchedAt: number;
  mutations: Promise<void>;
}

export interface DemoContext {
  sandbox: DemoSandbox;
  changes: Set<DemoArea>;
}

interface DemoRuntime {
  context: AsyncLocalStorage<DemoContext>;
  sandboxes: Map<string, DemoSandbox>;
}

const target = globalThis as typeof globalThis & { __virgoProDemoRuntime?: DemoRuntime };

export const demoRuntime = (target.__virgoProDemoRuntime ??= {
  context: new AsyncLocalStorage<DemoContext>(),
  sandboxes: new Map<string, DemoSandbox>(),
});

export function createDemoSandbox(): DemoSandbox {
  return {
    state: undefined,
    timelineDate: '',
    tokens: new Map(),
    snapshots: new Map(),
    touchedAt: Date.now(),
    mutations: Promise.resolve(),
  };
}

export function getDemoContext(): DemoContext {
  const context = demoRuntime.context.getStore();
  if (!context) throw new Error('Demo data requires a server request context');
  return context;
}

export function getDemoSandbox() {
  return getDemoContext().sandbox;
}

import { createContext, useContext } from 'react';

import type { Task, TaskAction } from '../model/task';
export interface TaskOperations {
  dispatch: (action: TaskAction) => Promise<Task>;
  removeTasks: (ids: readonly string[]) => Promise<string[]>;
}
export const TaskOperationsContext = createContext<TaskOperations | null>(null);
export const TaskRevisionContext = createContext(0);
export function useTaskOperations() {
  const value = useContext(TaskOperationsContext);
  if (!value) throw new Error('Task operations provider is required');
  return value;
}
export const useTaskRevision = () => useContext(TaskRevisionContext);

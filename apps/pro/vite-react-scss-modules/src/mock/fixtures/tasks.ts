import { createTaskHistory } from './task-history';
import { members, projectIds } from './team';

export const taskReferenceDate = '2026-10-05';
export const taskProjects = [...projectIds];
export const taskAssignees = members;
export const initialTaskState = { tasks: createTaskHistory(), nextId: 1000 };

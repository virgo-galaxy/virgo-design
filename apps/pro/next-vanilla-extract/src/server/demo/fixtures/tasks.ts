import 'server-only';

import { demoDate } from './dates';
import { createTaskHistory } from './task-history';
import { members, projectIds } from './team';

export const taskReferenceDate = demoDate();
export const taskProjects = [...projectIds];
export const taskAssignees = members;
export const initialTaskState = { tasks: createTaskHistory(), nextId: 1000 };

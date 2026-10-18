import { createContext } from 'react';

import type { TaskTableStore } from '../model/task-table-store';

export const TaskTableStoreContext = createContext<TaskTableStore | null>(null);

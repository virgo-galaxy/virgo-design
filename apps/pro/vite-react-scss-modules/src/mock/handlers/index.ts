import { analyticsHandlers } from './analytics';
import { profileHandlers } from './profile';
import { projectsHandlers } from './projects';
import { tasksHandlers } from './tasks';
import { workflowsHandlers } from './workflows';
export const handlers = [
  ...tasksHandlers,
  ...projectsHandlers,
  ...analyticsHandlers,
  ...profileHandlers,
  ...workflowsHandlers,
];

import { analyticsHandlers } from './analytics';
import { authHandlers } from './auth';
import { avatarsHandlers } from './avatars';
import { profileHandlers } from './profile';
import { projectsHandlers } from './projects';
import { tasksHandlers } from './tasks';
import { usersHandlers } from './users';
import { workflowsHandlers } from './workflows';
export const handlers = [
  ...authHandlers,
  ...avatarsHandlers,
  ...tasksHandlers,
  ...usersHandlers,
  ...projectsHandlers,
  ...analyticsHandlers,
  ...profileHandlers,
  ...workflowsHandlers,
];

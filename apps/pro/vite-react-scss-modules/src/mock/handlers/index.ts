import { analyticsHandlers } from './analytics';
import { authHandlers } from './auth';
import { avatarsHandlers } from './avatars';
import { demoHandlers } from './demo';
import { notificationHandlers } from './notifications';
import { profileHandlers } from './profile';
import { projectsHandlers } from './projects';
import { tasksHandlers } from './tasks';
import { usersHandlers } from './users';
import { workflowsHandlers } from './workflows';
export const handlers = [
  ...authHandlers,
  ...demoHandlers,
  ...avatarsHandlers,
  ...tasksHandlers,
  ...usersHandlers,
  ...projectsHandlers,
  ...analyticsHandlers,
  ...notificationHandlers,
  ...profileHandlers,
  ...workflowsHandlers,
];

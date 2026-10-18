import { exceptionsEnUS, exceptionsZhCN } from '@/components/exception-state/locales';
import { languageControlEnUS, languageControlZhCN } from '@/components/language-control/locales';
import {
  themeStyleControlEnUS,
  themeStyleControlZhCN,
} from '@/components/theme-style-control/locales';
import { aiWorkspaceEnUS, aiWorkspaceZhCN } from '@/features/ai-workspace/locales';
import { analyticsEnUS, analyticsZhCN } from '@/features/analytics/locales';
import { authEnUS, authZhCN } from '@/features/auth/locales';
import { handoffEnUS, handoffZhCN, resultsEnUS, resultsZhCN } from '@/features/handoff/locales';
import { notificationsEnUS, notificationsZhCN } from '@/features/notifications/locales';
import { profileEnUS, profileZhCN } from '@/features/profile/locales';
import {
  projectDetailsEnUS,
  projectDetailsZhCN,
  projectsEnUS,
  projectsZhCN,
} from '@/features/projects/locales';
import { tasksEnUS, tasksZhCN } from '@/features/tasks/locales';
import { workplaceEnUS, workplaceZhCN } from '@/features/workplace/locales';
import { settingsEnUS, settingsZhCN } from '@/preferences/locales';

import type { LocaleOf } from '../model/locale-types';
import { appEnUS } from './app/en-US';
import { appZhCN } from './app/zh-CN';
import { sharedEnUS } from './shared/en-US';
import { sharedZhCN } from './shared/zh-CN';

export const enUS = {
  app: appEnUS,
  notifications: notificationsEnUS,
  aiWorkspace: aiWorkspaceEnUS,
  auth: authEnUS,
  settings: settingsEnUS,
  languageControl: languageControlEnUS,
  themeStyleControl: themeStyleControlEnUS,
  analytics: analyticsEnUS,
  projectDetails: projectDetailsEnUS,
  exceptions: exceptionsEnUS,
  handoff: handoffEnUS,
  profile: profileEnUS,
  projects: projectsEnUS,
  results: resultsEnUS,
  shared: sharedEnUS,
  tasks: tasksEnUS,
  workplace: workplaceEnUS,
} as const;

export const zhCN = {
  app: appZhCN,
  notifications: notificationsZhCN,
  aiWorkspace: aiWorkspaceZhCN,
  auth: authZhCN,
  settings: settingsZhCN,
  languageControl: languageControlZhCN,
  themeStyleControl: themeStyleControlZhCN,
  analytics: analyticsZhCN,
  projectDetails: projectDetailsZhCN,
  exceptions: exceptionsZhCN,
  handoff: handoffZhCN,
  profile: profileZhCN,
  projects: projectsZhCN,
  results: resultsZhCN,
  shared: sharedZhCN,
  tasks: tasksZhCN,
  workplace: workplaceZhCN,
} satisfies LocaleOf<typeof enUS>;

import { languageControlEnUS, languageControlZhCN } from '@/components/language-control/locales';
import {
  themeStyleControlEnUS,
  themeStyleControlZhCN,
} from '@/components/theme-style-control/locales';
import { aiWorkspaceEnUS, aiWorkspaceZhCN } from '@/features/ai-workspace/locales';
import { analyticsEnUS, analyticsZhCN } from '@/features/analytics/locales';
import { authEnUS, authZhCN } from '@/features/auth/locales';
import { handoffEnUS, handoffZhCN } from '@/features/handoff/locales';
import { notificationsEnUS, notificationsZhCN } from '@/features/notifications/locales';
import { profileEnUS, profileZhCN } from '@/features/profile/locales';
import {
  projectDetailsEnUS,
  projectDetailsZhCN,
  projectsEnUS,
  projectsZhCN,
} from '@/features/projects/locales';
import { settingsEnUS, settingsZhCN } from '@/features/settings/locales';
import { tasksEnUS, tasksZhCN } from '@/features/tasks/locales';
import type { LocaleOf } from '@/i18n';
import { controlsEnUS } from '@/i18n/locales/shared/controls/en-US';
import { controlsZhCN } from '@/i18n/locales/shared/controls/zh-CN';
import { sharedEnUS } from '@/i18n/locales/shared/en-US';
import { sharedZhCN } from '@/i18n/locales/shared/zh-CN';
import { exceptionsEnUS, exceptionsZhCN } from '@/pages/exceptions/locales';
import { resultsEnUS, resultsZhCN } from '@/pages/results/locales';
import { workplaceEnUS, workplaceZhCN } from '@/pages/workplace/locales';

import { appEnUS } from '../../locales/en-US';
import { appZhCN } from '../../locales/zh-CN';
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
  shared: { ...sharedEnUS, controls: controlsEnUS },
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
  shared: { ...sharedZhCN, controls: controlsZhCN },
  tasks: tasksZhCN,
  workplace: workplaceZhCN,
} satisfies LocaleOf<typeof enUS>;

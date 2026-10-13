import { controlsEnUS } from '@/i18n/locales/shared/controls/en-US';
import { controlsZhCN } from '@/i18n/locales/shared/controls/zh-CN';
import { sharedEnUS } from '@/i18n/locales/shared/en-US';
import { sharedZhCN } from '@/i18n/locales/shared/zh-CN';

import { appEnUS } from '../app/locales/en-US';
import { appZhCN } from '../app/locales/zh-CN';
import { settingsEnUS } from '../components/global-settings/locales/en-US';
import { settingsZhCN } from '../components/global-settings/locales/zh-CN';
import { languageControlEnUS } from '../components/language-control/locales/en-US';
import { languageControlZhCN } from '../components/language-control/locales/zh-CN';
import { themeStyleControlEnUS } from '../components/theme-style-control/locales/en-US';
import { themeStyleControlZhCN } from '../components/theme-style-control/locales/zh-CN';
import { analyticsEnUS } from '../pages/analytics/locales/en-US';
import { analyticsZhCN } from '../pages/analytics/locales/zh-CN';
import { exceptionsEnUS } from '../pages/exceptions/locales/en-US';
import { exceptionsZhCN } from '../pages/exceptions/locales/zh-CN';
import { profileEnUS } from '../pages/profile/locales/en-US';
import { profileZhCN } from '../pages/profile/locales/zh-CN';
import { projectDetailsEnUS } from '../pages/projects/locales/detail/en-US';
import { projectDetailsZhCN } from '../pages/projects/locales/detail/zh-CN';
import { projectsEnUS } from '../pages/projects/locales/en-US';
import { handoffEnUS } from '../pages/projects/locales/handoff/en-US';
import { handoffZhCN } from '../pages/projects/locales/handoff/zh-CN';
import { projectsZhCN } from '../pages/projects/locales/zh-CN';
import { resultsEnUS } from '../pages/results/locales/en-US';
import { resultsZhCN } from '../pages/results/locales/zh-CN';
import { tasksEnUS } from '../pages/tasks/locales/en-US';
import { tasksZhCN } from '../pages/tasks/locales/zh-CN';
import { workplaceEnUS } from '../pages/workplace/locales/en-US';
import { workplaceZhCN } from '../pages/workplace/locales/zh-CN';
import type { LocaleOf } from './locale-types';
export const enUS = {
  app: appEnUS,
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

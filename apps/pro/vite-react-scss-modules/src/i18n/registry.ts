import { appEnUS } from '../app/locales/en-US';
import { appZhCN } from '../app/locales/zh-CN';
import { settingsEnUS } from '../components/global-settings/locales/en-US';
import { settingsZhCN } from '../components/global-settings/locales/zh-CN';
import { languageControlEnUS } from '../components/language-control/locales/en-US';
import { languageControlZhCN } from '../components/language-control/locales/zh-CN';
import { analyticsEnUS } from '../pages/analytics/locales/en-US';
import { analyticsZhCN } from '../pages/analytics/locales/zh-CN';
import { dataEnUS } from '../pages/data/locales/en-US';
import { dataZhCN } from '../pages/data/locales/zh-CN';
import { exceptionsEnUS } from '../pages/exceptions/locales/en-US';
import { exceptionsZhCN } from '../pages/exceptions/locales/zh-CN';
import { formsEnUS } from '../pages/forms/locales/en-US';
import { formsZhCN } from '../pages/forms/locales/zh-CN';
import { profileEnUS } from '../pages/profile/locales/en-US';
import { profileZhCN } from '../pages/profile/locales/zh-CN';
import { projectsEnUS } from '../pages/projects/locales/en-US';
import { projectsZhCN } from '../pages/projects/locales/zh-CN';
import { resultsEnUS } from '../pages/results/locales/en-US';
import { resultsZhCN } from '../pages/results/locales/zh-CN';
import { controlsEnUS } from '../pages/shared/locales/controls/en-US';
import { controlsZhCN } from '../pages/shared/locales/controls/zh-CN';
import { sharedEnUS } from '../pages/shared/locales/en-US';
import { sharedZhCN } from '../pages/shared/locales/zh-CN';
import { tasksEnUS } from '../pages/tasks/locales/en-US';
import { tasksZhCN } from '../pages/tasks/locales/zh-CN';
import { workplaceEnUS } from '../pages/workplace/locales/en-US';
import { workplaceZhCN } from '../pages/workplace/locales/zh-CN';
import type { LocaleOf } from './locale-types';
export const enUS = {
  app: appEnUS,
  settings: settingsEnUS,
  languageControl: languageControlEnUS,
  analytics: analyticsEnUS,
  data: dataEnUS,
  exceptions: exceptionsEnUS,
  forms: formsEnUS,
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
  analytics: analyticsZhCN,
  data: dataZhCN,
  exceptions: exceptionsZhCN,
  forms: formsZhCN,
  profile: profileZhCN,
  projects: projectsZhCN,
  results: resultsZhCN,
  shared: { ...sharedZhCN, controls: controlsZhCN },
  tasks: tasksZhCN,
  workplace: workplaceZhCN,
} satisfies LocaleOf<typeof enUS>;

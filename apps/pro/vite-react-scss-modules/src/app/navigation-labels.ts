import type { TFunction } from 'i18next';

import type { ProPageKey } from './routes.config';

const pageKeys = {
  workplace: 'app.workplace',
  analytics: 'app.analytics',
  tasks: 'app.tasks',
  projects: 'app.projects',
  'search-table': 'app.searchTable',
  'data-list': 'app.dataList',
  detail: 'app.detail',
  'basic-form': 'app.basicForm',
  'step-form': 'app.stepForm',
  success: 'app.success',
  error: 'app.error',
  'exception-403': 'app.exception403',
  'exception-404': 'app.exception404',
  'exception-500': 'app.exception500',
  profile: 'app.profile',
  'not-found': 'app.pageNotFound',
} as const satisfies Record<ProPageKey, string>;

export function getPageLabel(t: TFunction, page: ProPageKey) {
  return t(pageKeys[page]);
}

export function getGroupLabel(t: TFunction, id: string) {
  switch (id) {
    case 'dashboard':
      return t('app.dashboard');
    case 'work':
      return t('app.work');
    case 'data':
      return t('app.data');
    case 'form':
      return t('app.form');
    case 'result':
      return t('app.result');
    case 'exception':
      return t('app.exception');
    case 'profile':
      return t('app.profile');
    default:
      return t('app.mainNavigation');
  }
}

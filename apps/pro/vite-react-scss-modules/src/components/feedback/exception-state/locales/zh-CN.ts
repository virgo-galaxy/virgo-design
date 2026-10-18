import type { LocaleOf } from '@/i18n';

import type { exceptionsEnUS } from './en-US';
export const exceptionsZhCN = {
  accessDenied: '无权访问',
  youDonTHaveAccessToThisResource: '你没有访问此资源的权限。',
  pageNotFound: '页面未找到',
  thisPageHasMovedOrNoLongerExists: '此页面已移动或不再存在。',
  serverError: '服务器错误',
  somethingWentWrongOnTheServerPleaseTryAgain: '服务器发生错误，请重试。',
  retry: '重试',
  backToWorkplace: '返回工作台',
} satisfies LocaleOf<typeof exceptionsEnUS>;

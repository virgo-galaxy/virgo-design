import type { LocaleOf } from '@/i18n';

import type { sidebarEnUS } from './en-US';

export const sidebarZhCN = {
  expand: '展开侧栏',
  collapse: '收起侧栏',
  closeNavigation: '关闭导航',
  mainNavigation: '主导航',
} satisfies LocaleOf<typeof sidebarEnUS>;

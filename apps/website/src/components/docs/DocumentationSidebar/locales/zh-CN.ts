import type { LocaleOf } from '@/i18n/locale-types';

import { documentationSidebarEnUS } from './en-US';

export const documentationSidebarZhCN = {
  sidebar: {
    collapse: '收起侧边栏',
    expand: '展开侧边栏',
    componentsLabel: '组件侧边栏',
    componentNavigation: '组件导航',
    primitivesLabel: '原语侧边栏',
    primitiveNavigation: '原语导航',
  },
} satisfies LocaleOf<typeof documentationSidebarEnUS>;

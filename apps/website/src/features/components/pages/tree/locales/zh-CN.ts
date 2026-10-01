import type { LocaleOf } from '@/i18n/locale-types';

import type { treeEnUS } from './en-US';
export const treeZhCN = {
  overview: {
    description: '可访问的嵌套层级，支持显式选择、受控展开与键盘导航。',
  },
  specimen: {
    referenceSpecimen: '参考示例',
    contract: '语义组合',
  },
} satisfies LocaleOf<typeof treeEnUS>;

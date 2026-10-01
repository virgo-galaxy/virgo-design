import type { LocaleOf } from '@/i18n/locale-types';

import type { tableEnUS } from './en-US';
export const tableZhCN = {
  overview: {
    description: '语义表格提供密度、对齐、边框与滚动，数据操作由应用管理。',
  },
  specimen: {
    referenceSpecimen: '参考示例',
    contract: '语义组合',
  },
} satisfies LocaleOf<typeof tableEnUS>;

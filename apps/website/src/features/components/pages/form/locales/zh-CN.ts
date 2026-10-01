import type { LocaleOf } from '@/i18n/locale-types';

import type { formEnUS } from './en-US';
export const formZhCN = {
  overview: {
    description: '原生表单组合与统一字段布局。应用管理数据、校验和提交状态。',
  },
  specimen: {
    referenceSpecimen: '参考示例',
    contract: '语义组合',
  },
} satisfies LocaleOf<typeof formEnUS>;

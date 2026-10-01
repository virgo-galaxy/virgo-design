import type { LocaleOf } from '@/i18n/locale-types';

import type { fieldEnUS } from './en-US';
export const fieldZhCN = {
  overview: {
    description: '单控件字段，自动关联标签、说明、消息与状态。',
  },
  specimen: {
    referenceSpecimen: '参考示例',
    contract: '语义组合',
  },
} satisfies LocaleOf<typeof fieldEnUS>;

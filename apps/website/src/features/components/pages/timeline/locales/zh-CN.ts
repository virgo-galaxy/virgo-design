import type { LocaleOf } from '@/i18n/locale-types';

import { timelineEnUS } from './en-US';
export const timelineZhCN = {
  overview: {
    description: '带时间、描述与进度样式的有序事件序列。',
  },
  specimen: {
    referenceSpecimen: '参考示例',
    contract: '语义组合',
  },
} satisfies LocaleOf<typeof timelineEnUS>;

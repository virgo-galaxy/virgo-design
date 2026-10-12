import type { LocaleOf } from '@/i18n/locale-types';

import { timelineExamplesEnUS } from './en-US';
export const timelineExamplesZhCN = {
  copy: {
    created: '事件 A',
    createdHint: '示例事件说明。',
    review: '事件 B',
    reviewHint: '补充事件说明。',
    release: '事件 C',
    title0: '事件与时间',
    description0: '原生列表与 time 语义保留阅读顺序。',
    title1: '紧凑自定义指示符',
    description1: '使用已有图标组合时间序列。',
  },
} satisfies LocaleOf<typeof timelineExamplesEnUS>;

import type { LocaleOf } from '@/i18n/locale-types';

import { timelineExamplesEnUS } from './en-US';
export const timelineExamplesZhCN = {
  copy: {
    created: '项目已创建',
    createdHint: '工作区与文件已准备就绪。',
    review: '设计评审',
    reviewHint: '发布前检查组件。',
    release: '发布',
    title0: '事件与时间',
    description0: '原生列表与 time 语义保留阅读顺序。',
    title1: '紧凑自定义指示符',
    description1: '使用已有图标组合时间序列。',
  },
} satisfies LocaleOf<typeof timelineExamplesEnUS>;

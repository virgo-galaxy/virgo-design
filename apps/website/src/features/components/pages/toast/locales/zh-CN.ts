import type { LocaleOf } from '@/i18n/locale-types';

import type { toastEnUS } from './en-US';

export const toastZhCN = {
  overview: {
    description: '简短反馈可自行播报，不打断当前任务，也不移动焦点。',
  },
  facts: {
    placement: '位置',
    priority: '优先级',
    politeAssertive: '礼貌播报 · 即时播报',
    actions: '操作',
    optional: '可选',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    nonBlockingFeedback: '非阻塞反馈',
    semanticStatus: '语义状态',
    actionableDismissal: '可操作的关闭',
  },
  status: {
    title: '状态变体',
    description: '各语义意图使用状态 token 和 Virgo Icons 图标。',
  },
  stack: {
    title: '操作与堆叠',
    description: '创建多条通知。悬停或聚焦某条通知时，仅暂停该通知的剩余时长。',
  },
  placement: {
    title: '视口位置',
    description: '选择位置，在预览画布中显示通知。其他示例保留各自的视口与通知。',
  },
} satisfies LocaleOf<typeof toastEnUS>;

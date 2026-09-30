import type { LocaleOf } from '@/i18n/locale-types';

import type { emptyEnUS } from './en-US';

export const emptyZhCN = {
  overview: {
    description: '由应用提供空内容文案，以语义化、可组合的结构呈现。',
  },
  facts: {
    slots: '插槽',
    sizes: '尺寸',
    intent: '语义意图',
    neutral: '中性',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    consumerCopy: '使用方文案',
    composableSlots: '可组合插槽',
    neutralGuidance: '中性引导',
  },
  basic: {
    title: '基础用法与描述',
    description: '每个词都由使用方提供；Empty 仅提供稳定的结构与呈现。',
  },
  complete: {
    title: '图标、描述与操作',
    description: '可选插槽组合现有图标与控件，不添加业务逻辑。',
  },
  searchCompact: {
    title: '搜索与紧凑状态',
    description: '小尺寸适合受限空间，并保留相同结构。',
  },
} satisfies LocaleOf<typeof emptyEnUS>;

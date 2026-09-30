import type { LocaleOf } from '@/i18n/locale-types';

import type { progressEnUS } from './en-US';

export const progressZhCN = {
  overview: {
    description: '为已知完成量的任务提供确定进度。',
  },
  facts: {
    state: '状态',
    determinate: '确定进度',
    sizes: '尺寸',
    intents: '语义意图',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    clampedValues: '限制数值范围',
    visibleStatus: '可见状态',
    semanticIntent: '语义意图',
  },
  values: {
    title: '数值与边界',
    description: '数值相对于 max 归一化，在未开始与完成边界如实呈现。',
  },
  sizes: {
    title: '尺寸',
    description: '尺寸改变轨道厚度，不改变语义值。',
  },
  intents: {
    title: '语义意图',
    description: '语义意图使用 Virgo 状态颜色，表达有意义的任务结果。',
  },
} satisfies LocaleOf<typeof progressEnUS>;

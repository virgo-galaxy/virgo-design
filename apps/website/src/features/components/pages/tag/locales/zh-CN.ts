import type { LocaleOf } from '@/i18n/locale-types';

import type { tagEnUS } from './en-US';

export const tagZhCN = {
  overview: {
    description: '紧凑的独立标签，用于分类、状态和简短元信息。',
  },
  facts: {
    variants: '变体',
    sizes: '尺寸',
    behaviors: '行为',
    closable: '可关闭',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    classification: '分类',
    semanticColor: '语义颜色',
    removableMetadata: '可移除元信息',
  },
  intents: {
    title: '语义意图',
    description: '调色板在浅色与深色主题中沿用现有 Virgo 品牌与状态 token。',
  },
  variants: {
    title: '变体与尺寸',
    description: 'soft、solid 和 outline 样式共享三种紧凑密度。',
  },
  composition: {
    title: '图标与可关闭集合',
    description: '图标仅用于装饰。关闭按钮通知使用方，本示例通过应用状态移除对应条目。',
  },
} satisfies LocaleOf<typeof tagEnUS>;

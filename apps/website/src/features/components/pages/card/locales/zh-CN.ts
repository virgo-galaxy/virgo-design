import type { LocaleOf } from '@/i18n/locale-types';

import type { cardEnUS } from './en-US';

export const cardZhCN = {
  overview: {
    description: '基于 Surface token 组织内容结构，不引入隐式交互。',
  },
  facts: {
    variants: '变体',
    sizes: '尺寸',
    slots: '插槽',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    surfaceBacked: '基于 Surface',
    consumerOwnedContent: '由使用方提供内容',
    explicitActions: '显式操作',
  },
  structure: {
    title: '基础用法与标题区',
    description: 'Card 组织相关内容；文档标题层级由使用方选择。',
  },
  actions: {
    title: '底部操作',
    description: '操作以显式控件的形式组合到 Footer 插槽。',
  },
  variants: {
    title: '描边与层级',
    description: '变体直接对应现有 Surface 的边框、色调、圆角与层级 token。',
  },
  composition: {
    title: 'Avatar、Badge 与任意组合',
    description: 'Card 接受普通 children，不限制内容必须使用其自身结构。',
  },
} satisfies LocaleOf<typeof cardEnUS>;

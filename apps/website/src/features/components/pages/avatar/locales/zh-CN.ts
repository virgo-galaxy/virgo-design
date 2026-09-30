import type { LocaleOf } from '@/i18n/locale-types';

import type { avatarEnUS } from './en-US';

export const avatarZhCN = {
  overview: {
    description: '使用基于 token 的尺寸、可靠的后备内容和简单分组呈现身份图像。',
  },
  facts: {
    sources: '来源',
    image: '图像',
    fallback: '后备内容',
    text: '文本',
    composition: '组合',
    group: '分组',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    image: '图像',
    fallback: '后备内容',
    presenceAndGroup: '在线状态与分组',
  },
  content: {
    title: '图像与后备内容',
    description: '没有图像来源或加载失败时，显示后备内容。',
  },
  sizes: {
    title: '尺寸与形状',
    description: '三种固定尺寸支持圆形个人头像与方形实体图像。',
  },
  composition: {
    title: 'Badge 与分组组合',
    description: '在线状态由 Badge 负责；分组保持为轻量的视觉集合。',
  },
} satisfies LocaleOf<typeof avatarEnUS>;

import type { LocaleOf } from '@/i18n/locale-types';

import type { skeletonEnUS } from './en-US';

export const skeletonZhCN = {
  overview: {
    description: '在真实内容加载时，以视觉占位保持布局稳定。',
  },
  facts: {
    shapes: '形状',
    textBlockCircle: '文本 · 块状 · 圆形',
    motion: '动效',
    optional: '可选',
    purpose: '用途',
    layoutPreservation: '保持布局',
  },
  specimen: {
    summary: '卡片占位 · 动画',
    referenceSpecimen: '参考样例',
    predictableDimensions: '可预期尺寸',
    contentLoading: '内容加载',
    reducedMotionAware: '适配减少动态效果偏好',
  },
  variants: {
    title: '文本、矩形与圆形',
    description: '少量形状覆盖文本行、媒体块与头像占位。',
  },
  card: {
    title: 'Card 占位',
    description: '原生尺寸与常规布局组合使 API 保持可预期。',
  },
  motion: {
    title: '动效控制',
    description: '脉冲动效默认开启，可关闭，并遵循减少动态效果偏好。',
  },
} satisfies LocaleOf<typeof skeletonEnUS>;

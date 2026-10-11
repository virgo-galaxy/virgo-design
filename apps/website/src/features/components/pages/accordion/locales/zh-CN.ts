import type { LocaleOf } from '@/i18n/locale-types';

import type { accordionEnUS } from './en-US';

export const accordionZhCN = {
  overview: {
    description: '通过可访问的标题按钮和带标签的内容区域，逐步展开相关章节。',
  },
  facts: {
    modes: '模式',
    sizes: '尺寸',
    variants: '变体',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    ariaHeadings: 'ARIA 标题',
    arrowNavigation: '方向键导航',
    defaultStyle: '默认样式',
  },
  variants: {
    title: '变体',
    description: 'default 使用分隔线，bordered 将项目归入同一表面，ghost 移除视觉分隔。',
  },
  sizes: {
    title: '尺寸',
    description: '尺寸统一调整标题高度、字体、图标与内容间距，以确定整体密度。',
  },
  modes: {
    title: '选择模式',
    description: 'single 模式最多展开一个章节；multiple 模式允许各章节独立切换。',
  },
} satisfies LocaleOf<typeof accordionEnUS>;

import type { LocaleOf } from '@/i18n/locale-types';

import type { buttonEnUS } from './en-US';

export const buttonZhCN = {
  overview: {
    description: '触发即时操作。基于 Virgo 原生 primitive 构建，并与完整的 token 基础体系对齐。',
  },
  facts: {
    variants: '变体',
    sizes: '尺寸',
    states: '状态',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    '28pxHeight': '高度 28px',
    '12pxLabel': '标签字号 12px',
    radius6: '圆角 6',
  },
  variants: {
    title: '变体',
    description: '为常见产品操作提供四级强调层次。',
  },
  sizes: {
    title: '尺寸',
    description: '四种高度直接对应 Virgo 尺寸基础体系。',
  },
  icons: {
    title: '图标',
    description: '图标继承 currentColor，尺寸与间距由 Button 管理。',
  },
  states: {
    title: '状态',
    description: '悬停和激活状态可直接交互；使用 Tab 检查 focus-visible 焦点环。',
  },
} satisfies LocaleOf<typeof buttonEnUS>;

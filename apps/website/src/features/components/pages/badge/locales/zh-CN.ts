import type { LocaleOf } from '@/i18n/locale-types';

import type { badgeEnUS } from './en-US';

export const badgeZhCN = {
  overview: {
    description: '附着于宿主元素的小型计数或状态标记，也可独立行内显示。',
  },
  facts: {
    forms: '形态',
    count: '计数',
    status: '状态',
    dot: '圆点',
    standalone: '独立使用',
    inline: '行内',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    attachedCount: '附着计数',
    statusDot: '状态圆点',
    inlineMetadata: '行内元信息',
  },
  counts: {
    title: '计数与溢出',
    description: '数值计数保持紧凑，以 max 为上限；除非显式设置 showZero，否则隐藏零值。',
  },
  status: {
    title: '圆点与语义意图',
    description: '有意义的圆点使用无障碍标签；语义意图不依赖任意颜色。',
  },
  composition: {
    title: '按钮、图标与独立徽标',
    description: '指示器忽略指针事件，包裹的控件保留正常交互。',
  },
} satisfies LocaleOf<typeof badgeEnUS>;

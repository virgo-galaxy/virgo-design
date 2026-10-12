import type { LocaleOf } from '@/i18n/locale-types';

import type { drawerEnUS } from './en-US';

export const drawerZhCN = {
  overview: {
    description:
      '从任意屏幕边缘打开临时检查器、设置面板或辅助示例区域，同时保留 Dialog 的交互模型。',
  },
  facts: {
    placements: '位置',
    sizes: '尺寸',
    default: '默认',
    right: '右侧',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    dialogBehavior: 'Dialog 交互行为',
    edgeMotion: '边缘动效',
    scrollableBody: '可滚动正文',
  },
  placements: {
    title: '位置',
    description: '选择最能保留下层示例区域上下文的物理屏幕边缘。',
  },
  sizes: {
    title: '尺寸',
    description: '尺寸控制侧边抽屉的宽度，以及顶部或底部抽屉的高度。',
  },
  anatomy: {
    title: '标题区、正文与底部',
    description: '正文可伸缩并独立滚动，标题区与操作区域保持稳定。',
  },
  form: {
    title: '表单内容',
    description: '受控状态允许应用验证并保存表单后再关闭面板。',
  },
  nonModal: {
    title: '非模态抽屉',
    description: '周围示例区域需要保持直接交互时，使用非模态行为。',
  },
} satisfies LocaleOf<typeof drawerEnUS>;

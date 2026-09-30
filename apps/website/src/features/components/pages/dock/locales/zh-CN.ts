import type { LocaleOf } from '@/i18n/locale-types';

import type { dockEnUS } from './en-US';

export const dockZhCN = {
  overview: {
    description:
      '将可移动界面区域附着到边界边缘，支持吸附或连续定位、独立移动锁定与固定，以及可选的浏览器持久化。',
  },
  facts: {
    edges: '边缘',
    positioning: '定位',
    orientations: '方向',
    storage: '存储',
  },
  specimen: {
    summary: '顶部 · 12 个吸附分区',
    referenceSpecimen: '参考样例',
    interactionChrome: '交互控件',
    snapFreePlacement: '吸附与自由定位',
    keyboardRepositioning: '键盘重新定位',
    startEndHandle: '起始 / 末尾手柄',
  },
  controlledPlacement: {
    title: '位置控制',
    description:
      '通过产品状态控制 top、right、bottom 和 left 位置，指针与键盘交互仍持续报告归一化位置。',
  },
  freePositioning: {
    title: '自由定位',
    description:
      '将 snapDivisions 设置为 false，可实现连续的归一化指针移动、精确默认位置和 1% 的键盘微调。',
  },
  persistentPlacement: {
    title: '持久化位置',
    description:
      '非受控 Dock 可通过使用方显式提供的键，从 local 或 session storage 恢复归一化位置。',
  },
  handlePosition: {
    title: '手柄位置',
    description:
      'Dock.Handle 默认为逻辑起始端，也可移到逻辑末尾端，无需将 API 绑定到水平或垂直的物理方向。',
  },
  lockPin: {
    title: '锁定与固定',
    description:
      '每个 Dock 都包含带提示的锁定与固定控件，悬停或聚焦时显示。锁定阻止移动；固定使 Dock 在内容滚动时保持位置。',
  },
} satisfies LocaleOf<typeof dockEnUS>;

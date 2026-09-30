import type { LocaleOf } from '@/i18n/locale-types';

import type { navigationMenuEnUS } from './en-US';

export const navigationMenuZhCN = {
  overview: {
    description: '为水平链接、垂直目标与嵌套展开提供导航语义，不管理路由或应用外壳布局。',
  },
  facts: {
    orientations: '方向',
    variant: '变体',
    themes: '主题',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    hoverAndFocus: '悬停与聚焦',
    sharedLayerSystem: '共享浮层系统',
    keyboardNavigation: '键盘导航',
  },
  navigationOrientations: {
    title: '导航方向',
    description: '同一项目模型支持紧凑顶部行或垂直目标列表。',
  },
  navigationSegmented: {
    title: '分段导航',
    description: '紧凑表面将同级目标分组，同时保留导航语义与链接行为。',
  },
  navigationPopover: {
    title: '悬停子菜单',
    description: '悬停导航项，在其旁边打开目标列表。移入子菜单可继续探索下一层。',
  },
  navigationNested: {
    title: '嵌套导航',
    description: '展开触发器在文档流中显示相关目标，并保持导航语义。',
  },
  navigationGrouped: {
    title: '分组导航',
    description: '使用 Group 与 GroupLabel 组织相关目标。每个分组保留独立的键盘导航范围。',
  },
} satisfies LocaleOf<typeof navigationMenuEnUS>;

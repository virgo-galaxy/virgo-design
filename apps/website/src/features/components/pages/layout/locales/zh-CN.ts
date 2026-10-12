import type { LocaleOf } from '@/i18n/locale-types';

import type { layoutEnUS } from './en-US';

export const layoutZhCN = {
  overview: {
    description: '通过垂直、水平与嵌套组合，为语义区域和独立空间分区提供页面级骨架。',
  },
  facts: {
    directions: '方向',
    structures: '结构',
    composition: '组合',
    nested: '嵌套',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    verticalComposition: '垂直组合',
    laneOwnedBodyRegion: 'Lane 管理正文区域',
    semanticPageSkeleton: '语义化页面骨架',
  },
  structures: {
    title: '布局结构',
    description: '由 Header、Lane、Sidebar、Content、Footer 和紧凑 Rail 构成的五种组合。',
  },
  behaviors: {
    title: '布局行为',
    description: 'Surface、调整尺寸、sticky 或 fixed 定位以及 Lane 边界保持结构性与可组合性。',
    note: '将上述结构与导航、表面和交互控件组合。',
  },
  header: {
    title: 'Header 组合',
    description: 'Logo 与水平 NavigationMenu 共用 Header，Surface 提供背景。',
  },
  sidebar: {
    title: '可折叠侧栏',
    description: '使用底部控件在完整导航与图标栏之间切换。',
  },
  controlled: {
    title: 'Header 触发器',
    description: '受控 Sidebar 允许在 Header 中放置切换按钮并管理折叠状态。',
  },
  overlay: {
    title: '覆盖式侧栏',
    description: '折叠宽度为零的 Sidebar 在内容上方展开，外部 Header 控件始终可用。',
  },
  floatingSidebar: {
    title: '浮动侧栏',
    description: '独立侧栏位于全宽 Content 内。可折叠成胶囊形，也可打开 Items 查看子菜单。',
  },
  floatingActions: {
    title: '浮动操作',
    description: '独立操作与可展开操作组位于 Content 右下角。可尝试按钮、Escape 和外部点击。',
  },
  groupedSidebar: {
    title: '分组侧栏导航',
    description: '滚动侧栏时，各分组标签会保持可见，直到下一组将其替换。吸附定位由示例样式提供。',
  },
} satisfies LocaleOf<typeof layoutEnUS>;

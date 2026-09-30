import type { LocaleOf } from '@/i18n/locale-types';

import type { tabsEnUS } from './en-US';

export const tabsZhCN = {
  overview: {
    description:
      '通过标准标签页语义、自动键盘激活和 line、plain 或 card 视觉样式，在相关内容面板间导航。',
  },
  facts: {
    variants: '变体',
    alignment: '对齐',
    panels: '面板',
    linked: '关联',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    automaticActivation: '自动激活',
    slidingIndicator: '滑动指示器',
    linkedPanels: '关联面板',
  },
  basic: {
    title: '基础用法',
    description: '选择不同宽度的标签，检查独立指示器的位置与宽度过渡。',
  },
  disabled: {
    title: '禁用',
    description: '禁用标签页保持可见，但指针与键盘导航会跳过它。',
  },
  alignment: {
    title: '对齐',
    description: '仅改变水平对齐；标签内容与 line 样式保持一致。',
  },
  icons: {
    title: '图标',
    description: '装饰性 Virgo 图标继承标签页状态颜色，文字标签保留无障碍名称。',
  },
  plain: {
    title: 'Plain',
    description:
      'plain 标签页采用轻量选中样式：分隔线组织相邻标签，悬停添加柔和表面，激活标签仅改变颜色。',
  },
  card: {
    title: 'Card',
    description: 'card 标签页以相连的文档式表面替代下划线，同时保留相同标签页与面板语义。',
  },
  editableCard: {
    title: '可编辑 Card',
    description: '关闭操作保留相邻的激活标签；末尾添加操作会创建并激活新标签页。',
  },
} satisfies LocaleOf<typeof tabsEnUS>;

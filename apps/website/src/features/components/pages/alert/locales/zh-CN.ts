import type { LocaleOf } from '@/i18n/locale-types';

import type { alertEnUS } from './en-US';

export const alertZhCN = {
  overview: {
    description: '通过语义意图、结构化内容和应用管理的操作，在当前上下文中持续呈现页面级反馈。',
  },
  facts: {
    intents: '语义意图',
    variants: '变体',
    default: '默认',
    soft: 'Soft',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    persistent: '持续显示',
    inline: '行内',
    themeAware: '适配主题',
  },
  intents: {
    title: '语义意图',
    description: '状态图标强化各类语义表达，避免仅靠颜色传递信息。',
  },
  content: {
    title: '内容结构',
    description: '可仅使用简短标题；需要解释或恢复指引时，再添加描述。',
  },
  action: {
    title: '应用操作',
    description: 'Action 是布局插槽；应用提供控件并管理其行为。',
  },
  close: {
    title: '可关闭',
    description: '关闭操作仅通知使用方。本示例通过应用状态移除消息，也支持恢复。',
  },
  customIcon: {
    title: '自定义图标',
    description: '使用自定义状态图标与语义颜色。',
  },
} satisfies LocaleOf<typeof alertEnUS>;

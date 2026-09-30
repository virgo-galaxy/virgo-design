import type { LocaleOf } from '@/i18n/locale-types';

import type { commandEnUS } from './en-US';

export const commandZhCN = {
  overview: {
    description: '搜索应用操作，将焦点保留在单个输入框中，并执行当前结果。',
  },
  facts: {
    modes: '模式',
    inlineDialog: '行内 · 对话框',
    search: '搜索',
    builtIn: '内置',
    results: '结果',
    grouped: '分组',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    singleInput: '单一输入框',
    groupedResults: '分组结果',
    keyboardFirst: '键盘优先',
  },
  inline: {
    title: '行内命令列表',
    description: '输入 settings 或 home。方向键切换当前选项，Enter 执行选择。',
  },
  dialog: {
    title: '对话框命令面板',
    description: '通过按钮打开，或聚焦此示例后按 ⌘/Ctrl K。快捷键不会拦截页面其他区域的按键。',
  },
  filter: {
    title: '自定义过滤',
    description: '此列表仅匹配各命令值的开头。',
  },
} satisfies LocaleOf<typeof commandEnUS>;

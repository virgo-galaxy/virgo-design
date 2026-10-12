import type { LocaleOf } from '@/i18n/locale-types';

import type { comboboxExamplesEnUS } from './en-US';
export const comboboxExamplesZhCN = {
  copy: {
    project: '条目',
    search: '搜索建议',
    unavailable: '旧版 — 不可用',
    empty: '没有匹配的选项',
    hint: '使用方向键和回车键选择。',
    selected: '已选择：{{value}}',
    current: '当前',
    future: '即将推出',
    title0: '搜索与选择',
    description0: '输入筛选候选项，选择后填入输入框。',
    title1: '自动补全模式',
    description1: '使用方提供建议并管理查询，复用同一套交互。',
    title2: '受控值与浮层',
    description2: '输入文本、选择值与浮层状态相互独立。',
    title3: '分组候选项',
    description3: '命名分组共享键盘与筛选协议。',
  },
} satisfies LocaleOf<typeof comboboxExamplesEnUS>;

import type { LocaleOf } from '@/i18n/locale-types';

import type { resultEnUS } from './en-US';
export const resultZhCN = {
  description: '包含状态、标题、恢复操作与辅助内容的结果反馈。',
  specimen: '参考样例',
  caption: '七种结果 · 恢复操作 · 可组合结构',
  variants: '结果与异常状态',
  variantDescription: '成功、错误、警告、提示、403、404 和 500 使用一致的结构。',
  composition: '组合结构',
  compositionDescription: '替换图标或添加业务内容，无需重建结果页布局。',
  title: '更改已保存',
  support: '条目已经准备好进入下一次评审。',
  primary: '继续',
  secondary: '返回',
  extra: '参考编号：VD-2026',
  success: '成功',
  error: '错误',
  warning: '警告',
  info: '提示',
  '403': '没有访问权限',
  '404': '页面未找到',
  '500': '服务异常',
} satisfies LocaleOf<typeof resultEnUS>;

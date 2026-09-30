import type { LocaleOf } from '@/i18n/locale-types';

import type { selectEnUS } from './en-US';

export const selectZhCN = {
  overview: {
    description:
      '通过自定义 Virgo listbox 进行单值选择。控件沿用 Input 家族的尺寸与状态表达，并管理展开、选项和键盘行为。',
  },
  facts: {
    mode: '模式',
    sizes: '尺寸',
    states: '状态',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    '36pxTrigger': '触发器高度 36px',
    radius8: '圆角 8',
  },
  sizes: {
    title: '尺寸',
    description: '四种触发器高度与 Input 和 Button 对齐，下拉列表采用相同密度。',
  },
  content: {
    title: '内容',
    description: '占位文本与选中值共用触发器，显示文字仍来自选中选项。',
  },
  states: {
    title: '状态',
    description: '悬停与聚焦可直接交互；打开时触发器保持高亮，禁用与无效状态使用语义颜色。',
  },
  options: {
    title: '选项与行为',
    description: '选项支持选中、禁用、长内容、指针与键盘交互，不改变公开的单值模型。',
  },
} satisfies LocaleOf<typeof selectEnUS>;

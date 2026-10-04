import type { LocaleOf } from '@/i18n/locale-types';

import type { selectEnUS } from './en-US';

export const selectZhCN = {
  overview: {
    description:
      '通过自定义 Virgo listbox 进行单选或多选。Select.Multiple 使用复选框和可移除标签，两种模式共用尺寸和键盘导航。',
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
    description: '单选与多选均支持选中、禁用、长内容、指针与键盘交互。',
  },
} satisfies LocaleOf<typeof selectEnUS>;

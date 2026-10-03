import type { LocaleOf } from '@/i18n/locale-types';

import type { inputEnUS } from './en-US';

export const inputZhCN = {
  overview: {
    description:
      '用于单行与多行内容的文本输入家族。基于 Virgo 原生 primitive，装饰内容、可清空值和密码显示功能与 Button 使用相同的尺寸、排版、颜色及动效基础体系。',
  },
  facts: {
    controls: '控件',
    sizes: '尺寸',
    states: '状态',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    '36pxHeight': '高度 36px',
    radius8: '圆角 8',
  },
  sizes: {
    title: '尺寸',
    description: '四种控件高度与 Virgo 尺寸基础体系和 Button 比例对齐。',
  },
  content: {
    title: '内容',
    description: '占位文本与输入值使用原生输入语义和 Virgo 正文排版。',
  },
  icons: {
    title: '前缀与后缀',
    description:
      '前后缀支持文字、单位或图标。文字按内容宽度显示，图标随输入框尺寸变化。装饰性插槽不进入 Tab 顺序，具有含义的单位应同时写入可访问标签。',
  },
  actions: {
    title: '操作',
    description:
      '可清空、密码和数值输入提供键盘可访问操作。数值增减按钮遵循原生 min、max 和 step 规则。',
  },
  states: {
    title: '状态',
    description: '悬停与聚焦可直接交互；使用 Tab 或点击输入框检查焦点样式。',
  },
  textarea: {
    title: 'Textarea',
    description: '多行输入沿用 Input 家族的状态表达，并保留原生 textarea 语义。',
  },
} satisfies LocaleOf<typeof inputEnUS>;

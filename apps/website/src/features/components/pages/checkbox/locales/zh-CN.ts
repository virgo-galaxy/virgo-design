import type { LocaleOf } from '@/i18n/locale-types';

import type { checkboxEnUS } from './en-US';

export const checkboxZhCN = {
  overview: {
    description: '采用统一标准形状的布尔与多选控件。基于原生 checkbox，扩展部分选中与分组选择。',
  },
  facts: {
    selection: '选择',
    disabled: '禁用',
    group: '分组',
    yes: '支持',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    '16pxControl': '控件尺寸 16px',
    radius4: '圆角 4',
  },
  basic: {
    title: '基础用法',
    description: 'Checkbox 在未选中、选中与部分选中状态下使用同一标准视觉尺寸。',
  },
  disabled: {
    title: '禁用',
    description: '禁用时保留未选中、选中与部分选中状态，不引入独立视觉变体。',
  },
  group: {
    title: '分组',
    description: 'Checkbox.Group 协调多个值，每个复选框仍保留原生表单语义。',
  },
  checkAll: {
    title: '全选',
    description: '不确定状态自然表达分组中部分条目已选中。',
  },
} satisfies LocaleOf<typeof checkboxEnUS>;

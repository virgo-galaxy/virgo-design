import type { LocaleOf } from '@/i18n/locale-types';

import type { radioEnUS } from './en-US';

export const radioZhCN = {
  overview: {
    description: '使用标准圆形单选控件，在互斥选项中进行单选。',
  },
  facts: {
    orientation: '方向',
    states: '状态',
    selection: '选择',
    single: '单选',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    '16pxControl': '控件尺寸 16px',
    singleSelection: '单选',
  },
  basic: {
    title: '基础用法',
    description: '标准单选控件表达互斥选项中的一个选中值。',
  },
  orientation: {
    title: '方向',
    description: 'Radio.Group 支持水平和垂直选项布局，不改变选择语义。',
  },
  disabled: {
    title: '禁用',
    description: '禁用时保留未选中与选中状态，不增加新的视觉模式。',
  },
} satisfies LocaleOf<typeof radioEnUS>;

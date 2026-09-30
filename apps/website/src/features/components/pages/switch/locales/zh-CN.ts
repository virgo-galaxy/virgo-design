import type { LocaleOf } from '@/i18n/locale-types';

import type { switchEnUS } from './en-US';

export const switchZhCN = {
  overview: {
    description: '通过熟悉的胶囊形控件或更偏技术感的控制台推子外观，切换即时二元状态。',
  },
  facts: {
    appearances: '外观',
    sizes: '尺寸',
    states: '状态',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    nativeSwitchSemantics: '原生开关语义',
  },
  basic: {
    title: '基础用法',
    description: '标准胶囊形开关通过滑块位置与品牌填充表达关闭和开启。',
  },
  sizes: {
    title: '尺寸',
    description: 'Switch 保持两种尺寸：default 用于常规界面，small 用于紧凑控件。',
  },
  content: {
    title: '内容',
    description: 'toggle 外观可添加紧凑的装饰提示，不改变无障碍开关状态。',
  },
  appearances: {
    title: '外观',
    description: 'fader 保留原生开关语义，使用细控制台轨道和紧凑滑动块。',
  },
  disabled: {
    title: '禁用',
    description: '两种外观下禁用时均保留关闭和开启状态，不引入新的语义模式。',
  },
} satisfies LocaleOf<typeof switchEnUS>;

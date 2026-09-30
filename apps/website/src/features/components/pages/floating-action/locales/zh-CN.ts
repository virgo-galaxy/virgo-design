import type { LocaleOf } from '@/i18n/locale-types';

import type { floatingActionEnUS } from './en-US';

export const floatingActionZhCN = {
  overview: {
    description: '带层级的圆形操作，可独立使用或组合在无障碍 Popover 中。定位由容器布局负责。',
  },
  facts: {
    parts: '组成部分',
    states: '状态',
    patterns: '模式',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    buttonSemantics: 'Button 语义',
    circularShape: '圆形外观',
    tokenElevation: 'Token 层级',
  },
  basic: {
    title: '基础用法',
    description: '独立操作复用 Virgo Button 的变体、尺寸、键盘激活与禁用行为。',
  },
  group: {
    title: 'Button 与 Popover 组合',
    description:
      'Group、Trigger 和 Content 将圆形 Button 操作与 Popover 的打开状态、焦点处理和关闭行为组合起来。',
  },
  placement: {
    title: 'Popover 位置',
    description: '成组操作继承 Popover 的位置设置；独立操作的位置仍由容器布局负责。',
  },
} satisfies LocaleOf<typeof floatingActionEnUS>;

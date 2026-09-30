import type { LocaleOf } from '@/i18n/locale-types';

import type { dropdownEnUS } from './en-US';

export const dropdownZhCN = {
  overview: {
    description: '让相关操作触手可及。菜单在需要的位置打开，提供清晰选择与熟悉的键盘导航。',
  },
  facts: {
    triggers: '触发方式',
    hoverClick: '悬停 / 点击',
    placement: '位置',
    '12Positions': '12 个位置',
    actions: '操作',
    splitButton: '分裂按钮',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    virgoIcons: 'Virgo 图标',
    keyboardReady: '支持键盘',
    themeAware: '适配主题',
  },
  triggers: {
    title: '悬停与点击',
    description: '两种激活模式。禁用项目不可操作；破坏性操作使用 danger 样式。',
  },
  placement: {
    title: '位置与箭头',
    description: '十二个首选位置。菜单在视口边缘翻转和偏移；可选箭头跟随触发器。',
  },
  split: {
    title: '分裂按钮与自定义触发器',
    description: '主按钮执行操作，相邻按钮打开相关操作，可使用默认省略号或自定义 Virgo 图标。',
  },
  controlled: {
    title: '受控状态与键盘',
    description: '使用方向键、Home、End 和输入文字导航。Escape 返回焦点，Tab 移到下一个控件。',
  },
  density: {
    title: '尺寸',
    description: '四种触发器尺寸配合一致的菜单密度，使用现有 Button 与排版 token。',
  },
} satisfies LocaleOf<typeof dropdownEnUS>;

import type { LocaleOf } from '@/i18n/locale-types';

import type { tooltipEnUS } from './en-US';

export const tooltipZhCN = {
  overview: {
    description:
      '在不中断操作的情况下补充上下文。悬停或聚焦可查看简短描述，十二个位置始终与控件相连。',
  },
  facts: {
    placement: '位置',
    '12Positions': '12 个位置',
    trigger: '触发方式',
    hoverFocus: '悬停 / 聚焦',
    content: '内容',
    descriptive: '描述性',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    nativeActions: '原生操作',
    keyboardReady: '支持键盘',
    themeAware: '适配主题',
  },
  basic: {
    title: '悬停与聚焦',
    description: '悬停在短暂延迟后打开，键盘聚焦立即打开。Escape 关闭提示，焦点保留在控件上。',
  },
  smoothTransition: {
    title: '平滑过渡',
    description:
      '此示例启用平滑过渡。在四个按钮之间移动，让提示从一个控件切换到另一个，无需重复延迟或淡入淡出。',
  },
  placement: {
    title: '位置与箭头',
    description: '触发区域周围的十二个物理位置。箭头跟随触发器中心；面板在视口边缘翻转和偏移。',
  },
  tone: {
    title: '语义颜色',
    description: '语义色调将纯色背景与 on-solid 前景搭配；自定义色调可使用调色板 token 设置两者。',
  },
  actions: {
    title: '真实控件',
    description:
      'Settings 图标与 Button 组合使用。提示描述操作，点击仍会执行；图标按钮保留无障碍名称。',
  },
  dynamic: {
    title: '内容与方向',
    description:
      '第一个描述在打开时增长，以检查自动重新对齐；第二个使用局部 RTL 方向与逻辑 start 对齐。',
  },
  sizes: {
    title: '内容尺寸',
    description: '内容尺寸独立于触发按钮。medium 保持默认，small 为工具栏提供紧凑描述。',
  },
  activation: {
    title: '激活时保留反馈',
    description:
      'closeOnClick=false 使提示在激活时保持打开，文字原位更新；Escape 或结束悬停 / 聚焦仍会关闭。',
  },
  cursor: {
    title: 'Cursor 集成',
    description:
      '在 Cursor.Provider 上启用指针跟随。它管理自定义视觉与跟踪；普通 Tooltip 自动跟随鼠标悬停，键盘聚焦时仍锚定元素。',
  },
} satisfies LocaleOf<typeof tooltipEnUS>;

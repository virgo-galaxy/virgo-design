import type { LocaleOf } from '@/i18n/locale-types';

import type { popoverEnUS } from './en-US';

export const popoverZhCN = {
  overview: {
    description: '在需要的位置补充上下文。详情、表单和操作共用与触发器相连的紧凑面板。',
  },
  facts: {
    content: '内容',
    flexible: '灵活',
    triggers: '触发方式',
    '2Modes': '2 种模式',
    focus: '焦点',
    nonModal: '非模态',
  },
  specimen: {
    summary: '上下文内容',
    referenceSpecimen: '参考样例',
    anyContent: '任意内容',
    keyboardReady: '支持键盘',
    themeAware: '适配主题',
  },
  triggers: {
    title: '点击与悬停',
    description: '点击后聚焦面板。悬停提供快速预览，不移动键盘焦点；交互内容聚焦时保持打开。',
  },
  form: {
    title: '就地编辑',
    description: '包含真实表单的受控面板。保存会更新工作区名称，并将焦点返回 Edit workspace。',
  },
  placement: {
    title: '位置与偏移',
    description:
      '触发区域周围的十二个物理位置。面板在视口边缘翻转和偏移；这些示例使用 12px 偏移与箭头。',
  },
  nested: {
    title: '面板内操作',
    description: '在 Popover 中打开 Dropdown。Escape 先关闭菜单；选择操作时父面板保持打开。',
  },
} satisfies LocaleOf<typeof popoverEnUS>;

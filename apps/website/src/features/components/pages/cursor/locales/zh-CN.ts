import type { LocaleOf } from '@/i18n/locale-types';

import type { cursorEnUS } from './en-US';

export const cursorZhCN = {
  overview: {
    description: '小巧的玻璃指针，让上下文紧随其后。可限定到画布、编辑器或整个应用。',
  },
  facts: {
    input: '输入',
    mouseAware: '感知鼠标',
    visual: '视觉呈现',
    yoursOrVirgo: '自定义或 Virgo',
    feedback: '反馈',
    pointerFollow: '跟随指针',
  },
  specimen: {
    summary: '动态上下文',
    referenceSpecimen: '参考样例',
    scopedInput: '限定输入范围',
    customVisuals: '自定义视觉',
    keyboardReady: '支持键盘',
  },
  lifecycle: {
    title: '生命周期',
    description: 'Cursor 管理跟踪与视觉呈现，使用方订阅最近的作用域。',
    note: '鼠标坐标每个动画帧合并一次。离开作用域、滚动、窗口失焦、可见性变化、取消、路由重置和卸载都会清除指针跟随反馈。触摸与触控笔保留原生输入行为；键盘触发的 Tooltip 保留元素锚点与描述关联。',
  },
} satisfies LocaleOf<typeof cursorEnUS>;

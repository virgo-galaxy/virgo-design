import type { LocaleOf } from '@/i18n/locale-types';

import type { collapsibleExamplesEnUS } from './en-US';
export const collapsibleExamplesZhCN = {
  copy: {
    title0: '展开区域',
    description0:
      'Content motion="collapse" 平滑过渡内容的自然高度。收起后的控件不可交互，并尊重减少动态效果设置。',
    trigger: '颜色详情',
    content: '展开内容保持普通文档区域。',
  },
} as const satisfies LocaleOf<typeof collapsibleExamplesEnUS>;

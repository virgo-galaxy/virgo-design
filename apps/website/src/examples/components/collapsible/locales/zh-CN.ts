import type { LocaleOf } from '@/i18n/locale-types';

import type { collapsibleExamplesEnUS } from './en-US';
export const collapsibleExamplesZhCN = {
  copy: {
    title0: '展开区域',
    description0: '由展开按钮和命名内容区域组成，支持受控和非受控展开。',
    trigger: '颜色详情',
    content: '展开内容保持普通文档区域。',
  },
} as const satisfies LocaleOf<typeof collapsibleExamplesEnUS>;

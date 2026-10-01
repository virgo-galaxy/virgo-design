import type { LocaleOf } from '@/i18n/locale-types';

import type { collapsibleEnUS } from './en-US';
export const collapsibleZhCN = {
  overview: { description: '由展开按钮和命名内容区域组成，支持受控和非受控展开。' },
  specimen: { referenceSpecimen: '参考样本', contract: '业务负责组合' },
} as const satisfies LocaleOf<typeof collapsibleEnUS>;

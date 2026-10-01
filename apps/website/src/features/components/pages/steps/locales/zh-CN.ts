import type { LocaleOf } from '@/i18n/locale-types';

import type { stepsEnUS } from './en-US';
export const stepsZhCN = {
  overview: { description: '有序步骤展示，业务负责进度和可选的步骤操作。' },
  specimen: { referenceSpecimen: '参考样本', contract: '业务负责组合' },
} as const satisfies LocaleOf<typeof stepsEnUS>;

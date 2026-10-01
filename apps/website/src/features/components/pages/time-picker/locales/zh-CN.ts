import type { LocaleOf } from '@/i18n/locale-types';

import { timePickerEnUS } from './en-US';
export const timePickerZhCN = {
  overview: {
    description: '本地时间输入，支持原生分段编辑、精度设置和浏览器约束校验。',
  },
  specimen: {
    referenceSpecimen: '参考示例',
    contract: '语义组合',
  },
} satisfies LocaleOf<typeof timePickerEnUS>;

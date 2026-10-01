import type { LocaleOf } from '@/i18n/locale-types';

import { datePickerEnUS } from './en-US';
export const datePickerZhCN = {
  overview: {
    description: '原生日期输入与日历浮层共用一个日期值。',
  },
  specimen: {
    referenceSpecimen: '参考示例',
    contract: '语义组合',
  },
} satisfies LocaleOf<typeof datePickerEnUS>;

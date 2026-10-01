import type { LocaleOf } from '@/i18n/locale-types';

import { calendarEnUS } from './en-US';
export const calendarZhCN = {
  overview: {
    description: '本地化月历网格，支持独立的选择与显示状态、日期约束和键盘导航。',
  },
  specimen: {
    referenceSpecimen: '参考示例',
    contract: '语义组合',
  },
} satisfies LocaleOf<typeof calendarEnUS>;

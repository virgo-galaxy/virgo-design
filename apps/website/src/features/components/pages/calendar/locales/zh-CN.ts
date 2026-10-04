import type { LocaleOf } from '@/i18n/locale-types';

import { calendarEnUS } from './en-US';
export const calendarZhCN = {
  overview: {
    description: '本地化日历，提供紧凑与铺满容器的面板，支持月/年视图、日期约束和键盘导航。',
  },
  specimen: {
    referenceSpecimen: '参考示例',
    contract: '语义组合',
  },
} satisfies LocaleOf<typeof calendarEnUS>;

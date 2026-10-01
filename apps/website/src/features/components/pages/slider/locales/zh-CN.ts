import type { LocaleOf } from '@/i18n/locale-types';

import { sliderEnUS } from './en-US';
export const sliderZhCN = {
  overview: {
    description: '原生数值滑块，支持范围约束、键盘操作和统一字段语义。',
  },
  specimen: {
    referenceSpecimen: '参考示例',
    contract: '语义组合',
  },
} satisfies LocaleOf<typeof sliderEnUS>;

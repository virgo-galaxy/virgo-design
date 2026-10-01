import type { LocaleOf } from '@/i18n/locale-types';

import type { comboboxEnUS } from './en-US';
export const comboboxZhCN = {
  overview: {
    description: '可编辑的单选候选列表，支持筛选、输入法安全的键盘交互与共享浮层定位。',
  },
  specimen: {
    referenceSpecimen: '参考示例',
    contract: '语义组合',
  },
} satisfies LocaleOf<typeof comboboxEnUS>;

import type { LocaleOf } from '@/i18n/locale-types';

import { colorPickerEnUS } from './en-US';
export const colorPickerZhCN = {
  overview: {
    description: '通过原生取色和可复用 HEX 色板选择不透明 sRGB 颜色。',
  },
  specimen: {
    referenceSpecimen: '参考示例',
    contract: '语义组合',
  },
} satisfies LocaleOf<typeof colorPickerEnUS>;

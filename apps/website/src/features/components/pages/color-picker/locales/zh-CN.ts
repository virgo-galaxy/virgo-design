import type { LocaleOf } from '@/i18n/locale-types';

import { colorPickerEnUS } from './en-US';
export const colorPickerZhCN = {
  overview: {
    description: '支持色块与颜色值触发器、HEX/RGB 编辑、色相和可选不透明度的 sRGB 取色组件。',
  },
  specimen: {
    referenceSpecimen: '参考示例',
    contract: '语义组合',
  },
} satisfies LocaleOf<typeof colorPickerEnUS>;

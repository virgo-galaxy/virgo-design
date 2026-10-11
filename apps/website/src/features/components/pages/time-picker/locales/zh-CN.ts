import type { LocaleOf } from '@/i18n/locale-types';

import { timePickerEnUS } from './en-US';
export const timePickerZhCN = {
  overview: {
    description: '跟随主题的时间选择，保留原生编辑和约束校验，可配置循环、秒列及清空和完成操作。',
  },
  specimen: {
    referenceSpecimen: '参考示例',
    contract: '语义组合',
  },
} satisfies LocaleOf<typeof timePickerEnUS>;

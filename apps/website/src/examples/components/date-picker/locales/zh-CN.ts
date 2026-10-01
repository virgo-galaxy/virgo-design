import type { LocaleOf } from '@/i18n/locale-types';

import { datePickerExamplesEnUS } from './en-US';
export const datePickerExamplesZhCN = {
  copy: {
    label: '截止日期',
    hint: '选择 2026 年 10 月至 12 月的日期。',
    readonly: '只读日期',
    disabled: '禁用日期',
    title0: '输入与日历浮层',
    description0: '原生日期输入与日历选择共享值。',
    title1: '只读与禁用日期',
    description1: '整个选择框继承 Field 状态。',
  },
} satisfies LocaleOf<typeof datePickerExamplesEnUS>;

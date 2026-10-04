import type { LocaleOf } from '@/i18n/locale-types';

import { datePickerExamplesEnUS } from './en-US';
export const datePickerExamplesZhCN = {
  copy: {
    title2: '日期范围',
    description2: '两个相邻月份共享日期区间，也可以直接输入起止日期。',
    rangeLabel: '创建时间范围',
    endDate: '结束日期',
    rangeHint: '先选择开始日期，再选择结束日期；第二次选择完成区间。',
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

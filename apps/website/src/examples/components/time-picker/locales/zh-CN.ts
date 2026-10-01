import type { LocaleOf } from '@/i18n/locale-types';

import { timePickerExamplesEnUS } from './en-US';
export const timePickerExamplesZhCN = {
  copy: {
    label: '开始时间',
    hint: '办公时间：09:00–18:00。本地时间，不进行时区转换。',
    seconds: '带秒的时间',
    readonly: '只读时间',
    disabled: '禁用时间',
    title0: '本地时间与精度',
    description0: '值使用 HH:mm，保留原生 min/max/step。',
    title1: '秒与字段状态',
    description1: '通过原生 step 精度启用秒。',
  },
} satisfies LocaleOf<typeof timePickerExamplesEnUS>;

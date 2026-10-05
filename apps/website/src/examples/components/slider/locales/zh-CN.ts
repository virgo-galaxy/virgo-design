import type { LocaleOf } from '@/i18n/locale-types';

import { sliderExamplesEnUS } from './en-US';
export const sliderExamplesZhCN = {
  copy: {
    label: '音量',
    hint: '使用方向键调整，Home 与 End 到达范围端点。',
    step: '步长为二',
    readonly: '只读音量',
    disabled: '禁用音量',
    title0: '受控数值',
    description0: '数值变化由示例管理。',
    title1: '步长与状态',
    description1: '原生范围约束及只读、禁用组合。',
    title2: '范围与区间内数值',
    description2: '两个或三个有序滑块，各自遵守相邻数值的键盘约束。',
    minimum: '最小值',
    current: '当前值',
    maximum: '最大值',
    interval: '范围',
    bounded: '区间内数值',
  },
} satisfies LocaleOf<typeof sliderExamplesEnUS>;

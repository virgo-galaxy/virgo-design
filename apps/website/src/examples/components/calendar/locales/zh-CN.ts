import type { LocaleOf } from '@/i18n/locale-types';

import { calendarExamplesEnUS } from './en-US';
export const calendarExamplesZhCN = {
  copy: {
    selected: '所选日期',
    month: '显示月份',
    title0: '本地化月导航',
    description0: '焦点导航不会选择日期。',
    title1: '范围与不可用日期',
    description1: '受控月份导航与不可用周末。',
    title2: '基本日历面板',
    description2: '铺满容器的日历面板，支持选择年份、月份以及切换月视图与年视图。',
  },
} satisfies LocaleOf<typeof calendarExamplesEnUS>;

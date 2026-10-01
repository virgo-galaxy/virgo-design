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
  },
} satisfies LocaleOf<typeof calendarExamplesEnUS>;

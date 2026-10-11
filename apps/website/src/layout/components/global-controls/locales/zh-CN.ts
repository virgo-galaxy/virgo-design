import type { LocaleOf } from '@/i18n/locale-types';

import type { themeStyleControlEnUS } from './en-US';

export const themeStyleControlZhCN = {
  label: '主题样式',
  descriptions: {
    virgo: '当前默认视觉',
    minimal: '极简、克制、偏扁平',
    soft: '更圆润、更柔和',
    glass: '半透明、玻璃、轻浮层',
    utility: '更硬朗、小圆角、高信息密度',
    highContrast: '高对比、强调边界和可读性',
  },
} satisfies LocaleOf<typeof themeStyleControlEnUS>;

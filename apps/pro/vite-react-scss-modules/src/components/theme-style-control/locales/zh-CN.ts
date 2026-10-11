import type { LocaleOf } from '@/i18n/locale-types';

import type { themeStyleControlEnUS } from './en-US';

export const themeStyleControlZhCN = {
  label: '主题',
  names: {
    virgo: '默认',
    minimal: '极简',
    soft: '柔和',
    glass: '玻璃',
    utility: '复古',
    highContrast: '硬朗',
  },
  descriptions: {
    virgo: '当前默认视觉',
    minimal: '极简、克制、偏扁平',
    soft: '更圆润、更柔和',
    glass: '半透明、玻璃、轻浮层',
    utility: '方正边角、立体边框、经典桌面风格',
    highContrast: '高对比、强调边界和可读性',
  },
} satisfies LocaleOf<typeof themeStyleControlEnUS>;

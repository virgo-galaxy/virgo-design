import type { LocaleOf } from '@/i18n/locale-types';

import type { themeStyleControlEnUS } from './en-US';

export const themeStyleControlZhCN = {
  label: '主题',
  names: {
    virgo: '默认',
    minimal: '极简',
    soft: '柔和',
    glass: '玻璃',
    retro: '复古',
    contrast: '高对比',
  },
  descriptions: {
    virgo: '当前默认视觉',
    minimal: '极简、克制、偏扁平',
    soft: '更圆润、更柔和',
    glass: '半透明、玻璃、轻浮层',
    retro: '方正边角、立体边框、经典桌面风格',
    contrast: '强前后景分离、明确边界，清晰呈现焦点、选中和禁用状态',
  },
} satisfies LocaleOf<typeof themeStyleControlEnUS>;

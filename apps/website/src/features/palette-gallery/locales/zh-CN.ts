import type { LocaleOf } from '@/i18n/locale-types';

import { paletteGalleryEnUS } from './en-US';

export const paletteGalleryZhCN = {
  paletteGallery: {
    stepLabel: '第 {{step}} 阶',
    eyebrow: '02 · 探索',
    title: '流动的色彩',
    description:
      '十二个基础色彩家族，加上 Brand 与 Neutral，共同展开为 140 个基础颜色。点击任意一组查看对应十阶色阶。',
    colorFamilies: '基础色彩组',
    selectedFamily: '基础色彩组',
    baseColor: '基础色',
    tonalScale: '十阶色阶',
    kinds: {
      chromatic: '基础色彩家族',
      brand: '品牌色基础',
      neutral: '中性色基础',
    },
    foundationLabels: {
      brand: '品牌',
      neutral: '中性',
    },
    families: {
      red: '红',
      vermilion: '朱红',
      orange: '橙',
      amber: '琥珀',
      yellow: '黄',
      chartreuse: '黄绿',
      green: '绿',
      teal: '蓝绿',
      blue: '蓝',
      indigo: '靛蓝',
      violet: '紫罗兰',
      magenta: '洋红',
    },
    exportFoundationColors: '导出基础颜色',
  },
} satisfies LocaleOf<typeof paletteGalleryEnUS>;

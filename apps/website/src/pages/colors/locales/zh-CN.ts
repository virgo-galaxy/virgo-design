import type { LocaleOf } from '@/i18n/locale-types';

import { foundationColorsEnUS } from './en-US';

export const foundationColorsZhCN = {
  colors: {
    title: '颜色',
    description:
      '一套完整、系统且可扩展的颜色基础，包含十二个基础色彩家族、一套品牌色阶与一套中性色阶，共 140 个基础颜色。',
    foundationColors: '基础颜色',
    chromaticFamilies: '色彩家族',
    brandScale: '套品牌色阶',
    neutralScale: '套中性色阶',
    journey: {
      create: '创建',
      createDescription: '色板与色彩参数',
      explore: '探索',
      exploreDescription: '流动的色彩',
      export: '导出',
      exportDescription: '基础颜色代码',
      summary: '探索 Virgo Design 的基础颜色材料及其生产导出。',
      detail: '创建并检查基础颜色，然后导出当前色阶用于产品实现。',
    },
    colorCopied: '已复制 {{token}}：{{value}}',
    copyStep: '复制{{family}}第 {{step}} 阶',
  },
} satisfies LocaleOf<typeof foundationColorsEnUS>;

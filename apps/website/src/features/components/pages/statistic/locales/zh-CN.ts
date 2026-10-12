import type { LocaleOf } from '@/i18n/locale-types';

import type { statisticEnUS } from './en-US';
export const statisticZhCN = {
  description: '包含标签、数值、前后缀、变化趋势和辅助说明的统计指标。',
  specimen: '参考样例',
  caption: '语义指标 · Token 字体 · 可组合结构',
  variants: '数值、趋势与加载',
  variantDescription: '变化方向和语义颜色可以分别设置，加载状态保留指标的布局空间。',
  composition: '组合结构',
  compositionDescription: '组合标签和数值，指标网格仍由产品页面组织。',
  label: '收入',
  support: '与上个月相比',
  other: '活跃条目',
  loading: '待加载总数',
  animation: '数字动画',
  animationDescription:
    '首次从零增长，数据变化时从当前数值平滑过渡到新值，使用先快后慢的减速动效 Token。减少动态效果时直接显示结果。',
  animatedValue: '条目数',
  replay: '重新播放',
} satisfies LocaleOf<typeof statisticEnUS>;

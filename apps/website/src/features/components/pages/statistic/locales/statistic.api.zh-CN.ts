import type { ApiDescriptionResources } from '@/i18n/api-description-resources';
export const statisticApiZhCN = {
  api: {
    'statistic-props.properties.label.description': '指标的可访问标签。',
    'statistic-props.properties.value.description': '显示的指标数值，零也会显示。',
    'statistic-props.properties.animation.description':
      '为有限数值启用动画，使用减速动效 Token，并遵循减少动态效果设置。',
    'statistic-props.properties.formatter.description':
      '格式化数值和动画中间值。value 传入数字，单位通过 suffix 提供。',
    'statistic-animation-options.properties.from.description': '首次数字动画的起始值。',
    'statistic-animation-options.properties.duration.description':
      '首次动画时长，单位为毫秒，默认使用 560 毫秒动效 Token。',
    'statistic-animation-options.properties.update-duration.description':
      '后续数值变化的动画时长，单位为毫秒，默认使用 360 毫秒动效 Token。',
    'statistic-value-props.properties.value.description': '组合插槽的数值。显式 children 优先。',
    'statistic-value-props.properties.animation.description':
      '可选数字动画，与 Statistic.Root 的行为一致。',
    'statistic-value-props.properties.formatter.description': '格式化数值及动画中间值。',
    'statistic-props.properties.prefix.description': '数值前的内容，例如货币符号。',
    'statistic-props.properties.suffix.description': '数值后的内容，例如单位。',
    'statistic-props.properties.trend.description': '变化内容，通常使用 Statistic.Trend 组合。',
    'statistic-props.properties.description.description': '指标的辅助说明。',
    'statistic-props.properties.loading.description':
      '使用 Skeleton 替换数值，并提供 aria-busy 状态。',
    'statistic-trend-props.properties.direction.description': '变化方向，与语义颜色分别设置。',
    'statistic-trend-props.properties.intent.description': '变化的语义：正向、负向或中性。',
  },
} satisfies ApiDescriptionResources[string];

import type { ApiDescriptionResources } from '@/i18n/api-description-resources';
export const statisticApiZhCN = {
  api: {
    'statistic-props.properties.label.description': '指标的可访问标签。',
    'statistic-props.properties.value.description': '显示的指标数值，零也会显示。',
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

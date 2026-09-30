import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const progressApiZhCN = {
  api: {
    'progress-props.properties.value.description': '当前完成量。',
    'progress-props.properties.max.description': '完整轨道表示的总量。',
    'progress-props.properties.size.description': '轨道厚度。',
    'progress-props.properties.intent.description': '语义指示器颜色。',
    'progress-props.properties.label.description': '轨道上方的可选可见标签。',
    'progress-props.properties.show-value.description': '在轨道上方显示归一化百分比。',
  },
} satisfies ApiDescriptionResources[string];

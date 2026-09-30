import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const separatorApiZhCN = {
  api: {
    'separator-props.properties.orientation.description': '布局与语义方向。',
    'separator-props.properties.decorative.description': '移除分隔符语义，仅保留视觉分隔线。',
    'separator-props.properties.children.description': '水平分隔线的可选非交互标签。',
    'separator-props.properties.label-align.description':
      '水平分隔线上的标签位置；start/end 遵循文字方向。',
  },
} satisfies ApiDescriptionResources[string];

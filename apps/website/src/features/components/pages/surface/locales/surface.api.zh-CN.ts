import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const surfaceApiZhCN = {
  api: {
    'surface-radius.description': '现有 Radius Foundation 键，为 UI 使用方提供轻量接口。',
    'surface-background.description': '仅用于装饰背景。有意义的图像内容应使用 img 元素。',
    'surface-props.properties.tone.description': '语义表面颜色。',
    'surface-props.properties.material.description': '表面样式，独立于色调与背景。',
    'surface-props.properties.background.description': '材质下方的可选装饰背景。图像不会重复。',
    'surface-props.properties.elevation.description': '现有的主题适配层级。',
    'surface-props.properties.radius.description': '现有圆角 token。',
    'surface-props.properties.border.description':
      '语义边框。glass 默认为 subtle，其他材质默认为 none。',
  },
} satisfies ApiDescriptionResources[string];

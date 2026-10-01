import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const layoutApiZhCN = {
  api: {
    'layout-content-props.properties.as.description': '页面主要区域或嵌入内容区域使用的语义元素。',
    'layout-props.properties.children.description': '按文档顺序渲染的结构区域。',
    'layout-props.properties.direction.description': '直接子区域的排列方向。',
    'layout-lane-props.properties.children.description': '此空间分区内的结构子内容。',
    'layout-lane-props.properties.direction.description': '直接 Lane 子内容的排列方向。',
  },
} satisfies ApiDescriptionResources[string];

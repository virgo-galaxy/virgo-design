import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const badgeApiZhCN = {
  api: {
    'badge-props.properties.count.description': '数字或简短文字内容。',
    'badge-props.properties.max.description': '显示的数字计数上限。',
    'badge-props.properties.show-zero.description': '计数为零时仍显示。',
    'badge-props.properties.dot.description': '显示状态圆点，替代计数内容。',
    'badge-props.properties.intent.description': '语义颜色。',
    'badge-props.properties.children.description':
      '可选宿主元素。没有 children 时，Badge 行内渲染。',
  },
} satisfies ApiDescriptionResources[string];

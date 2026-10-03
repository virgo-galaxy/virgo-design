import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const selectApiZhCN = {
  api: {
    'select-content-props.properties.placement.description':
      '优先展开方向；空间不足时自动翻转并约束在视口内。',

    'select-props.properties.read-only.description': '保留聚焦能力，同时阻止打开列表或改变选择。',

    'select-props.properties.id.description': '应用到交互触发器的标识。',
  },
} satisfies ApiDescriptionResources[string];

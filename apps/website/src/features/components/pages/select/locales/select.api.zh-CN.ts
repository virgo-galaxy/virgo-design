import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const selectApiZhCN = {
  api: {
    'select-content-props.properties.placement.description':
      '优先展开方向；空间不足时自动翻转并约束在视口内。',

    'select-trigger-props.properties.indicator.description': '自定义装饰指示器；null 隐藏指示器。',
    'select-trigger-props.properties.render-value.description':
      '自定义选中值呈现，保留选项名称和键盘行为。',
    'select-props.properties.read-only.description': '保留聚焦能力，同时阻止打开列表或改变选择。',

    'select-props.properties.id.description': '应用到交互触发器的标识。',
    'select-trigger-props.properties.aria-invalid.description': '表示输入值不符合应用期望的格式。',
  },
} satisfies ApiDescriptionResources[string];

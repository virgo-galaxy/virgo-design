import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const selectApiZhCN = {
  api: {
    'select-multiple-props.properties.value.description': '受控选中值，空数组表示没有选择。',
    'select-multiple-props.properties.default-value.description': '初始选中值。',
    'select-multiple-props.properties.on-value-change.description': '勾选选项或移除选中值时调用。',
    'select-multiple-props.properties.id.description': '应用到交互触发器的标识。',
    'select-multiple-props.properties.read-only.description':
      '保留聚焦能力，同时阻止打开列表或改变选择。',
    'select-remove-props.properties.value.description': '要移除的选中值，移除后聚焦触发器。',

    'select-content-props.properties.placement.description':
      '优先展开方向；空间不足时自动翻转并约束在视口内。',

    'select-props.properties.read-only.description': '保留聚焦能力，同时阻止打开列表或改变选择。',

    'select-props.properties.id.description': '应用到交互触发器的标识。',
  },
} satisfies ApiDescriptionResources[string];

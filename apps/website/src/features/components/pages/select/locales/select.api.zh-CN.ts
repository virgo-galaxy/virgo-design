import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const selectApiZhCN = {
  api: {
    'select-option-props.properties.intent.description':
      '选中值和可移除已选标签的语义颜色；下拉选项保持中性样式。',
    'select-multiple-props.properties.value.description': '受控选中值，空数组表示没有选择。',
    'select-multiple-props.properties.default-value.description': '初始选中值。',
    'select-multiple-props.properties.on-value-change.description': '勾选选项或移除选中值时调用。',
    'select-multiple-props.properties.id.description': '应用到交互触发器的标识。',
    'select-multiple-props.properties.read-only.description':
      '保留聚焦能力，同时阻止打开列表或改变选择。',

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

import type { ApiDescriptionResources } from '@/i18n/api-description-resources';
export const sliderApiZhCN = {
  api: {
    'slider-range-props.properties.value.description':
      '按顺序排列的受控数值；滑块不能越过相邻滑块。',
    'slider-range-props.properties.default-value.description':
      '初始滑块数值，默认使用 min 和 max。',
    'slider-range-props.properties.min.description': '所有滑块共享的最小范围值。',
    'slider-range-props.properties.max.description': '所有滑块共享的最大范围值。',
    'slider-range-props.properties.step.description': '从 min 开始的数值步长。',
    'slider-range-props.properties.thumb-labels.description':
      '按数值顺序指定每个滑块的无障碍名称。',
    'slider-range-props.properties.get-value-text.description':
      '格式化滑块的无障碍数值文本和可见提示。',
    'slider-range-props.properties.on-value-change.description':
      '指针或键盘改变数值时返回有序数值数组。',
    'slider-range-props.properties.on-thumb-focus.description':
      '滑块获得焦点时返回其从零开始的索引。',
    'slider-range-props.properties.name.description': '原生表单提交时使用的重复字段名称。',
    'slider-range-props.properties.disabled.description': '禁用交互，并从表单提交中排除数值。',
    'slider-range-props.properties.read-only.description': '保持可聚焦和表单数值，同时禁止编辑。',
    'slider-range-props.properties.required.description': '通过统一字段语义标记为必填。',
    'slider-props.properties.value.description': '受控数值，遵守 min/max/step 约束。',
    'slider-props.properties.default-value.description': '初始数值，默认使用最小值与最大值的中点。',
    'slider-props.properties.on-value-change.description': '原生指针或键盘操作改变数值时调用。',
  },
} satisfies ApiDescriptionResources[string];

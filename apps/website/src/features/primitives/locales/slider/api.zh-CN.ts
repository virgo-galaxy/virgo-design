import type { ApiDescriptionResources } from '@/i18n/api-description-resources';
export const sliderApiZhCN = {
  api: {
    'slider-props.properties.value.description': '受控数值，遵守 min/max/step 约束。',
    'slider-props.properties.default-value.description': '初始数值，默认使用最小值与最大值的中点。',
    'slider-props.properties.on-value-change.description': '原生指针或键盘操作改变数值时调用。',
  },
} satisfies ApiDescriptionResources[string];

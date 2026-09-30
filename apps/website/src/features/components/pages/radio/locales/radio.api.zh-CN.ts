import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const radioApiZhCN = {
  api: {
    'radio-props.properties.children.description': '单选控件旁的可选可见标签。',
    'radio-props.properties.class-name.description': '应用到 Radio 根标签的自定义 class。',
    'radio-group-props.properties.class-name.description':
      '应用到 RadioGroup 根节点的自定义 class。',
    'radio-group-props.properties.default-value.description': '非受控模式下的初始选中值。',
    'radio-group-props.properties.value.description': '受控的选中值。',
    'radio-group-props.properties.disabled.description': '禁用分组中的所有单选控件。',
    'radio-group-props.properties.name.description': '转发到分组 radio 输入的共享原生 name。',
    'radio-group-props.properties.on-value-change.description': '选中值变化时调用。',
    'radio-group-props.properties.orientation.description': '分组的布局方向。',
  },
} satisfies ApiDescriptionResources[string];

import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const checkboxApiZhCN = {
  api: {
    'checkbox-props.properties.children.description': '复选框旁的可选可见标签。',
    'checkbox-props.properties.class-name.description': '应用到 Checkbox 根标签的自定义 class。',
    'checkbox-props.properties.indeterminate.description': '将原生复选框显示为部分选中状态。',
    'checkbox-group-props.properties.value.description': '受控的选中值。',
    'checkbox-group-props.properties.default-value.description': '非受控模式下的初始选中值。',
    'checkbox-group-props.properties.on-value-change.description': '选中值变化时调用。',
    'checkbox-group-props.properties.name.description': '转发到分组复选框的共享原生 name。',
    'checkbox-group-props.properties.disabled.description': '禁用分组中的所有复选框。',
  },
} satisfies ApiDescriptionResources[string];

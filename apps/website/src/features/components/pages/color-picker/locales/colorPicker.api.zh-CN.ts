import type { ApiDescriptionResources } from '@/i18n/api-description-resources';
export const colorPickerApiZhCN = {
  api: {
    'color-picker-props.properties.size.description': '视觉密度。',
    'color-picker-props.properties.value.description': '受控的不透明 sRGB 颜色，格式为 #rrggbb。',
    'color-picker-props.properties.default-value.description': '初始颜色。',
    'color-picker-props.properties.on-value-change.description':
      '原生颜色输入或色板选择有效 HEX 颜色时调用。',
    'color-picker-props.properties.name.description': '所选 HEX 颜色的原生表单名称。',
    'color-picker-props.properties.disabled.description': '禁用取色控件与色板。',
    'color-picker-props.properties.read-only.description': '阻止颜色修改，同时保留当前表单值。',
    'color-picker-swatch-props.properties.value.description': '此按钮代表的不透明 sRGB HEX 颜色。',
  },
} satisfies ApiDescriptionResources[string];

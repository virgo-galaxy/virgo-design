import type { ApiDescriptionResources } from '@/i18n/api-description-resources';
export const colorPickerApiZhCN = {
  api: {
    'color-picker-panel-props.properties.size.description': '内置面板控件的视觉密度。',
    'color-picker-trigger-props.properties.variant.description':
      '内置紧凑色块或固定宽度的色点与颜色值触发器。',
    'color-picker-trigger-props.properties.value-label.description':
      '显示自定义标签（例如 currentColor），替代当前 HEX 值。',
    'color-picker-panel-props.properties.alpha.description': '显示不透明度滑杆与百分比输入。',
    'color-picker-panel-props.properties.variant.description':
      '内置简洁 HEX 面板或完整 HEX/RGB 面板。',
    'color-picker-panel-props.properties.offset.description': '触发器与面板间距，单位为像素。',
    'color-picker-panel-props.properties.placement.description':
      '逻辑 Start/End 对齐跟随触发器的方向。',
    'color-picker-panel-props.properties.labels.description': '内置面板控件的本地化无障碍名称。',
    'color-picker-value-props.properties.letter-case.description': '显示字母大小写。',
    'color-picker-hex-field-props.properties.include-alpha.description':
      '文本是否包含透明度字节；关闭时 RGB 编辑仍保留透明度。',

    'color-picker-trigger-props.properties.render.description': '提供转发原生属性和 ref 的按钮。',
    'color-picker-hex-field-props.properties.letter-case.description':
      '显示字母大小写；提交颜色保持规范的小写格式。',
    'color-picker-content-props.properties.offset.description': '触发器与面板间距，单位为像素。',
    'color-picker-content-props.properties.placement.description':
      '逻辑 Start/End 对齐跟随触发器的方向。',
    'color-picker-channel-field-props.properties.channel.description':
      '以 0 到 255 的整数编辑的 sRGB 通道。',
    'color-picker-area-props.properties.brightness-label.description':
      '可独立使用键盘的明度滑块名称。',
    'color-picker-area-props.properties.saturation-label.description':
      '可独立使用键盘的饱和度滑块名称。',
    'color-picker-props.properties.on-open-change.description': '取色面板打开或关闭时调用。',
    'color-picker-props.properties.default-open.description': '取色面板的初始展开状态。',
    'color-picker-props.properties.open.description': '受控的取色面板展开状态。',
    'color-picker-props.properties.size.description': '视觉密度。',
    'color-picker-props.properties.value.description':
      '受控的 sRGB 颜色，格式为 #rrggbb 或 #rrggbbaa。',
    'color-picker-props.properties.default-value.description': '初始颜色。',
    'color-picker-props.properties.on-value-change.description':
      '任一取色部件选择有效 HEX 颜色时调用。',
    'color-picker-props.properties.name.description': '所选 HEX 颜色的原生表单名称。',
    'color-picker-props.properties.disabled.description': '禁用取色控件与色板。',
    'color-picker-props.properties.read-only.description': '阻止颜色修改，同时保留当前表单值。',
    'color-picker-swatch-props.properties.value.description':
      '此按钮代表的 sRGB HEX 颜色，可包含透明度。',
  },
} satisfies ApiDescriptionResources[string];

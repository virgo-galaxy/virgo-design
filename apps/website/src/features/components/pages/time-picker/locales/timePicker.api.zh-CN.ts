import type { ApiDescriptionResources } from '@/i18n/api-description-resources';
export const timePickerApiZhCN = {
  api: {
    'time-picker-props.properties.loop.description':
      '键盘导航在首末可选值之间循环，滚轮在列表边缘循环。',
    'time-picker-props.properties.show-seconds.description':
      '是否显示秒列，未设置时根据值或 step 精度自动推断。',
    'time-picker-props.properties.show-clear.description': '显示清空操作，必填字段不可清空。',
    'time-picker-props.properties.show-confirm.description':
      '显示关闭面板的完成操作，选择数值时仍立即更新。',
    'time-picker-props.properties.size.description': '视觉密度。',
    'time-picker-props.properties.value.description':
      '受控本地时间，格式为 HH:mm 或 HH:mm:ss，不进行时区转换。',
    'time-picker-props.properties.default-value.description': '初始本地时间，空字符串表示没有值。',
    'time-picker-props.properties.on-value-change.description':
      '原生时间编辑改变数值时调用，包括清空。',
  },
} satisfies ApiDescriptionResources[string];

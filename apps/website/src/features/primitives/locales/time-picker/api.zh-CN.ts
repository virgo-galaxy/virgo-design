import type { ApiDescriptionResources } from '@/i18n/api-description-resources';
export const timePickerApiZhCN = {
  api: {
    'time-picker-props.properties.value.description':
      '受控本地时间，格式为 HH:mm 或 HH:mm:ss，不进行时区转换。',
    'time-picker-props.properties.default-value.description': '初始本地时间，空字符串表示没有值。',
    'time-picker-props.properties.on-value-change.description':
      '原生时间编辑改变数值时调用，包括清空。',
  },
} satisfies ApiDescriptionResources[string];

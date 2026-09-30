import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const inputApiZhCN = {
  api: {
    'input-props.properties.size.description': '输入框的视觉尺寸。',
    'input-props.properties.prefix.description': '文本输入控件之前的装饰内容。',
    'input-props.properties.suffix.description': '文本输入控件之后的装饰内容。',
    'input-props.properties.clearable.description': '输入框有值时显示清空操作。',
    'input-props.properties.invalid.description': '为 true 时应用无效样式并设置 aria-invalid。',
    'input-password-props.properties.prefix.description': '文本输入控件之前的装饰内容。',
    'input-password-props.properties.size.description': '输入框的视觉尺寸。',
    'input-password-props.properties.suffix.description': '文本输入控件之后的装饰内容。',
    'input-password-props.properties.clearable.description': '输入框有值时显示清空操作。',
    'input-password-props.properties.invalid.description':
      '为 true 时应用无效样式并设置 aria-invalid。',
    'textarea-props.properties.size.description': '文本区域的视觉密度与最小高度。',
    'textarea-props.properties.invalid.description': '为 true 时应用无效样式并设置 aria-invalid。',
  },
} satisfies ApiDescriptionResources[string];

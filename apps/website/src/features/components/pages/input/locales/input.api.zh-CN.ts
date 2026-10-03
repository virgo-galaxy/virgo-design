import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const inputApiZhCN = {
  api: {
    'input-password-props.properties.root-class-name.description':
      '输入框外框的业务类名；className 设置原生输入样式。',
    'input-props.properties.root-class-name.description':
      '输入框外框的业务类名；className 设置原生输入样式。',
    'input-props.properties.size.description': '输入框的视觉尺寸。',
    'input-props.properties.prefix.description': '文本输入控件之前的装饰性文字、单位或图标。',
    'input-props.properties.suffix.description': '文本输入控件之后的装饰性文字、单位或图标。',
    'input-props.properties.clearable.description': '输入框有值时显示清空操作。',
    'input-props.properties.steppers.description':
      '为 type="number" 显示主题化增减按钮，遵循原生 min、max 和 step；其他类型或 step="any" 时忽略。按钮默认宽 24px，可通过外框的 --input-stepper-width 调整。',
    'input-props.properties.stepper-repeat.description':
      '数值增减按钮的长按重复行为。false 关闭重复，对象可自定义启动延迟和重复间隔。',
    'input-props.properties.stepper-reverse.description':
      '反转数值箭头操作：向上减少，向下增加；长按按钮和键盘上下键也使用相同方向。',
    'input-stepper-repeat-options.properties.delay.description':
      '按住按钮后开始重复步进之前的延迟，单位毫秒。',
    'input-stepper-repeat-options.properties.interval.description':
      '重复步进的间隔，单位毫秒，最小为 16。',
    'input-props.properties.invalid.description': '为 true 时应用无效样式并设置 aria-invalid。',
    'input-password-props.properties.prefix.description':
      '文本输入控件之前的装饰性文字、单位或图标。',
    'input-password-props.properties.size.description': '输入框的视觉尺寸。',
    'input-password-props.properties.suffix.description':
      '文本输入控件之后的装饰性文字、单位或图标。',
    'input-password-props.properties.clearable.description': '输入框有值时显示清空操作。',
    'input-password-props.properties.invalid.description':
      '为 true 时应用无效样式并设置 aria-invalid。',
    'textarea-props.properties.size.description': '文本区域的视觉密度与最小高度。',
    'textarea-props.properties.invalid.description': '为 true 时应用无效样式并设置 aria-invalid。',
  },
} satisfies ApiDescriptionResources[string];

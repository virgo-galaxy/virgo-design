import type { ApiDescriptionResources } from '@/i18n/api-description-resources';
export const fieldApiZhCN = {
  api: {
    'field-props.properties.control-id.description': '字段内单个控件的 ID，省略时自动生成。',
    'field-props.properties.disabled.description': '控件的默认禁用状态。',
    'field-props.properties.read-only.description': '阻止编辑，同时保留聚焦与表单提交能力。',
    'field-props.properties.required.description': '将控件标为必填并显示标签指示符。',
    'field-props.properties.invalid.description': '由使用方提供的校验状态，Field 不执行数据校验。',
    'field-control-props.properties.render.description': '使用字段提供的语义属性渲染自定义控件。',
  },
} satisfies ApiDescriptionResources[string];

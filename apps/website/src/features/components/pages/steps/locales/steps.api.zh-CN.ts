import type { ApiDescriptionResources } from '@/i18n/api-description-resources';
export const stepsApiZhCN = {
  api: {
    'steps-trigger-props.properties.aria-label.description':
      '当前元素的可访问名称。\n操作没有可见文字时必须提供可访问名称。',
    'steps-trigger-props.properties.size.description': '按钮的视觉尺寸。',
    'steps-trigger-props.properties.variant.description': '按钮的视觉样式。',
    'steps-trigger-props.properties.trailing-icon.description': '标签后的装饰内容。',
    'steps-trigger-props.properties.leading-icon.description': '标签前的装饰内容。',
    'steps-trigger-props.properties.shape.description':
      '文字按钮不使用仅图标按钮的几何形状。\n仅图标按钮的几何形状。',
    'steps-trigger-props.properties.icon-only.description':
      '保留默认文字按钮布局。\n呈现仅包含操作图标的紧凑控件。',
    'steps-trigger-props.properties.children.description':
      '操作的可见文字标签。\n按钮唯一可见内容中的图标。',
    'steps-item-props.properties.status.description': '由业务控制的进度状态。',
    'steps-props.properties.orientation.description': '有序步骤的排列方向。',
  },
} satisfies ApiDescriptionResources[string];

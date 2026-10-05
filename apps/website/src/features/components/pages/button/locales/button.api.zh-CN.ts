import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const buttonApiZhCN = {
  api: {
    'button-group-props.description': '组合相关的独立操作，不管理共同的选中值。',
    'button-group-props.properties.size.description':
      '组内按钮的共同尺寸，按钮显式指定的尺寸优先。',
    'button-group-props.properties.layout.description': '使用 custom 完整保留现有布局样式。',
    'button-group-props.properties.orientation.description': '控件排列方向。',
    'button-group-props.properties.align.description': '主轴对齐方式。',
    'button-group-props.properties.gap.description': '控件之间使用的间距 token。',
    'button-group-props.properties.render.description':
      '通过 Surface 或其他 div 组件复用根节点，不增加 DOM 包裹。',
    'button-group-props.properties.variant.description':
      '按钮保留间隔或连接相邻边缘。相连模式使用直接 Button 子元素。',

    'text-button-props.properties.children.description': '操作的可见文字标签。',
    'text-button-props.properties.icon-only.description': '保留默认文字按钮布局。',
    'text-button-props.properties.shape.description': '文字按钮不支持纯图标形状。',
    'text-button-props.properties.leading-icon.description': '标签之前的装饰内容。',
    'text-button-props.properties.trailing-icon.description': '标签之后的装饰内容。',
    'text-button-props.properties.variant.description': '按钮视觉样式。',
    'text-button-props.properties.size.description': '按钮视觉尺寸。',
    'icon-only-button-props.properties.icon-only.description': '渲染紧凑控件，子内容为操作图标。',
    'icon-only-button-props.properties.aria-label.description':
      '操作没有可见文字标签，因此必须提供无障碍名称。',
    'icon-only-button-props.properties.children.description': '按钮唯一可见内容中的图标。',
    'icon-only-button-props.properties.shape.description': '纯图标按钮形状。',
    'icon-only-button-props.properties.variant.description': '按钮视觉样式。',
    'icon-only-button-props.properties.size.description': '按钮视觉尺寸。',
    'button-props.properties.children.description':
      '操作的可见文字标签。\n按钮唯一可见内容中的图标。',
    'button-props.properties.icon-only.description':
      '保留默认文字按钮布局。\n渲染紧凑控件，子内容为操作图标。',
    'button-props.properties.shape.description': '文字按钮不支持纯图标形状。\n纯图标按钮形状。',
    'button-props.properties.leading-icon.description': '标签之前的装饰内容。',
    'button-props.properties.trailing-icon.description': '标签之后的装饰内容。',
    'button-props.properties.variant.description': '按钮视觉样式。',
    'button-props.properties.size.description': '按钮视觉尺寸。',
    'button-props.properties.aria-label.description':
      '定义当前元素的文字标签。\n操作没有可见文字标签，因此必须提供无障碍名称。',
  },
} satisfies ApiDescriptionResources[string];

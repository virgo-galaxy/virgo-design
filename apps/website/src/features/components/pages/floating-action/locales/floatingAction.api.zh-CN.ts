import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const floatingActionApiZhCN = {
  api: {
    'floating-action-props.properties.aria-label.description':
      '操作没有可见文字标签，因此必须提供无障碍名称。',
    'floating-action-props.properties.children.description': '按钮唯一可见内容中的图标。',
    'floating-action-props.properties.size.description': '按钮视觉尺寸。',
    'floating-action-props.properties.variant.description': '按钮视觉样式。',
    'floating-action-group-props.properties.trigger.description':
      '指针激活方式；两种模式均支持键盘与触摸点击。',
    'floating-action-group-props.properties.restore-focus-on-close.description':
      '程序关闭后将焦点返回触发器；Escape 始终返回焦点。',
    'floating-action-trigger-props.properties.aria-label.description':
      '纯图标控件必须提供的无障碍名称。',
    'floating-action-trigger-props.properties.render.description':
      '提供转发原生属性与 ref 的按钮。',
    'floating-action-content-props.properties.placement.description':
      '逻辑 Start/End 对齐遵循触发器的文字方向。',
    'floating-action-content-props.properties.offset.description':
      '触发器与面板之间的间距，单位为像素。',
  },
} satisfies ApiDescriptionResources[string];

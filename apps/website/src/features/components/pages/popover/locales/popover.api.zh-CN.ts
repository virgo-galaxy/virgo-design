import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const popoverApiZhCN = {
  api: {
    'popover-props.properties.trigger.description': '指针激活方式；两种模式均支持键盘与触摸点击。',
    'popover-props.properties.restore-focus-on-close.description':
      '程序关闭后将焦点返回触发器；Escape 始终返回焦点。',
    'popover-trigger-props.properties.variant.description':
      '未提供自定义 render 时的 Virgo Button 样式。',
    'popover-trigger-props.properties.size.description':
      '未提供自定义 render 时的 Virgo Button 尺寸。',
    'popover-trigger-props.properties.render.description': '提供转发原生属性与 ref 的按钮。',
    'popover-content-props.properties.placement.description':
      '逻辑 Start/End 对齐遵循触发器的文字方向。',
    'popover-content-props.properties.offset.description': '触发器与面板之间的间距，单位为像素。',
  },
} satisfies ApiDescriptionResources[string];

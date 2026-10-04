import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const popoverApiZhCN = {
  api: {
    'popover-props.properties.auto-focus.description':
      '展开时将焦点移入浮层；设为 false 时保留可编辑输入的焦点。',
    'popover-props.properties.anchor.description': '浮层相对于触发按钮或完整的根控件定位。',
    'popover-props.properties.trigger.description': '指针激活方式；两种模式均支持键盘与触摸点击。',
    'popover-props.properties.restore-focus-on-close.description':
      '程序关闭后将焦点返回触发器；Escape 始终返回焦点。',
    'popover-trigger-props.properties.render.description': '提供转发原生属性与 ref 的按钮。',
    'popover-content-props.properties.placement.description':
      '逻辑 Start/End 对齐遵循触发器的文字方向。',
    'popover-content-props.properties.offset.description': '触发器与面板之间的间距，单位为像素。',
  },
} satisfies ApiDescriptionResources[string];

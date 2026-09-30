import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const contextMenuApiZhCN = {
  api: {
    'context-menu-content-props.properties.placement.description':
      '首选弹层位置；会自动翻转和偏移以保持在视口内。',
    'context-menu-content-props.properties.offset.description':
      '锚点与弹层之间的距离，单位为像素。',
    'context-menu-props.properties.open.description': '受控模式下的菜单显示状态。',
    'context-menu-props.properties.default-open.description': '非受控模式下的初始显示状态。',
    'context-menu-props.properties.on-open-change.description': '菜单显示状态变化时调用。',
    'context-menu-props.properties.disabled.description': '禁用菜单打开操作。',
    'context-menu-trigger-props.description': '通过右键或键盘操作打开上下文菜单的目标元素。',
    'context-menu-trigger-props.properties.disabled.description':
      '禁用此目标元素的上下文菜单触发操作。',
    'context-menu-trigger-props.properties.render.description':
      '渲染自定义目标元素，并转发提供的属性和 ref。',
  },
} satisfies ApiDescriptionResources[string];

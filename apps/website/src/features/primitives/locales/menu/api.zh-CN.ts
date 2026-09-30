import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const menuApiZhCN = {
  api: {
    'menu-content-props.properties.placement.description':
      '首选弹层位置；会自动翻转和偏移以保持在视口内。',
    'menu-content-props.properties.offset.description': '锚点与弹层之间的距离，单位为像素。',
    'menu-props.properties.open.description': '受控模式下的菜单显示状态。',
    'menu-props.properties.default-open.description': '非受控模式下的初始显示状态。',
    'menu-props.properties.on-open-change.description': '菜单显示状态变化时调用。',
    'menu-props.properties.disabled.description': '禁用菜单打开操作。',
    'menu-submenu-props.properties.open.description': '受控模式下的菜单显示状态。',
    'menu-submenu-props.properties.default-open.description': '非受控模式下的初始显示状态。',
    'menu-submenu-props.properties.on-open-change.description': '菜单显示状态变化时调用。',
    'menu-submenu-props.properties.disabled.description': '禁用菜单打开操作。',

    'menu-checkbox-item-props.properties.on-select.description':
      '使用 event.preventDefault() 取消选择。',
    'menu-checkbox-item-props.properties.close-on-select.description':
      '操作默认使用 true，复选 / 单选项目默认使用 false。',
    'menu-checkbox-item-props.properties.text-value.description':
      '富内容的搜索标签。UI 会排除快捷键显示文字。',
    'menu-item-props.properties.on-select.description': '使用 event.preventDefault() 取消选择。',
    'menu-item-props.properties.close-on-select.description':
      '操作默认使用 true，复选 / 单选项目默认使用 false。',
    'menu-item-props.properties.text-value.description':
      '富内容的搜索标签。UI 会排除快捷键显示文字。',
    'menu-radio-item-props.properties.on-select.description':
      '使用 event.preventDefault() 取消选择。',
    'menu-radio-item-props.properties.close-on-select.description':
      '操作默认使用 true，复选 / 单选项目默认使用 false。',
    'menu-radio-item-props.properties.text-value.description':
      '富内容的搜索标签。UI 会排除快捷键显示文字。',
  },
} satisfies ApiDescriptionResources[string];

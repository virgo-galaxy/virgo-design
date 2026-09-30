import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const menubarApiZhCN = {
  api: {
    'menubar-content-props.properties.placement.description':
      '首选弹层位置；会自动翻转和偏移以保持在视口内。',
    'menubar-content-props.properties.offset.description': '锚点与弹层之间的距离，单位为像素。',
    'menubar-menu-props.properties.disabled.description': '禁用菜单打开操作。',

    'menubar-props.properties.value.description': '打开的顶层菜单值；null 关闭全部菜单。',
  },
} satisfies ApiDescriptionResources[string];

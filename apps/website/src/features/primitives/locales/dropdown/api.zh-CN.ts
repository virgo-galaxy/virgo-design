import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const dropdownApiZhCN = {
  api: {
    'dropdown-props.properties.trigger.description': '指针激活方式；两种模式均支持键盘与触摸激活。',
    'dropdown-trigger-props.properties.render.description':
      '渲染自定义按钮，转发全部提供的属性与 ref。',
    'dropdown-content-props.properties.placement.description':
      '首选物理位置；在视口边缘翻转与偏移。',
    'dropdown-item-props.properties.checked.description':
      '提供 checked 时，项目变为 menuitemradio。',
    'dropdown-item-props.properties.on-select.description': '阻止事件默认行为可保持菜单打开。',
  },
} satisfies ApiDescriptionResources[string];

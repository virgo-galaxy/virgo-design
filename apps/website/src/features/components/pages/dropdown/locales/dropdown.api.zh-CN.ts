import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const dropdownApiZhCN = {
  api: {
    'dropdown-props.properties.trigger.description': '指针激活方式；两种模式均支持键盘与触摸激活。',
    'dropdown-trigger-props.properties.render.description':
      '自定义按钮渲染；须转发全部传入属性及 ref。',
    'dropdown-text-trigger-props.properties.render.description':
      '自定义按钮渲染；须转发全部传入属性及 ref。',
    'dropdown-icon-trigger-props.properties.render.description':
      '自定义按钮渲染；须转发全部传入属性及 ref。',
    'dropdown-trigger-props.properties.indicator.description':
      '装饰性后置图标；false 隐藏图标，默认使用 ChevronDownIcon。',
    'dropdown-trigger-props.properties.icon-only.description':
      '使用方形纯图标按钮，并提供无障碍名称。',
    'dropdown-trigger-props.properties.aria-label.description': '为按钮提供无障碍名称。',
    'dropdown-text-trigger-props.properties.indicator.description':
      '装饰性后置图标；false 隐藏图标，默认使用 ChevronDownIcon。',
    'dropdown-icon-trigger-props.properties.icon-only.description':
      '使用方形纯图标按钮，并提供无障碍名称。',
    'dropdown-icon-trigger-props.properties.aria-label.description': '为按钮提供无障碍名称。',
    'dropdown-icon-trigger-props.properties.indicator.description':
      '装饰性后置图标；false 隐藏图标，默认使用 ChevronDownIcon。',
    'dropdown-content-props.properties.placement.description':
      '首选物理位置；在视口边缘翻转与偏移。',
    'dropdown-item-props.properties.checked.description':
      '提供 checked 时，项目变为 menuitemradio。',
    'dropdown-item-props.properties.on-select.description': '阻止事件默认行为可保持菜单打开。',
    'dropdown-button-props.properties.menu-label.description': '独立菜单按钮的无障碍标签。',
  },
} satisfies ApiDescriptionResources[string];

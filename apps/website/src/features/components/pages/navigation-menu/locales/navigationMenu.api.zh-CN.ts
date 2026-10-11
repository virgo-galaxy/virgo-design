import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const navigationMenuApiZhCN = {
  api: {
    'navigation-menu-props.properties.variant.description': 'Theme Contract 导航样式。',
    'navigation-menu-props.properties.submenu.description': '嵌套导航内容的呈现方式。',
    'navigation-menu-props.properties.orientation.description': '方向键导航使用的方向。',
    'navigation-menu-props.properties.value.description': '受控的激活项目值。',
    'navigation-menu-props.properties.default-value.description': '非受控模式下最初激活的项目值。',
    'navigation-menu-props.properties.on-value-change.description': '链接激活项目时调用。',
    'navigation-menu-root-props.properties.variant.description': 'Theme Contract 导航样式。',
    'navigation-menu-root-props.properties.submenu.description': '嵌套导航内容的呈现方式。',
    'navigation-menu-root-props.properties.orientation.description': '方向键导航使用的方向。',
    'navigation-menu-root-props.properties.value.description': '受控的激活项目值。',
    'navigation-menu-root-props.properties.default-value.description':
      '非受控模式下最初激活的项目值。',
    'navigation-menu-root-props.properties.on-value-change.description': '链接激活项目时调用。',
    'navigation-menu-item-props.properties.icon.description':
      '此项目的 Link 或 Trigger 共用的装饰图标。',
    'navigation-menu-item-props.properties.value.description':
      '用于与根节点激活状态协调此项目的稳定值。',
    'navigation-menu-item-props.properties.disabled.description':
      '阻止激活此项目的链接或展开触发器。',
    'navigation-menu-item-props.properties.expanded.description': '此项目嵌套内容的受控展开状态。',
    'navigation-menu-item-props.properties.default-expanded.description':
      '非受控模式下的初始展开状态。',
    'navigation-menu-item-props.properties.on-expanded-change.description':
      '嵌套内容展开或收起时调用。',
    'navigation-menu-link-props.properties.render.description':
      '渲染自定义链接，转发全部提供的属性与 ref。',
    'navigation-menu-trigger-props.properties.indicator.description': '是否渲染展开指示器。',
    'navigation-menu-trigger-props.properties.render.description':
      '渲染自定义按钮，转发全部提供的属性与 ref。',
    'navigation-menu-content-props.properties.arrow.description':
      '在浮层子菜单中显示指向触发器的装饰箭头；内联子菜单忽略此属性。',
  },
} satisfies ApiDescriptionResources[string];

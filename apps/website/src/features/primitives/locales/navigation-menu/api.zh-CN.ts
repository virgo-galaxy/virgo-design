import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const navigationMenuApiZhCN = {
  api: {
    'navigation-menu-props.properties.orientation.description': '方向键导航使用的方向。',
    'navigation-menu-props.properties.value.description': '受控的激活条目值。',
    'navigation-menu-props.properties.default-value.description': '非受控模式下最初激活的条目值。',
    'navigation-menu-props.properties.on-value-change.description': '链接激活条目时调用。',
    'navigation-menu-root-props.properties.orientation.description': '方向键导航使用的方向。',
    'navigation-menu-root-props.properties.value.description': '受控的激活条目值。',
    'navigation-menu-root-props.properties.default-value.description':
      '非受控模式下最初激活的条目值。',
    'navigation-menu-root-props.properties.on-value-change.description': '链接激活条目时调用。',
    'navigation-menu-group-props.description':
      '放在 List 内，并通过 aria-labelledby 引用 GroupLabel 的 id。',
    'navigation-menu-group-label-props.description': '非交互分组标题，接受标准 div 属性与 ref。',
    'navigation-menu-item-props.properties.value.description':
      '用于与根节点激活状态协调此条目的稳定值。',
    'navigation-menu-item-props.properties.disabled.description':
      '阻止激活此条目的链接或展开触发器。',
    'navigation-menu-item-props.properties.expanded.description': '此条目嵌套内容的受控展开状态。',
    'navigation-menu-item-props.properties.default-expanded.description':
      '非受控模式下的初始展开状态。',
    'navigation-menu-item-props.properties.on-expanded-change.description':
      '嵌套内容展开或收起时调用。',
    'navigation-menu-link-props.properties.render.description':
      '渲染自定义链接，转发全部提供的属性与 ref。',
    'navigation-menu-trigger-props.properties.render.description':
      '渲染自定义按钮，转发全部提供的属性与 ref。',
  },
} satisfies ApiDescriptionResources[string];

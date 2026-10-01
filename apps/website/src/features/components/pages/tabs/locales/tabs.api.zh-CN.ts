import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const tabsApiZhCN = {
  api: {
    'tab-props.properties.label-class-name.description': '标签槽位的业务类名。',
    'tab-props.properties.tab-class-name.description': '可聚焦标签按钮的业务类名。',
    'tabs-props.properties.variant.description': '标签列表的视觉样式。',
    'tabs-props.properties.align.description': '标签页在列表内的水平对齐方式。',
    'tabs-props.properties.class-name.description': '应用到 Tabs 根节点的自定义 class。',
    'tabs-props.properties.default-value.description': '非受控模式下初始激活的标签页值。',
    'tabs-props.properties.value.description': '受控的激活标签页值。',
    'tabs-props.properties.on-value-change.description': '激活标签页变化时调用。',
    'tabs-props.properties.addable.description': '为可编辑 card 标签页在 tablist 末尾添加操作。',
    'tabs-props.properties.on-add.description': '添加标签页操作激活时调用。',
    'tabs-props.properties.add-label.description': '纯图标添加操作的无障碍名称。',
    'tab-list-props.properties.class-name.description': '应用到 TabList 根节点的自定义 class。',
    'tab-props.properties.children.description': '可见标签页标签。',
    'tab-props.properties.icon.description': '标签页标签之前的可选装饰图标。',
    'tab-props.properties.class-name.description': '应用到标签项目包裹元素的自定义 class。',
    'tab-props.properties.value.description': '将此标签页与其面板关联的值。',
    'tab-props.properties.closable.description':
      '为 card 标签页显示指针关闭操作，并启用 Delete 键。',
    'tab-props.properties.on-close.description': '关闭操作激活时，以此标签页的值调用。',
    'tab-props.properties.close-label.description': '纯图标关闭操作的无障碍名称。',
    'tab-panel-props.properties.class-name.description': '应用到 TabPanel 根节点的自定义 class。',
    'tab-panel-props.properties.value.description': '控制此面板的标签页值。',
  },
} satisfies ApiDescriptionResources[string];

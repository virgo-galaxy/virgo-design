import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const layoutApiZhCN = {
  api: {
    'layout-surface.description': 'Surface 渲染全部背景与材质。',
    'layout-surface.properties.tone.description': '语义表面颜色。',
    'layout-surface.properties.material.description': '表面样式，独立于色调与背景。',
    'layout-surface.properties.background.description': '材质下方的可选装饰背景。图像不会重复。',
    'layout-surface.properties.elevation.description': '现有的主题适配层级。',
    'layout-surface.properties.radius.description': '现有圆角 token。',
    'layout-surface.properties.border.description':
      '语义边框。glass 默认为 subtle，其他材质默认为 none。',
    'layout-props.properties.class-name.description': '应用到布局容器的自定义 class。',
    'layout-props.properties.children.description': '按文档顺序渲染的结构区域。',
    'layout-props.properties.direction.description': '直接子区域的排列方向。',
    'layout-header-props.properties.class-name.description': '应用到标题区的自定义 class。',
    'layout-header-props.properties.gap.description': '组合的标志、内容与操作之间的间距。',
    'layout-header-props.properties.padding-inline.description': '组合标题区的逻辑行内内边距。',
    'layout-header-props.properties.content-align.description':
      '可选内容插槽在可用空间内的水平对齐方式。',
    'layout-lane-props.properties.class-name.description': '应用到 Lane 边界的自定义 class。',
    'layout-lane-props.properties.width.description': 'Lane 宽度，独立于内部嵌套内容的宽度。',
    'layout-lane-props.properties.max-width.description': 'Lane 宽度的可选上限。',
    'layout-lane-props.properties.min-height.description': 'Lane 的可选最小块尺寸。',
    'layout-lane-props.properties.inset.description': 'Lane 边界与常规文档流子内容之间的简写间距。',
    'layout-lane-props.properties.inset-inline.description': '逻辑行内间距，在行内轴上覆盖 inset。',
    'layout-lane-props.properties.inset-block.description': '逻辑块间距，在块轴上覆盖 inset。',
    'layout-lane-props.properties.children.description': '此空间分区内的结构子内容。',
    'layout-lane-props.properties.direction.description': '直接 Lane 子内容的排列方向。',
    'layout-sidebar-props.properties.width.description':
      '展开宽度，默认为三个 sizing-80 token（240px）。',
    'layout-sidebar-props.properties.collapsed-width.description':
      '窄栏宽度。配合边缘或外部触发器使用数字 0，可隐藏此区域。',
    'layout-sidebar-props.properties.trigger.description':
      '省略时显示默认按钮；null 隐藏按钮。自定义触发器使用 SidebarTrigger。',
    'layout-sidebar-props.properties.trigger-placement.description':
      '将折叠控件放在底部或外侧边缘。',
    'layout-sidebar-props.properties.collapse-below.description':
      '视口宽度，单位为 px。进入范围时折叠，离开时恢复之前状态。',
    'layout-sidebar-props.properties.resizable.description':
      '允许通过指针与键盘调整已展开侧栏的宽度。',
    'layout-sidebar-props.properties.min-width.description': '可调整宽度的最小值，单位为 px。',
    'layout-sidebar-props.properties.max-width.description': '可调整宽度的最大值，单位为 px。',
    'layout-sidebar-props.properties.on-width-change.description': '可调整宽度变化期间调用。',
    'layout-sidebar-props.properties.offset.description': '浮动模式下与容器区域边缘的距离。',
    'layout-content-props.properties.class-name.description': '应用到主内容区域的自定义 class。',
    'layout-footer-props.properties.class-name.description': '应用到底部区域的自定义 class。',
    'layout-floating-props.properties.placement.description':
      '最近的 Content 或 Layout 内的逻辑角落。',
    'layout-floating-props.properties.offset.description': '与两条边缘的距离，默认为 spacing-24。',
  },
} satisfies ApiDescriptionResources[string];

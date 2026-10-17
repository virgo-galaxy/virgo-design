import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const layoutApiZhCN = {
  api: {
    'layout-sidebar-display-state.description': '侧栏的展开、图标栏与完全隐藏三种独立状态。',
    'layout-sidebar-state.properties.state.description': '当前解析后的显示状态。',
    'layout-sidebar-state.properties.set-state.description': '请求改变显示状态。',
    'layout-sidebar-provider-props.description':
      '单个侧栏的共享状态与外部触发器作用域。Provider 的状态优先于内部 Sidebar 的状态属性。',
    'layout-sidebar-provider-props.properties.id.description':
      '此 Provider 控制的单个 Sidebar 的 ID。省略时自动生成。',
    'layout-sidebar-provider-props.properties.state.description':
      'Sidebar 与触发器共享的受控显示状态。',
    'layout-sidebar-provider-props.properties.default-state.description': '初始非受控显示状态。',
    'layout-sidebar-provider-props.properties.on-state-change.description':
      '触发器、拖动吸附或响应式行为请求改变状态时调用。',
    'layout-sidebar-provider-props.properties.children.description':
      '此作用域内的 Sidebar 及内部或外部触发器。',
    'layout-sidebar-trigger-props.properties.action.description':
      '与 Sidebar 或外层 SidebarProvider 共享的操作。',
    'layout-sidebar-resize-snap.description': '拖宽时可选的图标栏与隐藏吸附阈值。',
    'layout-sidebar-resize-snap.properties.collapse-at.description':
      '原始拖动宽度达到或低于此值时吸附成图标栏。',
    'layout-sidebar-resize-snap.properties.hide-at.description':
      '可选隐藏阈值。原始拖动宽度达到或低于此值时隐藏；必须低于 collapseAt。',
    'layout-sidebar-resize-snap.properties.hysteresis.description':
      '脱离吸附状态前需额外向外拖动的距离。',
    'layout-sidebar-resize-result.description': '最终拖宽请求，可用于由使用方保存偏好。',
    'layout-sidebar-resize-result.properties.width.description':
      '记住的展开宽度，单位为 px，独立于图标栏与隐藏宽度。',
    'layout-sidebar-resize-result.properties.state.description': '最终请求的显示状态。',
    'layout-sidebar-resize-result.properties.cancelled.description':
      '指针拖动是否已取消并恢复起始状态与宽度。',
    'layout-sidebar-props.properties.resize-snap.description':
      '按需启用图标栏与隐藏吸附阈值；最小与最大宽度仍仅约束展开宽度。',
    'layout-sidebar-props.properties.on-resize-end.description':
      '指针释放、取消或一次键盘调整结束时调用。',
    'layout-sidebar-props.properties.state.description': '受控显示状态。',
    'layout-sidebar-props.properties.default-state.description':
      '初始非受控显示状态。',
    'layout-sidebar-props.properties.on-state-change.description':
      '独立 Sidebar 请求改变状态时调用；共享作用域中的状态控制应放在 SidebarProvider。',
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
    'layout-sidebar-props.properties.min-width.description':
      '展开宽度的最小值，单位为 px，不约束图标栏或隐藏状态。',
    'layout-sidebar-props.properties.max-width.description': '展开宽度的最大值，单位为 px。',
    'layout-sidebar-props.properties.on-width-change.description': '可调整宽度变化期间调用。',
    'layout-sidebar-props.properties.offset.description': '浮动模式下与容器区域边缘的距离。',
    'layout-content-props.properties.class-name.description': '应用到主内容区域的自定义 class。',
    'layout-content-props.properties.as.description': '页面主要区域或嵌入内容区域使用的语义元素。',
    'layout-footer-props.properties.class-name.description': '应用到底部区域的自定义 class。',
    'layout-floating-props.properties.placement.description':
      '最近的 Content 或 Layout 内的逻辑角落。',
    'layout-floating-props.properties.offset.description': '与两条边缘的距离，默认为 spacing-24。',
  },
} satisfies ApiDescriptionResources[string];

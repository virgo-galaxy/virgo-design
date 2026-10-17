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
    'layout-sidebar-props.properties.state.description': '受控显示状态。',
    'layout-sidebar-props.properties.default-state.description':
      '初始非受控显示状态。',
    'layout-sidebar-props.properties.on-state-change.description':
      '独立 Sidebar 请求改变状态时调用；共享作用域中的状态控制应放在 SidebarProvider。',
    'layout-content-props.properties.as.description': '页面主要区域或嵌入内容区域使用的语义元素。',
    'layout-props.properties.children.description': '按文档顺序渲染的结构区域。',
    'layout-props.properties.direction.description': '直接子区域的排列方向。',
    'layout-lane-props.properties.children.description': '此空间分区内的结构子内容。',
    'layout-lane-props.properties.direction.description': '直接 Lane 子内容的排列方向。',
  },
} satisfies ApiDescriptionResources[string];

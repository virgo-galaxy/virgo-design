import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const dockApiZhCN = {
  api: {
    'dock-root-props.properties.placement.description': '受控的边缘位置。',
    'dock-root-props.properties.default-placement.description':
      '受控位置决定初始状态。\n没有持久化值时的初始位置。',
    'dock-root-props.properties.persist.description':
      '受控模式下，持久化由外部状态管理方处理。\n通过浏览器存储在刷新后保留非受控位置。',
    'dock-root-props.properties.on-placement-change.description': '指针或键盘交互改变位置时调用。',
    'dock-root-props.properties.allowed-edges.description': '可用于定位与重新定位的边缘。',
    'dock-root-props.properties.snap-divisions.description':
      '各边缘上的等分吸附区间数；false 表示连续自由定位。',
    'dock-root-props.properties.disabled.description': '禁用拖拽与键盘重新定位。',
    'dock-root-props.properties.locked.description': '阻止指针与键盘移动，不改变定位模式。',
    'dock-root-props.properties.default-locked.description': '非受控模式下的初始移动锁定状态。',
    'dock-root-props.properties.pinned.description':
      '将当前 Dock 框架固定在视口中，不发生跳动；未锁定或禁用时仍可移动。',
    'dock-root-props.properties.default-pinned.description': '非受控模式下的初始固定定位状态。',
    'dock-root-props.properties.chrome-visibility.description':
      '外壳、移动手柄与内置锁定 / 固定控件的显示时机。',
    'dock-handle-props.properties.position.description': '移动手柄在 Dock.Root 中的逻辑位置。',
    'dock-persist-options.properties.key.description':
      'Virgo Design 存储命名空间内由使用方提供的稳定标识。',
    'dock-persist-options.properties.storage.description':
      '非受控位置持久化所用的浏览器存储生命周期。',
    'dock-placement.properties.edge.description': '所在 Dock.Boundary 的边缘。',
    'dock-placement.properties.position.description': '当前边缘上的归一化位置，范围为 0 到 1。',
  },
} satisfies ApiDescriptionResources[string];

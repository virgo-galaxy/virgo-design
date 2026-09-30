import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const cursorApiZhCN = {
  api: {
    'cursor-follow-options.properties.tooltip.description':
      '允许后代 Tooltip 跟随鼠标悬停，键盘聚焦仍锚定元素。',
    'cursor-pointer.properties.get-snapshot.description':
      '稳定的外部存储。在 effect 中订阅，获取每帧合并的更新，无需 React 重新渲染。',
    'cursor-pointer.properties.reset.description':
      '隐藏并重置全部指针反馈，例如在客户端导航之前调用。',
    'cursor-provider-props.properties.reset-key.description':
      '此值变化时重置反馈；SPA 导航可传入路由的 location key。',
    'cursor-provider-props.properties.hotspot.description': '自定义视觉内与指针重合的像素坐标。',
    'cursor-provider-props.properties.visual-class-name.description':
      '应用到 portal 中非交互视觉层的 class。',
    'cursor-follower-props.properties.offset.description': '与指针的间距，单位为像素。',
    'cursor-follower-props.properties.offset-x.description': '水平锚点调整量，单位为像素。',
  },
} satisfies ApiDescriptionResources[string];

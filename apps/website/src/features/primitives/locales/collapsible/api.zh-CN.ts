import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const collapsibleApiZhCN = {
  api: {
    'collapsible-content-props.properties.keep-mounted.description':
      '保留收起的内容供消费者制作动画；内容不可交互，也不进入辅助技术树。',
    'collapsible-props.properties.open.description': '受控打开状态。',
    'collapsible-props.properties.default-open.description': '非受控模式下的初始打开状态。',
    'collapsible-props.properties.on-open-change.description': '打开状态变化时调用。',
    'collapsible-root-props.properties.open.description': '受控打开状态。',
    'collapsible-root-props.properties.default-open.description': '非受控模式下的初始打开状态。',
    'collapsible-root-props.properties.on-open-change.description': '打开状态变化时调用。',
    'collapsible-trigger-props.properties.render.description':
      '渲染自定义按钮，转发全部提供的属性与 ref。',
  },
} satisfies ApiDescriptionResources[string];

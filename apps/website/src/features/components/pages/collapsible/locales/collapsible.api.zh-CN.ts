import type { ApiDescriptionResources } from '@/i18n/api-description-resources';
export const collapsibleApiZhCN = {
  api: {
    'collapsible-content-props.properties.motion.description':
      '过渡内容的自然高度。collapse 保留收起内容以便反向过渡；收起内容不可交互。',
    'collapsible-content-props.properties.keep-mounted.description':
      '保留收起的内容供消费者制作动画；内容不可交互，也不进入辅助技术树。',
    'collapsible-trigger-props.properties.render.description':
      '渲染转发所有原生属性和 ref 的自定义按钮。',
    'collapsible-trigger-props.properties.indicator.description':
      '自定义装饰指示器；null 隐藏指示器。',
    'collapsible-root-props.properties.on-open-change.description': '展开状态变化时调用。',
    'collapsible-root-props.properties.default-open.description': '非受控使用时的初始展开状态。',
    'collapsible-root-props.properties.open.description': '受控的展开状态。',
    'collapsible-props.properties.on-open-change.description': '展开状态变化时调用。',
    'collapsible-props.properties.default-open.description': '非受控使用时的初始展开状态。',
    'collapsible-props.properties.open.description': '受控的展开状态。',
  },
} satisfies ApiDescriptionResources[string];

import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const toastApiZhCN = {
  api: {
    'toast-viewport-props.properties.portal.description':
      '将消息视口挂载到 document.body，并继承声明位置的主题和方向。',
    'toast-provider-props.properties.hotkey.description': '将焦点移入消息视口的键盘快捷键。',
    'toast-props.properties.duration.description':
      '自动关闭延迟，单位为毫秒。使用 0 保持消息打开。',
    'toast-props.properties.priority.description': '播报优先级。',
    'toast-root-props.properties.duration.description':
      '自动关闭延迟，单位为毫秒。使用 0 保持消息打开。',
    'toast-root-props.properties.priority.description': '播报优先级。',
    'toast-action-props.properties.render.description': '渲染自定义按钮，转发提供的属性与 ref。',
    'toast-close-props.properties.render.description': '渲染自定义按钮，转发提供的属性与 ref。',
  },
} satisfies ApiDescriptionResources[string];

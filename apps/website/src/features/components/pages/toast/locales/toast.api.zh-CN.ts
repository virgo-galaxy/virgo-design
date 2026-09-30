import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const toastApiZhCN = {
  api: {
    'toast-props.properties.appearance.description': '通知卡片或按内容宽度呈现的紧凑反馈。',
    'toast-root-props.properties.appearance.description': '通知卡片或按内容宽度呈现的紧凑反馈。',
    'toast-provider-props.properties.hotkey.description': '将焦点移入通知视口的键盘快捷键。',
    'toast-props.properties.icon.description': '覆盖状态图标；使用 false 隐藏图标。',
    'toast-props.properties.duration.description':
      '自动关闭延迟，单位为毫秒。使用 0 保持通知打开。',
    'toast-props.properties.priority.description': '播报优先级。',
    'toast-root-props.properties.icon.description': '覆盖状态图标；使用 false 隐藏图标。',
    'toast-root-props.properties.duration.description':
      '自动关闭延迟，单位为毫秒。使用 0 保持通知打开。',
    'toast-root-props.properties.priority.description': '播报优先级。',
    'toast-action-props.properties.render.description': '渲染自定义按钮，转发提供的属性与 ref。',
    'toast-close-props.properties.render.description': '渲染自定义按钮，转发提供的属性与 ref。',
  },
} satisfies ApiDescriptionResources[string];

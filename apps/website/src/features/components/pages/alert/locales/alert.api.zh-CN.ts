import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const alertApiZhCN = {
  api: {
    'alert-props.properties.intent.description': '语义状态样式。',
    'alert-props.properties.variant.description': '表面样式。',
    'alert-props.properties.icon.description':
      '覆盖 Alert.Icon 渲染的状态图标。使用 false 隐藏图标。',
    'alert-root-props.properties.intent.description': '语义状态样式。',
    'alert-root-props.properties.variant.description': '表面样式。',
    'alert-root-props.properties.icon.description':
      '覆盖 Alert.Icon 渲染的状态图标。使用 false 隐藏图标。',
    'alert-close-props.properties.on-click.description':
      '通知使用方；Alert.Close 不会自行移除 Alert。',
  },
} satisfies ApiDescriptionResources[string];

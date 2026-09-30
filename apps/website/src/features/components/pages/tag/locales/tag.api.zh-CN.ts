import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const tagApiZhCN = {
  api: {
    'tag-props.properties.intent.description': '语义颜色样式。',
    'tag-props.properties.variant.description': '表面样式。',
    'tag-props.properties.size.description': '紧凑视觉尺寸。',
    'tag-props.properties.icon.description': '装饰性前置图标。',
    'tag-props.properties.closable.description': '显示支持键盘访问的关闭控件。',
    'tag-props.properties.disabled.description': '此标签可交互时，禁用关闭控件。',
    'tag-props.properties.close-label.description': '关闭控件的无障碍名称。',
    'tag-props.properties.on-close.description': '通知使用方；Tag 不会自行移除。',
  },
} satisfies ApiDescriptionResources[string];

import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const avatarApiZhCN = {
  api: {
    'avatar-props.properties.src.description': '表示身份的图像来源。',
    'avatar-props.properties.alt.description': '图像的无障碍替代文本。装饰图像使用空字符串。',
    'avatar-props.properties.fallback.description': '未提供图像或加载失败时显示的内容。',
    'avatar-props.properties.size.description': 'Avatar 尺寸。',
    'avatar-props.properties.shape.description': 'Avatar 轮廓。',
    'avatar-props.properties.loading.description': '原生图像加载行为。',
  },
} satisfies ApiDescriptionResources[string];

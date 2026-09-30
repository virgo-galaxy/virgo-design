import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const breadcrumbApiZhCN = {
  api: {
    'breadcrumb-props.properties.class-name.description': '应用到面包屑导航的自定义 class。',
    'breadcrumb-props.properties.children.description': '按路径顺序渲染的面包屑项目。',
    'breadcrumb-props.properties.separator.description': '项目之间的装饰内容。',
    'breadcrumb-item-props.properties.children.description':
      '可见项目内容，包括动态 ReactNode 值。',
    'breadcrumb-item-props.properties.icon.description': '项目内容之前的可选装饰图标。',
    'breadcrumb-item-props.properties.class-name.description':
      '应用到链接或当前页面元素的自定义 class。',
    'breadcrumb-item-props.properties.href.description': '原生链接目标。',
  },
} satisfies ApiDescriptionResources[string];

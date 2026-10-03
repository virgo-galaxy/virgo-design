import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const breadcrumbApiZhCN = {
  api: {
    'breadcrumb-item-props.properties.render.description':
      '路由适配函数，需要将属性、内容和 ref 转发给原生链接。',
    'breadcrumb-link-item-props.properties.render.description':
      '路由适配函数，需要将属性、内容和 ref 转发给原生链接。',
    'breadcrumb-props.properties.children.description': '按路径顺序渲染的面包屑项目。',
    'breadcrumb-props.properties.separator.description': '项目之间的装饰内容。',
    'breadcrumb-link-item-props.properties.href.description': '原生链接目标。',
    'breadcrumb-link-item-props.properties.children.description': '可见项目内容。',
    'breadcrumb-current-item-props.properties.children.description': '可见的当前页面内容。',
    'breadcrumb-item-props.properties.href.description': '原生链接目标。',
    'breadcrumb-item-props.properties.children.description': '可见项目内容。\n可见的当前页面内容。',
  },
} satisfies ApiDescriptionResources[string];

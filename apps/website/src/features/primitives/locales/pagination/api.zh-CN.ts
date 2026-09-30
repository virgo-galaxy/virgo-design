import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const paginationApiZhCN = {
  api: {
    'pagination-state.properties.set-page-size.description':
      '在一次变更通知中改变每页条数并返回第一页。',
    'pagination-item-props.properties.current.description':
      '仅数字项目代表当前页面，上一页 / 下一页或跳转操作不代表当前页面。',
  },
} satisfies ApiDescriptionResources[string];

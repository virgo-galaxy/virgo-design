import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const paginationApiZhCN = {
  api: {
    'pagination-props.properties.align.description': '可用宽度内的对齐方式。',
    'pagination-props.properties.show-all.description':
      '同时启用总数、每页条数和快速跳转；各独立开关优先。',
    'pagination-props.properties.page-size-options.description':
      '正整数选项，始终包含当前每页条数。',
    'pagination-props.properties.labels.description': '可见文案与无障碍名称，默认为英文。',
  },
} satisfies ApiDescriptionResources[string];

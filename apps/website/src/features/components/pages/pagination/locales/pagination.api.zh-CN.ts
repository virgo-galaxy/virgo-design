import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const paginationApiZhCN = {
  api: {
    'pagination-props.properties.selected-count.description':
      '跨页已选条目数，追加在总数后；未传入或为零时隐藏。',
    'pagination-labels.properties.selected.description':
      '已选数量的后缀文案，仅在 selectedCount 大于零时追加到总数后。',
    'pagination-props.properties.size.description': '页码、每页条数选择与快速跳转的尺寸。',
    'pagination-props.properties.align.description': '可用宽度内的对齐方式。',
    'pagination-props.properties.show-all.description':
      '同时启用总数、每页条数和快速跳转；各独立开关优先。',
    'pagination-props.properties.page-size-options.description':
      '正整数选项，始终包含当前每页条数。',
    'pagination-props.properties.labels.description': '可见文案与无障碍名称，默认为英文。',
  },
} satisfies ApiDescriptionResources[string];

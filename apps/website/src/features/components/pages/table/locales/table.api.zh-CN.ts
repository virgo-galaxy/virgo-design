import type { ApiDescriptionResources } from '@/i18n/api-description-resources';
export const tableApiZhCN = {
  api: {
    'table-props.properties.size.description': '单元格密度。',
    'table-props.properties.border.description': '边框样式。',
    'table-props.properties.striped.description': '交替显示表格主体行的背景。',
    'table-props.properties.hoverable.description': '高亮指针悬停的行。',
    'table-props.properties.sticky-header.description': '将列标题固定在最近的滚动视口内。',
    'table-head-props.properties.align.description': '逻辑方向的对齐方式，end 适用于数字列。',
    'table-cell-props.properties.align.description': '逻辑方向的对齐方式，end 适用于数字列。',
    'table-row-props.properties.selected.description':
      '由使用方控制的选中外观，不添加数据网格的选择语义。',
  },
} satisfies ApiDescriptionResources[string];

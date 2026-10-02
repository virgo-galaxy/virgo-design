import type { ApiDescriptionResources } from '@/i18n/api-description-resources';
export const tableApiZhCN = {
  api: {
    'table-head-props.properties.sort-direction.description':
      '当前列的排序方向，映射到 aria-sort。',
    'table-head-props.properties.on-sort-change.description':
      '将列标题变为三态排序按钮；数据顺序由使用方管理。',
    'table-sort-button-props.properties.direction.description': '受控的排序方向。',
    'table-sort-button-props.properties.default-direction.description':
      '非受控模式下的初始排序方向。',
    'table-sort-button-props.properties.on-direction-change.description':
      '请求下一个排序方向：未排序 → 升序 → 降序 → 未排序。',
    'table-props.properties.density.description':
      '统一控制单元格内边距及表头、数据行的最小高度，优先于 size。',
    'table-props.properties.size.description':
      '兼容旧的密度别名：small = compact、medium = default、large = comfortable。建议使用 density。',
    'table-props.properties.border.description':
      '边框样式。separators 仅分隔相邻行，不绘制外边缘。',
    'table-props.properties.striped.description': '交替显示表格主体行的背景。',
    'table-props.properties.hoverable.description': '高亮指针悬停的行。',
    'table-props.properties.sticky-header.description': '将列标题固定在最近的滚动视口内。',
    'table-head-props.properties.align.description': '逻辑方向的对齐方式，end 适用于数字列。',
    'table-cell-props.properties.align.description': '逻辑方向的对齐方式，end 适用于数字列。',
    'table-row-props.properties.selected.description':
      '由使用方控制的选中外观，不添加数据网格的选择语义。',
  },
} satisfies ApiDescriptionResources[string];

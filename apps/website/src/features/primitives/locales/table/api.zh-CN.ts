import type { ApiDescriptionResources } from '@/i18n/api-description-resources';
export const tableApiZhCN = {
  api: {
    'table-head-props.properties.sort-direction.description':
      '当前列的排序方向，映射到 aria-sort。',
    'table-sort-button-props.properties.direction.description': '受控的排序方向。',
    'table-sort-button-props.properties.default-direction.description':
      '非受控模式下的初始排序方向。',
    'table-sort-button-props.properties.on-direction-change.description':
      '请求下一个排序方向：未排序 → 升序 → 降序 → 未排序。',
    'table-row-props.properties.selected.description':
      '由使用方控制的选中外观，不添加数据网格的选择语义。',
  },
} satisfies ApiDescriptionResources[string];

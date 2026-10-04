import type { ApiDescriptionResources } from '@/i18n/api-description-resources';
export const tableApiZhCN = {
  api: {
    'table-filter-props.properties.tooltip.description':
      '提示内容，默认使用通用文案“筛选”；false 隐藏提示。',
    'table-selection-option.properties.key.description': '自定义操作的稳定标识。',
    'table-selection-option.properties.label.description': '菜单项内容。',
    'table-selection-option.properties.on-select.description':
      '根据当前页可选键和已选键返回新的选择。',
    'table-selection-option.properties.disabled.description': '禁用此操作。',
    'table-selection-props.properties.row-keys.description':
      '当前页可选行的键，按显示顺序排列；排除禁用行。',
    'table-selection-props.properties.value.description': '受控的已选键，可以包含其他页的选择。',
    'table-selection-props.properties.default-value.description': '非受控模式下的初始已选键。',
    'table-selection-props.properties.on-value-change.description':
      '复选框或菜单操作改变选择时触发一次。',
    'table-selection-props.properties.selections.description':
      '可选批量菜单。true 提供全选、反选和清空；数组可排列内置和自定义操作；false 或空数组隐藏箭头。',
    'table-selection-props.properties.label.description': '当页全选复选框的可访问名称。',
    'table-selection-props.properties.menu-label.description': '批量选择菜单入口的可访问名称。',
    'table-selection-props.properties.disabled.description':
      '禁用复选框和菜单；当前页无可选行时也会禁用。',

    'table-filter-props.properties.size.description': '确定与重置操作按钮的尺寸。',
    'table-props.properties.header-dividers.description': '列标题之间的短竖分隔线，默认显示。',
    'table-props.properties.resizable.description': '开启指针拖动和键盘列宽调整，默认关闭。',
    'table-props.properties.min-column-width.description': '调整列宽时允许的最小像素宽度。',
    'table-head-props.properties.actions.description':
      '列标题末尾的操作控件，例如 Table.Filter；与排序按钮分开。',
    'table-filter-props.properties.label.description': '用于筛选按钮和弹层可访问名称的列名。',
    'table-filter-props.properties.options.description': '可供勾选的筛选项。',
    'table-filter-props.properties.value.description': '受控的已生效筛选值，空数组表示不筛选。',
    'table-filter-props.properties.default-value.description': '非受控模式下初始生效的筛选值。',
    'table-filter-props.properties.on-value-change.description':
      '确认或重置时触发；勾选只改变草稿值。',
    'table-filter-props.properties.disabled.description': '禁用筛选入口。',
    'table-filter-props.properties.class-name.description': '应用到筛选根节点的自定义类名。',

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

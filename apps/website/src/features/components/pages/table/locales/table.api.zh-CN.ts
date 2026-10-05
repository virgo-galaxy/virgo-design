import type { ApiDescriptionResources } from '@/i18n/api-description-resources';
export const tableApiZhCN = {
  api: {
    'table-search-props.properties.action-size.description': '搜索弹出层按钮的尺寸。',
    'table-props.properties.max-column-width.description':
      '调整列宽时允许的最大像素宽度，默认不限制。',
    'table-props.properties.column-widths.description':
      '按可见列顺序传入受控列宽；关闭拖动时仍然生效。',
    'table-props.properties.on-column-widths-change.description':
      '鼠标或键盘调整列宽后触发；列标识与顺序由使用方管理。',
    'table-head-props.properties.controls.description':
      '统一配置排序、筛选和查询，顺序固定，共用控件组对齐方式。',
    'table-header-controls.properties.align.description':
      '对齐剩余空间中的控件，或对齐标题与控件组成的整体，默认 end。',
    'table-header-controls.properties.layout.description':
      '标题固定在起始侧，或将标题和控件作为一个整体对齐。',
    'table-header-controls.properties.sort.description': '排序控件；省略或 false 时隐藏。',
    'table-header-controls.properties.filter.description':
      '筛选控件，列名自动作为其标签；省略或 false 时隐藏。',
    'table-header-controls.properties.search.description':
      '查询控件，列名自动作为其标签；省略或 false 时隐藏。',
    'table-header-sort-control.properties.enabled.description':
      '显示排序按钮，关闭时保留箭头形态，默认 true。',
    'table-header-sort-control.properties.mode.description': '箭头形态与切换顺序，默认 both。',
    'table-header-sort-control.properties.direction.description':
      '受控排序方向，同时映射到表头的 aria-sort，默认 none。',
    'table-header-sort-control.properties.on-direction-change.description':
      '请求排序方向变化时调用；数据排序由使用方管理。',
    'table-head-props.properties.min-width.description': '当前列最小调整宽度，覆盖表格默认值。',
    'table-head-props.properties.max-width.description': '当前列最大调整宽度，覆盖表格默认值。',
    'table-head-props.properties.fixed.description': '将此列固定在滚动视口的逻辑起始侧或末尾侧。',
    'table-head-props.properties.sticky-offset.description':
      '同侧前置固定列的累计宽度，单位为像素。',
    'table-cell-props.properties.fixed.description': '将单元格固定在滚动视口的逻辑起始侧或末尾侧。',
    'table-cell-props.properties.sticky-offset.description':
      '同侧前置固定列的累计宽度，单位为像素。',
    'table-fixed-cell-props.properties.fixed.description':
      '将单元格固定在滚动视口的逻辑起始侧或末尾侧。',
    'table-fixed-cell-props.properties.sticky-offset.description':
      '同侧前置固定列的累计宽度，单位为像素。',
    'table-sort-button-props.properties.sort-mode.description':
      '双箭头三态，或单箭头在对应方向与未排序之间切换。',
    'table-sort-button-props.properties.directions.description':
      '按指定方向顺序切换，再回到未排序；默认支持升序和降序。',
    'table-search-props.properties.label.description': '用于查询按钮和输入框可访问名称的列名。',
    'table-search-props.properties.value.description': '受控的已生效文本查询。',
    'table-search-props.properties.default-value.description': '非受控模式下初始生效的查询文本。',
    'table-search-props.properties.on-value-change.description': '提交查询或清空时触发。',
    'table-search-props.properties.placeholder.description': '可选的输入框占位文案。',
    'table-search-props.properties.tooltip.description': '自定义提示文案；false 隐藏提示。',
    'table-search-props.properties.size.description': '查询控件的尺寸，默认 small。',
    'table-search-props.properties.disabled.description': '禁用查询入口。',

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
    'table-props.properties.resizable.description':
      '统一开启所有列的指针拖动和键盘列宽调整，默认关闭。',
    'table-props.properties.min-column-width.description': '调整列宽时允许的最小像素宽度。',
    'table-filter-props.properties.label.description': '用于筛选按钮和弹层可访问名称的列名。',
    'table-filter-props.properties.options.description': '可供勾选的筛选项。',
    'table-filter-props.properties.value.description': '受控的已生效筛选值，空数组表示不筛选。',
    'table-filter-props.properties.default-value.description': '非受控模式下初始生效的筛选值。',
    'table-filter-props.properties.on-value-change.description':
      '确认或重置时触发；勾选只改变草稿值。',
    'table-filter-props.properties.disabled.description': '禁用筛选入口。',
    'table-filter-props.properties.class-name.description': '应用到筛选根节点的自定义类名。',

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
    'table-head-props.properties.align.description':
      '未提供 controls 时对齐标题；提供后由 controls.align 统一控制对齐。',
    'table-cell-props.properties.align.description': '逻辑方向的对齐方式，end 适用于数字列。',
    'table-row-props.properties.selected.description':
      '由使用方控制的选中外观，不添加数据网格的选择语义。',
  },
} satisfies ApiDescriptionResources[string];

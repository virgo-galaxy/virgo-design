import type { LocaleOf } from '@/i18n/locale-types';

import type { tableExamplesEnUS } from './en-US';
export const tableExamplesZhCN = {
  copy: {
    selectionTitle: '批量选择菜单',
    selectionDescription: '当页全选复选框旁的可选悬停菜单，支持内置和自定义选择操作。',
    showSelectionMenu: '显示批量选择菜单',
    selectOddRows: '选择奇数行',
    selectEvenRows: '选择偶数行',

    filteringTitle: '列筛选与列宽调整',
    filteringDescription:
      '从表头勾选并确认筛选条件。默认显示表头分隔线；开启列宽调整后，可拖动分隔线或使用方向键调整。',
    resizeColumns: '开启列宽调整',
    headerDividers: '显示表头分隔线',
    assignee: '负责人',

    title3: '三态排序',
    description3: '点击表头在升序、降序和原始顺序之间切换；Table.SortButton 也可独立组合使用。',
    colorLayers:
      '表头、斑马纹、悬停和选中行在明暗外观下使用不同色阶。通过 Table 的公开 CSS 变量覆盖颜色：',
    records: '项目记录',
    project: '项目',
    count: '组件数量',
    total: '总计',
    empty: '暂无项目',
    add: '创建项目后将在此表格中显示。',
    title0: '记录与汇总',
    description0: '原生表头、标题和汇总页脚。',
    title1: '密度与边框',
    description1:
      '对比 compact、default、comfortable：density 统一控制单元格内边距和表头、数据行最小高度。Surface 提供外框，Table 提供内部行分隔线。',
    geometry: '通过 Table 上的以下公开 CSS 变量覆盖几何尺寸。内容换行时，行高会自然超过最小高度：',
    title2: '空状态与固定表头',
    description2: 'Empty 组合在跨列单元格内，滚动由视口负责。',
  },
} satisfies LocaleOf<typeof tableExamplesEnUS>;

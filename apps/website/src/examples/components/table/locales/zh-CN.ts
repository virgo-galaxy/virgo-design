import type { LocaleOf } from '@/i18n/locale-types';

import type { tableExamplesEnUS } from './en-US';
export const tableExamplesZhCN = {
  copy: {
    records: '项目记录',
    project: '项目',
    count: '组件数量',
    total: '总计',
    empty: '暂无项目',
    add: '创建项目后将在此表格中显示。',
    title0: '记录与汇总',
    description0: '原生表头、标题和汇总页脚。',
    title1: '密度与边框',
    description1: '视觉选项保持相同的表格语义。',
    title2: '空状态与固定表头',
    description2: 'Empty 组合在跨列单元格内，滚动由视口负责。',
  },
} satisfies LocaleOf<typeof tableExamplesEnUS>;

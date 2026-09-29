import type { LocaleOf } from '@/i18n/locale-types';

import { foundationColorExportEnUS } from './en-US';

export const foundationColorExportZhCN = {
  colorExport: {
    eyebrow: '03 · 导出',
    title: '生产代码',
    description: '导出当前 140 个基础颜色，不包含任何 Semantic Theme 映射。',
    format: '导出格式',
    scaleNaming: '色阶命名',
    copy: '复制',
    copied: '已复制',
    note: '此导出只包含当前基础颜色。正式 Color Semantic Token 位于 Tokens / Colors。',
  },
} satisfies LocaleOf<typeof foundationColorExportEnUS>;

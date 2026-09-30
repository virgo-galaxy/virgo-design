import type { LocaleOf } from '@/i18n/locale-types';

import { componentExampleEnUS } from './en-US';

export const componentExampleZhCN = {
  componentExample: {
    openInNewWindow: '在新窗口中打开',
    openNamedInNewWindow: '在新窗口中打开 {{title}}',
    viewSource: '查看源码',
    hideSource: '隐藏源码',
    viewSourceFor: '查看 {{title}} 的源码',
    hideSourceFor: '隐藏 {{title}} 的源码',
    sourceFiles: '{{title}} 的源码文件',
    copySource: '复制源码',
    copySourceFor: '复制 {{title}} 的源码',
    copied: '已复制',
    copyFailedTryAgain: '复制失败，请重试',
    copyingSource: '正在复制源码…',
    copyFailedManual: '复制失败。请选中下方源码并手动复制。',
    reactSourceCodeFor: '{{title}} 的 React 源码',
    scssSourceCodeFor: '{{title}} 的 SCSS 源码',
    expandAll: '全部展开',
    collapseAll: '全部收起',
  },
} satisfies LocaleOf<typeof componentExampleEnUS>;

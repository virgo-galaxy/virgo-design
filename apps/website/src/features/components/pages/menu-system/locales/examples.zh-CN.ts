import type { LocaleOf } from '@/i18n/locale-types';

import type { menuSystemExamplesEnUS } from './examples.en-US';
export const menuSystemExamplesZhCN = {
  copy: {
    actions: '操作',
    new: '新建',
    rename: '重命名',
    paste: '粘贴',
    export: '导出',
    image: '图像',
    share: '共享',
    copyLink: '复制链接',
    copySelection: '复制选区',
    delete: '删除',
    heroDocumentContext: '主样例文档上下文',
    document: '文档',
    rightClickHereShiftF10: '右键点击这里 · Shift+F10',
    documentActions: '文档操作',
    heroApplicationActions: '主样例应用操作',
    file: '文件',
    save: '保存',
    edit: '编辑',
    undo: '撤销',
    redo: '重做',
    view: '视图',
    showToolbar: '显示工具栏',
  },
  details: {
    new: '新建',
    rename: '重命名',
    exportPdf: '导出 PDF',
    exportPng: '导出 PNG',
    exportSvg: '导出 SVG',
    copyLink: '复制链接',
    copySelection: '复制选区',
    delete: '删除',
  },
} satisfies LocaleOf<typeof menuSystemExamplesEnUS>;

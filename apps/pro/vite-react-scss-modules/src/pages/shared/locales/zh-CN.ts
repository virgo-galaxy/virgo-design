import type { LocaleOf } from '@/i18n/locale-types';

import type { sharedEnUS } from './en-US';
export const sharedZhCN = {
  gender: { male: '男', female: '女' },
  workLocation: '工作地',
  copy: {
    copy: '复制',
    copied: '已复制',
    failed: '复制失败，请重试',
    copyValue: '复制 {{value}}',
  },
  remote: {
    loading: '正在加载数据…',
    error: '数据加载失败',
    failed: '请求失败，请重试。',
    retry: '重试',
    timeout: '请求超时，请重试。',
    network: '请检查网络连接后重试。',
    saving: '正在保存…',
    saveError: '保存失败',
  },

  unassigned: '未分配',
  tryABroaderSearchOrResetTheFilters: '尝试扩大搜索范围或重置筛选条件。',
  resetFilters: '重置筛选',
  noResults: '没有符合条件的结果',
  taskSaved: '{{id}} 已保存，更改已同步到整个工作空间。',
  taskMoved: '{{id}} 已移至{{status}}。',
  pagination: {
    navigation: '分页',
    previous: '上一页',
    next: '下一页',
    page: '第 {{page}} 页',
    jumpBackward: '向前跳 5 页',
    jumpForward: '向后跳 5 页',
    pageSize: '每页条数',
    itemsPerPage: '{{size}} 条 / 页',
    jumpTo: '跳转到',
    pageUnit: '页',
    selected: '（已选 {{count}} 项）',
    total: '共 {{count}} 项',
  },
} satisfies LocaleOf<typeof sharedEnUS>;

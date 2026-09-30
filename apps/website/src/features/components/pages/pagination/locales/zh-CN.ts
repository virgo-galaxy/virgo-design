import type { LocaleOf } from '@/i18n/locale-types';

import type { paginationEnUS } from './en-US';

export const paginationZhCN = {
  overview: {
    description: '按自己的节奏浏览集合。清晰的页码位置、专注的导航与可选控件适配当前任务。',
  },
  facts: {
    alignment: '对齐',
    '3Positions': '3 个位置',
    options: '选项',
    '3Controls': '3 个控件',
    state: '状态',
    bothModes: '两种模式',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    currentPage: '当前页面',
    boundedPages: '页码边界',
    quickNavigation: '快速导航',
  },
  basic: {
    title: '基础用法',
    description: '五页内容使用原生按钮；首页和末页禁用对应导航。',
  },
  more: {
    title: '更多页码',
    description: '首页和末页始终可见。悬停或聚焦省略号，显示跳转五页的操作。',
  },
  size: {
    title: '每页条数',
    description:
      '每页条数菜单可单独显示。Virgo Dropdown 标记当前条数并支持键盘导航；改变条数时返回第一页。',
  },
  jump: {
    title: '快速跳转',
    description: '输入页码后按 Enter。超出范围或非数字输入会标记为无效；Escape 清除草稿。',
  },
  total: {
    title: '总数与范围',
    description: '可单独显示总数，也可通过 total 回调呈现可见项目范围。',
  },
  all: {
    title: '全部选项',
    description:
      'showAll 同时启用总数、每页条数和跳转，各项均可独立覆盖。本示例同时管理页码与每页条数。',
  },
  align: {
    title: '对齐',
    description: '将整个分页组与容器左侧、中心或右侧对齐。',
  },
  labels: {
    title: '导航标签',
    description: '可用文字替换箭头图标，或本地化控件及其无障碍名称。',
  },
  states: {
    title: '禁用与空状态',
    description: '所有控件遵循禁用状态。空集合保持稳定的第一页布局，项目范围为零。',
  },
} satisfies LocaleOf<typeof paginationEnUS>;

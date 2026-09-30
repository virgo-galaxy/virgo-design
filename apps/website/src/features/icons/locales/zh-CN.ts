import type { LocaleOf } from '@/i18n/locale-types';

import { iconsEnUS } from './en-US';
export const iconsZhCN = {
  title: '图标',
  description: '用于调整单个 Virgo 图标的专用画布。',
  reviewControls: '预览设置',
  toggleGrid: '切换网格',
  grid: '网格',
  on: '开启',
  off: '关闭',
  canonicalIcon: '标准图标',
  actualSize: '实际尺寸 24px',
  preview: '界面预览',
  previewNote: '按钮图标以 20 × 20px 显示。',
  icon: '图标',
} satisfies LocaleOf<typeof iconsEnUS>;

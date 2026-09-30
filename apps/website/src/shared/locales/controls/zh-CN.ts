import type { LocaleOf } from '@/i18n/locale-types';

import { controlsEnUS } from './en-US';
export const controlsZhCN = {
  expandSidebar: '展开侧栏',
  collapseSidebar: '收起侧栏',
  clearInput: '清空输入',
  hidePassword: '隐藏密码',
  showPassword: '显示密码',
  resizeSidebar: '调整侧栏宽度',
  dockControls: 'Dock 控件',
  unlockDock: '解锁 Dock',
  lockDock: '锁定 Dock',
  unlockMovement: '解除移动锁定',
  lockMovement: '锁定移动',
  unpinDock: '取消固定 Dock',
  pinDock: '固定 Dock',
  unpinViewport: '取消固定到视口',
  pinViewport: '固定到视口',
} satisfies LocaleOf<typeof controlsEnUS>;

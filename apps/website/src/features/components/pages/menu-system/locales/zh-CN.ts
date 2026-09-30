import type { LocaleOf } from '@/i18n/locale-types';

import type { menuSystemEnUS } from './en-US';

export const menuSystemZhCN = {
  facts: {
    items: '项目',
    shared: '共享',
    input: '输入',
    keyboard: '键盘',
    composition: '组合',
    nestedMenus: '嵌套菜单',
  },
  specimen: {
    referenceSpecimen: '参考样例',
  },
  menu: {
    overview: {
      description: '选择要执行的操作。按钮触发的操作、嵌套子菜单与持续生效的偏好设置共用菜单协议。',
    },
    specimen: {
      buttonTrigger: 'Button 触发器',
      nestedSubmenu: '嵌套子菜单',
      sharedMenuParts: '共享菜单组成部分',
    },
  },
  menuActions: {
    title: '操作与子菜单',
    description: '点击 Actions。悬停 Export → Image，或使用方向键导航。Escape 每次返回一层。',
  },
  menuPreferences: {
    title: '复选与单选项目',
    description: '选择后偏好设置菜单保持打开。快捷键标签仅用于显示。',
  },
  menuDensity: {
    title: '密度',
    description: '经典菜单行继承根节点尺寸与页面主题。',
  },
  contextMenu: {
    overview: {
      description: '对指针下的对象执行操作。右键点击目标，或聚焦后按 Shift+F10 或上下文菜单键。',
    },
    specimen: {
      objectScoped: '限定到对象',
      pointerAnchored: '锚定指针',
      keyboardAccessible: '支持键盘访问',
    },
  },
  contextTarget: {
    title: '指针与键盘上下文',
    description: '弹出层锚定指针，并在视口边缘调整位置。键盘打开时锚定已聚焦目标。',
  },
  contextSettings: {
    title: '共享项目系统',
    description: '上下文菜单支持相同的持续生效复选项目与分组单选项目。',
  },
  menubar: {
    overview: {
      description: '应用级操作组。方向键在菜单之间移动；打开的菜单随指针在相邻触发器间切换。',
    },
    specimen: {
      appLevelNavigation: '应用级导航',
      sharedMenuContent: '共享菜单内容',
      arrowKeyFlow: '方向键操作流程',
    },
  },
  menubarApplication: {
    title: '应用菜单',
    description: '使用 File、Edit 或 View。左右方向键切换分组，下方向键打开分组，Tab 离开菜单栏。',
  },
} satisfies LocaleOf<typeof menuSystemEnUS>;

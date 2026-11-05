import type { LocaleOf } from '@/i18n/locale-types';

import { layoutEnUS } from './en-US';

export const layoutZhCN = {
  navigation: {
    colors: '颜色',
    fonts: '字体',
    themes: '主题',
    icons: '图标',
    charts: '图表',
    skipToContent: '跳转到主要内容',
    label: '主导航',
    tokens: '变量',
    components: '组件',
    primitives: '原语',
  },
  controls: {
    loadingPage: '页面加载中…',
    globalControls: '全局控制',
    switchToChinese: '切换到中文',
    switchToEnglish: '切换到英文',
    switchToLightMode: '切换到浅色模式',
    switchToDarkMode: '切换到深色模式',
  },
} satisfies LocaleOf<typeof layoutEnUS>;

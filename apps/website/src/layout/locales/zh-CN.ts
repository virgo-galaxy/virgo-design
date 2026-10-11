import type { LocaleOf } from '@/i18n/locale-types';

import { layoutEnUS } from './en-US';

export const layoutZhCN = {
  navigation: {
    themes: '主题',
    charts: '图表',
    skipToContent: '跳转到主要内容',
    label: '主导航',
    foundations: '基础',
    tokens: '变量',
    components: '组件',
    primitives: '原语',
  },
  controls: {
    appearance: '明暗外观',
    light: '浅色',
    dark: '深色',
    auto: '自动 · 跟随系统',
    loadingPage: '页面加载中…',
    globalControls: '全局控制',
    switchToChinese: '切换到中文',
    switchToEnglish: '切换到英文',
    switchToLightMode: '切换到浅色模式',
    switchToDarkMode: '切换到深色模式',
  },
  footer: {
    nextSections: '完整色板与语义主题将在后续章节中展示。',
  },
} satisfies LocaleOf<typeof layoutEnUS>;

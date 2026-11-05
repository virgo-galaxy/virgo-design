import type { LocaleOf } from '@/i18n/locale-types';

import { fontsEnUS } from './en-US';

export const fontsZhCN = {
  title: '字体',
  description: '可自托管的无衬线与等宽字体，满足界面、多语言内容和代码的排版需要。',
  catalogue: {
    title: '字体预览',
    description: '选择字体类别，输入自己的文字，复制各字体的 CSS 导入代码。',
    categories: '字体类别',
    sans: 'Sans',
    mono: 'Mono',
    previewText: '预览文字',
    placeholder: '输入想预览的文字…',
    copyImport: '复制 {{name}} 导入代码',
    copying: '正在复制…',
    copied: '已复制导入代码',
    copyFailed: '复制失败，请重试。',
  },
  usage: {
    title: '加载与使用',
    description: '导入字体 CSS 后，设置对应的 font-family。字体文件由自己的应用提供。',
    individual: '按需加载',
    metadata: '字体元数据',
    metadataDescription: '包中导出字体名称，方便在代码中使用。只导入元数据不会加载字体 CSS。',
    aggregate: '默认字体组合',
    aggregateDescription:
      'default.css 包含 Inter、五套地区 Noto Sans 和 JetBrains Mono。导入 sans.css 或 mono.css 可以加载对应类别的全部字体。',
  },
  internationalSans: {
    title: '国际化 Sans',
    description:
      '支持地区语言的 Sans 字体栈：拉丁字符使用 Inter，CJK 字符使用对应的 Noto Sans 字体。',
    localeSelector: '国际化 Sans 语言地区',
    activeStack: '字体家族',
    locale: '语言地区',
    latin: '拉丁字符',
    script: '本地文字',
    stack: '解析后的字体栈',
    locales: {
      latin: '拉丁字符',
      zhHans: '简体中文',
      zhHantTW: '繁體中文 · 台灣',
      zhHantHK: '繁體中文 · 香港',
      ja: '日本語',
      ko: '한국어',
    },
  },
} satisfies LocaleOf<typeof fontsEnUS>;

import type { LocaleOf } from '@/i18n/locale-types';

import type { breadcrumbEnUS } from './en-US';

export const breadcrumbZhCN = {
  overview: {
    description: '通过原生链接、有序列表语义和明确的当前页面标记，表达层级中的当前位置。',
  },
  facts: {
    items: '项目',
    separator: '分隔符',
    custom: '自定义',
    semantics: '语义',
    native: '原生',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    nativeLinks: '原生链接',
    orderedPath: '有序路径',
    currentPage: '当前页面',
  },
  basic: {
    title: '基础用法',
    description: '上级路径使用原生链接，最后一项标识当前页面。',
  },
  icons: {
    title: '图标',
    description: '装饰图标可与项目标签组合，不改变默认分隔符或链接语义。',
  },
  separator: {
    title: '分隔符',
    description: '仅改变装饰分隔符；项目内容与层级保持一致。',
  },
  dynamicValue: {
    title: '动态值',
    description: '运行时值可通过 ReactNode 项目内容自然呈现，无需集成路由。',
  },
} satisfies LocaleOf<typeof breadcrumbEnUS>;

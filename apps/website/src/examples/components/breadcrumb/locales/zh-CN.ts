import type { LocaleOf } from '@/i18n/locale-types';

import type { breadcrumbExamplesEnUS } from './en-US';
export const breadcrumbExamplesZhCN = {
  copy: {
    home: '首页',
    applicationCenter: '分组 A',
    applicationList: '分组 B',
    anApplication: '条目 A',
    userIdentifier: '条目标识',
    users: '条目',
    basicHierarchy: '基础层级',
    theFinalItemIdentifiesTheCurrentPage: '最后一项标识当前页面。',
    itemIcons: '条目图标',
    decorativeIconsAccompanyNormalLinkLabels: '装饰图标与常规链接标签组合。',
    customSeparator: '自定义分隔符',
    changeTheDecorativeSeparatorWithoutChangingNavigationSemantics:
      '改变装饰分隔符，不改变导航语义。',
    dynamicValues: '动态值',
    runtimeValuesRenderThroughNormalReactChildren: '运行时值通过普通 React children 渲染。',
  },
  details: {
    newUser: '新条目',
  },
} satisfies LocaleOf<typeof breadcrumbExamplesEnUS>;

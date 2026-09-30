import type { LocaleOf } from '@/i18n/locale-types';

import type { breadcrumbExamplesEnUS } from './en-US';
export const breadcrumbExamplesZhCN = {
  copy: {
    home: '首页',
    applicationCenter: '应用中心',
    applicationList: '应用列表',
    anApplication: '某个应用',
    userIdentifier: '用户标识',
    users: '用户',
    basicHierarchy: '基础层级',
    theFinalItemIdentifiesTheCurrentPage: '最后一项标识当前页面。',
    itemIcons: '项目图标',
    decorativeIconsAccompanyNormalLinkLabels: '装饰图标与常规链接标签组合。',
    customSeparator: '自定义分隔符',
    changeTheDecorativeSeparatorWithoutChangingNavigationSemantics:
      '改变装饰分隔符，不改变导航语义。',
    dynamicValues: '动态值',
    runtimeValuesRenderThroughNormalReactChildren: '运行时值通过普通 React children 渲染。',
  },
  details: {
    newUser: '新用户',
  },
} satisfies LocaleOf<typeof breadcrumbExamplesEnUS>;

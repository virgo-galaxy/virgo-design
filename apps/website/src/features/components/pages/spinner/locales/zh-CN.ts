import type { LocaleOf } from '@/i18n/locale-types';

import type { spinnerEnUS } from './en-US';

export const spinnerZhCN = {
  overview: {
    description: '通过 currentColor 组合的不确定加载反馈。',
  },
  facts: {
    state: '状态',
    indeterminate: '不确定进度',
    sizes: '尺寸',
    intent: '语义意图',
    brandAware: '适配品牌',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    inlineFeedback: '行内反馈',
    composable: '可组合',
    themeAwareColor: '适配主题的颜色',
  },
  sizes: {
    title: '尺寸与语义意图',
    description: '三种 token 尺寸与少量语义颜色覆盖行内加载需求。',
  },
  composition: {
    title: '行内与 Button 组合',
    description: 'Spinner 不管理异步状态，可组合到现有控件中。',
  },
  environments: {
    title: '浅色与深色环境',
    description: '当前颜色与语义颜色在两种环境下都适配主题。',
  },
} satisfies LocaleOf<typeof spinnerEnUS>;

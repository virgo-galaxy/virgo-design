import type { LocaleOf } from '@/i18n/locale-types';

import type { spinnerExamplesEnUS } from './en-US';
export const spinnerExamplesZhCN = {
  copy: {
    finishDemoTask: '完成演示任务',
    syncingChanges: '正在同步更改',
    smallLoadingIndicator: '小型加载指示器',
    mediumLoadingIndicator: '中型加载指示器',
    largeLoadingIndicator: '大型加载指示器',
    sizesAndIntents: '尺寸与语义意图',
    useCurrentcolorOrASemanticIntentForALoadingIndicator:
      '使用 currentColor 或语义意图呈现加载指示器。',
    inlineFeedback: '行内反馈',
    composeAnIndicatorWithAShortTaskLabel: '将指示器与简短任务标签组合。',
    buttonComposition: 'Button 组合',
    loadingStateBelongsToTheApplicationNotToSpinner: '加载状态由应用管理，而非 Spinner。',
    themeEnvironments: '主题环境',
    semanticColorsFollowTheContainingTheme: '语义颜色遵循所在主题。',
    saving: '正在保存',
    loadingAccountData: '正在加载账户数据',
  },
  details: {
    saving: '正在保存',
    saveChanges: '保存更改',
    loadingInValueTheme: '在 {{v0}} 主题中加载',
  },
} satisfies LocaleOf<typeof spinnerExamplesEnUS>;

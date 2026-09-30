import type { LocaleOf } from '@/i18n/locale-types';

import type { progressExamplesEnUS } from './en-US';
export const progressExamplesZhCN = {
  copy: {
    threeOfFour: '四项中完成三项',
    valuesAndBoundaries: '数值与边界',
    completionIsNormalizedAgainstMaxIncludingZeroAndComplete:
      '完成量相对于 max 归一化，包括零值与完成状态。',
    trackSizes: '轨道尺寸',
    trackThicknessChangesWithoutChangingTheSemanticValue: '轨道厚度变化不改变语义值。',
    semanticIntents: '语义意图',
    statusColorsExpressMeaningfulTaskOutcomes: '状态颜色表达有意义的任务结果。',
    deployingDesignTokens: '正在部署设计 token',
    threeOfFourChecks: '四项检查中完成三项',
  },
  details: {
    valueOf100: '100 项中完成 {{v0}} 项',
  },
} satisfies LocaleOf<typeof progressExamplesEnUS>;

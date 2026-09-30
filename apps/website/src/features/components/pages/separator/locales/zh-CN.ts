import type { LocaleOf } from '@/i18n/locale-types';

import type { separatorEnUS } from './en-US';

export const separatorZhCN = {
  overview: {
    description: '基于 token 的分隔线，用于通用布局中的视觉与语义分隔。',
  },
  facts: {
    orientations: '方向',
    semantics: '语义',
    decorative: '装饰性',
    optional: '可选',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    ruleBasedRhythm: '分隔线节奏',
    horizontalByDefault: '默认水平',
    decorativeOrSemantic: '装饰或语义',
  },
  horizontal: {
    title: '水平',
    description: '默认方向以明确语义分隔上下堆叠的内容。',
  },
  label: {
    title: '有意义的分隔',
    description:
      '通过 children 为水平分隔线提供简短标签。labelAlign 接受 start、center（默认）或 end；start 与 end 遵循阅读方向。orientation 仍决定分隔线水平或垂直。',
  },
  vertical: {
    title: '垂直',
    description: '垂直分隔线在相邻行内项目之间自然伸展。',
  },
  decorative: {
    title: '内容块之间的装饰分隔',
    description: '现有结构已表达分隔时，装饰性分隔线仅承担视觉作用。',
  },
} satisfies LocaleOf<typeof separatorEnUS>;

import type { LocaleOf } from '@/i18n/locale-types';

import type { segmentedControlEnUS } from './en-US';

export const segmentedControlZhCN = {
  overview: {
    description: '紧凑的单选控件，用于在少量互斥模式或视图之间切换。',
  },
  facts: {
    variants: '变体',
    sizes: '尺寸',
    motion: '动效',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    '28pxHeight': '高度 28px',
    slidingIndicator: '滑动指示器',
  },
  segmentedVariants: {
    title: '变体',
    description: '仅改变视觉样式；尺寸、动效、内容与选中值保持一致。',
  },
  segmentedMotion: {
    title: '动效',
    description: '对每种视觉变体，仅改变选中指示器的动效。',
  },
  segmentedSizes: {
    title: '尺寸',
    description: '仅改变控件尺寸；其他属性使用默认值。',
  },
  segmentedContent: {
    title: '内容',
    description: '仅改变选项内容；视觉样式、尺寸与动效使用默认值。',
  },
} satisfies LocaleOf<typeof segmentedControlEnUS>;

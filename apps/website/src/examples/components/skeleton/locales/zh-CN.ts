import type { LocaleOf } from '@/i18n/locale-types';

import type { skeletonExamplesEnUS } from './en-US';
export const skeletonExamplesZhCN = {
  copy: {
    loadingCard: '加载中的卡片',
    animated: '有动效',
    static: '静态',
    loadingContent: '加载内容',
    placeholderShapes: '占位形状',
    textLinesRectangularMediaAndCircularIdentities: '文本行、矩形媒体与圆形身份图像。',
    cardPlaceholder: 'Card 占位',
    nativeDimensionsPreserveAFutureCardSLayout: '原生尺寸保留即将加载卡片的布局。',
    motionControl: '动效控制',
    pulseCanBeDisabledAndRespectsReducedMotionPreferences: '脉冲可关闭，并遵循减少动态效果偏好。',
    loadingCardPreview: '加载卡片预览',
  },
} satisfies LocaleOf<typeof skeletonExamplesEnUS>;

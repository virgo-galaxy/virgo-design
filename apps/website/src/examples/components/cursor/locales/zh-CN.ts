import type { LocaleOf } from '@/i18n/locale-types';

import type { cursorExamplesEnUS } from './en-US';
export const cursorExamplesZhCN = {
  copy: {
    hoverOrFocus: '悬停或聚焦',
    oneTooltipTwoAnchorModes: '一个 Tooltip，两种锚点模式。',
    elementAnchor: '元素锚点',
    pointerFollow: '跟随指针',
    yourOwnVisualTheSamePointerInfrastructure: '自定义视觉，共用指针基础能力。',
    customCrosshair: '自定义十字光标',
    moveYourMouseThroughThisSurface: '将鼠标移过此表面。',
    aPreciseLittlePointer: '小巧精准的指针',
    viewportCoordinatesUpdateWithoutRenderingThisTree: '视口坐标更新，无需重新渲染此组件树。',
    virgoCursorWithinThisScope: '此范围内使用 Virgo 光标',
    outerScope: '外层作用域',
    nativeCursorInThisNestedRegion: '此嵌套区域使用原生光标',
    outsideAllProviders: '所有 provider 之外',
    px: 'px',
    a: '一个',
    pxCursorWithContextCloseBehind: 'px 光标，让上下文紧随其后。',
    moveAcrossTheButtonThenTryTabAndEscape: '移过按钮，再尝试 Tab 和 Escape。',
    exploreWithYourPointer: '用指针探索',
    contextThatFollowsYourIntent: '随操作显示上下文。',
    defaultVirgoCursor: '默认 Virgo Cursor',
    aSoftGlassPointerWithNativeMouseTargeting: '具有原生鼠标定位的柔和玻璃指针。',
    threeSizes: '三种尺寸',
    small16pxMedium20pxByDefaultAndLarge24pxEach:
      'small 为 16px，medium 默认 20px，large 为 24px。各尺寸保持指针热点对齐。',
    customCursor: '自定义光标',
    replaceTheVisualAndSetItsPixelHotspot: '替换视觉并设置像素热点。',
    providerScope: 'Provider 作用域',
    nestedScopesOwnTheirPointerDisabledRegionsRestoreTheNative:
      '嵌套作用域管理各自指针，禁用区域恢复原生光标。',
    cursorTooltipFollow: 'Cursor 与 Tooltip 跟随',
    theTooltipConsumesMouseCoordinatesTabStillAnchorsToThe:
      'Tooltip 使用鼠标坐标，Tab 仍锚定按钮。',
    elementAnchorVsPointerFollow: '元素锚点与指针跟随',
    theSameTooltipCompositionWorksInBothModes: '相同 Tooltip 组合支持两种模式。',
    reusablePointerFeedback: '可复用指针反馈',
    cursorFollowerAndThePointerStoreAlsoSupportCanvasAnd:
      'Cursor.Follower 与指针存储也支持画布和编辑器反馈。',
    followYourCuriosity: '随心探索',
    aLittleContextCloseBehind: '上下文紧随其后。',
  },
  details: {
    default: ' · 默认',
  },
} satisfies LocaleOf<typeof cursorExamplesEnUS>;

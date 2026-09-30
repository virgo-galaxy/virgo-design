import type { LocaleOf } from '@/i18n/locale-types';

import type { surfaceExamplesEnUS } from './en-US';
export const surfaceExamplesZhCN = {
  copy: {
    customColor: '自定义颜色',
    aFlatDecorativeBackgroundBelowNormalContent: '常规内容下方的纯色装饰背景。',
    customGradient: '自定义渐变',
    consumersOwnTheForegroundContrast: '前景对比度由使用方负责。',
    level: '层级',
    decorativeLandscape: '装饰风景',
    useAnImgWithAltTextWhenThePictureCarries: '图像承载信息时，使用带 alt 文本的 img。',
    containRightCenterNoRepeat: 'Contain · 右侧居中 · 不重复',
    imageGlass: '图像与玻璃',
    theDecorativeSceneIsSoftenedWithoutApplyingABlurTo: '柔化装饰场景，不对内容应用模糊。',
    workspace: '工作区',
    sidebar: '侧栏',
    content: '内容',
    aNestedSemanticSurface: '嵌套的语义表面。',
    sameSceneDifferentMaterial: '相同场景，不同材质。',
    interact: '交互',
    successfulInteractions: '成功交互次数：',
    outsideTheEdge: '延伸到边缘之外',
    onlyTheDecorativeMaterialIsRoundedChildrenMayExtendBeyond:
      '仅装饰材质带圆角，子内容可延伸到外部。',
    floatingContentStaysOutsideTheRoundedPanel: '浮动内容保持在圆角面板外部。',
    themeAwareContentAndContainerColor: '适配主题的内容与容器颜色。',
    semanticTones: '语义色调',
    containerTonesFollowTheActiveThemeSizingAndPaddingRemain:
      '容器色调遵循当前主题；尺寸与内边距仍由使用方提供。',
    solidTranslucentAndGlass: 'Solid、translucent 与 glass',
    compareThreeMaterialsOverTheSameOfflineLandscapeWithoutBlurring:
      '在相同离线风景上比较三种材质，内容不会被模糊。',
    colorAndGradientBackgrounds: '颜色与渐变背景',
    provideADecorativeFoundationAndChooseAForegroundThatRemains:
      '提供装饰基础，并选择保持易读的前景色。',
    imageBackground: '图像背景',
    thisDecorativeLandscapeIsEmbeddedSvgNoRemoteImageOr:
      '此装饰风景为内嵌 SVG，无需远程图像或私有资源。',
    imageWithGlassMaterial: '图像与玻璃材质',
    theImageSitsBelowTheMaterialWhileTextAndInteractive:
      '图像位于材质下方，文字和交互内容仍保持清晰。',
    containAndPosition: 'Contain 与定位',
    containKeepsTheWholeLandscapeVisibleAndPositionsItWithout:
      'Contain 保留完整风景，并在不重复的情况下定位。',
    elevation: '层级',
    sixExistingElevationLevelsAreInterpretedByTheActiveTheme: '六种现有层级由当前主题解释。',
    borderStrength: '边框强度',
    chooseNoneSubtleDefaultOrStrongWithoutIntroducingCustomBorder:
      '选择 none、subtle、default 或 strong，无需自定义边框颜色。',
    cornerShape: '圆角形状',
    radiusUsesFoundationKeysIncludingAFullyRoundedSilhouette:
      '圆角使用基础体系的键，包括完全圆润的轮廓。',
    layoutAndNestedSurfaces: 'Layout 与嵌套表面',
    layoutControlsRegionsEachRegionSelectsItsMaterialAndNested:
      'Layout 控制区域，各区域选择自身材质与嵌套内容色调。',
    contentOutsideRoundedEdges: '圆角外部的内容',
    roundedMaterialDoesNotClipOrdinaryChildrenThisLocalCanvas:
      '圆角材质不会裁切普通子内容；局部画布为溢出保留空间。',
    aSharedMaterialLanguage: '统一的材质语言',
    spaceDressed: '为空间赋予外观。',
    tryTheContent: '试用内容',
  },
  details: {
    hideContent: '隐藏内容',
    showFloatingContent: '显示浮动内容',
    contentStaysInteractive: '内容保持可交互',
    valueSuccessfulInteractions: '成功交互 {{v0}} 次',
  },
} satisfies LocaleOf<typeof surfaceExamplesEnUS>;

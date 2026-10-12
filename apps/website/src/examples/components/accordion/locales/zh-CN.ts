import type { LocaleOf } from '@/i18n/locale-types';

import type { accordionExamplesEnUS } from './en-US';
export const accordionExamplesZhCN = {
  copy: {
    anatomy: '组成结构',
    rootCoordinatesItemTriggerAndContentWithoutOwningApplicationContent:
      'Root 协调 Item、Trigger 和 Content，不管理应用内容。',
    behavior: '行为',
    stateCanBeControlledOrUncontrolledWithOneOrSeveral:
      '状态可受控或非受控，支持展开一个或多个条目。',
    keyboard: '键盘',
    arrowKeysHomeAndEndMoveFocusBetweenEnabledHeadings:
      '方向键、Home 和 End 在启用标题之间移动焦点。',
    visualVariants: '视觉变体',
    defaultBorderedAndGhostTreatmentShareTheSameContent:
      'default、bordered 和 ghost 样式共享相同内容。',
    accordionSizes: 'Accordion 尺寸',
    sizeAdjustsHeadingHeightTypeIconAndSpacingTogether: '尺寸同步调整标题高度、字体、图标与间距。',
    singleSelection: '单项展开',
    atMostOneSectionIsOpen: '最多展开一个章节。',
    multipleSelection: '多项展开',
    sectionsOpenIndependently: '章节独立展开。',
  },
} satisfies LocaleOf<typeof accordionExamplesEnUS>;

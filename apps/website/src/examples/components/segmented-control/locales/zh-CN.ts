import type { LocaleOf } from '@/i18n/locale-types';

import type { segmentedControlExamplesEnUS } from './en-US';
export const segmentedControlExamplesZhCN = {
  copy: {
    viewMode: '视图模式',
    code: '代码',
    preview: '预览',
    period: '时间范围',
    day: '日',
    week: '周',
    month: '月',
    availableViews: '可用视图',
    deploy: '操作 A',
    light: '浅色',
    dark: '深色',
    optionA: '选项 A',
    optionB: '选项 B',
    optionC: '选项 C',
    visualVariants: '视觉变体',
    onlyTheVisualTreatmentChanges: '仅改变视觉样式。',
    indicatorMotion: '指示器动效',
    compareStaticAndSlidingIndicatorsAcrossVisualVariants: '比较各视觉变体中的静态与滑动指示器。',
    controlSizes: '控件尺寸',
    onlySizeChangesSelectionAndVisualTreatmentStayFixed: '仅改变尺寸；选择与视觉样式保持一致。',
    optionContent: '选项内容',
    shortModeAndPeriodChoicesShareTheSameSingleSelection: '简短模式与时间范围选项共用单选行为。',
    disabledOption: '禁用选项',
    unavailableChoicesRemainVisibleInContext: '不可用选项仍保留在上下文中。',
    theme: '主题',
    labelSmall: 'Label Small',
  },
  details: {
    valueValueMotion: '{{v0}} {{v1}} 动效',
    valueTheme: '{{v0}} 主题',
    valueOptions: '{{v0}} 选项',
  },
} satisfies LocaleOf<typeof segmentedControlExamplesEnUS>;

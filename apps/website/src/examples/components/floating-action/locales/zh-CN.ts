import type { LocaleOf } from '@/i18n/locale-types';

import type { floatingActionExamplesEnUS } from './en-US';
export const floatingActionExamplesZhCN = {
  copy: {
    settingsUnavailable: '设置不可用',
    quickActions: '快捷操作',
    openDashboard: '打开仪表盘',
    showHelp: '显示帮助',
    selected: '已选择：',
    actionVariants: '操作变体',
    fourEmphasisLevelsUseTheSameCircularActionAnatomy: '四种强调层级共用相同圆形操作结构。',
    disabledAction: '禁用操作',
    theDisabledStateStaysVisibleButCannotExecuteAnAction: '禁用状态保持可见，但无法执行操作。',
    controlledActionGroup: '受控操作组',
    choosingAnActionUpdatesLocalFeedbackAndClosesThisGroup:
      '选择操作更新局部反馈，并仅关闭此操作组。',
    expansionDirections: '展开方向',
    placementChoosesWhereThisActionGroupExpandsRelativeToIts:
      'placement 决定操作组相对于触发器的展开位置。',
    help: '帮助',
  },
  details: {
    chooseAnAction: '请选择操作。',
    dashboard: '仪表盘',
    help: '帮助',
    toggleValueActions: '切换 {{v0}} 操作',
    valueActions: '{{v0}} 操作',
    valueSettings: '{{v0}} 设置',
  },
} satisfies LocaleOf<typeof floatingActionExamplesEnUS>;

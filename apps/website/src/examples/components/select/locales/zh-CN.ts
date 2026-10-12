import type { LocaleOf } from '@/i18n/locale-types';

import type { selectExamplesEnUS } from './en-US';
export const selectExamplesZhCN = {
  copy: {
    allItems: '全部条目',
    multipleSelection: '多选',
    multipleSelectionDescription: '连续勾选多个选项，列表保持打开；通过标签上的按钮移除选择。',
    chooseItem: '选择条目',
    chooseAnItem: '选择一个条目',
    itemD: '云文档',
    runtime: '运行时',
    selectedItem: '已选条目',
    environment: '选项',
    local: '选项 A',
    homeLab: '选项 B',
    production: '选项 C',
    keyboardItem: '键盘条目选择',
    focusThenUseArrowdown: '聚焦后使用 ArrowDown',
    longItem: '长名称条目',
    shortName: '短名称',
    aVeryLongProjectNameThatShouldNotWidenThe: '非常长的条目名称不应使页面变宽',
    anotherItem: '另一个条目',
    defaultItem: '默认条目',
    item: '条目',
    disabledItem: '禁用条目',
    invalidItem: '无效条目',
    triggerSizes: '触发器尺寸',
    theListboxFollowsTheTriggerSDensity: 'listbox 遵循触发器的密度。',
    placeholderAndValue: '占位文本与值',
    theSelectedOptionIsTheSourceOfTheTriggerS: '触发器显示文字来自选中选项。',
    selectionStates: '选择状态',
    defaultDisabledAndInvalidTriggersRetainTheSameListboxModel:
      '默认、禁用和无效触发器保留相同的 listbox 模型。',
    disabledOptions: '禁用选项',
    keepAnUnavailableDestinationInContextWithoutAllowingSelection:
      '保留不可用目标的上下文，但不允许选择。',
    longContent: '长内容',
    constrainTheTriggerWhilePreservingCompleteOptionLabels:
      '限制触发器宽度，同时保留完整选项标签。',
    keyboardSelection: '键盘选择',
    focusTheTriggerUseArrowdownHomeEndEnterAndEscape:
      '聚焦触发器；使用 ArrowDown、Home/End、Enter 和 Escape。',
    referenceItem: '参考条目',
    bodyMedium: 'Body Medium',
  },
  details: {
    valueItem: '{{v0}} 条目',
    itemA: 'Item A',
    itemB: 'Item B',
    itemC: 'Item C',
  },
} satisfies LocaleOf<typeof selectExamplesEnUS>;

import type { LocaleOf } from '@/i18n/locale-types';

import type { selectExamplesEnUS } from './en-US';
export const selectExamplesZhCN = {
  copy: {
    chooseProject: '选择项目',
    chooseAProject: '选择一个项目',
    cloudDocs: '云文档',
    runtime: '运行时',
    selectedProject: '已选项目',
    environment: '环境',
    local: '本地',
    homeLab: '家庭实验室',
    production: '生产环境',
    keyboardProject: '键盘项目选择',
    focusThenUseArrowdown: '聚焦后使用 ArrowDown',
    longProject: '长名称项目',
    shortName: '短名称',
    aVeryLongProjectNameThatShouldNotWidenThe: '非常长的项目名称不应使页面变宽',
    anotherProject: '另一个项目',
    defaultProject: '默认项目',
    project: '项目',
    disabledProject: '禁用项目',
    invalidProject: '无效项目',
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
    referenceProject: '参考项目',
    bodyMedium: 'Body Medium',
  },
  details: {
    valueProject: '{{v0}} 项目',
    virgoCloudDocs: 'Virgo Cloud Docs',
    neuralSemanticHighlighting: 'Neural Semantic Highlighting',
    virgoRetro: 'Virgo Retro',
  },
} satisfies LocaleOf<typeof selectExamplesEnUS>;

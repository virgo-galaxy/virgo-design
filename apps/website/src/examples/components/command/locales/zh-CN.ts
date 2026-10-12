import type { LocaleOf } from '@/i18n/locale-types';

import type { commandExamplesEnUS } from './en-US';
export const commandExamplesZhCN = {
  copy: {
    noMatchingCommands: '没有匹配命令。',
    openDashboard: '打开视图 A',
    switchWorkspace: '切换示例区域',
    openPreferences: '打开偏好设置',
    unavailableCommand: '不可用命令',
    openCommandPalette: '打开命令面板',
    focusTheButtonThenPressCtrlK: '聚焦按钮后按 ⌘/Ctrl K。',
    searchCommandPalette: '搜索命令面板',
    typeACommand: '输入命令…',
    selected: '已选择：',
    prefixFilter: '前缀过滤',
    tryPref: '试试 option-b…',
    noPrefixMatch: '没有匹配前缀。',
    searchInlineCommands: '搜索行内命令',
    searchCommands: '搜索命令…',
    inlineCommandList: '行内命令列表',
    searchByLabelOrKeywordTheSelectedValueIsLocal: '按标签或关键词搜索；选中值作为局部反馈。',
    dialogPalette: '对话框命令面板',
    focusThisExampleThenPressCtrlKOrUseIts: '聚焦此示例后按 ⌘/Ctrl K，或使用按钮。',
    customFilter: '自定义过滤',
    matchTheBeginningOfEachCommandValue: '匹配各命令值的开头。',
    heroCommandSearch: '主样例命令搜索',
  },
  details: {
    workspace: '示例区域',
    settings: '设置',
    noCommandSelected: '尚未选择命令。',
    none: '无',
  },
} satisfies LocaleOf<typeof commandExamplesEnUS>;

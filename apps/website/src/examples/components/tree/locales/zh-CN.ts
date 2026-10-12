import type { LocaleOf } from '@/i18n/locale-types';

import type { treeExamplesEnUS } from './en-US';
export const treeExamplesZhCN = {
  copy: {
    files: '示例区域文件',
    source: '源文件',
    components: '组件',
    locked: '锁定文件',
    toggle: '切换源文件夹',
    selected: '已选择：{{value}}',
    instructions: '方向键移动焦点，空格切换选择。',
    title0: '嵌套层级',
    description0: '展开与焦点遵循可见的层级。',
    title1: '受控展开与选择',
    description1: '应用管理两个数组，也可以收起当前聚焦的分支。',
    title2: '多项选择',
    description2: '空格切换聚焦项的选择状态，无需修饰键。',
  },
} satisfies LocaleOf<typeof treeExamplesEnUS>;

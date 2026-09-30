import type { LocaleOf } from '@/i18n/locale-types';

import type { checkboxExamplesEnUS } from './en-US';
export const checkboxExamplesZhCN = {
  copy: {
    unchecked: '未选中',
    checked: '已选中',
    indeterminate: '部分选中',
    checkAll: '全选',
    checkAllFruit: '全选水果',
    apple: '苹果',
    pear: '梨',
    orange: '橙子',
    fruit: '水果',
    selectionStates: '选择状态',
    uncheckedCheckedAndIndeterminateChoicesUseTheSameGeometry:
      '未选中、选中和部分选中使用相同形状。',
    disabledSelection: '禁用选择',
    disabledPreservesAllThreeSelectionStates: '禁用时保留全部三种选择状态。',
    multipleValues: '多个值',
    aGroupCoordinatesRelatedNativeCheckboxValues: '分组协调相关的原生复选框值。',
    computeTheAggregateStateFromTheSelectedValues: '根据选中值计算整体状态。',
    syncChanges: '同步更改',
    bodyMedium: 'Body Medium',
  },
} satisfies LocaleOf<typeof checkboxExamplesEnUS>;

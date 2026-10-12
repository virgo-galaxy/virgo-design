import type { LocaleOf } from '@/i18n/locale-types';

import type { radioExamplesEnUS } from './en-US';
export const radioExamplesZhCN = {
  copy: {
    optionA: '选项 A',
    optionB: '选项 B',
    disabledUnchecked: '禁用且未选中',
    disabledChecked: '禁用且选中',
    horizontalOptions: '水平选项选项',
    optionC: '选项 C',
    verticalOptions: '垂直选项选项',
    nativeRadioSelection: '原生单选',
    aNativeNameGroupsMutuallyExclusiveOptions: '原生 name 将互斥选项归为一组。',
    horizontalGroup: '水平分组',
    groupChoicesWithoutChangingSingleSelectionSemantics: '将选项分组，不改变单选语义。',
    verticalGroup: '垂直分组',
    disabledSelection: '禁用选择',
    disabledOptionsPreserveTheirSelectionState: '禁用选项保留选中状态。',
    options: '选项',
    bodyMedium: 'Body Medium',
  },
} satisfies LocaleOf<typeof radioExamplesEnUS>;
